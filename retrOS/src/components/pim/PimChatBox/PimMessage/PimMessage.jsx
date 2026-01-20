import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './PimMessage.css';

function PimMessage({ friend }) {

    const [ messageList, setMessageList ] = useState([])
    const [ inputMessage, setInputMessage ] = useState('');
    const [ messageSentError, setMessageSentError ] = useState(''); 

    useEffect(() => {
        const getMessages = async () => {
            const token = localStorage.getItem("token");
            if(!token) {
                console.error("no token in local storage")
                localStorage.clear()
            }

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/get_messages/${friend.id}/`, {
                    method: "GET",
                    headers: {
                        "Authorization" : `Bearer ${token}`
                    },
                });
                const data = await response.json();
                if(!response.ok) {
                    console.error("error", data.error);
                    setMessageList([])
                    return
                }
            setMessageList(Array.isArray(data.Messages) ? data.Messages : ['No Messages'])

            } catch (err) {
                console.error("fetch error" ,err);
            }
        };

        getMessages();
    },[])

    //submits message aka inputmessage to the backend to save it in the database
    const submitMessage = async (e) => {
        e.preventDefault();
        setMessageSentError('');
        const receiver_id = friend.id
        if (inputMessage) {
            const token = localStorage.getItem('token');
            const url = 'http://127.0.0.1:8000/api/create_message/';
            const body = { 
                body: inputMessage,
                receiver_id
            }
            const options = {
                method: "POST", 
                headers: {"Authorization" : `Bearer ${token}`},
                body: JSON.stringify(body)
            }
            const response = await fetch(url,options);
            const data = await response.json();
            if(!response.ok) {
                console.error("error", data.error);
                setMessageSentError("Error Sending Message")
                return;
            } else console.log('message sent')
        } else console.log('Nothing in body')
    setInputMessage('');
    }

    const handleMessageChange = e => {
        setInputMessage(e.target.value)
    }

    // returns the color for the username in the messages box blue for you red for them
    const usernameColor = (username) => {
        const token = localStorage.getItem('token')
        const loggedInUser = jwtDecode(token).username
        if(loggedInUser === username) {
            return 'blue'
        } else return 'red'
    }


  return (
    <div id='pim-message-component'>
        <section id='messages'>

            {messageList.map((mes, i) => {
                    return (
                            <div id='message-parent' key={i}>
                                <p className={`${usernameColor(mes.sender_username)} message-username`}>
                                    {mes.sender_username}:
                                </p>
                                <p>{mes.body}</p>
                            </div>
                        )
            })}

        </section>
        <form id='message-form' onSubmit={message => submitMessage(message)}>
            <textarea
                name='message'
                type='text'
                value={inputMessage}
                onChange={handleMessageChange}>
            </textarea>
            <button 
                type='submit'>
                    Send
            </button>
        </form>

    </div>
  )
}

export default PimMessage;