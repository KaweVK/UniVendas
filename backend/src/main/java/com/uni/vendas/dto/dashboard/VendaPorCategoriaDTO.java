package com.uni.vendas.dto.dashboard;

import java.math.BigDecimal;

public record VendaPorCategoriaDTO(
        String categoria,
        Long totalItens,
        BigDecimal totalReceita,
        Long disponiveis,
        Long indisponiveis
) {
}
