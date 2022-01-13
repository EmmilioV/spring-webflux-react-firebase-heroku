import React from 'react'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TextEditor from './TextArea';

const modules = {
  toolbar: false
};

export const Question = ({ question, excerpt, onDelete, removeOfFavorite, userId }) => (
  <article className={excerpt ? 'question-excerpt' : 'question'}>
    <h2><ReactQuill value= {question.question || ''} 
                    modules={modules}   
                    readOnly={true}/></h2> 
    
    <p>{question.category}  - <small>{question.type}</small></p>
  
    {onDelete && (
      <button className="button right" onClick={() => onDelete(question.id)}>DELETE</button>
    )}
    {removeOfFavorite && (
      <button className="button right" onClick={() => removeOfFavorite(question.id, userId)}>remove from favorites</button>
    )}
    {excerpt && (
      <Link to={`/question/${question.id}`} className="button">
        View Question
      </Link>
    )}

  </article>
)
