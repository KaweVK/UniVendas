package com.uni.vendas.service;

import com.uni.vendas.dto.dashboard.TotalComDataDTO;
import com.uni.vendas.dto.dashboard.VendaPorCategoriaDTO;
import com.uni.vendas.model.enums.ItemCategory;
import com.uni.vendas.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ItemRepository itemRepository;

    public List<VendaPorCategoriaDTO> getVendasPorCategoria() {
        return itemRepository.sumTotalByCategory().stream()
                .map(row -> new VendaPorCategoriaDTO(
                        ((ItemCategory) row[0]).name(),
                        ((Long) row[1]),
                        (BigDecimal) row[2]
                ))
                .toList();
    }

    public List<TotalComDataDTO> getQtdPorCategoriaComData() {
        return itemRepository.sumTotalByCategoryWithDate().stream()
                .map(row -> new TotalComDataDTO(
                        ((ItemCategory) row[0]).name(),
                        (Long) row[1],
                        (Integer) row[2]
                ))
                .toList();
    }
}
