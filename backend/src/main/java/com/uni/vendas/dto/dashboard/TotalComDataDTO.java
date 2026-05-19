package com.uni.vendas.dto.dashboard;

public record TotalComDataDTO(
        String categoria,
        Long totalItens,
        Integer mesRegistro
) {
}
