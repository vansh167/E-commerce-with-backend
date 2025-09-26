import React, { useState } from 'react';
import './css/LoginSignup.css';

const LoginSignUp = () => {
  const [active, setActive] = useState('user'); // 'user' or 'admin'
  const [state, setState] = useState('Sign Up'); // 'Login' or 'Sign Up'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);

      // Check for admin login using email/password
      if (
        (formData.email === 'admin@example.com' || active === 'admin') &&
        formData.password === 'admin123'
      ) {
        window.location.replace('/admin'); // Redirect to Admin Dashboardadmin123
      } else {
        window.location.replace('/'); // Redirect to User Homepage
      }
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-wrapper">
        {/* LEFT SIDE */}
        <div className="loginsignup-left">
          <h2>{state === 'Sign Up' ? 'Already have an account?' : 'New here?'}</h2>
          <p>
            {state === 'Sign Up'
              ? 'Click below to login to your account.'
              : 'Sign up and discover a new experience.'}
          </p>
          <button
            onClick={() => setState(state === 'Login' ? 'Sign Up' : 'Login')}
            className="loginsignup-toggle-btn"
          >
            {state === 'Sign Up' ? 'Login' : 'Sign Up'}
          </button>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="loginsignup-container">
          <div className="switcher-container">
            <ul className="switcher-list">
              <li
                className={active === 'user' ? 'active' : ''}
                onClick={() => setActive('user')}
              >
                User
              </li>
              <li
                className={active === 'admin' ? 'active' : ''}
                onClick={() => setActive('admin')}
              >
                Admin
              </li>
            </ul>
          </div>
          <h1>{state}</h1>
          <div className="loginsignup-fields">
            {state === 'Sign Up' && (
              <input
                name="username"
                value={formData.username}
                onChange={changeHandler}
                type="text"
                placeholder="Your Name"
              />
            )}
            <input
              name="email"
              value={formData.email}
              onChange={changeHandler}
              type="email"
              placeholder="Email Address"
            />
            <input
              name="password"
              value={formData.password}
              onChange={changeHandler}
              type="password"
              placeholder="Password"
            />
          </div>
          <button onClick={() => (state === 'Login' ? login() : signup())}>
            Continue
          </button>
          {state === 'Sign Up' ? (
            <p className="loginsignup-login">
              Already have an account?{' '}
              <span onClick={() => setState('Login')}>Login here</span>
            </p>
          ) : (
            <p className="loginsignup-login">
              Create an account?{' '}
              <span onClick={() => setState('Sign Up')}>Click here</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
