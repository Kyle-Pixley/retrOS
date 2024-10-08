import React, { useEffect, useState } from 'react';
import CalculatorImage from '../../assets/calculator.png';
import "./Nav.css";
import StartMenu from '../startMenu/StartMenu.jsx';

function Nav({ calculatorComponent, setCalculatorComponent, startMenu, setStartMenu, navStartButtonRef, navCalculatorButton, setNavCalculatorButton }) {

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

            { navCalculatorButton ? 
                (
                    <div className='button-outer-border'>
                        <button 
                            onClick={handleNavCalculatorButton}
                            id='calculator-nav-button' 
                            className={`nav-buttons ${calculatorComponent ? 'button-in' : 'button-out'}`}>
                                <img id='calculator-nav-image' src={CalculatorImage}/>
                                <p className='nav-button-texts'>Calculator</p>
                        </button> 
                    </div>) : null
                }

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