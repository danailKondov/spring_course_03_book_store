package ru.otus.bookstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.otus.bookstore.repository.BookRepository;

@Service
public class AdminServiceImpl implements AdminService {

    private BookRepository bookRepository;

    @Autowired
    public AdminServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
}
