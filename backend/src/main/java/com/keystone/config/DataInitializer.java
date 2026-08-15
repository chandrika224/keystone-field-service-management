package com.keystone.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.keystone.entity.User;
import com.keystone.enums.Role;
import com.keystone.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class DataInitializer {

    @Bean
    CommandLineRunner initializeManager(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            String managerEmail = "manager@keystone.com";

            // Check whether manager already exists
            if (userRepository.findByEmail(managerEmail).isPresent()) {
                System.out.println("Manager already exists.");
                return;
            }

            // Create manager
            User manager = new User();

            manager.setFirstName("Keystone");
            manager.setLastName("Manager");
            manager.setEmail(managerEmail);

            manager.setPassword(
                passwordEncoder.encode("Manager@123")
            );

            manager.setRole(Role.MANAGER);
            manager.setActive(true);

            userRepository.save(manager);

            log.info(managerEmail);
            log.info("Default manager created successfully");
            log.info("Email    : " + managerEmail);
            log.info("Password : Manager@123");
            log.info("Role     : MANAGER");
            log.info("======================================");
        };
    }
}