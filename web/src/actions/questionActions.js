const URL_BASE = 'https://questionananswerapp.herokuapp.com';

export const LOADING = 'LOADING'
export const LOADED_SUCCESS = 'LOADED_SUCCESS'
export const LOADED_FAILURE = 'LOADED_FAILURE'

export const loading = () => ({ type: LOADING })

export const success = payload => ({
    type: LOADED_SUCCESS,
    payload
});

export const failure = () => ({ type: LOADED_FAILURE })

export function fetchQuestions() {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(
                `${URL_BASE}/getAll`
            )
            const data = await response.json()
            dispatch(success({ questions: data, redirect: null }))
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function fetchOwnerQuestions(userId) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/getOwnerAll/${userId}`)
            const data = await response.json()
            dispatch(success({ questions: data, redirect: null }))
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function fetchFavoriteQuestions(userId) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/getFavoriteQuestions/${userId}`)
            const data = await response.json()
            dispatch(success({ questions: data, redirect: null }))
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function fetchQuestion(id) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/get/${id}`)
            const data = await response.json()
            dispatch(success({ question: data, redirect: null }))
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function postQuestion(question) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/create`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(question)
                }
            )
            const id = await response.text()
            dispatch(success({redirect: `/question/${id}`}));
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function postQuestionToFavorite(favorite) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/addToFavorite`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(favorite)
                }
            )
            dispatch(success({redirect: `/favorites`}));
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function removeFavoriteQuestion(questionId, userId) {
    return async dispatch => {
        dispatch(loading())
        try {
            await fetch(`${URL_BASE}/removeFavoriteQuestion/${questionId}/${userId}`,
                {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            dispatch(success({redirect: `/favorites`}));
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function deleteQuestion(id) {
    return async dispatch => {
        dispatch(loading())
        try {
            await fetch(`${URL_BASE}/delete/${id}`,
                {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            dispatch(success({redirect: `/list`}));
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function deleteAnswer(answerId, questionId) {
    return async dispatch => {
        dispatch(loading())
        try {
            await fetch(`${URL_BASE}/deleteAnswer/${answerId}`,
                {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            dispatch(success({redirect: `/question/${questionId}`}));
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function postAnswer(answer) {
    return async dispatch => {
        dispatch(loading())
        try {
            await fetch(`${URL_BASE}/add`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(answer)
                }
            )
            dispatch(success({redirect: `/question/${answer.questionId}`}));
        } catch (error) {
            dispatch(failure())
        }
    }
}

