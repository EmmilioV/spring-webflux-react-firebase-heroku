package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.mockito.Mockito.*;

class CreateUseCaseTest {
    QuestionRepository questionRepository;
    CreateUseCase createUseCase;


    @BeforeEach
    public void setup(){
        MapperUtils mapperUtils = new MapperUtils();
        questionRepository = mock(QuestionRepository.class);
        createUseCase = new CreateUseCase(mapperUtils, questionRepository);
    }

    @Test
    void createQuestion() {
        Question question = new Question();
        question.setId("1");
        question.setUserId("xxxx-xxxx");
        question.setType("tech");
        question.setCategory("software");
        question.setQuestion("¿Que es un computador?");

        QuestionDTO DTO = new QuestionDTO();
        DTO.setUserId("xxxx-xxxx");
        DTO.setType("tech");
        DTO.setCategory("software");
        DTO.setQuestion("¿Que es un computador?");

        when(questionRepository.save(any())).thenReturn(Mono.just(question));

        StepVerifier.create(createUseCase.apply(DTO))
                .expectNextMatches(id -> {
                    assert id.equals("1");
                    return true;
                })
                .verifyComplete();

        verify(questionRepository).save(any());
    }
}