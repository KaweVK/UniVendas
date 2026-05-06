package com.uni.vendas.controller;

import com.uni.vendas.dto.ResetPasswordDTO;
import com.uni.vendas.dto.SendVerificationCodeDTO;
import com.uni.vendas.model.enums.VerificationCodeType;
import com.uni.vendas.service.SellerService;
import com.uni.vendas.service.VerificationCodeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/verification")
@RequiredArgsConstructor
public class VerificationController {

    private final VerificationCodeService verificationCodeService;
    private final SellerService sellerService;

    @PostMapping("/registration/send")
    public ResponseEntity<Void> enviarCodigoCadastro(@RequestBody @Valid SendVerificationCodeDTO dto) {
        verificationCodeService.enviarCodigo(dto.email(), VerificationCodeType.REGISTRATION);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/password-reset/send")
    public ResponseEntity<Void> enviarCodigoSenha(@RequestBody @Valid SendVerificationCodeDTO dto) {
        sellerService.findByEmail(dto.email());
        verificationCodeService.enviarCodigo(dto.email(), VerificationCodeType.PASSWORD_RESET);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/password-reset/confirm")
    public ResponseEntity<Void> redefinirSenha(@RequestBody @Valid ResetPasswordDTO dto) {
        verificationCodeService.verificarCodigo(dto.email(), dto.code(), VerificationCodeType.PASSWORD_RESET);
        sellerService.redefinirSenha(dto.email(), dto.newPassword());
        return ResponseEntity.ok().build();
    }
}