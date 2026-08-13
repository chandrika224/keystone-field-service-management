package com.keystone.service;

import com.keystone.dto.ForgotPasswordRequest;
import com.keystone.dto.ForgotPasswordResponse;
import com.keystone.dto.ResetPasswordRequest;

public interface PasswordResetService {

    ForgotPasswordResponse forgotPassword(
            ForgotPasswordRequest request);

    void resetPassword(
            ResetPasswordRequest request);
}