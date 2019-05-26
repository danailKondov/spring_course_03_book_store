package ru.otus.bookstore.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;

@PropertySource("classpath:application.yml")
@ConfigurationProperties(prefix = "mongo")
@Getter
@Setter
public class CustomConfigProperties {

    private String uri;
    private String basename;
}
