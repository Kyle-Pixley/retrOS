import React, { useState, useRef } from 'react';
import MyComputerImage from '../../assets/my-computer-icon.png';
import MyComputerFiles from './myComputerFiles/MyComputerFiles';
import './MyComputer.css';

function MyComputer({ setMyComputerComponent, setNavMyComputerButton, myComputerPosition, setMyComputerPosition}) {

    const [ move, setMove ] = useState(false);
    const [ offSet, setOffSet ] = useState({x: 0, y: 0 });
    const topBar = useRef(null);
    const [ myComputerComponentMaximized, setMyComputerComponentMaximized ] = useState(false);
    

    const mouseStart = e => {
        const isTopBarClicked = topBar.current && topBar.current.contains(e.target)
        if(isTopBarClicked) {
        setMove(true);
        setOffSet({
            x: e.clientX - myComputerPosition.x,
            y: e.clientY - myComputerPosition.y
        })
        }
    };

    const mouseMove = e => {
        if (!move) 
        return 
        setMyComputerPosition({
            x: e.clientX -offSet.x,
            y: e.clientY - offSet.y
        })
    }

    const stopMove = () => {
        setMove(false)
    };

    const divStyle = {
        left: myComputerComponentMaximized ? 0 : myComputerPosition.x ,
        top: myComputerComponentMaximized ? 0 : myComputerPosition.y,
        width: myComputerComponentMaximized ? '100%' : '35vw',
        height: myComputerComponentMaximized ? 'calc(100% - 40px)' : '25vw',
    }

    const handleXButton = () => {
        setMyComputerComponent(false);
        setNavMyComputerButton(false);
        setMyComputerPosition({ x: 100, y:100 });
    }

    const handleMaximizeButton = () => {
        setMyComputerComponentMaximized(!myComputerComponentMaximized);
    }

    const handleMinimizeButton = () => {
        setMyComputerComponent(false);
    }

  return (
    <div id='my-computer-outside-border'
        style={divStyle}
        onMouseDown={mouseStart}
        onMouseMove={mouseMove}
        onMouseUp={stopMove}>
        
        <div id='my-computer-parent'>
            <div id='top-bar' ref={topBar}>
                <div id='image-text-parent'>

                    <img src={MyComputerImage} id='my-computer-top-bar-image'/>

                    <p id='my-computer-top-bar-text'>My Computer</p>
                </div>
                <div id='top-bar-button-parent'>
                    <button className='top-bar-button'
                            onClick={handleMinimizeButton}>_</button>

                    <button id='my-computer-maximize-button' className='top-bar-button' onClick={() => handleMaximizeButton()}>
                        <div id='fullscreen-button-square'></div>
                    </button>

                    <button className='top-bar-button'
                            onClick={handleXButton}
                            >X</button>
                </div>
            </div>
            <MyComputerFiles />
        </div>
    </div>
  )
}

export default MyComputer