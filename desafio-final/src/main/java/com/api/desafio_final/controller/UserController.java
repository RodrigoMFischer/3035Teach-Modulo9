package com.api.desafio_final.controller;

import com.api.desafio_final.dto.login.LoginCreateDTO;
import com.api.desafio_final.dto.user.UserCreateDTO;
import com.api.desafio_final.dto.user.UserDTO;
import com.api.desafio_final.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return new ResponseEntity<>(userService.listAll(), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Integer userId) throws Exception{
        return new ResponseEntity<>(userService.listById(userId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserCreateDTO userCreateDTO) throws Exception{
        return new ResponseEntity<>(userService.create(userCreateDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Integer userId, @Valid @RequestBody UserDTO userDTO) throws Exception{
        return new ResponseEntity<>(userService.update(userDTO, userId), HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer userId) throws Exception{
        userService.delete(userId);
        return ResponseEntity.ok().build();
    }
}
