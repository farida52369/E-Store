package com.example.e_store.exceptions;

public class EStoreException extends RuntimeException {
    public EStoreException(String exMessage, Exception exception) {
        super(exMessage, exception);
    }

    public EStoreException(String exMessage) {
        super(exMessage);
    }
}