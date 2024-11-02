package com.api.desafio_final.controller;


import com.api.desafio_final.dto.login.LoginCreateDTO;
import com.api.desafio_final.dto.login.UserLoggedDTO;
import com.api.desafio_final.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Validated
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<UserLoggedDTO> auth(@Valid @RequestBody LoginCreateDTO loginDTO) throws Exception {
        return new ResponseEntity<>(authService.login(loginDTO), HttpStatus.OK);
    }
}
