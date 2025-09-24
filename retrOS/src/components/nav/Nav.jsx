import React, { useEffect, useState } from 'react';
import CalculatorImage from '../../assets/calculator.png';
import MyComputerImage from '../../assets/my-computer-icon.png';
import CinepixImage from '../../assets/cinepix-icon.png';
import PimImage from '../../assets/pim-icon.png';
import "./Nav.css";
import StartMenu from '../startMenu/StartMenu.jsx';
import Pim from '../pim/pim.jsx';

function Nav({ calculatorComponent, setCalculatorComponent, startMenu, setStartMenu, navStartButtonRef, navCalculatorButton, setNavCalculatorButton, myComputerComponent, setMyComputerComponent, navMyComputerButton, setNavMyComputerButton, calculatorZIndex, setCalculatorZIndex, componentsZIndexArray, setComponentsZIndexArray, setMyComputerZIndex,
cinepixComponent, setCinepixComponent, navCinepixButton, setNavCinepixButton, cinepixZIndex, setCinepixZIndex, pimComponent, setPimComponent, navPimButton, setNavPimButton, pimZIndex, setPimZIndex, friendChatBox, setFriendChatBox, navChatBoxButton, setNavChatBoxButton, chatBoxZIndex, setChatBoxZIndex
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
        setPimZIndex(Math.max(...componentsZIndexArray) + 1);
    }
    const handleNavChatBoxButton = () => {
        setFriendChatBox(!friendChatBox)
        setChatBoxZIndex(Math.max(...componentsZIndexArray) + 1);
    }


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
                                <img id='calculator-nav-image' src={CalculatorImage}/>
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
                            src={PimImage}/>
                            <p className='nav-button-texts'>PIM</p>
                        </button>
                    </div>) : null }
            { navChatBoxButton ? (
                <div className='button-outer-border'>
                    <button
                    onClick={handleNavChatBoxButton}
                    id='chat-box-nav-button'
                    className={`nav-buttons ${friendChatBox ? 'button-in' : 'button-out'}`}>
                        <img id='pim-nav-image'
                            src={PimImage}/>
                            <p className='nav-button-texts'>Friends Name</p>
                    </button>
                    </div>) : null }


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