package ru.otus.bookstore.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import ru.otus.bookstore.model.OrderRequest;

@Repository
public interface OrderRequestRepository extends ReactiveMongoRepository<OrderRequest, String> {
}
