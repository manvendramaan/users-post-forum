import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import './User.css';

function User({ match }) {
    const userId = match.params.userId;
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchUser();
    }, [])

    async function fetchUser() {
        try {
            const userUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
            const userResponse = await fetch(userUrl);
            
            if (userResponse.ok) {
                const user = await userResponse.json();
                setUser(user || {});
            } else {
                console.error('Something went wrong')
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <div className="header">
                <Link className="user-detail-back-link" to={`/`}><span><i className="arrow left"></i> Back</span></Link>
                <span>User Detail:</span>
            </div>
            <div className="user-detail-container">
                <p><span>Username: </span>{ user.username}</p>
                <p><span>Full name: </span>{ user.name}</p>
                <p><span>Email Id: </span>{ user.email}</p>
                <p><span>Website: </span>{ user.website}</p>
                <p><span>Company name: </span>{ user.company && user.company.name}</p>
            </div>
        </>
    );
}

export default User;