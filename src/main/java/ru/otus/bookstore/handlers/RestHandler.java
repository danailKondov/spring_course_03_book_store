package ru.otus.bookstore.handlers;

import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.data.mongodb.gridfs.ReactiveGridFsResource;
import org.springframework.data.mongodb.gridfs.ReactiveGridFsTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.http.codec.multipart.FormFieldPart;
import org.springframework.http.codec.multipart.Part;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyExtractors;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import ru.otus.bookstore.payload.BookDto;
import ru.otus.bookstore.model.Book;
import ru.otus.bookstore.repository.BookRepository;
import ru.otus.bookstore.util.Mapper;

import java.util.Map;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.http.MediaType.APPLICATION_JSON;

@Component
@Slf4j
public class RestHandler {

    private BookRepository bookRepository;
    private ReactiveGridFsTemplate gridFsTemplate;
    private Mapper mapper;

    @Autowired
    public RestHandler(BookRepository bookRepository, ReactiveGridFsTemplate gridFsTemplate, Mapper mapper) {
        this.bookRepository = bookRepository;
        this.gridFsTemplate = gridFsTemplate;
        this.mapper = mapper;
    }

    public Mono<ServerResponse> getBooks(ServerRequest serverRequest) {
        Flux<BookDto> bookFlux = bookRepository.findAll().map(mapper::mapBookToDto);
        return ServerResponse
                .ok()
                .contentType(APPLICATION_JSON)
                .body(bookFlux, BookDto.class);
    }

    public Mono<ServerResponse> getFileById(ServerRequest serverRequest) {
        Flux<DataBuffer> coverFlux = gridFsTemplate
                .findOne(query(where("_id").is(serverRequest.pathVariable("id"))))
                .flatMap(file -> {
                    log.info("file name: {}, length: {}", file.getFilename(), file.getLength());
                    return gridFsTemplate.getResource(file);
                })
                .flatMapMany(ReactiveGridFsResource::getDownloadStream);
        return ServerResponse
                .ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(coverFlux, DataBuffer.class);
    }

    public Mono<ServerResponse> getBookById(ServerRequest serverRequest) {
        Mono<Book> bookMono = bookRepository.findById(serverRequest.pathVariable("bookId"));
        return ServerResponse.ok().body(bookMono, Book.class);
    }

    public Mono<ServerResponse> deleteBookById(ServerRequest serverRequest) {
        return bookRepository.findById(serverRequest.pathVariable("bookId"))
                .flatMap(book -> {
                    gridFsTemplate.delete(query(where("_id").is(book.getContentId()))).subscribe();
                    gridFsTemplate.delete(query(where("_id").is(book.getCoverId()))).subscribe();
                    return bookRepository.deleteBookById(book.getId());
                })
                .flatMap(r -> r == 0? ServerResponse.notFound().build() : ServerResponse.ok().build());
    }

    public Mono<ServerResponse> saveBook(ServerRequest serverRequest) {
        return serverRequest.body(BodyExtractors.toMultipartData()).flatMap(p -> {
            Map<String, Part> partMap = p.toSingleValueMap();
            FilePart contentPart = (FilePart) partMap.get("content");
            FilePart coverPart = (FilePart) partMap.get("cover");
            FormFieldPart authorsPart = (FormFieldPart) partMap.get("authors");
            FormFieldPart titlePart = (FormFieldPart) partMap.get("title");
            FormFieldPart genrePart = (FormFieldPart) partMap.get("genre");
            FormFieldPart quantityPart = (FormFieldPart) partMap.get("quantity");
            FormFieldPart pricePart = (FormFieldPart) partMap.get("price");
            FormFieldPart descriptionPart = (FormFieldPart) partMap.get("description");

            Mono<String> contentId = gridFsTemplate
                    .store(contentPart.content(), contentPart.filename())
                    .map(ObjectId::toHexString);
            Mono<String> coverId = gridFsTemplate
                    .store(coverPart.content(), coverPart.filename())
                    .map(ObjectId::toHexString);

            Mono<Book> bookMono = Mono.zip(contentId, coverId, (content, cover) ->
                    new Book(null,
                            authorsPart.value(),
                            titlePart.value(),
                            genrePart.value(),
                            descriptionPart.value(),
                            content,
                            cover,
                            Long.valueOf(quantityPart.value()),
                            Long.valueOf(pricePart.value())))
                    .flatMap(book -> bookRepository.save(book));
            return ServerResponse.ok().contentType(APPLICATION_JSON).body(bookMono, Book.class);
        });
    }

    public Mono<ServerResponse> updateBook(ServerRequest serverRequest) {
        Mono<Book> bookMono = serverRequest.body(BodyExtractors.toMono(Book.class))
                .flatMap(newBook -> {
                    return bookRepository.findById(newBook.getId()).flatMap(book -> {
                        book.setAuthors(newBook.getAuthors());
                        book.setTitle(newBook.getTitle());
                        book.setGenre(newBook.getGenre());
                        book.setDescription(newBook.getDescription());
                        book.setQuantity(newBook.getQuantity());
                        book.setPrice(newBook.getPrice());
                        return bookRepository.save(book);
                    });
                });
        return ServerResponse.ok().contentType(APPLICATION_JSON).body(bookMono, Book.class);
    }
}
