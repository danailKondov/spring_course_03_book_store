package ru.otus.bookstore.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import ru.otus.bookstore.model.Book;

@Repository
public interface BookRepository extends ReactiveMongoRepository<Book, String> {

    Flux<Book> findAll();

    Mono<Book> save(Mono<Book> book);

    Mono<Long> deleteBookById(String id);
}
