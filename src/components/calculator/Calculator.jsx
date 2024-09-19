import React, { useState, useRef } from 'react';
import CalculatorImage from '../../assets/calculator.webp';
import './calculator.css';

function calculator() {

    const [ position, setPosition ] = useState({x: 100, y: 100 });
    const [ move, setMove ] = useState(false);
    const [ offSet, setOffSet ] = useState({x: 0, y: 0 });
    // const [ zIndex, setZIndex ] = useState(0);
    const topBar = useRef(null);

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
        left: position.x,
        top: position.y
    }

  return (

    <div id='outside-border'
        style={divStyle}
        onMouseDown={mouseStart}
        onMouseMove={mouseMove}
        onMouseUp={stopMove}>
        
        <div id='calculator-parent'>
            <div id='top-bar' ref={topBar}>
                <img src={CalculatorImage} id='calculator-image'/>
                <p id='calculator-window-text'></p>
            </div>
        </div>
    </div>
  )
}

export default calculator;