package com.uni.vendas.data.dto.v1;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

@JsonPropertyOrder({"id", "first_name", "last_name", "city", "address", "email", "phone"})
public record UserDTO(
        UUID id,
        @NotBlank
        @JsonProperty("first_name")
        String firstName,
        @NotBlank
        @JsonProperty("last_name")
        String lastName,
        @Email
        String email,
        @NotBlank
        String phone,
        @NotBlank
        String password,
        @NotBlank
        String city
) {}
