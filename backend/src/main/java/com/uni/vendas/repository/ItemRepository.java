package com.uni.vendas.repository;

import com.uni.vendas.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ItemRepository extends JpaRepository<Item, UUID>, JpaSpecificationExecutor<Item> {
    Optional<Item> findByNameAndDescriptionAndAmountAndPrice(String name, String description, Long amount, BigDecimal price);

    @Query("""
            SELECT i.category, SUM(i.amount), SUM(i.price * i.amount), SUM(CASE WHEN i.availability = 'AVAILABLE' THEN 1 * i.amount ELSE 0 END), SUM(CASE WHEN i.availability = 'UNAVAILABLE' THEN 1 * i.amount ELSE 0 END)
            FROM Item i
            GROUP BY i.category
            ORDER BY SUM(i.price * i.amount) DESC
            """)
    List<Object[]> sumTotalByCategory();

    @Query("""
            SELECT i.category, SUM(i.amount) as total, month(i.registerDate) as mes
            FROM Item i
            GROUP BY i.category, mes
            ORDER BY mes
            """)
    List<Object[]> sumTotalByCategoryWithDate();

    @Query("""
            SELECT SUM(i.amount), SUM(CASE WHEN i.availability = 'AVAILABLE' THEN 1 * i.amount ELSE 0 END), SUM(CASE WHEN i.availability = 'UNAVAILABLE' THEN 1 * i.amount ELSE 0 END), i.soldBy
            FROM Item i
            GROUP BY i.soldBy
            ORDER BY i.soldBy.name asc
            """)
    List<Object[]> sumTotalBySeller();
}
