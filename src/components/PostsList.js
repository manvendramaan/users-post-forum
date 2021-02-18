import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";

import './PostsList.css';

function PostsList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, [])

    async function fetchPosts() {
        try {
            const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
            const postsResponse = await fetch(postsUrl);
            
            if (postsResponse.ok) {
                const posts = await postsResponse.json();

                const postsPromiseList = posts.map(async(post, index) => {
                    return new Promise(async(resolve, reject) => {
                        const userUrl = `https://jsonplaceholder.typicode.com/users/${post.userId}`;
                        const userResponse = await fetch(userUrl);

                        if (userResponse.ok) {
                            const user = await userResponse.json();
                            posts[index].username = user.username;
                            resolve(post)
                        } else {
                            reject('Something went wrong')
                        }
                    }).catch(e => {
                        console.error(e)
                    });
                });

                await Promise.all(postsPromiseList);
                setPosts(posts || []);
            } else {
                console.error('Something went wrong')
            }
        } catch (e) {
            console.error(e)
        }
    }

    const deletePost = async (e, id) => {
        e.preventDefault();

        const answer = window.confirm("Are you sure to delete the post ?");

        if (answer) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchPosts();
                alert("Post deleted successfully!");
            }
        }
    }

    return (
        <div className="posts-container">
            <div className="post-header">
                <span className="posts-title">Posts:</span>
                <span className="add-post">Add Post</span>
            </div>
            { 
                posts.map((post) => {
                    return (<Link className="post-link" to={`/post/${post.id}`}>
                        <div className="post-container" key={ post.id }>
                            <p><span>Title: </span>{ post.title || '' }</p>
                            <p>
                                <span>Username: </span>
                                <Link className="user-link" to={`/user/${post.userId}`}>{ post.username || '' }</Link>
                                <span onClick={ (e) => deletePost(e, post.id) } className="delete-post">Delete</span>
                            </p>
                        </div>
                    </Link>)
                })
            }
        </div>
    );
}

export default PostsList;