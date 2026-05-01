package com.uni.vendas.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AuthenticationDataDto(
        @NotBlank
        @Email
        String email,
        @NotBlank
        String password)
{

}
