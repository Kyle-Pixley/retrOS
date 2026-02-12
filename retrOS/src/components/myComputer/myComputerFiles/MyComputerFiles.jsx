import React, { useState } from 'react';
import Dolphin from './Dolphin/Dolphin';
import MyComputerD from './MyComputerD/MyComputerD';
import MyComputerIcon from '../../../assets/my-computer-icon.png';
import './MyComputerFiles.css';

function MyComputerFiles({ myComputerIconClicked, setMyComputerIconClicked, depthIntoComputer, setDepthIntoComputer }) {

  function fileIconClicked(e, icon) {
    e.stopPropagation();
    setMyComputerIconClicked(icon);
  }

  function whatDirectory() {
    if(depthIntoComputer.at(-1) === 'root'
    ) {
      return (
        <>
          <section className={`shell-object ${myComputerIconClicked =='MyComputer' ? 'clicked' : null}`}
            onClick={e => fileIconClicked(e, 'MyComputer')}
            onDoubleClick={() => setDepthIntoComputer( prev => [...prev, 'MyComputer'])}>
          <img src={MyComputerIcon}></img>
          <p>My Computer</p>
        </section>
        <section className={`shell-object ${myComputerIconClicked == 'D' ? 'clicked' : null}`}
          onClick={e => fileIconClicked(e, 'D')}
          onDoubleClick={() => setDepthIntoComputer( prev => [...prev, 'D'])}>
            <img src={MyComputerIcon}></img>
            <p>{'(D:)'}</p>
          </section>
        </>
      )
    } else if(depthIntoComputer.at(-1) === 'MyComputer') {
      return (
        <>
          <Dolphin />
        </>
      )
    } else if(depthIntoComputer.at(-1) === 'D') {
      return (
        <>
          <section>
            <MyComputerD />
          </section>
        </>
      )
    }
  }

  return (
    <div id='my-computer-files-container'>
          {whatDirectory()}
    </div>
  )
}

export default MyComputerFiles;