package com.uni.vendas.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SendVerificationCodeDTO(
        @NotBlank @Email String email
) {}