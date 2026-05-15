package com.uni.vendas.dto.dashboard;

import com.uni.vendas.model.enums.ItemCategory;

public record TotalComDataDTO(
        String categoria,
        Long totalItens,
        Integer mesRegistro
) {
}
