package ru.otus.bookstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.http.codec.multipart.FormFieldPart;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import ru.otus.bookstore.model.Book;
import ru.otus.bookstore.service.BookService;
import ru.otus.bookstore.util.Mapper;

@RestController
@RequestMapping("api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private Mapper mapper;

    @GetMapping("/")
    public Flux<BookDto> showAllBooksOnIndexPage() {
        return bookService.getAllBooks()
                .map(mapper::mapBookToDto);
    }

    @GetMapping("/cover/{coverId}")
    public Flux<Void> getBookCover(@PathVariable String coverId, ServerWebExchange exchange) {
        return bookService.getBookCover(coverId)
                .flatMapMany(r -> exchange.getResponse()
                        .writeWith(r.getDownloadStream()));
    }

    @GetMapping("/{bookId}")
    public Mono<Book> getBookById(@PathVariable("bookId") String bookId) {
        return bookService.getBookById(bookId);
    }

    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mono<BookDto> addNewBook(
            @RequestPart("authors") Mono<FormFieldPart> aut,
            @RequestPart("title") Mono<FormFieldPart> tle,
            @RequestPart("genre") Mono<FormFieldPart> gnr,
            @RequestPart("description") Mono<FormFieldPart> descr,
            @RequestPart("content") Mono<FilePart> content,
            @RequestPart("cover") Mono<FilePart> cover) {
        Mono<String> authors = aut.map(FormFieldPart::value).log();
        Mono<String> title = tle.map(FormFieldPart::value).log();
        Mono<String> genre = gnr.map(FormFieldPart::value).log();
        Mono<String> description = descr.map(FormFieldPart::value).log();
        return bookService.addNewBook(authors, title, genre, description, content, cover)
                .map(mapper::mapBookToDto)
                .switchIfEmpty(Mono.error(new Exception()));
    }

    @PutMapping("/")
    public Mono<BookDto> updateBook(@RequestBody Mono<Book> book) {
        return bookService
                .updateBook(book)
                .map(mapper::mapBookToDto);
    }

    @DeleteMapping("/{bookId}")
    public Mono<ResponseEntity> deleteBook(@PathVariable("bookId") String bookId) {
        return bookService.deleteBookById(bookId)
                .map(r -> new ResponseEntity(r == 0? HttpStatus.NOT_FOUND: HttpStatus.OK));
    }
}
