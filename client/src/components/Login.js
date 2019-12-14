import React, { useState } from 'react';
import axios from 'axios';
import '../styles.scss';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState({ username: '', password: '' });

  const handleChange = e => {
    e.preventDefault();
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(login);

    axios
      .post('http://localhost:5000/api/login', login)
      .then(res => {
        console.log(res);
        console.log(res.data.payload);
        localStorage.setItem('token', res.data.payload);
        setLogin({ username: '', password: '' });
        props.history.push('/bubbles-page');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleClick = e => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
    props.history.push('/');
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <button onClick={handleClick}>
        {localStorage.getItem('token') ? 'LogoutUser' : 'Logout'}
      </button>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type='text'
            name='username'
            value={login.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type='text'
            name='password'
            value={login.password}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Login</button>
      </form>
    </>
  );
};

export default Login;
