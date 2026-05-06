package com.uni.vendas.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ResetPasswordDTO(
        @NotBlank @Email String email,
        @NotBlank @Size(min = 6, max = 6) String code,
        @NotBlank @Size(min = 4, max = 25) String newPassword
) {}