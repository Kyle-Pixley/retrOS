import React, { useState, useEffect } from 'react';
import './friendRequests.css';

function friendRequests() {

  const [ friendRequests, setFriendRequests ] = useState([]);


  

useEffect(() => {
  const getFriendRequests = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token in local storage");
    }


    try {
      const response = await fetch('http://127.0.0.1:8000/api/get_friend_requests/', {
        headers: {
          'Content-Type' : 'application/json',
          "Authorization" : `Bearer ${token}`
        },
      });

      const data = await response.json();
      if(!response.ok) {
        console.error("Error", data.error);
        setFriendRequests([])
        return;
      }

      setFriendRequests(Array.isArray(data.friend_requests) ? data.friend_requests : []);

    } catch (err) {
      console.error("fetch error", err);
    }
  };

  getFriendRequests();

}, [])



  return (
    <div>
      <h2>Friend Requests</h2>

      {friendRequests.length === 0 && (
        <div className='no-friend-requests'>No Friend Requests</div>
      )}

      <ul className='friend-request-list'>
        {friendRequests.map((user) => (
          <li key={user.id} className='friend-requests'>
            <p>{user.username}</p><button>Accept</button><button>Decline</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default friendRequests;