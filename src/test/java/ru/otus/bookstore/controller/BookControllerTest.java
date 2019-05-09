package ru.otus.bookstore.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.WebTestClient;


@RunWith(SpringRunner.class)
@SpringBootTest
public class BookControllerTest {

    @Autowired
    private ApplicationContext context;

    private WebTestClient webClient;

    @Before
    public void setUp() {
        webClient = WebTestClient.bindToApplicationContext(context).build();
    }

    @Test
    public void addNewBookControllerTest() throws Exception {
//        MockMultipartFile file = new MockMultipartFile("content", "foo.txt",
//                MediaType.TEXT_PLAIN_VALUE, "Hello World".getBytes());
//        MockMultipartFile file2 = new MockMultipartFile("cover", "foo.txt",
//                MediaType.TEXT_PLAIN_VALUE, "Hello World2".getBytes());
//
//        MultipartBodyBuilder builder = new MultipartBodyBuilder();
//        builder.part("authors", "authors_test");
//        builder.part("title", "title_test");
//        builder.part("genre", "genre_test");
//        builder.part("description", "description_test");
//        builder.part("content", file);
//        builder.part("cover", file2);
//
//        webClient.post()
//                .uri("api/books/")
//                .syncBody(builder.build())
//                .exchange()
//                .expectStatus().is2xxSuccessful();
    }
}