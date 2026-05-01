package com.uni.vendas.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.uni.vendas.infra.exception.InvalidTokenJWT;
import com.uni.vendas.model.Seller;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    private static final String ISSUER = "UniVendas";
    private static final int EXPIRY_HOURS = 2;
    private static final ZoneOffset ZONE_OFFSET = ZoneOffset.of("-03:00");

    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(Seller usuario) {
        try {
            return JWT.create()
                    .withIssuer(ISSUER)
                    .withSubject(usuario.getEmail())
                    .withClaim("id", String.valueOf(usuario.getId()))
                    .withExpiresAt(expiresAt())
                    .sign(Algorithm.HMAC256(secret));
        } catch (JWTCreationException e) {
            throw new InvalidTokenJWT("Erro ao gerar JWT");
        }
    }

    @PostConstruct
    void validate() {
        if (secret == null || secret.length() < 32)
            throw new IllegalStateException("JWT_SECRET não configurado ou muito curto");
    }

    public String getSubject(String token) {
        try {
            return JWT.require(Algorithm.HMAC256(secret))
                    .withIssuer(ISSUER)
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e) {
            throw new RuntimeException("Token JWT inválido ou expirado", e);
        }
    }

    private Instant expiresAt() {
        return LocalDateTime.now()
                .plusHours(EXPIRY_HOURS)
                .toInstant(ZONE_OFFSET);
    }
}