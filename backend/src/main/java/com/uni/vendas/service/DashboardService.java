package com.uni.vendas.service;

import com.uni.vendas.dto.dashboard.TotalComDataDTO;
import com.uni.vendas.dto.dashboard.TotalPorVendedor;
import com.uni.vendas.dto.dashboard.VendaPorCategoriaDTO;
import com.uni.vendas.model.Seller;
import com.uni.vendas.model.enums.ItemAvailability;
import com.uni.vendas.model.enums.ItemCategory;
import com.uni.vendas.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ItemRepository itemRepository;

    public List<VendaPorCategoriaDTO> getVendasPorCategoria() {
        return itemRepository.sumTotalByCategory().stream()
                .map(row -> new VendaPorCategoriaDTO(
                        ((ItemCategory) row[0]).name(),
                        ((Long) row[1]),
                        ((BigDecimal) row[2]),
                        ((Long) row[3]),
                        ((Long) row[4])
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

    public List<TotalPorVendedor> getQtdPorVendedor() {
        return itemRepository.sumTotalBySeller().stream()
                .map(row -> new TotalPorVendedor(
                        (Long) row[0],
                        (Long) row[1],
                        (Long) row[2],
                        ((Seller) row[3]).getName()
                ))
                .toList();
    }
}
