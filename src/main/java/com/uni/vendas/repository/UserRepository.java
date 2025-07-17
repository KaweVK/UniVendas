package com.uni.vendas.repository;

import com.uni.vendas.models.User;
import jakarta.validation.constraints.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID>, JpaSpecificationExecutor<User> {

    Optional<User> findByEmail(@Email(regexp = "^[a-zA-Z0-9._%+-]+@dcx.ufpb.br$", message = "Invalid email format") String email);
}
