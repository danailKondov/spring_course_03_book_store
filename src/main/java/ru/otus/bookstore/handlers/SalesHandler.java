package ru.otus.bookstore.handlers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyExtractors;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import ru.otus.bookstore.model.OrderRequest;
import ru.otus.bookstore.model.Pass;
import ru.otus.bookstore.payload.OrderResponse;
import ru.otus.bookstore.repository.OrderRequestRepository;
import ru.otus.bookstore.repository.PassRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.springframework.http.MediaType.APPLICATION_JSON;

@Component
@Slf4j
public class SalesHandler {

    private OrderRequestRepository orderRequestRepository;
    private PassRepository passRepository;

    @Autowired
    public SalesHandler(OrderRequestRepository orderRequestRepository, PassRepository passRepository) {
        this.orderRequestRepository = orderRequestRepository;
        this.passRepository = passRepository;
    }

    @Transactional
    public Mono<ServerResponse> processOrder(ServerRequest serverRequest) {
        Mono<OrderResponse> result = serverRequest
                .body(BodyExtractors.toMono(OrderRequest.class))
                .flatMap(orderRequestRepository::save) // где-то здесь в реальнои приложении логика оплаты
                .map(orderRequest -> {
                    List<Pass> passes = new ArrayList<>();
                    orderRequest
                            .getBooks()
                            .forEach(orderBook -> {
                        String bookId = orderBook.getId();
                        String passId = UUID.randomUUID().toString();
                        Pass pass = new Pass(null, bookId, passId);
                        passes.add(pass);
                        passRepository.save(pass).subscribe();
                    });
                    return new OrderResponse(true, passes);
                });

        return ServerResponse
                .ok()
                .contentType(APPLICATION_JSON)
                .body(result, OrderResponse.class);
    }
}
