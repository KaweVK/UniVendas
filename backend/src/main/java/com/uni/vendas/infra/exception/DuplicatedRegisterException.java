package com.uni.vendas.infra.exception;

public class DuplicatedRegisterException extends  RuntimeException {

    public DuplicatedRegisterException(String message) {
        super(message);
    }

}
