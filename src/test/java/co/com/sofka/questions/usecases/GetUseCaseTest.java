package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GetUseCaseTest {
    AnswerRepository answerRepository;
    QuestionRepository questionRepository;
    GetUseCase getUseCase;


    @BeforeEach
    public void setup(){
        MapperUtils mapperUtils = new MapperUtils();
        questionRepository = mock(QuestionRepository.class);
        answerRepository = mock(AnswerRepository.class);
        getUseCase = new GetUseCase(mapperUtils, questionRepository, answerRepository);
    }

    @Test
    void getQuestionById() {
        Question question = new Question();
        question.setId("idQuestion");
        question.setUserId("xxxx-xxxx");
        question.setType("tech");
        question.setCategory("software");
        question.setQuestion("¿Que es un computador?");

        Answer answer = new Answer();
        answer.setId("1");
        answer.setUserId("xxxx-xxxx");
        answer.setQuestionId("idQuestion");
        answer.setAnswer("una maquina");
        answer.setPosition(1);

        AnswerDTO answerDTO = new AnswerDTO();
        answerDTO.setUserId("xxxx-xxxx");
        answerDTO.setQuestionId("idQuestion");
        answerDTO.setAnswer("nose");
        answerDTO.setPosition(1);

        List lista = new ArrayList<AnswerDTO>();
        lista.add(answerDTO);

        when(questionRepository.findById("idQuestion")).thenReturn(Mono.just(question));
        when(answerRepository.findAllByQuestionId("idQuestion")).thenReturn(Flux.just(answer));

        StepVerifier.create(getUseCase.apply("idQuestion"))
                .expectNextMatches(questionDTO -> {
                    assert questionDTO.getUserId().equals("xxxx-xxxx");
                    assert questionDTO.getCategory().equals("software");
                    assert questionDTO.getQuestion().equals("¿Que es un computador?");
                    assert questionDTO.getType().equals("tech");
                    assertArrayEquals(questionDTO.getAnswers().toArray(new AnswerDTO[0]), lista.toArray());
                    return true;
                })
                .verifyComplete();


        verify(questionRepository).findById("idQuestion");
        verify(answerRepository).findAllByQuestionId("idQuestion");
    }
}