package com.uni.vendas.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public record UpdateSellerDTO(
        UUID id,
        @NotBlank(message = "Name cannot be blank")
        @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
        String name,
        @NotBlank(message = "Email cannot be blank")
        @NotBlank(message = "Phone Number cannot be blank")
        @Size(min = 3, max = 15, message = "Número de celular deve ter entre 3 e 15 caracteres")
        String phoneNumber,
        @NotBlank(message = "City cannot be blank")
        @Size(min = 3, max = 50, message = "Cidade deve ter entre 3 e 50 caracteres")
        String city,
        MultipartFile image
){}
