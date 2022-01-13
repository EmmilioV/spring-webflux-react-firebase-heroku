package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Favorite;
import co.com.sofka.questions.reposioties.FavoriteRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

import java.util.function.BiFunction;

@Service
@Validated
public class RemoveFavoriteQuestionUseCase implements BiFunction<String, String ,Mono<Void>> {
    private final FavoriteRepository favoriteRepository;

    public RemoveFavoriteQuestionUseCase(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    @Override
    public Mono<Void> apply(String questionId, String userId) {

        return favoriteRepository.deleteAll(favoriteRepository.findAll()
                .filter(favorite -> favorite.getQuestionId().equals(questionId) && favorite.getUserId().equals(userId)));
    }
}
