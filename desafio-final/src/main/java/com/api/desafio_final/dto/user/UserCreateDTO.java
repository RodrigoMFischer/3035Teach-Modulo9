package com.api.desafio_final.dto.user;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserCreateDTO {
    @NotNull(message = "Não pode ser nulo")
    @NotEmpty(message = "Não pode ser em branco")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Somente letras são aceitas")
    private String name;

    @NotNull(message = "Não pode ser nulo")
    @NotEmpty(message = "Não pode ser em branco")
    private String username;

    @NotNull(message = "Não pode ser nulo")
    @NotEmpty(message = "Não pode ser em branco")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Endereço de e-mail inválido")
    private String email;

    @NotNull(message = "Não pode ser nulo")
    @NotEmpty(message = "Não pode ser em branco")
    private String password;

    @Size(max = 11, min = 11, message = "Deve conter 11 dígitos")
    @Pattern(regexp = "^[0-9]+$", message = "Insira apenas números")
    private String phone;

    @NotNull(message = "Não pode ser nulo")
    @NotEmpty(message = "Não pode ser em branco")
    private String description;

    @NotNull(message = "Não pode ser nulo")
    @NotEmpty(message = "Não pode ser em branco")
    private String profileLink;

    private boolean isDeleted = false;
}
