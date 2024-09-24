import React, { useState } from 'react';
import './CalculatorLogic.css';

function CalculatorLogic() {

    const [ calculatorInput, setCalculatorInput ] = useState('');
    const [ calculatorResult, setCalculatorResult ] = useState('');

    const handleCalculatorButtonClick = (value) => {
        if ( value === '=') {
            setCalculatorResult(eval(calculatorInput));
        } else if (value === 'C') {
            setCalculatorInput('');
            setCalculatorResult('');
        } else {
            setCalculatorInput(calculatorInput + value);
        }
    };

  return (
    <div id='calculator-logic-container'>
        <div id='calculator-screen'>
            <div id='calculator-input' className='calculator-input-result'>{calculatorInput}</div>
            <div id='calculator-result' className='calculator-input-result'>{calculatorResult}</div>
        </div>

        <div id='calculator-buttons'>
            {[ '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'].map((i) => ( 
                <button key={i} onClick={() => handleCalculatorButtonClick(i)}>
                    {i}
                </button>
            ))}
        </div>
    </div>
  )
}

export default CalculatorLogic