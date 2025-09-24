import React, { useState, useRef } from 'react';
import './PimChatBox.css';

function PimChatBox({ friendChatBox, setFriendChatBox, setNavChatBoxButton, chatBoxPosition, setChatBoxPosition, chatBoxZIndex, setChatBoxZIndex, componentsZIndexArray }) {

    const [ move, setMove ] = useState(false);
    const [ offSet, setOffSet ] = useState({x: 0, y: 0 });
    const topBar = useRef(null);
    const [ chatBoxComponentMaximized, setChatBoxComponentMaximized ] = useState(false);
    

    const mouseStart = e => {
        const isTopBarClicked = topBar.current && topBar.current.contains(e.target)
        if(isTopBarClicked) {
        setMove(true);
        setOffSet({
            x: e.clientX - chatBoxPosition.x,
            y: e.clientY - chatBoxPosition.y
        })
        }
    };

    const mouseMove = e => {
        if (!move) 
        return 
        setChatBoxPosition({
            x: e.clientX -offSet.x,
            y: e.clientY - offSet.y
        })
    }

    const stopMove = () => {
        setMove(false)
    };

    const divStyle = {
        left: chatBoxComponentMaximized ? 0 : chatBoxPosition.x ,
        top: chatBoxComponentMaximized ? 0 : chatBoxPosition.y,
        width: chatBoxComponentMaximized ? '100%' : '35vw',
        height: chatBoxComponentMaximized ? 'calc(100% - 40px)' : '25vw',
        zIndex: chatBoxZIndex,
    }

    const handleXButton = () => {
        setFriendChatBox(false);
        setNavChatBoxButton(false);
        setChatBoxPosition({ x: 100, y:100 });
    }

    const handleMaximizeButton = () => {
        setChatBoxComponentMaximized(!chatBoxComponentMaximized);
    }

    const handleMinimizeButton = () => {
        setFriendChatBox(false);
    }

    //changes z-index of component based on array of z-indexes of all "windowed"(like calculator/myComputer) z-indexes that are set to an array
    const handleChatBoxZIndex = () => {
        setChatBoxZIndex(Math.max(...componentsZIndexArray) + 1)
    }

  return (
    <div id='chat-box-outside-border'
        style={divStyle}
        onMouseDown={mouseStart}
        onMouseMove={mouseMove}
        onMouseUp={stopMove}
        onClick={() => handleChatBoxZIndex()}>
        
        <div id='chat-box-parent'>
            <div id='top-bar' ref={topBar}>
                <div id='image-text-parent'>

                    {/* <img src={ChatBoxImage} id='chat-box-top-bar-image'/> */}

                    <p id='chat-box-top-bar-text'>Friends Name</p>
                </div>
                <div id='top-bar-button-parent'>
                    <button className='top-bar-button'
                            onClick={handleMinimizeButton}>_</button>

                    <button id='chat-box-maximize-button' className='top-bar-button' onClick={() => handleMaximizeButton()}>
                        <div id='fullscreen-button-square'></div>
                    </button>

                    <button className='top-bar-button'
                            onClick={handleXButton}
                            >X</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PimChatBox;