package ru.otus.bookstore;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.tools.agent.ReactorDebugAgent;
import ru.otus.bookstore.security.CustomSecurityProperties;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;

@EnableTransactionManagement
@SpringBootApplication
public class BookstoreApplication {

	@Bean
	public RouterFunction<ServerResponse> indexRouter(@Value("classpath:/public/index.html") final Resource indexHtml) {
		return RouterFunctions.route(GET("/"), request -> ServerResponse.ok().contentType(MediaType.TEXT_HTML)
				.syncBody(indexHtml));
	}

	@Bean
	public CustomSecurityProperties customSecurityProperties() {
		return new CustomSecurityProperties();
	}

	public static void main(String[] args) {
		ReactorDebugAgent.init();
		SpringApplication.run(BookstoreApplication.class, args);
	}

}
