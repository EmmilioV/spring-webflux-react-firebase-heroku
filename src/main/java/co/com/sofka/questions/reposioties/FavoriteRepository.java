package co.com.sofka.questions.reposioties;

import co.com.sofka.questions.collections.Favorite;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

import java.util.Optional;

public interface FavoriteRepository  extends ReactiveCrudRepository<Favorite, String> {
    Flux<Favorite> findByUserId(String userId);
    Optional<Favorite> findByQuestionId(String questionId);
}
