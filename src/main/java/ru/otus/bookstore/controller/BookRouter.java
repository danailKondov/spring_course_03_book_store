package ru.otus.bookstore.controller;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import ru.otus.bookstore.handlers.AuthHandler;
import ru.otus.bookstore.handlers.RestHandler;

@Component
public class BookRouter implements WebFluxConfigurer {

    @Bean
    public RouterFunction<ServerResponse> restRoutes(RestHandler restHandler) {
        return RouterFunctions.route(RequestPredicates.GET("/api/books/"), restHandler::getBooks)
                .andRoute(RequestPredicates.GET("/api/books/file/{id}"), restHandler::getFileById)
                .andRoute(RequestPredicates.GET("/api/books/{bookId}"), restHandler::getBookById)
                .andRoute(RequestPredicates.DELETE("/api/books/{bookId}"), restHandler::deleteBookById)
                .andRoute(RequestPredicates.POST("/api/books/"), restHandler::saveBook)
                .andRoute(RequestPredicates.PUT("/api/books/"), restHandler::updateBook);
    }

    @Bean
    public RouterFunction<ServerResponse> authRoutes(AuthHandler authHandler) {
        return RouterFunctions.route(RequestPredicates.GET("/api/user/{name}"), authHandler::checkNameAvailability)
                .andRoute(RequestPredicates.POST("/api/user/"), authHandler::saveUser)
                .andRoute(RequestPredicates.POST("/api/auth/signin/"), authHandler::login);
    }
}
