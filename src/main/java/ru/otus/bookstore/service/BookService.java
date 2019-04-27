package ru.otus.bookstore.service;

import org.springframework.data.mongodb.gridfs.ReactiveGridFsResource;
import org.springframework.http.codec.multipart.FilePart;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import ru.otus.bookstore.model.Book;

public interface BookService {

    /**
     * Метод получает все книги для отображения на фронте.
     * @return Поток книг
     */
    Flux<Book> getAllBooks();

    /**
     * Метод удалаяет книгу по id
     * @param bookId идентификатор книги
     * @return количество удаленных книг
     */
    Mono<Long> deleteBookById(String bookId);

    /**
     * Метод получает книгу из БД по идентификатору
     * @param bookId идентификатор книги
     * @return книгу
     */
    Mono<Book> getBookById(String bookId);

    /**
     * Метод обноляет книгу
     * @param book книга
     * @return обновленная книга в случае успеха
     */
    Mono<Book> updateBook(Mono<Book> book);

    /**
     * Метод добавляет книгу в БД.
     * @param authors автор
     * @param title заглавие
     * @param genre жанр
     * @param description описание
     * @param content файл с содержанием
     * @param cover файл с обложкой
     * @return добавленная книга в случае успеха
     */
    Mono<Book> addNewBook(Mono<String> authors, Mono<String> title, Mono<String> genre,
                          Mono<String> description, Mono<FilePart> content, Mono<FilePart> cover);

    /**
     * Метод получает обложку от книги из БД
     * @param coverId идентификатор обложки
     * @return обложка
     */
    Mono<ReactiveGridFsResource> getBookCover(String coverId);
}
