package com.keystone.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Keystone Field Service Management API")
                        .version("1.0")
                        .description("REST APIs for Field Service Management System")
                        .contact(new Contact()
                                .name("Keystone Team")
                                .email("support@keystone.com")));
    }
}