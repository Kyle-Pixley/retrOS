import React, { useState, useEffect } from 'react';
import './frontPage.css';
import LogoutIcon from '@mui/icons-material/Logout';

function frontPage({ setSessionToken }) {

  const [ searchUsersInput, setSearchedUsersInput ] = useState('');
  const [ listOfSearchedUsers, setListOfSearchedUsers ] = useState([]);
  const [ searchTimer, setSearchTimer ] = useState(null);

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

  const sendFriendRequest = id => {
    console.log(id);
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
                <button
                  onClick={() => sendFriendRequest(user.id)}>
                    Send Friend Request</button>
              </div>
            ))}
          </div>

        ) : null}
      </div>


      <div>
        this will be a list of all your friends
      </div>
    </div>
  )
}

export default frontPage;