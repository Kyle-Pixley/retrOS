import React from 'react';
import KernelIcon from '../../../../../assets/Kernel32Icon.png';
import './System32.css';

function System32({ myComputerIconClicked, setDepthIntoComputer, fileIconClicked }) {
  return (
    <>
        <section 
            className={`shell-object ${myComputerIconClicked == 'Kernel32' ? 'clicked' : null}`}
            onClick={e => fileIconClicked(e, 'Kernel32')}
            onDoubleClick={() => setDepthIntoComputer( prev => [...prev, 'Kernel32'])}
            >
            <img id='kernel-icon' src={KernelIcon}></img>
            <p>Kernel32</p>
        </section>
    </>
  )
}

export default System32