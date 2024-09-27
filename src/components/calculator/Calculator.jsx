import React, { useState, useRef } from 'react';
import CalculatorLogic from './calculatorLogic/CalculatorLogic';
import CalculatorImage from '../../assets/calculator.png';
import './Calculator.css';

function calculator({ setCalculatorComponent, setNavCalculatorButton, calculatorPosition, setCalculatorPosition, calculatorInput, setCalculatorInput, calculatorResult, setCalculatorResult, calculatorZIndex, setCalculatorZIndex, componentsZIndexArray, setComponentsZIndexArray }) {


    const [ move, setMove ] = useState(false);
    const [ offSet, setOffSet ] = useState({x: 0, y: 0 });
    const topBar = useRef(null);
    const [ calculatorComponentMaximized, setCalculatorComponentMaximized ] = useState(false);
    

    const mouseStart = e => {
        const isTopBarClicked = topBar.current && topBar.current.contains(e.target)
        if(isTopBarClicked) {
        setMove(true);
        setOffSet({
            x: e.clientX - calculatorPosition.x,
            y: e.clientY - calculatorPosition.y
        })
        }
    };

    const mouseMove = e => {
        if (!move) 
        return 
        setCalculatorPosition({
            x: e.clientX -offSet.x,
            y: e.clientY - offSet.y
        })
    }

    const stopMove = () => {
        setMove(false)
    };

    const divStyle = {
        left: calculatorComponentMaximized ? 0 : calculatorPosition.x ,
        top: calculatorComponentMaximized ? 0 : calculatorPosition.y,
        width: calculatorComponentMaximized ? '100%' : '25vw',
        height: calculatorComponentMaximized ? 'calc(100% - 40px)' : '30vw',
        zIndex: calculatorZIndex,
    }

    const handleXButton = () => {
        setCalculatorComponent(false);
        setNavCalculatorButton(false);
        setCalculatorPosition({ x: 100, y: 100 });
        setCalculatorInput('');
        setCalculatorResult('');
    }

    const handleMaximizeButton = () => {
        setCalculatorComponentMaximized(!calculatorComponentMaximized);
    }

    const handleMinimizeButton = () => {
        setCalculatorComponent(false);
    }

    const handleCalculatorZIndex = () => {
        setCalculatorZIndex(Math.max(...componentsZIndexArray) + 1);
    }

    return (

    <div id='outside-border'
        style={divStyle}
        onMouseDown={mouseStart}
        onMouseMove={mouseMove}
        onMouseUp={stopMove}
        onClick={() => handleCalculatorZIndex()}>
        
        <div id='calculator-parent'>
            <div id='top-bar' ref={topBar}>
                <div id='image-text-parent'>

                    <img src={CalculatorImage} id='calculator-top-bar-image'/>

                    <p id='calculator-top-bar-text'>Calculator</p>
                </div>
                <div id='top-bar-button-parent'>
                    <button className='top-bar-button'
                            onClick={handleMinimizeButton}>_</button>

                    <button id='calculator-maximize-button' className='top-bar-button' onClick={() => handleMaximizeButton()} disabled>
                        <div id='calculator-fullscreen-button-square'></div>
                    </button>

                    <button className='top-bar-button'
                            onClick={handleXButton}
                            >X</button>
                </div>

            </div>

            <CalculatorLogic 
            calculatorInput={calculatorInput}
            setCalculatorInput={setCalculatorInput}
            calculatorResult={calculatorResult}
            setCalculatorResult={setCalculatorResult}/>

        </div>
    </div>
  )
}

export default calculator;