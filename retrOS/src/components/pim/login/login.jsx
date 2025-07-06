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

  const [ isError, setIsError ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');


  const toggleRegister = () => {
    setIsRegister(!isRegister);
  };

  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    const url = isRegister 
      ? "http://127.0.0.1:8000/api/register/"
      : "http://127.0.0.1:8000/api/login/";

    const { email, username, password } = userInfo;
    const body = isRegister
      ? { email, username, password }
      : { username, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type" : "application/json"
        })
      });

      if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid Login Credentials");
      }

      const data = await response.json();
      updateLocalStorage(data.token);
      setErrorMessage("");
      setIsError(false);
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.message)
    }
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
                    name='email'
                    type='email'
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
                  name='username'
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
                  name='password'
                  type='password'
                  value={userInfo.password}
                  onChange={handleChange}
                  id='password-input'
                  className='input'>
                  </input>
              </div>

              <button 
                onClick={handleFormSubmit}
                id='submit-form-button'>
                {isRegister ? 'Register' : 'Sign On'}
              </button>


            </form>
    </div>
  )
}

export default login;