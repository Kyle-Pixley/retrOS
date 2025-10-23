import React, { useEffect, useState } from 'react';
import './PimMessage.css';

function PimMessage({ friend }) {

    const [ messageList, setMessageList ] = useState(['hello', 'how are you', 'cheese'])

    useEffect(() => {
        console.log(messageList)
    },[])


  return (
    <div id='pim-message-component'>
        <section id='messages'>
            {messageList.map((mes, i) => {
                    return <p key={i}>{mes}</p>
            })}
        </section>


    </div>
  )
}

export default PimMessage;