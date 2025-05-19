package com.uni.vendas.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("REST API Udemy Curso")
                        .version("v1")
                        .description("Apenas para fins de estudos. Feito com curso da Udemy.")
                        .termsOfService("https://github.com/kawevk")
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://github.com/kawevk")
                        ));
    }
}
