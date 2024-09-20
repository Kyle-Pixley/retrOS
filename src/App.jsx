import React, { useState } from 'react';
import Nav from './components/nav/Nav.jsx';
import Calculator from './components/calculator/Calculator.jsx';
import './App.css';

function App() {

  const [ calculatorComponent, setCalculatorComponent] = useState(false);

  return (
    <div>
      <Nav calculatorComponent={calculatorComponent} setCalculatorComponent={setCalculatorComponent}/>
    {calculatorComponent && <Calculator setCalculatorComponent={setCalculatorComponent} /> }

    </div>
  )
}

export default App;