package com.uni.vendas.exception;

public class OperationNotAllowedException extends  RuntimeException {
    public OperationNotAllowedException(String message) {
        super(message);
    }
}
