package com.keystone.service.impl;

import org.springframework.stereotype.Service;

import com.keystone.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    @Override
    public void sendEmail(String to,
                          String subject,
                          String body) {

        System.out.println("========================================");
        System.out.println("NOTIFICATION");
        System.out.println("To      : " + to);
        System.out.println("Subject : " + subject);
        System.out.println("Message : " + body);
        System.out.println("========================================");

    }
}