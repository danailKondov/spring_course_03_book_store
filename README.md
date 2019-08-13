# On-line книжный магазин
Итоговая работа по курсу OTUS Spring Framework

##### Автор: Д.Кондов

##### E-mail: dkondov@yandex.ru

#### Технологии:

1. UI на ReactJS.
2. Серверная часть на Spring Boot 2.0 с использованием реактивного стека WebFlux. 
3. Реактивный Spring Security с использованием JWT.
4. Mongo DB для хранения книг и информации о них с использованием облачного решения (Atlas).
5. Mongo для хранения информации о покупателях и их покупках (с использованием транзакций). 

#### Запуск:

- Склонировать и собрать проект: ***mvnw clean install -DskipTests***
- Настройка БД не нужна: приложение смотрит в БД в облаке, где уже заведены пользователи (***admin/pass***, ***user/pass***) и книги
- Запустить: ***mvnw spring-boot:run***
- В браузере открыть ***http://localhost:8080/***

#### Описание проекта:

В приложении реализована возможность просматривать страницы с книгами:

![alt text](https://github.com/danailKondov/spring_course_03_book_store/blob/master/pics/main_panel.JPG)

Клиент может пройти регистрацию и залогиниться:

![alt text](https://github.com/danailKondov/spring_course_03_book_store/blob/master/pics/register_view.JPG)

![alt text](https://github.com/danailKondov/spring_course_03_book_store/blob/master/pics/login_view.JPG)
 
Книги оформлены в виде мини-иконки и небольшого описания.  
По клику открывается модальное окно с подробной информацией:

![alt text](https://github.com/danailKondov/spring_course_03_book_store/blob/master/pics/book_detail_view.JPG)

Если книга в магазине в данный момент отсутствует, она отмечается черно-белым фильтром 
и блокируется возможность добавления в корзину: 

![alt text](https://github.com/danailKondov/spring_course_03_book_store/blob/master/pics/no_book_main_panel.JPG)

В корзине есть возможность просматривать стоимость покупки, менять количество покупаемых книг 
и удалять их из корзины:

![alt text](https://github.com/danailKondov/spring_course_03_book_store/blob/master/pics/cart_view.JPG)

При покупке в случае, если клиент не зарегистрировался/залогинился, он будет перенаправлен 
на страницу регистрации/логина. После покупки клиенту будут предоставлены ссылки на скачивание книг:

![alt text](https://github.com/danailKondov/spring_course_03_book_store/blob/master/pics/after_buy_view.JPG)

При логине пользователя с правами администратора появляется возможность зайти на страницу администрирования приложения. 
На данной странице есть возможность добавлять, удалять и править информацию о книгах:

![alt text](https://github.com/danailKondov/spring_course_03_book_store/blob/master/pics/add_book.JPG)

Правка информации о книге реализована следующим образом:

![alt text](https://github.com/danailKondov/spring_course_03_book_store/blob/master/pics/edit_panel.JPG)

