import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: false
};

export const Answer = ({ answer }) => (
  <aside className="answer">
    <ReactQuill value={answer.answer}  
                    modules={modules}   
                    readOnly={true}/>
  </aside>
)
