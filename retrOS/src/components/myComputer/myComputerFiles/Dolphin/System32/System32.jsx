import React from 'react';

function System32({ myComputerIconClicked, setDepthIntoComputer, fileIconClicked }) {
  return (
    <>
        <section 
            className={`shell-object ${myComputerIconClicked == 'Drivers' ? 'clicked' : null}`}
            onClick={e => fileIconClicked(e, 'Drivers')}
            onDoubleClick={() => setDepthIntoComputer( prev => [...prev, 'Drivers'])}
            >
            <img src={''}></img>
            <p>Drivers</p>
        </section>
        <section 
            className={`shell-object ${myComputerIconClicked == 'Kernel32' ? 'clicked' : null}`}
            onClick={e => fileIconClicked(e, 'Kernel32')}
            onDoubleClick={() => setDepthIntoComputer( prev => [...prev, 'Kernel32'])}
            >
            <img src={''}></img>
            <p>Kernel32</p>
        </section>
    </>
  )
}

export default System32