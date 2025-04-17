import React, { useState } from 'react';
import './CalculatorLogic.css';

function CalculatorLogic({ calculatorInput, setCalculatorInput, calculatorResult, setCalculatorResult}) {

    const handleCalculatorButtonClick = (value) => {
        if ( value === '=') {
            setCalculatorResult(eval(calculatorInput));
        } else {
            setCalculatorInput(calculatorInput + value);
        }
    };
    const handleCalculatorCButton = () => {
        setCalculatorInput('');
        setCalculatorResult('');
    }

  return (
    <div id='calculator-logic-container'>
        <div id='calculator-screen'>
            <div id='calculator-input' className='calculator-input-result'>{calculatorInput}</div>
            <div id='calculator-result' className='calculator-input-result'>{calculatorResult}</div>
        </div>

        <div id='calculator-logic-buttons-container'>

            <button id='calculator-c-button' className='calculator-buttons' onClick={() =>handleCalculatorCButton()}>C</button>
            <div id='calculator-buttons-parent'>
                {[ '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((i) => ( 
                    <button className='calculator-buttons' key={i} onClick={() => handleCalculatorButtonClick(i)}>
                        {i}
                    </button>
                ))}
            </div>
        </div>
    </div>
  )
}

export default CalculatorLogic;