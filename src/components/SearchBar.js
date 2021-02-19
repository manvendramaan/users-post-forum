import React, { useState, useRef }  from "react";
import { Link } from "react-router-dom";
import './SearchBar.css';

function SearchBar() {
    const [users, setUsers] = useState([]);
    const usernameRef = useRef();

    const handleSearchBar = () => {
        if (usernameRef && usernameRef.current) {
            const username = usernameRef.current.value;
            fetchUser(username)
        }
    }

    async function fetchUser(username) {
        try {
            const userUrl = `https://jsonplaceholder.typicode.com/users?username=${username}`;
            const userResponse = await fetch(userUrl);
            
            if (userResponse.ok) {
                const users = await userResponse.json();
                setUsers(users || []);
            } else {
                console.error('Something went wrong')
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <form className="search-form" autoComplete="off">
            <span className="autocomplete">
                <input ref={ usernameRef } onChange={ handleSearchBar } type="text" id="search-username" name="username" placeholder="Search Username"/>
                { users.length > 0 && 
                    <span id="myInputautocomplete-list" class="autocomplete-items">
                        {users.map((user) => {
                            return (<Link className="search-user-link" to={`/user/${user.id}`}>
                                <span>
                                    {user.username}
                                </span>
                            </Link>)
                        })}
                    </span>
                }
            </span> 
        </form>
    )

}


export default SearchBar;