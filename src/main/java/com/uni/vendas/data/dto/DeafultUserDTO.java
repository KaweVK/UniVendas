package com.uni.vendas.data.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public record DeafultUserDTO(
        UUID id,
        @NotBlank(message = "Name cannot be blank")
        String name,
        @NotBlank(message = "Email cannot be blank")
        String email,
        @NotBlank(message = "Phone Number cannot be blank")
        String phoneNumber,
        @NotBlank(message = "City cannot be blank")
        String city) {}
