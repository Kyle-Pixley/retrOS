import React from 'react';
import PimImage from '../../../assets/pim-image.png';
import './login.css';

function login() {
  return (
    <div id='pim-login-component'>
        <img
            src={PimImage}
            id='pim-login-image'/>
    </div>
  )
}

export default login