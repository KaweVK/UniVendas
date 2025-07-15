package com.uni.vendas.exception;

import lombok.Getter;

public class InvalidFieldException extends RuntimeException {

    @Getter
    private String Campo;

    public InvalidFieldException(String Campo, String message) {
        super(message);
        this.Campo = Campo;
    }
}
