import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchFavoriteQuestions, removeFavoriteQuestion } from '../actions/questionActions'
import { Question } from '../components/Question'

const FavoriteQuestionsPage = ({ dispatch, loading, questions, hasErrors, redirect, userId }) => {
    useEffect(() => {
        dispatch(fetchFavoriteQuestions(userId))
    }, [dispatch, userId]);

    useEffect(() => {
        if (redirect) {
            dispatch(fetchFavoriteQuestions(userId))
        }
    }, [redirect, dispatch, userId]);

    const removeOfFavorite = (id, userId) => {
        dispatch(removeFavoriteQuestion(id, userId))
    }


    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        return questions.map(question => <Question
            key={question.id}
            question={question}
            excerpt removeOfFavorite={removeOfFavorite}
            userId = {userId}/>)
    }

    return (
        <section>
            <h1>Favorite Questions</h1>
            {renderQuestions()}
        </section>
    )
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    hasErrors: state.question.hasErrors,
    redirect: state.question.redirect,
    userId: state.auth.uid
})

export default connect(mapStateToProps)(FavoriteQuestionsPage)