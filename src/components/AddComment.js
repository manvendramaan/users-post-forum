import React, { useRef }  from "react";

import './AddComment.css';

function AddComment({ submitComment }) {
    const subjectRef = useRef();
    const bodyRef = useRef();
    const emailRef = useRef();

    const resetForm = () => {
        if (subjectRef && subjectRef.current) {
            subjectRef.current.value = '';
        }

        if (bodyRef && bodyRef.current) {
            bodyRef.current.value = '';
        }

        if (emailRef && emailRef.current) {
            emailRef.current.value = '';
        }
    }

    const submitCommentPost = () => {
        const payload = {};

        if (subjectRef && subjectRef.current) {
            payload.subject = subjectRef.current.value
        }

        if (bodyRef && bodyRef.current) {
            payload.body = bodyRef.current.value
        }

        if (emailRef && emailRef.current) {
            payload.email = emailRef.current.value
        }

        submitComment(payload);
        resetForm();
    }

    return (
        <div className="comment-container">
            <div className="form-content">
                <label htmlFor="subject">Subject</label>
                <input ref={ subjectRef } type="text" id="subject" name="subject" placeholder="Comment subject..."/>
            </div>

            <div className="form-content">
                <label htmlFor="body">Body</label>
                <input ref={ bodyRef } type="text" id="body" name="body" placeholder="Comment body..."/>
            </div>

            <div className="form-content">
                <label htmlFor="email">Email Id</label>
                <input ref={ emailRef } type="text" id="email" name="email" placeholder="Email Id..."/>
            </div>

            <div className="form-content">
                <input type="submit" onClick={submitCommentPost} value="Submit"></input>
            </div>
        </div>
    );
}

export default AddComment;