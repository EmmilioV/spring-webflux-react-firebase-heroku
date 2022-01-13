import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: false
};

export const Answer = ({ answer, onDelete, userId, questionId }) => (
  <aside className="answer">
    <ReactQuill value={answer.answer}  
                    modules={modules}   
                    readOnly={true}/>
    <button className='deleteAnswer' onClick={()=>onDelete(answer.id, answer.userId, userId, questionId)}>Delete</button>
  </aside>
)
