package com.uni.vendas.infra.exception;

public class InvalidTokenJWT extends RuntimeException {
    public InvalidTokenJWT(String message) {
        super(message);
    }
}
