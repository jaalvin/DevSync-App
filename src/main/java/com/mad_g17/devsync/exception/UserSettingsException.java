package com.devsync.exception;

public class UserSettingsException extends RuntimeException {
    
    public UserSettingsException(String message) {
        super(message);
    }
    
    public UserSettingsException(String message, Throwable cause) {
        super(message, cause);
    }
}