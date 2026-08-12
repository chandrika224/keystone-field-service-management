package com.keystone.service.impl;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keystone.dto.ForgotPasswordRequest;
import com.keystone.dto.ForgotPasswordResponse;
import com.keystone.dto.ResetPasswordRequest;
import com.keystone.entity.PasswordResetToken;
import com.keystone.entity.User;
import com.keystone.repository.PasswordResetTokenRepository;
import com.keystone.repository.UserRepository;
import com.keystone.service.PasswordResetService;

@Service
public class PasswordResetServiceImpl
        implements PasswordResetService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public ForgotPasswordResponse forgotPassword(
            ForgotPasswordRequest request) {

        String email = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Invalidate old unused token
        passwordResetTokenRepository
                .findByEmailAndUsedFalse(email)
                .ifPresent(oldToken -> {
                    oldToken.setUsed(true);
                    passwordResetTokenRepository.save(oldToken);
                });

        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken =
                new PasswordResetToken();

        resetToken.setEmail(email);
        resetToken.setToken(token);
        resetToken.setExpiryDate(
                LocalDateTime.now().plusMinutes(15));
        resetToken.setUsed(false);

        passwordResetTokenRepository.save(resetToken);

        // Local development only
        System.out.println(
                "========================================");
        System.out.println("PASSWORD RESET LINK");
        System.out.println(
                "http://localhost:5173/reset-password?token="
                        + token);
        System.out.println("========================================");

        return new ForgotPasswordResponse(
                "Password reset token generated successfully",
                token);
    }

    @Override
    @Transactional
    public void resetPassword(
            ResetPasswordRequest request) {

        PasswordResetToken resetToken =
                passwordResetTokenRepository
                        .findByToken(request.getToken())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid reset token"));

        if (Boolean.TRUE.equals(resetToken.getUsed())) {
            throw new RuntimeException(
                    "Reset token has already been used");
        }

        if (LocalDateTime.now()
                .isAfter(resetToken.getExpiryDate())) {

            throw new RuntimeException(
                    "Reset token has expired");
        }

        User user = userRepository
                .findByEmail(resetToken.getEmail())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"));

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()));

        userRepository.save(user);

        resetToken.setUsed(true);

        passwordResetTokenRepository.save(resetToken);
    }
}