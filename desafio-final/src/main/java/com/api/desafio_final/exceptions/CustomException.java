package com.api.desafio_final.exceptions;

import org.springframework.http.HttpStatus;

public class CustomException extends Exception {
    private HttpStatus status;

    public CustomException(String message, HttpStatus status){
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return this.status;
    }




}
