package com.uni.vendas.repository.specs;

import com.uni.vendas.model.Seller;
import org.springframework.data.jpa.domain.Specification;

public class SellerSpecs {

    public static Specification<Seller> nameLike(String name) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<Seller> emailLike(String email) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("email")), "%" + email.toLowerCase() + "%");
    }

    public static  Specification<Seller> phoneNumberLike(String phoneNumber) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("phoneNumber")), "%" + phoneNumber.toLowerCase() + "%");
    }

}
