import React from 'react';
import MyComputerIcon from '../../../../assets/my-computer-icon.png';
import './Dolphin.css';

function Dolphin({ fileIconClicked, setDepthIntoComputer, myComputerIconClicked }) {
  return (
    <>
      <section 
        className={`shell-object ${myComputerIconClicked == 'System32' ? 'clicked' : null}`}
        onClick={e => fileIconClicked(e, 'System32')}
        onDoubleClick={() => setDepthIntoComputer( prev => [...prev, 'System32'])}
        >
        <img src={MyComputerIcon}></img>
        <p>System32</p>
      </section>

      <section 
        className={`shell-object ${myComputerIconClicked == 'ProgramFiles' ? 'clicked' : null}`}
        onClick={e => fileIconClicked(e, 'ProgramFiles')}
        onDoubleClick={() => setDepthIntoComputer( prev => [...prev, 'ProgramFiles'])}
        >
        <img src={MyComputerIcon}></img>
        <p>Program Files</p>
      </section>
    </>
  )
}

export default Dolphin;