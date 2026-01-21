import React, { useEffect, useState } from 'react';
import CalculatorImage from '../../assets/calculator.png';
import MyComputerImage from '../../assets/my-computer-icon.png';
import CinepixImage from '../../assets/cinepix-icon.png';
import PimImage from '../../assets/pim-icon.png';
import "./Nav.css";
import StartMenu from '../startMenu/StartMenu.jsx';
import Pim from '../pim/pim.jsx';

function Nav({ calculatorComponent, setCalculatorComponent, startMenu, setStartMenu, navStartButtonRef, navCalculatorButton, setNavCalculatorButton, myComputerComponent, setMyComputerComponent, navMyComputerButton, setNavMyComputerButton, calculatorZIndex, setCalculatorZIndex, componentsZIndexArray, setComponentsZIndexArray, setMyComputerZIndex,
cinepixComponent, setCinepixComponent, navCinepixButton, setNavCinepixButton, cinepixZIndex, setCinepixZIndex, pimComponent, setPimComponent, navPimButton, setNavPimButton, pimZIndex, setPimZIndex, friendChatBox, setFriendChatBox, navChatBoxButton, setNavChatBoxButton, chatBoxZIndex, setChatBoxZIndex, openChats, setOpenChats, navBarChats, setNavBarChats, openChat, bringToFront, nextZ
 }) {

    const [ currentTime, setCurrentTime ] = useState('');

    // gets the time
    useEffect(() => {
        const interval = setInterval(() => {
            const timeString = new Date().toLocaleString('en-IN').split(' ')[1];
            setCurrentTime(timeString)
        }, 1000)
        return () => clearInterval(interval)
    },[])
   
    const displayStartMenu = e => {
        e.stopPropagation();
        setStartMenu(!startMenu)
    }

    const handleNavCalculatorButton = () => {
        setCalculatorComponent(!calculatorComponent)
        setCalculatorZIndex(Math.max(...componentsZIndexArray) + 1)
        console.log(componentsZIndexArray, ' here')
    }
    
    const handleNavMyComputerButton = () => {
        setMyComputerComponent(!myComputerComponent)
        setMyComputerZIndex(Math.max(...componentsZIndexArray) + 1)
    }

    const handleNavCinepixButton = () => {
        setCinepixComponent(!cinepixComponent);
        setCinepixZIndex(Math.max(...componentsZIndexArray) + 1);
    }
    const handleNavPimButton = () => {
        setPimComponent(!pimComponent);
        bringToFront();
    }

    const handleNavChatBoxButton = (chat) => {
        const id = chat?.friend?.id;

        setOpenChats(prev => {
            const window = prev[id];

            if(window) {
                return {
                    ...prev,
                    [id]:{
                        ...window,
                        minimized: !window.minimized,
                        zIndex: nextZ(),
                    },
                };
            }

            const count = Object.keys(prev).length;
            return {
                ...prev,
                [id]: {
                    friend: chat.friend,
                    position: { x: 100 + count * 30, y: 40 + count * 30},
                    zIndex: nextZ(),
                    minimized: false,
                    maximized: false,
                }
            }
        })
    };

  return (
    <>
    <div id='navbar'>
        <div id='navbar-button-parent'>

            <div className='button-outer-border'>
                <button 
                    className={`nav-buttons ${startMenu ? 'button-in' : 'button-out'}`} 
                    ref={navStartButtonRef} 
                    onClick={displayStartMenu}>
                        <p className='nav-button-texts'>Start</p>
                </button>
            </div>

            { navCalculatorButton ? (
                    <div className='button-outer-border'>
                        <button 
                            onClick={handleNavCalculatorButton}
                            id='calculator-nav-button' 
                            className={`nav-buttons ${calculatorComponent ? 'button-in' : 'button-out'}`}>
                                <img id='calculator-nav-image'
                                    className='nav-button-images'  
                                    src={CalculatorImage}/>
                                <p className='nav-button-texts'>Calculator</p>
                        </button> 
                    </div>) : null}

            { navMyComputerButton ? (
                <div className='button-outer-border'>
                    <button 
                        onClick={handleNavMyComputerButton}
                        id='my-computer-nav-button'
                        className={`nav-buttons ${myComputerComponent ? 'button-in' : 'button-out'}`}>
                            <img id='my-computer-nav-image'
                                className='nav-button-images' 
                                src={MyComputerImage}/>
                            <p className='nav-button-texts'>My Computer</p>
                        </button>
                        </div>) : null }

            { navCinepixButton ? (
                <div className='button-outer-border'>
                    <button
                        onClick={handleNavCinepixButton}
                        id='cinepix-nav-button'
                        className={`nav-buttons ${cinepixComponent ? 'button-in' : 'button-out'}`}>
                            <img id='cinepix-nav-image'
                                className='nav-button-images' 
                                src={CinepixImage}/>
                            <p className='nav-button-texts'>Cinepix</p>
                        </button>
                    </div>) : null }

            { navPimButton ? (
                <div className='button-outer-border'>
                    <button
                        onClick={handleNavPimButton}
                        id='pim-nav-button'
                        className={`nav-buttons ${pimComponent ? 'button-in' : 'button-out'}`}>
                            <img id='pim-nav-image'
                                className='nav-button-images' 
                                src={PimImage}/>
                            <p className='nav-button-texts'>PIM</p>
                        </button>
                    </div>) : null }

            {navBarChats.length > 0 &&
                navBarChats.map((chat, index) => {
                    const id = chat.friend?.id;
                    const win = openChats?.[id];
                    const isOpen = !!win && !win.minimized;

                    return (
                        <div 
                            className='button-outer-border'
                            key={chat.friend?.id ?? index}>
                                <button
                                    id='chat-box-nav-button'
                                    onClick={() => handleNavChatBoxButton(chat)}
                                    className={`nav-buttons ${isOpen ? "button-in" : 'button-out'}`}>
                                        <img id="pim-nav-image" 
                                            className='nav-button-images' 
                                            src={PimImage} />
                                        <p className='nav-button-texts'>
                                            {chat.friend?.username ?? chat.username ?? "Unknown"}
                                        </p>
                                </button>
                        </div>
                    )
                })}


        </div>
                {startMenu && <StartMenu calculatorComponent={calculatorComponent} setCalculatorComponent={setCalculatorComponent} setStartMenu={setStartMenu} navCalculatorButton={navCalculatorButton} setNavCalculatorButton={setNavCalculatorButton}/>}

        <div id='time-parent'>
            <div id='time'><p id='current-time'>{ currentTime }</p></div>
        </div>

    </div>
    </>
  )
}

export default Nav;