package ru.otus.bookstore.util;

import org.springframework.stereotype.Component;
import ru.otus.bookstore.controller.BookDto;
import ru.otus.bookstore.model.Book;

@Component
public class Mapper {

    public BookDto mapBookToDto(Book book) {
        BookDto result = new BookDto();
        result.setId(book.getId());
        result.setAuthors(book.getAuthors());
        result.setTitle(book.getTitle());
        result.setGenre(book.getGenre());
        result.setPrice(book.getPrice());
        result.setDescription(book.getDescription());
        result.setCoverId(book.getCoverId());
        result.setIsAvailable(book.getQuantity() > 0);
        return result;
    }
}
