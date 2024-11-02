package com.api.desafio_final.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO extends UserCreateDTO{
    private Integer userId;
    private boolean isDeleted = false;
    private LocalDate createdAt = LocalDate.now();
    private LocalDate updatedAt = LocalDate.now();
}
