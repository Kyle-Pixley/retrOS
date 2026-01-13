import React, { useState, useEffect } from 'react';
import './frontPage.css';
import FriendRequests from './friendRequests/friendRequests';
import FriendsList from './friendslist/friendsList.jsx';
import LogoutIcon from '@mui/icons-material/Logout';
import { jwtDecode } from 'jwt-decode';

function frontPage({ setSessionToken, clickedOutside, setClickedOutside, onOpenChat, setNavChatBoxButton }) {

  const [ searchUsersInput, setSearchedUsersInput ] = useState('');
  const [ listOfSearchedUsers, setListOfSearchedUsers ] = useState([]);
  const [ searchTimer, setSearchTimer ] = useState(null);
  const [ sendingFriendRequest, setSendingFriendRequest ] = useState(false);

  //friend requests sent to friendRequests.jsx 
  const [ friendRequestsSent, setFriendRequestsSent ] = useState([]);
  const [ friendRequests, setFriendRequests ] = useState([]);

  const [ isSearchUsersTab, setIsSearchUsersTab ] = useState(false);
  const [ isFriendsListTab, setIsFriendsListTab ] = useState(false);
  const [ isFriendRequestsTab, setIsFriendRequestsTab ] = useState(false);
  const [ currentUsersId, setCurrentUsersId ] = useState('');

// gets the friend requests that the logged in user has already sent and returns just the id of the user it was sent to
  useEffect(() => {
    const getSentFriendRequests = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Issue with Login Credentials")
        setSessionToken(undefined)
        localStorage.clear()
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/get_sent_friend_requests/", {
          headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
          },
        });

        const data = await response.json();
        if (!response.ok) {
          console.error("Error", data.error);
          setFriendRequestSent([])
          return;
        }
        setFriendRequestsSent(Array.isArray(data.from_user_ids) ? data.from_user_ids : []);
      } catch (err) {
        console.error("Fetch Error", err);
      }
    }
    getSentFriendRequests()
  },[ sendingFriendRequest ])


  // searches users in the data base when the input changes and is stagnant for .3 seconds 
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

  //Get the ID of the user that is logged in
  useEffect(() => {

    const getCurrentUsersId = () => {
      let token = localStorage.getItem('token')
      let decodedToken = jwtDecode(token)
      setCurrentUsersId(decodedToken.user_id)
    }

    getCurrentUsersId();
  }, [])

  // Search Users by User Name
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

// sends a friend request to another user
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
      setSendingFriendRequest(!sendingFriendRequest);
    } catch (err) {
      console.error("error", err)
    }
  };


// Checks to see if you have sent another user a request or if they sent you one or neither
  const friendRequestSentOrRecived = (user) => {
    if (friendRequestsSent.includes(user.id)) {
      return <p>Friend Request Pending</p>
    } else if (friendRequests.some(obj => obj.id === user.id)) {
      return <p>This user sent you a request</p>
    } else {
      return <button 
      onClick={() => sendFriendRequest(user.id)}>Send Friend Request</button>
    }
  };


  // Displays what Tab is clicked: Friends, Search Users, or Friend Requests Tab
  const setCurrentTabVeiw = () => {
    if(isSearchUsersTab) {
      return (
        <div id='friend-search-parent'>
        <input
          id='search-input'
          type='text'
          value={searchUsersInput}
          onChange={handleSearchUsersChange}
          placeholder='Search users'>
        </input>

        {listOfSearchedUsers ? (
          <div id='searched-users-list'>
            {listOfSearchedUsers.map((user) => {
              if(user.id != currentUsersId) {
                return (
                  <div key={user.id} id='searched-user-button-parent'>
                  <p id='searched-user-names'>{user.username}</p>
                  {friendRequestSentOrRecived(user)}
                </div>
                )
              }})}
              
          </div>

        ) : null}

      </div>
      )
    } else if(isFriendRequestsTab) {
      return (
        <FriendRequests 
        friendRequests={friendRequests}
        setFriendRequests={setFriendRequests}/>
      )
    } else 
      return (
        <FriendsList 
          clickedOutside={clickedOutside} 
          setClickedOutside={setClickedOutside} 
          onOpenChat={onOpenChat}
          setNavChatBoxButton={setNavChatBoxButton}/>
      )
  } 

  //handles if the friend list tab is selected like isSearchUsersTab and isFriendsRequestsTab execpt I did not use useState for friendsListTab
  const handleFriendsListTab = () => {
    if(!isFriendRequestsTab && !isSearchUsersTab) {
      return 'button-active'
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
        <div id='tab-buttons-parent'>
          <button
            className={`tab-buttons ${handleFriendsListTab()}`}
            onClick={() => {
              setIsSearchUsersTab(false)
              setIsFriendRequestsTab(false)}}>
                Friends 
          </button>

          <button
            className={`tab-buttons ${isSearchUsersTab ? 'button-active' : null}`}
            onClick={() => {
              setIsSearchUsersTab(true)
              setIsFriendRequestsTab(false)}}>
                Search Users
          </button>

          <button
            className={`tab-buttons ${isFriendRequestsTab ? 'button-active' : null}`}
            onClick={() => {
              setIsSearchUsersTab(false)
              setIsFriendRequestsTab(true)}}>
                Friend Requests 
          </button>

        </div>

        {setCurrentTabVeiw()}
    
    </div>
  )
}

export default frontPage;