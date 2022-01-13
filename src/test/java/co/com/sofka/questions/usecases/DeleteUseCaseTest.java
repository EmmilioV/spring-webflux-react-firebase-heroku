package co.com.sofka.questions.usecases;

import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.mockito.Mockito.*;

class DeleteUseCaseTest {
    QuestionRepository questionRepository;
    AnswerRepository answerRepository;
    DeleteUseCase deleteUseCase;


    @BeforeEach
    public void setup(){
        questionRepository = mock(QuestionRepository.class);
        answerRepository = mock(AnswerRepository.class);
        deleteUseCase = new DeleteUseCase(answerRepository, questionRepository);
    }

    @Test
    void deleteQuestionAndAnswer() {

        when(questionRepository.deleteById("1")).thenReturn(Mono.empty());
        when(answerRepository.deleteByQuestionId("1")).thenReturn(Mono.empty());


        StepVerifier.create(deleteUseCase.apply("1"))
                .verifyComplete();

        verify(questionRepository).deleteById("1");
        verify(answerRepository).deleteByQuestionId("1");
    }
}