import React, { useState } from 'react';
import PimImage from '../../../assets/pim-image.png';
import './login.css';

function login() {

  const [ isRegister, setIsRegister ] = useState(false);
  const [ userInfo, setUserInfo ] = useState({
    username: '',
    password: '',
    email: '',
  });

  const toggleRegister = () => {
    setIsRegister(!isRegister);
  };

  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div id='pim-login-component'>
        <img
            src={PimImage}
            id='pim-login-image'/>

            <button
              id='toggle-register-button' 
              onClick={() => toggleRegister()}>
                {isRegister ? 'Login' : 'Sign Up'}
            </button>

            <form 
              id='user-info-form'>

              {isRegister ? (
                <div
                  className='label-input-parents'>
                  <label
                    id='email-label'
                    className='label'>
                      Email
                  </label>
                  <input
                    value={userInfo.email}
                    onChange={handleChange}
                    id='email-input'
                    className='input'>
                  </input>
                </div>

              ) : null }
              <div
                className='label-input-parents'>
                <label
                  id='username-label'
                  className='label'>
                    Screen Name
                  </label>
                <input
                  value={userInfo.username}
                  onChange={handleChange}
                  id='username-input'
                  className='input'>
                  </input>
              </div>

              <div
                className='label-input-parents'>    
                <label 
                  id='password-label'
                  className='label'>
                    Password
                  </label>
                <input
                  value={userInfo.password}
                  onChange={handleChange}
                  id='password-input'
                  className='input'>
                  </input>
              </div>

              <button 
                onClick={() => handleFormSubmit()}
                id='submit-form-button'>
                {isRegister ? 'Register' : 'Sign On'}
              </button>


            </form>
    </div>
  )
}

export default login;