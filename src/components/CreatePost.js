import React, { useRef }  from "react";
import { Link } from "react-router-dom";
import './CreatePost.css';

function CreatePost({ submitPost }) {
    const titleRef = useRef();
    const bodyRef = useRef();
    const userIdRef = useRef();
    const usernameRef = useRef();

    const resetForm = () => {
        if (titleRef && titleRef.current) {
            titleRef.current.value = '';
        }

        if (bodyRef && bodyRef.current) {
            bodyRef.current.value = '';
        }

        if (userIdRef && userIdRef.current) {
            userIdRef.current.value = '';
        }

        if (usernameRef && usernameRef.current) {
            usernameRef.current.value = '';
        }
    }

    const submitCreatePost = () => {
        const payload = {};

        if (titleRef && titleRef.current) {
            payload.title = titleRef.current.value
        }

        if (bodyRef && bodyRef.current) {
            payload.body = bodyRef.current.value
        }

        if (userIdRef && userIdRef.current) {
            payload.userId = userIdRef.current.value
        }

        if (usernameRef && usernameRef.current) {
            payload.username = usernameRef.current.value
        }

        submitPost(payload);
        resetForm();
    }

    return (
        <div className="create-post-container">
            <div className="form-content">
                <label htmlFor="title">Title</label>
                <input ref={ titleRef } type="text" id="title" name="title" placeholder="Post title..."/>
            </div>

            <div className="form-content">
                <label htmlFor="body">Body</label>
                <input ref={ bodyRef } type="text" id="body" name="body" placeholder="Post body..."/>
            </div>

            <div className="form-content">
                <label htmlFor="userId">User Id</label>
                <input ref={ userIdRef } type="text" id="userId" name="userId" placeholder="User Id..."/>
            </div>

            <div className="form-content">
                <label htmlFor="username">Username</label>
                <input ref={ usernameRef } type="text" id="username" name="username" placeholder="Username..."/>
            </div>

            <div className="form-content">
                <input type="submit" onClick={submitCreatePost} value="Submit"></input>
            </div>
        </div>
    );
}

export default CreatePost;