import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { postQuestion } from '../actions/questionActions'
import { connect } from 'react-redux'
import 'react-quill/dist/quill.snow.css';
import { useState} from "react";
import TextEditor from "../components/TextArea";

const FormPage = ({ dispatch, loading, redirect, userId, userEmail }) => {
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const [ body, setBody ] = useState("");

    const onSubmit = data => {
        data.userId = userId;
        data.userEmail = userEmail;
        data.question = body;
        dispatch(postQuestion(data));
    };

    useEffect(() => {
        if (redirect) {
            history.push(redirect);
        }
    }, [redirect, history])

    return (
        <section>
            <h1>New Question</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label for="type">Type</label>
                    <select {...register("type")} id="">
                        <option value="OPEN (LONG OPEN BOX)">OPEN (LONG OPEN BOX)</option>
                        <option value="OPINION (SHORT OPEN BOX)">OPINION (SHORT OPEN BOX)</option>
                        <option value="WITH RESULT (OPEN BOX WITH LINK)">WITH RESULT (OPEN BOX WITH LINK)</option>
                        <option value="WITH EVIDENCE (OPEN BOX WITH VIDEO)">WITH EVIDENCE (OPEN BOX WITH VIDEO)</option>
                    </select>
                </div>
                <div>
                    <label for="category">Category</label>
                    <select {...register("category")} id="category">
                        <option value="TECHNOLOGY AND COMPUTER">TECHNOLOGY AND COMPUTER</option>
                        <option value="SCIENCES">SCIENCES</option>
                        <option value="SOFTWARE DEVELOPMENT">SOFTWARE DEVELOPMENT</option>
                        <option value="SOCIAL SCIENCES">SOCIAL SCIENCES</option>
                        <option value="LANGUAGE">LANGUAGE</option>

                    </select>
                </div>

                <div>
                    <label for="question">Question</label>
                    <TextEditor body={body} setBody={setBody}/>
                </div>
                <button type="submit" className="button" disabled={loading} >{
                    loading ? "Saving ...." : "Save"
                }</button>
            </form>
        </section>

    );
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    redirect: state.question.redirect,
    hasErrors: state.question.hasErrors,
    userId: state.auth.uid,
    userEmail: state.auth.email
})

export default connect(mapStateToProps)(FormPage)