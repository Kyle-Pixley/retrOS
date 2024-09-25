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

    const [ myComputerComponent, setMyComputerComponent ] = useState(false);
    const [ navMyComputerButton, setNavMyComputerButton ] = useState(false);
    const [ myComputerPosition, setMyComputerPosition ] = useState({ x: 150, y:150 });

  const [ startMenu, setStartMenu ] = useState(false);
  const navStartButtonRef = useRef(null);

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
        />

        {calculatorComponent && <Calculator setCalculatorComponent={setCalculatorComponent} setNavCalculatorButton={setNavCalculatorButton} 
        calculatorPosition={calculatorPosition}
        setCalculatorPosition={setCalculatorPosition}
        calculatorInput={calculatorInput}
        setCalculatorInput={setCalculatorInput}
        calculatorResult={calculatorResult}
        setCalculatorResult={setCalculatorResult}/> }

        {myComputerComponent && <MyComputer 
        setMyComputerComponent={setMyComputerComponent}
        setNavMyComputerButton={setNavMyComputerButton} 
        myComputerPosition={myComputerPosition}
        setMyComputerPosition={setMyComputerPosition}/>}

    </div>
  )
}

export default App;