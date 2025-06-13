import React, { useState, useRef, useEffect } from 'react';
import ComputerIcon from './assets/my-computer-icon.png';
import CinepixIcon from './assets/cinepix-icon.png';
import Nav from './components/nav/Nav.jsx';
import Calculator from './components/calculator/Calculator.jsx';
import MyComputer from './components/myComputer/MyComputer.jsx';
import Cinepix from './components/cinepix/cinepix.jsx';
import './App.css';

function App() {

  const [ calculatorComponent, setCalculatorComponent] = useState(false);
  const [ navCalculatorButton, setNavCalculatorButton ] = useState(false);
  const [ calculatorPosition, setCalculatorPosition ] = useState({x: 100, y: 100});
  const [ calculatorInput, setCalculatorInput ] = useState('');
  const [ calculatorResult, setCalculatorResult ] = useState('');
  const [ calculatorZIndex, setCalculatorZIndex ] = useState(0);

    const [ myComputerComponent, setMyComputerComponent ] = useState(false);
    const [ navCinepixButton, setNavCinepixButton ] = useState(false);
    const [ navMyComputerButton, setNavMyComputerButton ] = useState(false);
    const [ myComputerPosition, setMyComputerPosition ] = useState({ x: 150, y:150 });
    const [ myComputerZIndex, setMyComputerZIndex ] = useState(0);

  const [cinepixComponent, setCinepixComponent ] = useState(false);
  const [ cinepixPosition, setCinepixPosition ] = useState({ x: 160, y: 160 });
  const [ cinepixZIndex, setCinepixZIndex ] = useState(0);

  const [ componentsZIndexArray, setComponentsZIndexArray ] = useState([ calculatorZIndex, myComputerZIndex ]);

  const [ startMenu, setStartMenu ] = useState(false);
  const navStartButtonRef = useRef(null);

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
  const handleCinepixShortcutClicked = () => {
    setCinepixComponent(true);
    setNavCinepixButton(true);
  }

  return (
    <div>
      <div className='shortcut-parent'>
        <img className='shortcut-icon' src={ComputerIcon}
        onDoubleClick={() => handleMyComputerShortcutClick()}
        />
        <p className='shortcut-text'>My Computer</p>
      </div>
      <div className='shortcut-parent'>
        <img 
          className='shortcut-icon'
          src={CinepixIcon}
          onDoubleClick={() => handleCinepixShortcutClicked()}/>
          <p className='shortcut-text'>Cinepix</p>
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
        cinepixComponent={cinepixComponent}
        setCinepixComponent={setCinepixComponent}
        navCinepixButton={navCinepixButton}
        setNavCinepixButton={setNavCinepixButton}
        cinepixZIndex={cinepixZIndex}
        setCinepixZIndex={setCinepixZIndex}
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

        {cinepixComponent &&
          <Cinepix 
            setCinepixComponent={setCinepixComponent}
            setNavCinepixButton={setNavCinepixButton}
            cinepixPosition={cinepixPosition}
            setCinepixPosition={setCinepixPosition}
            cinepixZIndex={cinepixZIndex}
            setCinepixZIndex={setCinepixZIndex}
            componentsZIndexArray={componentsZIndexArray}
            setComponentZIndexArray={setComponentsZIndexArray}/>}

    </div>
  )
}

export default App;