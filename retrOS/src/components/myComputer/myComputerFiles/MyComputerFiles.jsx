import React, { useState } from 'react';
import Dolphin from './Dolphin/Dolphin';
import MyComputerD from './MyComputerD/MyComputerD';
import MyComputerIcon from '../../../assets/my-computer-icon.png';
import System32 from './Dolphin/System32/System32';
import Drivers from './Dolphin/System32/Drivers/Drivers';
import Kernel32 from './Dolphin/System32/Kernel32/Kernel32';
import './MyComputerFiles.css';

function MyComputerFiles({ myComputerIconClicked, setMyComputerIconClicked, depthIntoComputer, setDepthIntoComputer, setIsDoNotOpen }) {

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
          <p>{'(C:)'}</p>
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
          <Dolphin 
            myComputerIconClicked={myComputerIconClicked}
            fileIconClicked={fileIconClicked}
            setDepthIntoComputer={setDepthIntoComputer}/>
        </>
      )
    } else if(depthIntoComputer.at(-1) === 'D') {
      return (
        <>
            <MyComputerD 
              myComputerIconClicked={myComputerIconClicked}
              fileIconClicked={fileIconClicked}
              setDepthIntoComputer={setDepthIntoComputer}/>
        </>
      )
    } else if(depthIntoComputer.at(-1) === 'System32') {
      return (
        <>
          <System32
            myComputerIconClicked={myComputerIconClicked}
            fileIconClicked={fileIconClicked}
            setDepthIntoComputer={setDepthIntoComputer}
            />
        </>
      )
    } else if(depthIntoComputer.at(-1) === 'Drivers') {
      return (
        <>
          <Drivers 
            fileIconClicked={fileIconClicked}
            myComputerIconClicked={myComputerIconClicked}/>
        </>
      )
    } else if(depthIntoComputer.at(-1) === 'Kernel32') {
      return (
        <>
          <Kernel32 
            setIsDoNotOpen={setIsDoNotOpen}
            fileIconClicked={fileIconClicked}
            myComputerIconClicked={myComputerIconClicked}/>
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