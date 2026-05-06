package com.uni.vendas.repository;

import com.uni.vendas.model.VerificationCode;
import com.uni.vendas.model.enums.VerificationCodeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, UUID> {

    Optional<VerificationCode> findTopByEmailAndTypeAndUsedFalseOrderByCreatedAtDesc(
            String email, VerificationCodeType type);

    @Modifying
    @Transactional
    @Query("DELETE FROM VerificationCode v WHERE v.email = :email AND v.type = :type")
    void deleteAllByEmailAndType(String email, VerificationCodeType type);
}