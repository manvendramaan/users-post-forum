import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";

import CreatePost from './CreatePost';
import SearchBar from './SearchBar';

import './PostsList.css';

function PostsList() {
    const [posts, setPosts] = useState([]);
    const [createPostToggle, setCreatePostToggle] = useState(false);

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

        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const filteredPosts = posts.filter((post) => {
                return post.id !== id;
            });

            setPosts(filteredPosts);
        }
    }

    const submitPost = async (payload) => {
        payload.userId = Math.floor(Math.random() * Math.floor(1000));
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        if (response.ok) {
            const post = await response.json();
            const updatePosts = [post, ...posts]
            setPosts(updatePosts);
        }
    }

    return (
        <div className="posts-container">
            <div className="post-header">
                <span className="posts-title">Posts:</span>
                <SearchBar />
                <span className="add-post" 
                      onClick={ () => setCreatePostToggle(!createPostToggle)} >
                    Add Post
                </span>
            </div>
            { createPostToggle && <CreatePost submitPost={ submitPost } /> }
            {
                posts.length > 0 && posts.map((post) => {
                    return (<Link className="post-link" key={ post.id } to={`/post/${post.id}`}>
                        <div className="post-container">
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
            { posts.length === 0 && <div className="loader-container">
                <div className="loader"></div>
            </div> }
        </div>
    );
}

export default PostsList;