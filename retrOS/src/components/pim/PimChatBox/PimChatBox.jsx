import React, { useState, useRef, useEffect } from 'react';
import PimImage from '../../../assets/pim-icon.png';
import PimMessage from './PimMessage/PimMessage';
import './PimChatBox.css';

function PimChatBox({ 
    friend,
    position,
    setPosition,
    zIndex,
    bringToFront,
    maximized,
    setMaximized,
    onClose,
    onMinimize,
 }) {

    useEffect(() => {
        console.log('here', friend.id)
    }, [])

    const topBar = useRef(null);
    const dragRef = useRef({ moving: false, offsetX: 0, offsetY: 0 });

    const handleMouseDown = e => {
        if(e.target.closest('.top-bar-button')) return; 

        const onTopBar = topBar.current && topBar.current.contains(e.target);
        if (!onTopBar) return;

        console.log('handle mouse down')

        bringToFront(friend.id);
        
        dragRef.current.moving = true;
        dragRef.current.offsetX = e.clientX - position.x;
        dragRef.current.offsetY = e.clientY - position.y;
    };

    const handleMouseMove = e => {
        if (!dragRef.current.moving) return;
        setPosition(friend.id, {
            x: e.clientX - (dragRef.current.offsetX ),
            y: e.clientY - (dragRef.current.offsetY ),
        })
    };

    const handleMouseUp = () => {
        dragRef.current.moving = false;
    };
    

    const divStyle = {
        position: 'absolute',
        left: maximized ? 0 : position.x ,
        top: maximized ? 0 : position.y,
        width: maximized ? '100%' : '35vw',
        height: maximized ? 'calc(100% - 40px)' : '25vw',
        zIndex,
    };

  return (
    <div id='chat-box-outside-border'
        style={divStyle}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={() => bringToFront(friend.id)}>
        
        <div id='chat-box-parent'>
            <div id='top-bar' ref={topBar}>
                <div id='image-text-parent'>

                    <img src={PimImage} id='chat-box-top-bar-image'/>

                    <p id='chat-box-top-bar-text'>{friend.username}</p>
                </div>

                <div id='top-bar-button-parent'>
                    <button className='top-bar-button'
                            onClick={e => {
                                e.stopPropagation();
                                onMinimize(friend.id)
                                }}>_</button>

                    <button id='chat-box-maximize-button' className='top-bar-button'
                     onClick={e => {
                            e.stopPropagation();
                            setMaximized(friend.id, !maximized)}}>
                        <div id='fullscreen-button-square'></div>
                    </button>

                    <button className='top-bar-button'
                            onClick={e => 
                                    {e.stopPropagation();
                                    onClose(friend.id)}}
                            >X</button>
                </div>
            </div>
            <PimMessage friend={friend}/>
        </div>
    </div>
  )
}

export default PimChatBox;