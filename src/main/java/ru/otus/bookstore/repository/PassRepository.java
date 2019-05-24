package ru.otus.bookstore.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;
import ru.otus.bookstore.model.Pass;

@Repository
public interface PassRepository extends ReactiveMongoRepository<Pass, String> {

    Mono<Pass> findByPassId(String passId);

    Mono<Long> deleteByPassId(String passId);

}
