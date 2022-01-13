package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Favorite;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.FavoriteRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.function.Function;

@Service
@Validated
public class FavoriteListUseCase implements Function<String, Flux<QuestionDTO>> {

    private final QuestionRepository questionRepository;
    private final FavoriteRepository favoriteRepository;
    private final MapperUtils mapperUtils;

    public FavoriteListUseCase(MapperUtils mapperUtils, QuestionRepository questionRepository, FavoriteRepository favoriteRepository) {
        this.questionRepository = questionRepository;
        this.mapperUtils = mapperUtils;
        this.favoriteRepository = favoriteRepository;
    }

    @Override
    public Flux<QuestionDTO> apply(String userId) {
        return questionRepository.findAllById(favoriteRepository.findByUserId(userId).map(favorite -> favorite.getQuestionId()))
                .map(mapperUtils.mapEntityToQuestion());
    }
}
