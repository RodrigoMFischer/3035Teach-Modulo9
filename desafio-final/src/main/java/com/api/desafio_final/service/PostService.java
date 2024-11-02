package com.api.desafio_final.service;

import com.api.desafio_final.dto.page.PageDTO;
import com.api.desafio_final.dto.post.PostCreateDTO;
import com.api.desafio_final.dto.post.PostDTO;
import com.api.desafio_final.entities.Post;
import com.api.desafio_final.entities.User;
import com.api.desafio_final.exceptions.CustomException;
import com.api.desafio_final.repository.PostRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserService userService;
    private final ObjectMapper objectMapper;

    public PageDTO<PostDTO> findAll(Integer page, Integer size) throws Exception {
        Sort sortType = Sort.by("postId").ascending();
        Pageable pageable = PageRequest.of(page, size, sortType);
        Page<Post> posts = postRepository.findAll(pageable);

        if (posts.isEmpty()) throw new CustomException("Não há posts na rede social.", HttpStatus.NOT_FOUND);

        Page<PostDTO> postsDTO = posts.map(post -> {
            PostDTO postDTO = objectMapper.convertValue(post, PostDTO.class);

            User user = post.getUser();

            if (user != null) {
                postDTO.setUsername(user.getUsername().charAt(0) != '@' ? '@' + user.getUsername() : user.getUsername());
                postDTO.setProfileLink(user.getProfileLink());
            }

            return postDTO;
        });

        return new PageDTO<>(
                postsDTO.getTotalElements(),
                postsDTO.getTotalPages(),
                postsDTO.getPageable().getPageNumber(),
                postsDTO.getSize(),
                postsDTO.getContent()
        );
    }

    public List<PostDTO> findByUserId(Integer id) throws Exception{
        User user = userService.findUserById(id);
        List<Post> userPosts = postRepository.findByUser(user).orElseThrow(() -> new CustomException("Usuário não possui posts", HttpStatus.NOT_FOUND));
        if(userPosts.isEmpty()) throw new CustomException("Usuário não possui posts", HttpStatus.NOT_FOUND);
        return userPosts.stream().map(p -> objectMapper.convertValue(p, PostDTO.class)).toList();
    }

    public Post create(Integer userId, PostCreateDTO postCreateDTO) throws Exception {
        User user = userService.findUserById(userId);
        Post post = objectMapper.convertValue(postCreateDTO, Post.class);
        post.setUser(user);
        post.setCreatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    public Post update(Integer postId, Integer userId, PostCreateDTO postCreateDTO) throws Exception {
        User user = userService.findUserById(userId);
        Post post = postRepository.findById(postId).orElseThrow(() -> new CustomException("Post não encontrado.", HttpStatus.NOT_FOUND));

        if (user.getUserId() != post.getUser().getUserId()) throw new CustomException("Você não tem permissão para acessar este recurso.", HttpStatus.FORBIDDEN);


        post.setTitle(postCreateDTO.getTitle());
        post.setDescription(postCreateDTO.getDescription());
        post.setPhotoLink(postCreateDTO.getPhotoLink());
        post.setVideoLink(postCreateDTO.getVideoLink());
        post.setPrivate(postCreateDTO.getIsPrivate());
        post.setUpdatedAt(LocalDateTime.now());

        postRepository.save(post);

        return post;
    }

    public void delete(Integer postId, Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        Post post = postRepository.findById(postId).orElseThrow(() -> new CustomException("Post não encontrado", HttpStatus.NOT_FOUND));
        if (post.getUser().getUserId() != user.getUserId()) throw new CustomException("Você não tem permissão para acessar este recurso", HttpStatus.FORBIDDEN);
        postRepository.delete(post);
    }
}
