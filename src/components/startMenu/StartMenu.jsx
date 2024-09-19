import React, { useState } from 'react';
import CalculatorImage from '../../assets/calculator.webp';
import Calculator from '../calculator/Calculator.jsx';
import './StartMenu.css';

// todo maybe redesign the layout so when start menu is closed it does'nt close the windows also 

function StartMenu() {

    const [ calculatorComponent, setCalculatorComponent] = useState(false);

    const displayCalculatorComponent = () => {
        setCalculatorComponent(!calculatorComponent)
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
    
    {calculatorComponent && <Calculator /> }

    </div>
    </>
  )
}

export default StartMenu;