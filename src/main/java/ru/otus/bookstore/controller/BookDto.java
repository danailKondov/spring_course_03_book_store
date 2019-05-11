package ru.otus.bookstore.controller;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookDto {

    private String id;
    private String authors;
    private String title;
    private String genre;
    private Long price;
    private Boolean isAvailable;
    private String description;
    private String coverId;
}
