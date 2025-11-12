package com.uni.vendas.infra.error;

import org.springframework.http.HttpStatus;

import java.util.List;

public record ErrorAnswer(int status, String message, List<ErrorField> fields) {

    public static ErrorAnswer defaultAnswer(String message) {
        return new ErrorAnswer(HttpStatus.BAD_REQUEST.value(), message, List.of());
    }

    public static ErrorAnswer badRequestAnswer(String message) {
        return new ErrorAnswer(HttpStatus.BAD_REQUEST.value(), message, List.of());
    }

    public static ErrorAnswer conflictAnswer(String message) {
        return new ErrorAnswer(HttpStatus.CONFLICT.value(), message, List.of());
    }

    public static ErrorAnswer internalServerErrorAnswer(String message) {
        return new ErrorAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), message, List.of());
    }

    public static ErrorAnswer unprocessableEntityAnswer(String message, List<ErrorField> fields) {
        return new ErrorAnswer(HttpStatus.UNPROCESSABLE_ENTITY.value(), message, fields);
    }

    public static ErrorAnswer notFoundAnswer(String message) {
        return new ErrorAnswer(HttpStatus.NOT_FOUND.value(), message, List.of());
    }

    public static ErrorAnswer forbiddenAnswer(String message) {
        return new ErrorAnswer(HttpStatus.FORBIDDEN.value(), message, List.of());
    }
}
