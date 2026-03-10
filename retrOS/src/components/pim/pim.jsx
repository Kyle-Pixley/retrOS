import React, { useState, useRef, useEffect } from 'react';
import PimImage from '../../assets/pim-icon.png';
import PimDashboard from './pimDashboard/pimDashboard';
import './pim.css';

function Pim({ setPimComponent, setNavPimButton, pimPosition, setPimPosition, pimZIndex, setPimZIndex, componentsZIndexArray, onOpenChat, setNavChatBoxButton, bringToFront, mobile }) {

    const [ move, setMove ] = useState(false);
    const [ offSet, setOffSet ] = useState({x: 0, y: 0 });
    const topBar = useRef(null);
    const [ pimComponentMaximized, setPimComponentMaximized ] = useState(false);
    // this is just to true if the window is over a certain amount of pixels otherwise it is false for styling purposes 
    const [ isWindowWide, setIsWindowWide ] = useState(false);
    const [ clickedOutside, setClickedOutside ] = useState(false);

    const mouseStart = e => {

        if (e.target.closest?.("button")) return;

        const isTopBarClicked = topBar.current && topBar.current.contains(e.target);

        if (!isTopBarClicked) return;

        e.preventDefault();

        e.currentTarget.setPointerCapture?.(e.pointerId);
    
        setMove(true);
        setOffSet({
            x: e.clientX - pimPosition.x,
            y: e.clientY - pimPosition.y
        })
    };

    const mouseMove = e => {
        if (!move) 
        return 
        setPimPosition({
            x: e.clientX -offSet.x,
            y: e.clientY - offSet.y
        })
    }

    const stopMove = () => {
        setMove(false)
    };

    useEffect(() => {
        isWindowWide ? null : setPimComponentMaximized(true);
    }, [])

// Changes the height in divStyle depending on if the screen is mobile sized or not because the height of the nav bar is bigger on mobile 
    const marginForNavBarHeight = () => {
        if(mobile) {
            return 'calc(100% - 78px)'
        } else return 'calc(100% -40px)'
    }


    const divStyle = {
        left: pimComponentMaximized ? 0 : pimPosition.x ,
        top: pimComponentMaximized ? 0 : pimPosition.y,
        width: pimComponentMaximized ? '100%' : '350px',
        minWidth: '350px',
        minHeight: '550px',
        height: pimComponentMaximized ? marginForNavBarHeight() : '50vw',
        zIndex: pimZIndex,
    }

    const handleXButton = e => {
        e.stopPropagation();
        setPimComponent(false);
        setNavPimButton(false);
        setPimPosition({ x: 170, y: 100 });
    }

    const handleMaximizeButton = e => {
        e.stopPropagation();
        setPimComponentMaximized(!pimComponentMaximized);
    }

    const handleMinimizeButton = e => {
        e.stopPropagation();
        setPimComponent(false);
    }

    //changes z-index of component based on array of z-indexes of all "windowed"(like calculator/myComputer) z-indexes that are set to an array
    const handlePimZIndex = () => {
        setPimZIndex(Math.max(...componentsZIndexArray) + 1);
        setClickedOutside(true);
    }



  return (
    <div id='pim-outside-border'
        style={divStyle}
        onPointerDown={mouseStart}
        onPointerMove={mouseMove}
        onPointerUp={stopMove}
        onPointerCancel={stopMove}
        onClick={bringToFront}>
        
        <div id='pim-parent'>
            <div id='top-bar' ref={topBar}>
                <div id='image-text-parent'>

                    <img src={PimImage} id='pim-top-bar-image'/>

                    <p id='pim-top-bar-text'>Pixley Instant Messenger</p>
                </div>
                <div id='top-bar-button-parent'>
                    <button className='top-bar-button'
                            onPointerUp={handleMinimizeButton}>_</button>

                    <button id='pim-maximize-button' className='top-bar-button' onPointerUp={handleMaximizeButton}>
                        <div id='fullscreen-button-square'></div>
                    </button>

                    <button className='top-bar-button'
                            onPointerUp={handleXButton}
                            >X</button>
                </div>
            </div>
                < PimDashboard 
                    clickedOutside={clickedOutside}
                    setClickedOutside={setClickedOutside}
                    onOpenChat={onOpenChat}
                    setNavChatBoxButton={setNavChatBoxButton}/>
        </div>
    </div>
  )
}

export default Pim;