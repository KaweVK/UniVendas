package com.uni.vendas.item.repository.specs;

import com.uni.vendas.item.model.Item;
import com.uni.vendas.item.repository.ItemRepository;
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

    public static Specification<Item> priceEqual(Double priceLess, Double priceGreater) {
        return (root, query, cb) -> cb.between(root.get("price"), priceLess, priceGreater);
    }

//    public static Specification<Item> userNameLike(String userName) {
//        return (root, query, cb) -> cb.like(root.get("soldBy").get("name"), userName);
//    }

    public static Specification<Item> categoryEqual(String category) {
        return (root, query, cb) -> cb.equal(cb.upper(root.get("category").as(String.class)), category.toUpperCase());
    }

}
