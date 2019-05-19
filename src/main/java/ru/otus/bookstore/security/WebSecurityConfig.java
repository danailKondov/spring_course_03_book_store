package ru.otus.bookstore.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.autoconfigure.security.reactive.EndpointRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class WebSecurityConfig {

	private AuthenticationManager authenticationManager;
	private SecurityContextRepository securityContextRepository;

	@Autowired
	public WebSecurityConfig(AuthenticationManager authenticationManager, SecurityContextRepository securityContextRepository) {
		this.authenticationManager = authenticationManager;
		this.securityContextRepository = securityContextRepository;
	}

	@Bean
	public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
		return http
				.exceptionHandling()
				.authenticationEntryPoint((swe, e) -> {
					return Mono.fromRunnable(() -> {
						swe.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
					});
				}).accessDeniedHandler((swe, e) -> {
					return Mono.fromRunnable(() -> {
						swe.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
					});
				}).and()
				.csrf().disable()
				.formLogin().disable()
				.httpBasic().disable()
				.authenticationManager(authenticationManager)
				.securityContextRepository(securityContextRepository)
				.authorizeExchange()
				.pathMatchers(HttpMethod.GET, "/", "/index.html", "/*.js", "/favicon.ico").permitAll()
				.and()
				.authorizeExchange()
				.pathMatchers(HttpMethod.GET, "/api/books/", "/api/books/file/*").permitAll()
				.and()
				.authorizeExchange()
				.pathMatchers(HttpMethod.GET, "/api/books/*").hasRole("ADMIN")
				.and()
				.authorizeExchange()
				.pathMatchers(HttpMethod.DELETE, "/api/books/*").hasRole("ADMIN")
				.and()
				.authorizeExchange()
				.pathMatchers(HttpMethod.POST, "/api/books/").hasRole("ADMIN")
				.and()
				.authorizeExchange()
				.pathMatchers(HttpMethod.PUT, "/api/books/").hasRole("ADMIN")
				.and()
				.authorizeExchange()
				.pathMatchers(HttpMethod.GET, "/api/user/", "/api/user/*").permitAll()
				.and()
				.authorizeExchange()
				.pathMatchers(HttpMethod.POST, "/api/auth/signin/").permitAll()
				.and()
				.authorizeExchange()
				.pathMatchers(HttpMethod.POST, "/api/user/").permitAll()
				.and()
				.authorizeExchange()
				.pathMatchers(HttpMethod.OPTIONS).permitAll()
				.and().build();
	}

	@Bean
	RouterFunction<ServerResponse> staticResourceRouter(){
		return RouterFunctions.resources("/*.js", new ClassPathResource("public/"));
	}

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
