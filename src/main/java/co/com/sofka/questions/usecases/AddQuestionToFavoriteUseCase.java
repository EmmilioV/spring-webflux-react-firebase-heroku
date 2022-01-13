package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.FavoriteDTO;
import co.com.sofka.questions.reposioties.FavoriteRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

@Service
@Validated
public class AddQuestionToFavoriteUseCase implements SaveFavorite{
    private final FavoriteRepository favoriteRepository;
    private final MapperUtils mapperUtils;

    public AddQuestionToFavoriteUseCase(FavoriteRepository favoriteRepository, MapperUtils mapperUtils) {
        this.favoriteRepository = favoriteRepository;
        this.mapperUtils = mapperUtils;
    }

    @Override
    public Mono<FavoriteDTO> apply(FavoriteDTO favoriteDTO) {
        return favoriteRepository.save(mapperUtils.mapperToFavorite(null).apply(favoriteDTO))
                .map(mapperUtils.mapEntityToFavorite());
    }
}
