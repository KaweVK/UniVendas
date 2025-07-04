package com.uni.vendas.repository;

import com.uni.vendas.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

public interface ItemRepository extends JpaRepository<Item, UUID> {

    Optional<Item> findByIdAndNameAndDescriptionAndAmountAndPrice(UUID id, String name, String description, Long amount, BigDecimal price);
}
