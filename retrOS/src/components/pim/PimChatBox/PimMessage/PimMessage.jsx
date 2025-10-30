import React, { useEffect, useState } from 'react';
import './PimMessage.css';

function PimMessage({ friend }) {

    const [ messageList, setMessageList ] = useState(['hello', 'how are you', 'cheese'])
    const [ inputMessage, setInputMessage ] = useState('');

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

    const handleMessageChange = e => {
        setInputMessage(e.target.value)
    }

    const submitMessage = e => {
        e.preventDefault()
        console.log('send message: ', inputMessage)
        setInputMessage('')
    }


  return (
    <div id='pim-message-component'>
        <section id='messages'>

            {messageList.map((mes, i) => {
                    return (
                            <div id='message-parent' key={i}>
                                <p>{mes.body}</p>
                                <p>{mes.sender_id_id}</p>
                            </div>
                        )
            })}

        </section>
        <form id='message-form'>
            <input 
                name='message'
                type='text'
                value={inputMessage}
                onChange={handleMessageChange}>
            </input>
            <button 
                type='submit' 
                onSubmit={message => submitMessage(message)}>
                    Send
            </button>
        </form>

    </div>
  )
}

export default PimMessage;