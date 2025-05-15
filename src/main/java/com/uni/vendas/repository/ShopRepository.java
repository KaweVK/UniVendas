package com.uni.vendas.repository;

import com.uni.vendas.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopRepository extends JpaRepository<Item, Long> {
}
