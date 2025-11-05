package com.uni.vendas.item.repository;

import com.uni.vendas.item.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

public interface ItemRepository extends JpaRepository<Item, UUID>, JpaSpecificationExecutor<Item> {
    Optional<Item> findByIdAndNameAndDescriptionAndAmountAndPrice(UUID id, String name, String description, Long amount, BigDecimal price);
}
