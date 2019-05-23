package ru.otus.bookstore.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserNameAvailability {

    private Boolean isAvailable;
}
