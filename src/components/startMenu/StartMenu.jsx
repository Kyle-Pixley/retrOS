import React, { useState } from 'react';
import CalculatorImage from '../../assets/calculator.webp';
import Calculator from '../calculator/Calculator.jsx';
import './StartMenu.css';

// todo maybe redesign the layout so when start menu is closed it does'nt close the windows also 

function StartMenu({ calculatorComponent, setCalculatorComponent, setStartMenu }) {

    const displayCalculatorComponent = () => {
        setCalculatorComponent(!calculatorComponent)
        setStartMenu(false);
    };

  return (
    <>
    <div id='start-menu'>

        <div id='start-name'>
            <p id='start-name-text'>Kyle Pixley</p>
        </div>

    <div id='start-options'>

        <div 
            id='calculator' 
            className='start-li'
            onClick={displayCalculatorComponent}>
                <img 
                    id='calculator-image'
                    src={CalculatorImage}/>
                <p id='calculator-start-text'>Calculator</p>
            </div>
    </div>
    

    </div>
    </>
  )
}

export default StartMenu;