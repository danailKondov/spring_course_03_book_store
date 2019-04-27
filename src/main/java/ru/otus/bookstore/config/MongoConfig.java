package ru.otus.bookstore.config;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration;
import org.springframework.data.mongodb.gridfs.ReactiveGridFsTemplate;

@Configuration
public class MongoConfig extends AbstractReactiveMongoConfiguration {

    @Value("${mongo.uri}")
    String mongoUri;

    @Value("${spring.data.mongodb.database}")
    String dataBaseName;

    @Override
    protected String getDatabaseName() {
        return dataBaseName;
    }

    @Override
    public MongoClient reactiveMongoClient() {
        return MongoClients.create(mongoUri);
    }

    @Bean
    public ReactiveGridFsTemplate reactiveGridFsTemplate() throws Exception {
        return new ReactiveGridFsTemplate(reactiveMongoDbFactory(), mappingMongoConverter());
    }
}
