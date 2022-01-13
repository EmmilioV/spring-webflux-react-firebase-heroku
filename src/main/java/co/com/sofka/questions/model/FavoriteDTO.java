package co.com.sofka.questions.model;

import javax.validation.constraints.NotBlank;
import java.util.Objects;

public class FavoriteDTO {
    private String id;
    @NotBlank
    private String userId;
    @NotBlank
    private String questionId;

    public FavoriteDTO() {
    }

    public FavoriteDTO(String userId, String questionId) {
        this.userId = userId;
        this.questionId = questionId;
    }

    public FavoriteDTO(String id, String userId, String questionId) {
        this.id = id;
        this.userId = userId;
        this.questionId = questionId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    @Override
    public String toString() {
        return "FavoriteDTO{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", questionId='" + questionId + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FavoriteDTO that = (FavoriteDTO) o;
        return userId.equals(that.userId) && questionId.equals(that.questionId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, questionId);
    }
}
