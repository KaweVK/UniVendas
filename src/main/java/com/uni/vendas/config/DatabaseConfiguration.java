package com.uni.vendas.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfiguration {

    @Value("${spring.datasource.url}") //pega do yml a propriedade
    String url;
    @Value("${spring.datasource.username}")
    String username;
    @Value("${spring.datasource.password}")
    String password;
    @Value("${spring.datasource.driver-class-name}")
    String driver;

    @Bean
    public DataSource hikariDataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(url);
        config.setUsername(username);
        config.setPassword(password);
        config.setDriverClassName(driver);

        config.setMaximumPoolSize(10); // Configura o tamanho máximo do pool de conexões
        config.setMinimumIdle(1); // Configura o número mínimo de conexões ociosas
        config.setPoolName("univendas-db-pool"); // Nome do pool de conexões
        config.setMaxLifetime(600000); // Tempo máximo de vida de uma conexão no pool (10 minutos)
        config.setConnectionTimeout(100000); // Tempo máximo de espera para obter uma conexão (100 segundos)
        config.setConnectionTestQuery("select 1"); // Consulta para testar conexões

        return new HikariDataSource(config);
    }

}
