package com.uni.vendas.infra.exception;

public class OperationNotAllowedException extends  RuntimeException {
    public OperationNotAllowedException(String message) {
        super(message);
    }
}
