package com.keystone.exception;

import com.keystone.enums.ErrorCode;

import lombok.Getter;

@Getter
public class KeystoneException extends RuntimeException {

    private final ErrorCode errorCode;

    public KeystoneException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
