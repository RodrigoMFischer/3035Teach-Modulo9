package com.api.desafio_final.dto.post;

import io.swagger.v3.oas.annotations.media.Schema;
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
public class PostCreateDTO {
    @NotNull(message = "Não pode ser nulo")
    @NotEmpty(message = "Não pode ser em branco")
    @Schema(name = "title", description = "Insira o título para seu Post")
    private String title;

    @NotNull(message = "Não pode ser nulo")
    @NotEmpty(message = "Não pode ser em branco")
    @Schema(name = "description", description = "Insira a descrição para seu Post")
    private String description;

    @NotEmpty(message = "Não pode ser em branco")
    @Schema(name = "photoLink", description = "Insira a url para imagem para seu Post")
    private String photoLink;

    @Schema(name = "videoLink", description = "Insira a url para o vídeo para seu Post")
    private String videoLink;


    @NotNull(message = "Não pode ser nulo")
    @Schema(name = "isPrivate", description = "Insira true/false indicando se o Post é privado")
    private Boolean isPrivate;
}
