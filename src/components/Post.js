import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";

import AddComment from './AddComment';

import './Post.css';

function Post({ match }) {
    const id = match.params.id;
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [addCommentToggle, setAddCommentToggle] = useState(false);

    useEffect(() => {
        fetchPost();
    }, [])

    async function fetchPost() {
        try {
            const postUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
            const postResponse = await fetch(postUrl);
            
            if (postResponse.ok) {
                const post = await postResponse.json();

                // fetching user detail
                const userUrl = `https://jsonplaceholder.typicode.com/users/${post.userId}`;
                const userResponse = await fetch(userUrl);
                
                if (userResponse.ok) {
                    const user = await userResponse.json();
                    const updatedPost = {
                        ...post,
                        username: user.username
                    }
                    setPost(updatedPost || {});
                } else {
                    console.error('Something went wrong')
                }

                // fetching comments for the given post
                const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`;
                const commentsResponse = await fetch(commentsUrl);
                
                if (commentsResponse.ok) {
                    const comments = await commentsResponse.json();
                    setComments(comments || []);
                } else {
                    console.error('Something went wrong')
                }
            } else {
                console.error('Something went wrong')
            }
        } catch (e) {
            console.error(e)
        }
    }

    const deleteComment = async (e, id) => {
        e.preventDefault();

        const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const filteredComments = comments.filter((comment) => {
                return comment.id !== id;
            });

            setComments(filteredComments);
        }
    }

    const submitComment = async (payload) => {
        payload.postId = post.id;
        payload.name = payload.subject;

        const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        if (response.ok) {
            const comment = await response.json();
            const updateComments = [comment, ...comments]
            setComments(updateComments);
        }
    }

    return (
        <>
            <div className="header">
                <Link className="post-detail-back-link" to={`/`}><span><i className="arrow left"></i> Back</span></Link>
                <span>Post Detail:</span>
            </div>
            { Object.keys(post).length > 0 && <div className="post-detail-container">
                <p><span>Title: </span>{ post.title}</p>
                <p><span>Username: </span>{ post.username}</p>
            </div>
            }
            { Object.keys(post).length === 0 && <div className="loader-container">
                <div className="loader"></div>
            </div> }
            { comments.length > 0 && <div className="post-comments-container">
                <div className="comment-header">
                    <span className="comment-title">Comments:</span>
                    <span className="add-comment" 
                        onClick={ () => setAddCommentToggle(!addCommentToggle)} >
                        Add Comment
                    </span>
                </div>
                { addCommentToggle && <AddComment submitComment={ submitComment } /> }
                { 
                    comments.map((comment) => {
                        return (<div className="post-comment-container" key={ comment.id }>
                            <p><span>Subject: </span>{ comment.name || '' }</p>
                            <p><span>Body: </span>{ comment.body || '' }</p>
                            <p>
                                <span>Email Id: </span>{ comment.email || '' }
                                <span onClick={ (e) => deleteComment(e, comment.id) } className="delete-post">Delete</span>
                            </p>
                        </div>)
                    })
                }
            </div>
            }
        </>
    );
}

export default Post;