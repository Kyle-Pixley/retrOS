import React, { useState, useEffect } from 'react';
import './frontPage.css';
import FriendRequests from './friendRequests/friendRequests';
import FriendsList from './friendslist/friendslist';
import LogoutIcon from '@mui/icons-material/Logout';

function frontPage({ setSessionToken }) {

  const [ searchUsersInput, setSearchedUsersInput ] = useState('');
  const [ listOfSearchedUsers, setListOfSearchedUsers ] = useState([]);
  const [ searchTimer, setSearchTimer ] = useState(null);
  const [ friendRequestSent, setFriendRequestSent ] = useState(false);

  const handleSearchUsersChange = e => {
    const value = e.target.value;
    setSearchedUsersInput(value);

    if (searchTimer) clearTimeout(searchTimer);
    setSearchTimer(setTimeout(() => {
      if (value.trim() !=='') {
        searchUsers(value);
      } else {
        setListOfSearchedUsers([]);
      }
    }, 300));
  };

  const searchUsers = async (username) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/findusername/', {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ username })
      });

      const data = await response.json();
      if(response.ok) {
        setListOfSearchedUsers(data.data);
      } else {
        console.error("Error", data.error);
        setListOfSearchedUsers([]);
      }
    } catch (err) {
      console.error("fetch error" ,err);
    }
  };

  const sendFriendRequest = async id => {
    const token = localStorage.getItem("token")

    if(!token) {
      console.error("Missing Token")
      localStorage.clear()
      setSessionToken(undefined)
      return;
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/send_friend_request/", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({ receiver_id: id })
      });
      const data = await response.json();
      console.log(data)
      setFriendRequestSent(true)
    } catch (err) {
      console.error("error", err)
    }
  }

  return (
    <div id='front-page-component'>
      <button id='logout-button'>
        <LogoutIcon 
          id='logout-icon'
          onClick={() => 
                    {localStorage.clear()
                      setSessionToken(undefined)
                    }
        }/>
      </button>

      <div id='friend-search-parent'>
        <input
          type='text'
          value={searchUsersInput}
          onChange={handleSearchUsersChange}
          placeholder='Search users'>
        </input>

        {listOfSearchedUsers ? (
          <div>
            {listOfSearchedUsers.map((user) => (
              <div key={user.id}>
                <p>{user.username}</p>
                {friendRequestSent ? (
                  <p>Friend Request Sent</p>
                ) : (
                  <button
                  onClick={() => sendFriendRequest(user.id)}>
                    Send Friend Request
                </button>
                  )}

              </div>
            ))}
          </div>

        ) : null}

      </div>


      <div>
        <FriendsList />
      </div>
      <FriendRequests />
    </div>
  )
}

export default frontPage;