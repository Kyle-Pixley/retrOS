import React, { useState, useRef } from 'react';
import CalculatorLogic from './calculatorLogic/CalculatorLogic';
import CalculatorImage from '../../assets/calculator.png';
import './Calculator.css';

function calculator({ setCalculatorComponent, setNavCalculatorButton }) {

    const [ position, setPosition ] = useState({x: 100, y: 100 });
    const [ move, setMove ] = useState(false);
    const [ offSet, setOffSet ] = useState({x: 0, y: 0 });
    const topBar = useRef(null);
    const [ calculatorComponentMaximized, setCalculatorComponentMaximized ] = useState(false);
    

    const mouseStart = e => {
        const isTopBarClicked = topBar.current && topBar.current.contains(e.target)
        if(isTopBarClicked) {
        setMove(true);
        setOffSet({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        })
        // updateMaxZIndex(zIndex + 1)
        // setZIndex((prevZIndex) => prevZIndex + 1);
        }
    };

    const mouseMove = e => {
        if (!move) 
        return 
        setPosition({
            x: e.clientX -offSet.x,
            y: e.clientY - offSet.y
        })
    }

    const stopMove = () => {
        setMove(false)
    };

    const divStyle = {
        left: calculatorComponentMaximized ? 0 : position.x ,
        top: calculatorComponentMaximized ? 0 : position.y,
        width: calculatorComponentMaximized ? '100%' : '25vw',
        height: calculatorComponentMaximized ? 'calc(100% - 40px)' : '30vw',
    }

    const handleXButton = () => {
        setCalculatorComponent(false);
        setNavCalculatorButton(false);
    }

    const handleMaximizeButton = () => {
        setCalculatorComponentMaximized(!calculatorComponentMaximized);
    }

    const handleMinimizeButton = () => {
        setCalculatorComponent(false);
    }

    return (

    <div id='outside-border'
        style={divStyle}
        onMouseDown={mouseStart}
        onMouseMove={mouseMove}
        onMouseUp={stopMove}>
        
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
                        <div id='fullscreen-button-square'></div>
                    </button>

                    <button className='top-bar-button'
                            onClick={handleXButton}
                            >X</button>
                </div>

            </div>

            <CalculatorLogic />

        </div>
    </div>
  )
}

export default calculator;