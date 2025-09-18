import React, { useState, useEffect } from 'react';
import './friendsList.css';

function friendsList() {

    const [ friendsList, setFriendsList ] = useState([]);
    const [ friendsListError, setFriendsListError ] = useState('');

    useEffect(() => {
        const getFriendsList = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No Token In Local Storage")
                setFriendsListError("There is an issue with your credentials. Please logout and log back in.")
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/api/get_all_friends/', {
                    headers: {
                        'Content-type' : 'application/json',
                        'Authorization' : `Bearer ${token}`
                    },
                });

                const data = await response.json();
                if(!response.ok) {
                    console.error("Error", data.error);
                    setFriendsList([])
                    setFriendsListError("There is an issue with the server")
                    return;
                }
                setFriendsListError("");
                console.log(data.Friends)
                setFriendsList(Array.isArray(data.Friends) ? data.Friends : []);

            } catch (err) {
                console.error(err)
            }
        }
        getFriendsList();
    }, [])

  return (
    <div>
        {friendsList.map((friend) =>(
            <button>{friend.username}</button>
        ))}
    </div>
  )
}

export default friendsList;