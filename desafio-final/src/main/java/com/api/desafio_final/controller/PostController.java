package com.api.desafio_final.controller;

import com.api.desafio_final.dto.page.PageDTO;
import com.api.desafio_final.dto.post.PostCreateDTO;
import com.api.desafio_final.dto.post.PostDTO;
import com.api.desafio_final.entities.Post;
import com.api.desafio_final.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
@Validated
public class PostController {
    private final PostService postService;

    @GetMapping
    public ResponseEntity<PageDTO<PostDTO>> findAll(@RequestParam (value = "page", required = false, defaultValue = "0") Integer page,
                                                    @RequestParam (value = "size", required = false, defaultValue = "3") Integer size) throws Exception{
        return new ResponseEntity<>(postService.findAll(page, size), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostDTO>> findByUserId(@PathVariable Integer userId) throws Exception {
        return new ResponseEntity<>(postService.findByUserId(userId), HttpStatus.OK);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Post> save(@PathVariable Integer userId, @Valid @RequestBody PostCreateDTO post) throws Exception {
        return new ResponseEntity<>(postService.create(userId, post), HttpStatus.CREATED);
    }

    @PutMapping("/{postId}/user/{userId}")
    public ResponseEntity<Post> update(@PathVariable Integer postId, @PathVariable Integer userId, @Valid @RequestBody PostCreateDTO post) throws Exception {
        return new ResponseEntity<>(postService.update(postId, userId, post), HttpStatus.OK);
    }

    @DeleteMapping("/{postId}/user/{userId}")
    public ResponseEntity<Void> delete(@PathVariable Integer postId, @PathVariable Integer userId) throws Exception {
        postService.delete(postId, userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
