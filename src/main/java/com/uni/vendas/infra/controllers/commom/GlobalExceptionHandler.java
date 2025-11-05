package com.uni.vendas.infra.controllers.commom;

import com.uni.vendas.infra.error.ErrorAnswer;
import com.uni.vendas.infra.error.ErrorField;
import com.uni.vendas.infra.exception.DuplicatedRegisterException;
import com.uni.vendas.infra.exception.InvalidFieldException;
import com.uni.vendas.infra.exception.OperationNotAllowedException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorAnswer handArgumentNotValidException(MethodArgumentNotValidException e) {
        List<FieldError> fieldErrorList =  e.getFieldErrors();
        List<ErrorField> errorsList = fieldErrorList.stream().map(fe -> new ErrorField(fe.getField(), fe.getDefaultMessage())).collect(Collectors.toList());

        return ErrorAnswer.unprocessableEntityAnswer("Validation failed", errorsList);
    }

    @ExceptionHandler(DuplicatedRegisterException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorAnswer handleDuplicatedRegisterException(DuplicatedRegisterException e) {
        return ErrorAnswer.conflictAnswer(e.getMessage());
    }

    @ExceptionHandler(OperationNotAllowedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorAnswer handleOperationNotAllowedException(OperationNotAllowedException e) {
        return ErrorAnswer.defaultAnswer(e.getMessage());
    }

    @ExceptionHandler(InvalidFieldException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorAnswer handleInvalidFieldException(InvalidFieldException e) {
        return new ErrorAnswer(HttpStatus.UNPROCESSABLE_ENTITY.value(), "Erro de validação.", List.of(new ErrorField(e.getCampo(), e.getMessage())));
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorAnswer handleException(RuntimeException e) {
        return ErrorAnswer.internalServerErrorAnswer("An unexpected error occurred, please try again later.");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorAnswer handleIllegalArgumentException(IllegalArgumentException e) {
        return ErrorAnswer.badRequestAnswer(e.getMessage());
    }
}
