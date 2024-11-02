package com.api.desafio_final.service;

import com.api.desafio_final.dto.login.LoginCreateDTO;
import com.api.desafio_final.dto.login.UserLoggedDTO;
import com.api.desafio_final.entities.User;
import com.api.desafio_final.exceptions.CustomException;
import com.api.desafio_final.security.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;


    public UserLoggedDTO login(LoginCreateDTO loginDTO) throws Exception {
        try {
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                    new UsernamePasswordAuthenticationToken(
                            loginDTO.getEmail(),
                            loginDTO.getPassword()
                    );

            Authentication authentication =
                    authenticationManager.authenticate(
                            usernamePasswordAuthenticationToken);

            User validatedUser = (User) authentication.getPrincipal();
            String token = tokenService.generateJwt(validatedUser);


            return new UserLoggedDTO(validatedUser.getUserId(), token);
        } catch (Exception e) {
            throw new CustomException("Senha incorreta", HttpStatus.BAD_REQUEST);
        }
    }
}
