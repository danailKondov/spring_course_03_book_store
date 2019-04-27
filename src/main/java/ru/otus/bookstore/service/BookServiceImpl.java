package ru.otus.bookstore.service;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.ReactiveGridFsResource;
import org.springframework.data.mongodb.gridfs.ReactiveGridFsTemplate;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import ru.otus.bookstore.model.Book;
import ru.otus.bookstore.repository.BookRepository;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;
    private final ReactiveGridFsTemplate gridFsTemplate;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository, ReactiveGridFsTemplate gridFsTemplate) {
        this.bookRepository = bookRepository;
        this.gridFsTemplate = gridFsTemplate;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Flux<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Mono<Long> deleteBookById(String bookId) {
        return bookRepository.deleteBookById(bookId);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Mono<Book> getBookById(String bookId) {
        return bookRepository.findById(bookId);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Mono<Book> updateBook(Mono<Book> book) {
        return bookRepository.save(book);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Mono<Book> addNewBook(Mono<String> authors,
                                 Mono<String> title,
                                 Mono<String> genre,
                                 Mono<String> description,
                                 Mono<FilePart> content,
                                 Mono<FilePart> cover) {

        Mono<String> contentId = content
                .flatMap(part -> this.gridFsTemplate.store(part.content(), part.filename()))
                .map(ObjectId::toHexString);
        Mono<String> coverId = cover
                .flatMap(part -> this.gridFsTemplate.store(part.content(), part.filename()))
                .map(ObjectId::toHexString);

        return Mono.zip(authors, title, genre, description, contentId, coverId)
                .map((a) -> new Book(null, a.getT1(), a.getT2(), a.getT3(), a.getT4(), a.getT5(), a.getT6()))
                .flatMap(book -> bookRepository.save(book));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Mono<ReactiveGridFsResource> getBookCover(String coverId) {
        return gridFsTemplate.findOne(query(where("_id").is(coverId))).flatMap(gridFsTemplate::getResource);
    }
}
