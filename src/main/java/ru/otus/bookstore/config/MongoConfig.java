package ru.otus.bookstore.config;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration;
import org.springframework.data.mongodb.gridfs.ReactiveGridFsTemplate;

@Configuration
public class MongoConfig extends AbstractReactiveMongoConfiguration {

    @Autowired
    @Qualifier("configProperties")
    ConfigProperties properties;

    @Override
    protected String getDatabaseName() {
        return properties.getBasename();
    }

    @Override
    public MongoClient reactiveMongoClient() {
        return MongoClients.create(properties.getUri());
    }

    @Bean
    public ReactiveGridFsTemplate reactiveGridFsTemplate() throws Exception {
        return new ReactiveGridFsTemplate(reactiveMongoDbFactory(), mappingMongoConverter());
    }
}
