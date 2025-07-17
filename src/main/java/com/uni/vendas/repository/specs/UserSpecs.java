package com.uni.vendas.repository.specs;

import com.uni.vendas.models.User;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecs {

    public static Specification<User> nameLike(String name) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<User> emailLike(String email) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("email")), "%" + email.toLowerCase() + "%");
    }

    public static  Specification<User> phoneNumberLike(String phoneNumber) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("phoneNumber")), "%" + phoneNumber.toLowerCase() + "%");
    }

}
