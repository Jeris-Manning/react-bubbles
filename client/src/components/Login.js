// make a post request to retrieve a token from the api
// when you have handled the token, navigate to the BubblePage route

import { axiosAuthenticate } from '../utility/axiosAuthenticate';
import React, { useState } from 'react';

const Login = (props) => {
  const [logInfo, setLogInfo] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setLogInfo({ ...logInfo, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    axiosAuthenticate()
      .post('/login', logInfo)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubblePage');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='login-form'>
      <form onSubmit={login}>
        <input
          type='text'
          name='username'
          value={logInfo.username}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          value={logInfo.password}
          onChange={handleChange}
        />
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
};

export default Login;
