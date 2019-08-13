# On-line книжный магазин
Итоговая работа по курсу OTUS Spring Framework

#### Автор: Д.Кондов

#### E-mail: dkondov@yandex.ru

Должны быть реализованы: 
1. Возможность просматривать страницы с книгами.
2. Возможность зарегистрироваться и залогиниться. 
3. Книги оформлены в виде мини-иконки и небольшого описания.  По клику открывается модальное окно с подробной информацией.
4. Выбирать книги и класть их в корзину, удалять из корзины. 
5. Купить выбранные книги, предварительно обязательно зарегистрировавшись/залогинившись.
6. Регистрация с подтверждением по email.
7. Получить книгу на почту после покупки
8. Администратор должен иметь возможность загружать/удалять книги и наблюдать статистику продаж.
9. Должна сохраняться инфа о покупателях и их покупках.

Технологии:
1. UI на ReactJS.
2. Серверная часть на Spring Boot 2.0 с использованием реактивного стека WebFlux. 
3. Mongo БД для хранения книг и информации о них с использованием облачного решения (Atlas).
4. Mongo для хранения информации о финансовых транзакциях, покупателях и их покупках (с использованием транзакций). 
5. Реактивный Spring Security с использованием JWT.
6. Покрыть все тестами.
7. Обернуть в docker-контейнер

#### Запуск

- Склонировать и собрать проект: ***mvnw clean install -DskipTests***
- Настройка БД не нужна: приложение смотрит в БД в облаке, где уже заведены пользователи (***admin/pass***, ***user/pass***) и книги
- Запустить
- В браузере открыть ***http://localhost:8080/***
