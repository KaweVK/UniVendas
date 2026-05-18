package com.uni.vendas.repository.specs;

import com.uni.vendas.model.Item;
import com.uni.vendas.model.enums.ItemAvailability;
import com.uni.vendas.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class ItemSpecs {

    @Autowired
    private ItemRepository userRepository;

    public static Specification<Item> nameLike(String name) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<Item> descriptionLike(String description) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("description")), "%" + description.toLowerCase() + "%");
    }

    public static Specification<Item> priceGreaterOrEqual(Double priceGreater) {
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("price"), priceGreater);
    }

    public static Specification<Item> priceLessOrEqual(Double priceLess) {
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("price"), priceLess);
    }

//    public static Specification<Item> userNameLike(String userName) {
//        return (root, query, cb) -> cb.like(root.get("soldBy").get("name"), userName);
//    }

    public static Specification<Item> categoryEqual(String category) {
        return (root, query, cb) -> cb.equal(cb.upper(root.get("category").as(String.class)), category.toUpperCase());
    }

    public static Specification<Item> availabilityEqual(ItemAvailability availability) {
        return (root, query, cb) -> cb.equal(root.get("availability"), availability);
    }

}
