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

            if (!userRepository.existsByEmail("manager@keystone.com")) {

                User manager = new User();

                manager.setFirstName("Keystone");
                manager.setLastName("Manager");

                manager.setEmail(
                        "manager@keystone.com"
                );

                manager.setPassword(
                        passwordEncoder.encode("manager123")
                );

                manager.setRole(Role.MANAGER);

                manager.setActive(true);

                userRepository.save(manager);
            }
        };
    }
}