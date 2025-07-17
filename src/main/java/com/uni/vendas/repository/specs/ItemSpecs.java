package com.uni.vendas.repository.specs;

import com.uni.vendas.models.Item;
import org.springframework.data.jpa.domain.Specification;

public class ItemSpecs {

    public static Specification<Item> nameLike(String name) {
        return (root, query, cb) -> cb.like(cb.upper(root.get("name")), "%" + name.toUpperCase() + "%");
    }

    public static Specification<Item> descriptionLike(String description) {
        return (root, query, cb) -> cb.like(cb.upper(root.get("description")), "%" + description.toUpperCase() + "%");
    }

    public static Specification<Item> priceEqual(Double price) {
        return (root, query, cb) -> cb.equal(root.get("price"), price);
    }

}
