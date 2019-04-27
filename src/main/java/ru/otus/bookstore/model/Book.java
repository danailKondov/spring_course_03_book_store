package ru.otus.bookstore.model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Document(collection = "book_items")
public class Book {

    @Id
    private String id;
    private String authors;
    private String title;
    private String genre;
    private String description;
    private String contentId;
    private String coverId;
}
