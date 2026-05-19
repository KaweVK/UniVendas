package com.uni.vendas.controller;

import com.uni.vendas.dto.dashboard.TotalComDataDTO;
import com.uni.vendas.dto.dashboard.TotalPorVendedor;
import com.uni.vendas.dto.dashboard.VendaPorCategoriaDTO;
import com.uni.vendas.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/vendas-por-categoria")
    public ResponseEntity<List<VendaPorCategoriaDTO>> porCategoria() {
        return ResponseEntity.ok(dashboardService.getVendasPorCategoria());
    }

    @GetMapping("/qtd-registros-por-mes-categoria")
    public ResponseEntity<List<TotalComDataDTO>> qtdPorData() {
        return ResponseEntity.ok(dashboardService.getQtdPorCategoriaComData());
    }

    @GetMapping("/qtd-por-vendedor")
    public ResponseEntity<List<TotalPorVendedor>> qtdPorVendedor() {
        return ResponseEntity.ok(dashboardService.getQtdPorVendedor());
    }

}
