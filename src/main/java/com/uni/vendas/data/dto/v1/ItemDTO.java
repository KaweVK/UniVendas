package com.uni.vendas.data.dto.v1;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.uni.vendas.models.Item;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.UUID;

@JsonPropertyOrder({"id", "name", "description", "amount", "price"})
public record ItemDTO(
        UUID id,
        @NotBlank(message = "Name cannot be blank")
        String name,
        @NotBlank(message = "Description cannot be blank")
        String description,
        @NotNull(message = "Price is required")
        Long amount,
        @NotNull(message = "Price is required")
        BigDecimal price) {

    public Item MapToItem() {
        Item item = new Item();
        item.setName(name);
        item.setDescription(description);
        item.setAmount(amount);
        item.setPrice(price);
        return item;
    }
}
