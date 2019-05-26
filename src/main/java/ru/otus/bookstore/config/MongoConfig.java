package ru.otus.bookstore.config;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.ReactiveMongoDatabaseFactory;
import org.springframework.data.mongodb.ReactiveMongoTransactionManager;
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration;
import org.springframework.data.mongodb.core.SimpleReactiveMongoDatabaseFactory;
import org.springframework.data.mongodb.gridfs.ReactiveGridFsTemplate;
import org.springframework.transaction.ReactiveTransactionManager;
import org.springframework.transaction.reactive.TransactionalOperator;

@Configuration
public class MongoConfig extends AbstractReactiveMongoConfiguration {

    @Autowired
    @Qualifier("customConfigProperties")
    CustomConfigProperties properties;

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

    @Bean
    TransactionalOperator transactionalOperator(ReactiveTransactionManager transactionManager) {
        return TransactionalOperator.create(transactionManager);
    }

    @Bean
    ReactiveTransactionManager transactionManager() {
        return new ReactiveMongoTransactionManager(reactiveMongoDbFactory());
    }

    @Bean
    public ReactiveMongoDatabaseFactory reactiveMongoDbFactory() {
        return new SimpleReactiveMongoDatabaseFactory(reactiveMongoClient(),  getDatabaseName());
    }

    @Bean
    public CustomConfigProperties customConfigProperties() {
        return new CustomConfigProperties();
    }
}
