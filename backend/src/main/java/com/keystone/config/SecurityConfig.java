package com.keystone.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.keystone.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {

        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .cors(cors -> {})
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            .authorizeHttpRequests(auth -> auth

                // ==========================================
                // PUBLIC AUTH APIs
                // ==========================================

                .requestMatchers(
                    "/api/auth/register",
                    "/api/auth/login"
                ).permitAll()


                // ==========================================
                // SWAGGER
                // ==========================================

                .requestMatchers(
                    "/v3/api-docs/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html"
                ).permitAll()


             // ==========================================
             // CUSTOMER WORK ORDER APIs
             // ==========================================

             .requestMatchers(
                 "/api/workorders/my",
                 "/api/workorders/my/**"
             ).hasRole("CUSTOMER")


             // ==========================================
             // TECHNICIAN WORK ORDER APIs
             // ==========================================

             // Technician's own work orders
             .requestMatchers(
                 "/api/workorders/technician/my",
                 "/api/workorders/technician/my/**"
             ).hasRole("TECHNICIAN")

             // Technician status workflow
             .requestMatchers(
                 "/api/workorders/*/accept",
                 "/api/workorders/*/start",
                 "/api/workorders/*/hold",
                 "/api/workorders/*/resume",
                 "/api/workorders/*/complete",
                 "/api/workorders/*/cancel"
             ).hasRole("TECHNICIAN")
             
             .requestMatchers(HttpMethod.GET, "/api/workorders/{workOrderId}")
             .hasAnyRole("MANAGER", "DISPATCHER", "TECHNICIAN")
             

             // ==========================================
             // MANAGER / DISPATCHER WORK ORDER APIs
             // ==========================================

             .requestMatchers(
                 "/api/workorders/**"
             ).hasAnyRole(
                 "MANAGER",
                 "DISPATCHER"
             )
             
                // ==========================================
                // CUSTOMER APIs
                // ==========================================

                .requestMatchers(
                    "/api/customers/**"
                ).hasRole("MANAGER")


                // ==========================================
                // INVENTORY
                // ==========================================

                .requestMatchers(
                    "/api/inventory/**"
                ).hasRole("MANAGER")


                // ==========================================
                // DASHBOARD
                // ==========================================

                .requestMatchers(
                    "/api/dashboard/**"
                ).hasRole("MANAGER")


                // ==========================================
                // REPORTS
                // ==========================================

                .requestMatchers(
                    "/api/reports/**"
                ).hasRole("MANAGER")


                // ==========================================
                // SITE APIs
                // ==========================================

                .requestMatchers(
                    "/api/sites/**"
                ).hasAnyRole(
                    "CUSTOMER",
                    "MANAGER",
                    "DISPATCHER"
                )


                // ==========================================
                // TECHNICIANS
                // ==========================================

                // ------------------------------------------
                // TECHNICIAN SELF PROFILE
                // ------------------------------------------

                .requestMatchers(
                    "/api/technicians/me"
                ).hasRole("TECHNICIAN")


                // ------------------------------------------
                // TECHNICIAN SELF AVAILABILITY
                // ------------------------------------------

                .requestMatchers(
                    "/api/technicians/me/availability"
                ).hasRole("TECHNICIAN")


                // ------------------------------------------
                // VIEW ALL TECHNICIANS
                // ------------------------------------------

                .requestMatchers(
                    "/api/technicians"
                ).hasAnyRole(
                    "MANAGER",
                    "DISPATCHER"
                )


                // ------------------------------------------
                // VIEW AVAILABLE TECHNICIANS
                // ------------------------------------------

                .requestMatchers(
                    "/api/technicians/available"
                ).hasAnyRole(
                    "MANAGER",
                    "DISPATCHER"
                )


                // ------------------------------------------
                // MANAGER TECHNICIAN MANAGEMENT
                // ------------------------------------------

             // View all technicians
                .requestMatchers(
                    "/api/technicians"
                ).hasAnyRole(
                    "MANAGER",
                    "DISPATCHER"
                )

                // ==========================================
                // EVERYTHING ELSE
                // ==========================================

                .anyRequest().authenticated()
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}