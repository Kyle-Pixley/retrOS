import React, { useEffect, useState } from 'react';
import "./Nav.css";
import StartMenu from '../startMenu/StartMenu.jsx';

function Nav({ calculatorComponent, setCalculatorComponent }) {

    const [ currentTime, setCurrentTime ] = useState('')
    const [ startMenu, setStartMenu ] = useState(false)

    // gets the time
    useEffect(() => {
        const interval = setInterval(() => {
            const timeString = new Date().toLocaleString('en-IN').split(' ')[1];
            setCurrentTime(timeString)
        }, 1000)
        return () => clearInterval(interval)
    },[])
   
    const displayStartMenu = () => {
        setStartMenu(!startMenu)
    }


  return (
    <>
    <div id='navbar'>
        <div id='navbar-button-parent'>

            <div id='start-button-outer-border'>
                <button id='start-button' onClick={displayStartMenu}>
                    <p id='start'>Start</p>
                </button>
            </div>
            { calculatorComponent ? <button>hello</button> : null}

        </div>
                {startMenu && <StartMenu calculatorComponent={calculatorComponent} setCalculatorComponent={setCalculatorComponent} setStartMenu={setStartMenu} />}


        <div id='time-parent'>
            <div id='time'><p id='current-time'>{ currentTime }</p></div>
        </div>

    </div>
    </>
  )
}

export default Nav;