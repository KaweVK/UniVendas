package com.uni.vendas.dto.dashboard;

public record TotalPorVendedor(
        Long total,
        Long disponivel,
        Long indisponivel,
        String nome
) {
}
