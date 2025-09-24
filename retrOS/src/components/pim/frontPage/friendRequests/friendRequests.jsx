import React, { useState, useEffect } from 'react';
import './friendRequests.css';

function friendRequests({ friendRequests, setFriendRequests }) {

  const [ friendRequestDeleted, setFriendRequestDeleted ] = useState(false);
  const [ friendRequestAccepted, setFriendRequestAccepted ] = useState([]);
  

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

}, [ friendRequestDeleted ])

//! add the user id to both users friends list
const acceptFriendRequest = async (receiver) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Missing token");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/api/accept_friend_request/", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({ receiver_id: receiver })
    });

    const data = await response.json();
    setFriendRequestAccepted([...friendRequestAccepted, receiver])

    setTimeout(() => {deleteFriendRequest(receiver)}, 3000)

  } catch(err) {
    console.error("Error: ", err)
  }
}

const deleteFriendRequest = async (sender) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Missing token");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/api/delete_friend_request/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ sender_id: sender })
    });

    const data = await response.json();
    setFriendRequestDeleted(!friendRequestDeleted)
    console.log(data);
  } catch (err) {
    console.error("Error:", err);
  }
}



  return (
    <div id='friend-requests-component'>
      <h2>Friend Requests</h2>

      {friendRequests.length === 0 && (
        <div className='no-friend-requests'>No Friend Requests</div>
      )}

      <ul className='friend-request-list'>
        {friendRequests.map((user) => (
          <li key={user.id} className='friend-requests'>
            <p>{user.username}</p>
            
            {friendRequestAccepted.includes(user.id) ? (
              <p>Friend Request Accepted</p>
            ) : (
              <div id='friend-request-button-parent'>
                <button
                  onClick={() => acceptFriendRequest(user.id)}
                  >Accept</button>
                <button
                  onClick={() => deleteFriendRequest(user.id)}
                  >Decline</button>
              </div>

            )}

          </li>
        ))}
      </ul>
    </div>
  )
}

export default friendRequests;