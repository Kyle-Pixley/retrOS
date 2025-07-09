import React, { useState, useEffect } from 'react';
import Login from '../login/login';
import FrontPage from '../frontPage/frontPage';

import './pimDashboard.css';

function pimDashboard() {

    const [ sessionToken, setSessionToken ] = useState(undefined);

    useEffect(() => {
        if(localStorage.getItem("token")) {
            setSessionToken(localStorage.getItem("token"))
        }
    }, [])

    const updateLocalStorage = newToken => {
      localStorage.setItem("token", newToken)
      setSessionToken(newToken)
    };

  return (
    <div id='pim-dashboard-component'>
        { sessionToken 
          ? <FrontPage /> 
          : <Login updateLocalStorage={updateLocalStorage} /> }
    </div>
  )
}

export default pimDashboard;