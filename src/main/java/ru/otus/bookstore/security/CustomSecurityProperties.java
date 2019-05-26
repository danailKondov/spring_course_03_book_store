package ru.otus.bookstore.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;

@PropertySource("classpath:application.yml")
@ConfigurationProperties(prefix = "token")
@Getter
@Setter
public class CustomSecurityProperties {

    private String secret;
    private String expirationTime;

}
