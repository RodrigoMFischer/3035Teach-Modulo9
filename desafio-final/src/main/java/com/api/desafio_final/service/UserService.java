package com.api.desafio_final.service;

import com.api.desafio_final.dto.user.UserCreateDTO;
import com.api.desafio_final.dto.user.UserDTO;
import com.api.desafio_final.entities.User;
import com.api.desafio_final.exceptions.CustomException;
import com.api.desafio_final.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final PasswordEncoder passwordEncoder;

    public List<UserDTO> listAll(){
        List<User> users =  userRepository.findAll();
        return users.stream()
                .map(user -> objectMapper.convertValue(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    public UserDTO listById(Integer userId) throws Exception{
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("Usuário não encontado", HttpStatus.NOT_FOUND));
        return objectMapper.convertValue(user, UserDTO.class);
    }

    public UserDTO create(UserCreateDTO userCreateDTO) throws Exception{
        if (userRepository.findByUsername(userCreateDTO.getUsername()).isPresent()) throw new CustomException("Nome de usuário já cadastrado", HttpStatus.BAD_REQUEST);
        if (userRepository.findByEmail(userCreateDTO.getEmail()).isPresent()) throw new CustomException("E-mail já cadastrado", HttpStatus.BAD_REQUEST);

        User user = objectMapper.convertValue(userCreateDTO, User.class);
        user.setPassword(passwordEncoder.encode(userCreateDTO.getPassword()));
        user.setCreatedAt(LocalDate.now());
        user.setUpdatedAt(LocalDate.now());
        userRepository.save(user);
        return objectMapper.convertValue(user, UserDTO.class);
    }

    public UserDTO update(UserCreateDTO userCreateDTO, Integer userId) throws Exception{
        User userFromBD = userRepository.findById(userId).orElseThrow(() -> new CustomException("Usuário não encontrado", HttpStatus.NOT_FOUND));

        String encodedPassword = passwordEncoder.encode(userCreateDTO.getPassword());

        userFromBD.setName(userCreateDTO.getName());
        userFromBD.setUsername(userCreateDTO.getUsername());
        userFromBD.setPhone(userCreateDTO.getPhone());
        userFromBD.setEmail(userCreateDTO.getEmail());
        userFromBD.setPassword(encodedPassword);
        userFromBD.setProfileLink(userCreateDTO.getProfileLink());
        userFromBD.setDeleted(userCreateDTO.isDeleted());
        userFromBD.setUpdatedAt(LocalDate.now());
        userRepository.save(userFromBD);

        return objectMapper.convertValue(userFromBD, UserDTO.class);
    }

    public void delete(Integer userId) throws Exception{
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException("Usuário não encontrado", HttpStatus.NOT_FOUND));
        userRepository.delete(user);
    }

    protected User findUserById(Integer userId) throws Exception{
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("Usuário não encontado", HttpStatus.NOT_FOUND));
        return user;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}