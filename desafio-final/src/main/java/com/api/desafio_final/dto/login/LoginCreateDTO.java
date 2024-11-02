package com.api.desafio_final.dto.login;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginCreateDTO {
    @NotNull(message = "Não pode ser nulo")
    @NotEmpty(message = "Não pode ser em branco")
    @Email
    private String email;

    @NotNull(message = "Não pode ser nulo")
    @NotEmpty(message = "Não pode ser em branco")
    private String password;
}
