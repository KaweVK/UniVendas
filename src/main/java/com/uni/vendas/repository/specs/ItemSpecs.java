package com.uni.vendas.repository.specs;

import com.uni.vendas.models.Item;
import org.springframework.data.jpa.domain.Specification;

public class ItemSpecs {

    public static Specification<Item> nameLike(String name) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<Item> descriptionLike(String description) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("description")), "%" + description.toLowerCase() + "%");
    }

    public static Specification<Item> priceEqual(Double priceLess, Double priceGreater) {
        return (root, query, cb) -> cb.between(root.get("price"), priceLess, priceGreater);
    }

    public static Specification<Item> userNameLike(String userName) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("user").get("name")), "%" + userName + "%");
    }

    public static Specification<Item> categoryEqual(String category) {
        return (root, query, cb) -> cb.equal(cb.lower(root.get("type").as(String.class)), category.toLowerCase());
    }

}
