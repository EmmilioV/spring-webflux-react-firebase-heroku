import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert'

import { fetchQuestion, postQuestionToFavorite, deleteAnswer } from '../actions/questionActions'

import { Question } from '../components/Question'
import { Answer } from '../components/Answer'
import { Link } from 'react-router-dom'

const SingleQuestionPage = ({
  match,
  dispatch,
  question,
  hasErrors,
  loading,
  userId
}) => {
  const { id } = match.params
  useEffect(() => {
    dispatch(fetchQuestion(id))
  }, [dispatch, id])

  const renderQuestion = () => {
    if (loading.question) return <p>Loading question...</p>
    if (hasErrors.question) return <p>Unable to display question.</p>

    return <Question question={question} />
  }

  const onDelete = (answerId, questionId) => {
      swal({
        title: "Delete",
        text: "are you sure that you want to delete this answer?",
        icon: "warning",
        buttons: ["No", "Si"]
      }).then(response => {
        if(response){
            dispatch(deleteAnswer(answerId, questionId));
            swal({text: "Answer deleted successfully",
                icon: "success"
            });
            setTimeout(() => {
              window.location.href = window.location.href;
            }, 4000)
        }
      })
  }

  const renderAnswers = () => {
    return (question.answers && question.answers.length) ? question.answers.map(answer => (
      <Answer key={answer.id} answer={answer} onDelete={onDelete} userId={userId} questionId={question.id}/>
    )) : <p>Empty answer!</p>;
  }

  const addToFavorite = () => {
    let data = {userId : userId, questionId : question.id};
    dispatch(postQuestionToFavorite(data))
  }

  return (
    <section>
      <button className='addToFavorite' onClick={addToFavorite}>add to Favorite</button>
      {renderQuestion()}
      {userId && <Link to={"/answer/" + id} className="button right">
        Reply
      </Link>}

      <h2>Answers</h2>
      {renderAnswers()}
    </section>
  )
}

const mapStateToProps = state => ({
  question: state.question.question,
  loading: state.question.loading,
  hasErrors: state.question.hasErrors,
  userId: state.auth.uid
})

export default connect(mapStateToProps)(SingleQuestionPage)
