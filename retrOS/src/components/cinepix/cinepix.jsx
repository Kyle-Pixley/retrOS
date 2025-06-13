import React, { useState, useRef } from 'react';
import CinepixIcon from '../../assets/cinepix-icon.png';
import './cinepix.css';

function MyComputer({ setCinepixComponent, setNavCinepixButton, cinepixPosition, setCinepixPosition, cinepixZIndex, setCinepixZIndex, componentsZIndexArray, setComponentZIndexArray }) {

    const [ move, setMove ] = useState(false);
    const [ offSet, setOffSet ] = useState({x: 0, y: 0 });
    const topBar = useRef(null);
    const [ cinepixComponentMaximized, setCinepixComponentMaximized ] = useState(false);
    

    const mouseStart = e => {
        const isTopBarClicked = topBar.current && topBar.current.contains(e.target)
        if(isTopBarClicked) {
        setMove(true);
        setOffSet({
            x: e.clientX - cinepixPosition.x,
            y: e.clientY - cinepixPosition.y
        })
        }
    };

    const mouseMove = e => {
        if (!move) 
        return 
        setCinepixPosition({
            x: e.clientX -offSet.x,
            y: e.clientY - offSet.y
        })
    }

    const stopMove = () => {
        setMove(false)
    };

    const divStyle = {
        left: cinepixComponentMaximized ? 0 : cinepixPosition.x ,
        top: cinepixComponentMaximized ? 0 : cinepixPosition.y,
        width: cinepixComponentMaximized ? '100%' : '35vw',
        height: cinepixComponentMaximized ? 'calc(100% - 40px)' : '25vw',
        zIndex: cinepixZIndex,
    }

    const handleXButton = () => {
        setCinepixComponent(false);
        setNavCinepixButton(false);
        setCinepixPosition({ x: 100, y:100 });
    }

    const handleMaximizeButton = () => {
        setCinepixComponentMaximized(!cinepixComponentMaximized);
    }

    const handleMinimizeButton = () => {
        setCinepixComponent(false);
    }

    //changes z-index of component based on array of z-indexes of all "windowed"(like calculator/myComputer) z-indexes that are set to an array
    const handleCinepixZIndex = () => {
        setCinepixZIndex(Math.max(...componentsZIndexArray) + 1)
    }

  return (
    <div id='my-computer-outside-border'
        style={divStyle}
        onMouseDown={mouseStart}
        onMouseMove={mouseMove}
        onMouseUp={stopMove}
        onClick={() => handleCinepixZIndex()}>
        
        <div id='my-computer-parent'>
            <div id='top-bar' ref={topBar}>
                <div id='image-text-parent'>

                    <img src={CinepixIcon} id='my-computer-top-bar-image'/>

                    <p id='my-computer-top-bar-text'>Cinepix</p>
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
            {/* insides will go here */}
        </div>
    </div>
  )
}

export default MyComputer;