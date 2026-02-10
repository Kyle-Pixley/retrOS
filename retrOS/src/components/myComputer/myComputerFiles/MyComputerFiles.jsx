import React, { useState } from 'react';
import MyComputerIcon from '../../../assets/my-computer-icon.png';
import './MyComputerFiles.css';

function MyComputerFiles() {

  const [ iconClicked, setIconClicked ] = useState('');

  return (
    <div id='my-computer-files-container'>
        <section className={`shell-object ${iconClicked =='MyComputer' ? 'clicked' : null}`}
        onClick={() => setIconClicked(['MyComputer'])}>
          <img src={MyComputerIcon}></img>
          <p>My Computer</p>
        </section>
        <section className={`shell-object ${iconClicked == 'D' ? 'clicked' : null}`}
          onClick={() => setIconClicked(['D'])}>
            <img src={MyComputerIcon}></img>
            <p>{'(D:)'}</p>
          </section>
    </div>
  )
}

export default MyComputerFiles;