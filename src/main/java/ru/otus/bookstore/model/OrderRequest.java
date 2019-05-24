package ru.otus.bookstore.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "book_orders")
public class OrderRequest {

    @Id
    private String id;
    private String customer;
    private Date date;
    private List<OrderBook> books;
}
