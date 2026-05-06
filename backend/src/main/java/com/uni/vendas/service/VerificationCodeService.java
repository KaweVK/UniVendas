package com.uni.vendas.service;

import com.uni.vendas.infra.exception.InvalidFieldException;
import com.uni.vendas.model.VerificationCode;
import com.uni.vendas.model.enums.VerificationCodeType;
import com.uni.vendas.repository.VerificationCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class VerificationCodeService {

    private static final int EXPIRY_MINUTES = 15;
    private final VerificationCodeRepository repository;
    private final EmailService emailService;

    public void enviarCodigo(String email, VerificationCodeType tipo) {
        repository.deleteAllByEmailAndType(email, tipo);

        String codigo = gerarCodigo();

        VerificationCode vc = VerificationCode.builder()
                .email(email)
                .code(codigo)
                .type(tipo)
                .used(false)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(EXPIRY_MINUTES))
                .build();

        repository.save(vc);
        emailService.enviarCodigoVerificacao(email, codigo, tipo.name());
    }

    public void verificarCodigo(String email, String codigo, VerificationCodeType tipo) {
        VerificationCode vc = repository
                .findTopByEmailAndTypeAndUsedFalseOrderByCreatedAtDesc(email, tipo)
                .orElseThrow(() -> new InvalidFieldException("code", "Nenhum código ativo encontrado para este email."));

        if (vc.isExpired()) {
            throw new InvalidFieldException("code", "O código expirou. Solicite um novo.");
        }

        if (!vc.getCode().equals(codigo)) {
            throw new InvalidFieldException("code", "Código inválido.");
        }

        vc.setUsed(true);
        repository.save(vc);
    }

    private String gerarCodigo() {
        return String.format("%06d", new SecureRandom().nextInt(1_000_000));
    }
}