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
    if(depthIntoComputer === 0) {
      return (
        <>
          <section className={`shell-object ${myComputerIconClicked =='MyComputer' ? 'clicked' : null}`}
            onClick={e => fileIconClicked(e, 'MyComputer')}
            onDoubleClick={() => setDepthIntoComputer(1)}>
          <img src={MyComputerIcon}></img>
          <p>My Computer</p>
        </section>
        <section className={`shell-object ${myComputerIconClicked == 'D' ? 'clicked' : null}`}
          onClick={e => fileIconClicked(e, 'D')}
          onDoubleClick={() => setDepthIntoComputer(2)}>
            <img src={MyComputerIcon}></img>
            <p>{'(D:)'}</p>
          </section>
        </>
      )
    } else if(depthIntoComputer === 1) {
      return (
        <>
          <Dolphin />
        </>
      )
    } else if(depthIntoComputer === 2) {
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