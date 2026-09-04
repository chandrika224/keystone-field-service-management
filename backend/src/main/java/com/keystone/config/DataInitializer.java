package com.keystone.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.keystone.entity.User;
import com.keystone.enums.Role;
import com.keystone.repository.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            // =====================================================
            // MANAGER
            // =====================================================

            User manager =
                    userRepository
                            .findByEmail("manager@keystone.com")
                            .orElse(null);

            // =====================================================
            // CREATE MANAGER
            // =====================================================

            if (manager == null) {

                manager = new User();

                manager.setFirstName("Keystone");
                manager.setLastName("Manager");
                manager.setEmail("manager@keystone.com");

                manager.setPassword(
                        passwordEncoder.encode("manager123")
                );

                manager.setRole(Role.MANAGER);
                manager.setActive(true);

                userRepository.save(manager);

                System.out.println(
                        "MANAGER CREATED"
                );

            } else {

                // =================================================
                // UPDATE EXISTING MANAGER
                // =================================================

                manager.setFirstName("Keystone");
                manager.setLastName("Manager");

                manager.setRole(Role.MANAGER);
                manager.setActive(true);

                // Reset password
                manager.setPassword(
                        passwordEncoder.encode("manager123")
                );

                userRepository.save(manager);

                System.out.println(
                        "MANAGER UPDATED"
                );
            }

            // =====================================================
            // VERIFY PASSWORD
            // =====================================================

            User savedManager =
                    userRepository
                            .findByEmail("manager@keystone.com")
                            .orElseThrow();

            boolean passwordMatches =
                    passwordEncoder.matches(
                            "manager123",
                            savedManager.getPassword()
                    );

            System.out.println(
                    "PASSWORD MATCH RESULT = "
                    + passwordMatches
            );
        };
    }
}