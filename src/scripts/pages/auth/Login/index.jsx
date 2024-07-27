
// ────────────────────────────────────────────────────────────────────────────────
// *                                  Task&Master                                 *
// *                          Created by Pavlo Mytrovtsiy                         *
// *                            Last Update: 27/07/2024                           *
// *                                                                              *
// * Copyright © 2024 Pavlo Mytrovtsiy. All rights reserved.                      *
// * GitHub: https://github.com/NewBumpEr                                         *
// ────────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef } from 'react';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import './index.css';
import {
  loginUser,
  saveUserDataToSessionStorage,
} from '../../../database/firebase';
import { Toast } from 'primereact/toast';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const toast = useRef(null);

  const showErrorMessage = message => {
    if (toast.current) {
      toast.current.show({
        severity: 'error',
        summary: 'Login failed.',
        detail: message,
      });
    }
    //setError(message);
  };

  const showSuccessMessage = () => {
    if (toast.current) {
      toast.current.show({
        severity: 'success',
        summary: 'Logged in successfully',
        detail: 'You are now logged in!',
      });
    }
  };

  const handleLogin = async () => {
    try {
      const credentials = await loginUser(email, password);
      await saveUserDataToSessionStorage(credentials);
      navigate('/general/home');
      showSuccessMessage();
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/user-not-found') {
        showErrorMessage('User not found. Please check your email.');
      } else if (error.code === 'auth/wrong-password') {
        showErrorMessage('Incorrect password. Please try again.');
      } else {
        showErrorMessage('Please check if your email or password is correct.');
      }
    }
  };

  const handleForgotPassword = () => {
    navigate('/auth/forgot-password');
  };

  const handleRegister = () => {
    navigate('/auth/register');
  };

  return (
    <div className="login-container">
      <Card>
        <div className="card-header">
          <h1>Task&Master</h1>
          <p>Login Page</p>
        </div>
        <div className="login-form">
          <div className={`input-container ${error ? 'p-invalid' : ''}`}>
            <InputText
              required
              id="username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className={error ? 'p-invalid' : ''}
            />
          </div>
          <div className={`input-container ${error ? 'p-invalid' : ''}`}>
            <Password
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              feedback={false}
              toggleMask
              toggleMaskOnClick={false}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={`password ${error ? 'p-invalid' : ''}`}
            />
          </div>
          <Toast ref={toast} />

          <div className="forgot-password-link">
            <Button
              label="Forgot password?"
              className="p-button-link"
              onClick={handleForgotPassword}
            />
          </div>
          <Button label="Login" onClick={handleLogin} />
          <Button
            label="Don't have an account? Register!"
            style={{ fontSize: '0.85rem' }}
            className="p-button-secondary"
            onClick={handleRegister}
          />
          {error && <p className="error">{error}</p>}
        </div>
      </Card>
    </div>
  );
}

export default Login;