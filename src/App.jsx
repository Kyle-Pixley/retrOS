import React, { useState, useRef, useEffect } from 'react';
import ComputerIcon from './assets/my-computer-icon.png';
import Nav from './components/nav/Nav.jsx';
import Calculator from './components/calculator/Calculator.jsx';
import MyComputer from './components/myComputer/MyComputer.jsx';
import './App.css';

function App() {

  const [ calculatorComponent, setCalculatorComponent] = useState(false);
  const [ navCalculatorButton, setNavCalculatorButton ] = useState(false);
  const [ calculatorPosition, setCalculatorPosition ] = useState({x: 100, y: 100});
  const [ calculatorInput, setCalculatorInput ] = useState('');
  const [ calculatorResult, setCalculatorResult ] = useState('');
  const [ calculatorZIndex, setCalculatorZIndex ] = useState(0);

    const [ myComputerComponent, setMyComputerComponent ] = useState(false);
    const [ navMyComputerButton, setNavMyComputerButton ] = useState(false);
    const [ myComputerPosition, setMyComputerPosition ] = useState({ x: 150, y:150 });
    const [ myComputerZIndex, setMyComputerZIndex ] = useState(0);

  const [ componentsZIndexArray, setComponentsZIndexArray ] = useState([ calculatorZIndex, myComputerZIndex ]);

  const [ startMenu, setStartMenu ] = useState(false);
  const navStartButtonRef = useRef(null);

  //todo change dependencies when adding new window component
  useEffect(() => {
    setComponentsZIndexArray([ calculatorZIndex, myComputerZIndex ])
  },[myComputerZIndex, calculatorZIndex])

  useEffect(() => {
    const handleClickOutsideStartButton = (e) => {
      if (navStartButtonRef.current && !navStartButtonRef.current.contains(e.target)) {
        setStartMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutsideStartButton);

    return () => {document.removeEventListener('click', handleClickOutsideStartButton)};
  }, []);

  const handleMyComputerShortcutClick = () => {
    setMyComputerComponent(true);
    setNavMyComputerButton(true);
  }

  return (
    <div>
      <div id='my-computer-shortcut-parent'>
        <img id='my-computer-shortcut-icon' src={ComputerIcon}
        onDoubleClick={() => handleMyComputerShortcutClick()}
        />
        <p id='my-computer-shortcut-text'>My Computer</p>
      </div>

      <Nav 
        calculatorComponent={calculatorComponent} 
        setCalculatorComponent={setCalculatorComponent}
        navCalculatorButton={navCalculatorButton}
        setNavCalculatorButton={setNavCalculatorButton}
        myComputerComponent={myComputerComponent}
        setMyComputerComponent={setMyComputerComponent}
        navMyComputerButton={navMyComputerButton}
        setNavMyComputerButton={setNavMyComputerButton}
        startMenu={startMenu}
        setStartMenu={setStartMenu}
        navStartButtonRef={navStartButtonRef}

        calculatorZIndex={calculatorZIndex}
        setCalculatorZIndex={setCalculatorZIndex}
        componentsZIndexArray={componentsZIndexArray}
        setComponentsZIndexArray={setComponentsZIndexArray}
        setMyComputerZIndex={setMyComputerZIndex}
        />

        {calculatorComponent && <Calculator setCalculatorComponent={setCalculatorComponent} setNavCalculatorButton={setNavCalculatorButton} 
        calculatorPosition={calculatorPosition}
        setCalculatorPosition={setCalculatorPosition}
        calculatorInput={calculatorInput}
        setCalculatorInput={setCalculatorInput}
        calculatorResult={calculatorResult}
        setCalculatorResult={setCalculatorResult}
        calculatorZIndex={calculatorZIndex}
        setCalculatorZIndex={setCalculatorZIndex}
        componentsZIndexArray={componentsZIndexArray}
        setComponentsZIndexArray={setComponentsZIndexArray}
        /> }

        {myComputerComponent && <MyComputer 
        setMyComputerComponent={setMyComputerComponent}
        setNavMyComputerButton={setNavMyComputerButton} 
        myComputerPosition={myComputerPosition}
        setMyComputerPosition={setMyComputerPosition}
        myComputerZIndex={myComputerZIndex}
        setMyComputerZIndex={setMyComputerZIndex}
        componentsZIndexArray={componentsZIndexArray}
        setComponentsZIndexArray={setComponentsZIndexArray}
        />}

    </div>
  )
}

export default App;