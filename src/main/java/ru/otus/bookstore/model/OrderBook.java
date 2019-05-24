package ru.otus.bookstore.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OrderBook {

    private String id;
    private String authors;
    private String title;
    private String genre;
    private Long quantity;
    private Long price;
    private Long totalPrice;
}
