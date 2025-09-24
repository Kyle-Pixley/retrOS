import React, { useState, useEffect } from 'react';
import './friendsList.css';

function friendsList({ clickedOutside, setClickedOutside, friendChatBox, setFriendChatBox }) {

    const [ friendsList, setFriendsList ] = useState([]);
    const [ friendsListError, setFriendsListError ] = useState('No Friends');
    const [ selectedFriend, setSelectedFriend ] = useState(null);

    useEffect(() => {
        if (clickedOutside) {
            setSelectedFriend(null);
            setClickedOutside(false);
        }
    }, [ clickedOutside, setClickedOutside ])


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
                setFriendsListError("No Friends");
                setFriendsList(Array.isArray(data.Friends) ? data.Friends : []);

            } catch (err) {
                console.error(err)
            }
        }
        getFriendsList();
    }, [])

  return (
    <div id='friends-list-component'>
        {friendsList.length > 0 ? null : friendsListError}
        {friendsList.map((friend) =>(
            <p
                onClick={e => {
                    e.stopPropagation();
                    setSelectedFriend(friend.id);
                }}
                onDoubleClick={e => {
                    e.stopPropagation();
                    setFriendChatBox(friend.id)}}
                key={friend.id}
                className={friend.id === selectedFriend ? 'clicked-friend friend' : 'friend'}
                >
                {friend.username}
            </p>
        ))}
    </div>
  )
}

export default friendsList;