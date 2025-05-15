package com.uni.vendas.repository;

import com.uni.vendas.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
