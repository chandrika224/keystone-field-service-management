package com.keystone.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();

        // ==========================================
        // PUBLIC AUTHENTICATION ENDPOINTS
        // ==========================================

        if (path.equals("/api/auth/register")
                || path.equals("/api/auth/login")) {

            filterChain.doFilter(request, response);
            return;
        }

        // ==========================================
        // GET JWT FROM REQUEST
        // ==========================================

        String authHeader = request.getHeader("Authorization");

        // No JWT → continue normally
        if (authHeader == null
                || !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        try {

            // ==========================================
            // EXTRACT USERNAME FROM JWT
            // ==========================================

            String email = jwtService.extractUsername(token);

            if (email != null
                    && SecurityContextHolder
                        .getContext()
                        .getAuthentication() == null) {

                // ==========================================
                // LOAD USER
                // ==========================================

                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(email);

                // ==========================================
                // VALIDATE JWT
                // ==========================================

                if (jwtService.isTokenValid(
                        token,
                        userDetails.getUsername())) {

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authentication);
                }
            }

        } catch (JwtException | IllegalArgumentException e) {

            /*
             * Invalid / expired / malformed JWT.
             *
             * Do NOT crash the request.
             * Simply leave the SecurityContext unauthenticated.
             *
             * Spring Security will decide later whether
             * the requested endpoint requires authentication.
             */

            SecurityContextHolder.clearContext();
        }

        // ==========================================
        // CONTINUE REQUEST
        // ==========================================

        filterChain.doFilter(request, response);
    }
}