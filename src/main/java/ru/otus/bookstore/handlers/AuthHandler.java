package ru.otus.bookstore.handlers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyExtractors;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import ru.otus.bookstore.payload.ApiResponse;
import ru.otus.bookstore.model.Role;
import ru.otus.bookstore.model.User;
import ru.otus.bookstore.payload.AuthRequest;
import ru.otus.bookstore.payload.AuthResponse;
import ru.otus.bookstore.payload.UserNameAvailability;
import ru.otus.bookstore.repository.UserRepository;
import ru.otus.bookstore.security.JwtUtil;

import java.util.HashSet;
import java.util.Set;


@Component
@Slf4j
public class AuthHandler {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtUtil jwtUtil;

    @Autowired
    public AuthHandler(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public Mono<ServerResponse> saveUser(ServerRequest serverRequest) {
        Mono<ApiResponse> apiResponseMono =  serverRequest
                .body(BodyExtractors.toMono(User.class))
                .flatMap(user -> {
                    log.info("saving user {}", user);
                    Set<String> roles = new HashSet<>();
                    roles.add(Role.ROLE_USER.name());
                    user.setRoles(roles);
                    user.setEnabled(Boolean.TRUE);
                    user.setPassword(passwordEncoder.encode(user.getPassword()));
                    return userRepository.save(user);
                })
                .thenReturn(new ApiResponse(Boolean.TRUE, "User successfully saved"))
                .onErrorResume(throwable ->
                                Mono.just(new ApiResponse(Boolean.FALSE, "Error in saving user")));
        return ServerResponse
                .ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(apiResponseMono, ApiResponse.class);
    }

    public Mono<ServerResponse> checkNameAvailability(ServerRequest serverRequest) {
        Mono<UserNameAvailability> userNameAvailabilityMono = userRepository.existsByName(serverRequest.pathVariable("name"))
                .map(isAvailable -> new UserNameAvailability(!isAvailable));
        return ServerResponse
                .ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(userNameAvailabilityMono, UserNameAvailability.class);
    }

    public Mono<ServerResponse> login(ServerRequest serverRequest) {
        return serverRequest.body(BodyExtractors.toMono(AuthRequest.class))
                .flatMap(authRequest -> {
                    return userRepository.findByName(authRequest.getName())
                            .flatMap(userDetails -> {
                                String incomePass = authRequest.getPassword();
                                String userPass = userDetails.getPassword();
                                if (passwordEncoder.matches(incomePass, userPass)) {
                                    return ServerResponse
                                            .ok()
                                            .contentType(MediaType.APPLICATION_JSON)
                                            .body(Mono.just(new AuthResponse(jwtUtil.generateToken(userDetails))), AuthResponse.class);
                                } else {
                                    return ServerResponse.status(HttpStatus.UNAUTHORIZED).build();
                                }
                            }).switchIfEmpty(ServerResponse.status(HttpStatus.NOT_FOUND).build());
                });
    }
}
