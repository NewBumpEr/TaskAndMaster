
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
import { registerUser } from '../../../database/firebase';
import { Toast } from 'primereact/toast';

function Register() {
  const toast = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [correct, setCorrect] = useState(null);
  const [error, setError] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorNickname, setErrorNickname] = useState(null);

  const navigate = useNavigate();

  const showErrorMessageNickname = message => {
    if (toast.current) {
      toast.current.show({
        severity: 'error',
        summary: 'Registration failed.',
        detail: message,
      });
    }
    setErrorNickname(' ');
  };

  const showErrorMessageEmail = message => {
    if (toast.current) {
      toast.current.show({
        severity: 'error',
        summary: 'Registration failed.',
        detail: message,
      });
    }
    setErrorEmail(' ');
  };

  const showErrorMessagePassword = message => {
    if (toast.current) {
      toast.current.show({
        severity: 'error',
        summary: 'Registration failed.',
        detail: message,
      });
    }
    setErrorPassword(' ');
  };

  const showErrorMessagePassword2 = message => {
    if (toast.current) {
      toast.current.show({
        severity: 'error',
        summary: 'Registration failed.',
        detail: message,
      });
    }
    setErrorPassword(' ');
  };

  const handleRegister = async () => {
    if (password !== repeatPassword) {
      showErrorMessagePassword2('Passwords do not match!');
      setErrorEmail(null);
      setErrorNickname(null);
      return;
    }

    let emailRegex = /^.+@.+\..+$/;
    if (!emailRegex.test(email)) {
      showErrorMessageEmail('Invalid email format!');
      setErrorPassword(null);
      setErrorNickname(null);
      return;
    }

    if (nickname.length < 6) {
      showErrorMessageNickname('Nickname must be at least 6 characters long!');
      setErrorEmail(null);
      setErrorPassword(null);
      return;
    }

    if (password.length < 8) {
      showErrorMessagePassword('Password must be at least 8 characters long!');
      setErrorEmail(null);
      setErrorNickname(null);
      return;
    }

    try {
      const user = await registerUser(email, password, nickname);
      setCorrect('Account successfully registered!');
      alert('Account successfully registered!');
      navigate('/');
    } catch (error) {
      setErrorEmail(null);
      setErrorNickname(null);
      setErrorPassword(null);
      setError(error.message);
    }
  };

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <Card>
        <div className="card-header">
          <h1>Task&Master</h1>
          <p>Register Page</p>
        </div>
        <div className="login-form">
          <div
            className={`input-container ${errorNickname ? 'p-invalid' : ''}`}
          >
            <InputText
              id="nickname"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              placeholder="Nickname"
              tooltip="Enter your nickname"
              className="inputTextForRegister"
            />
          </div>
          <div className={`input-container ${errorEmail ? 'p-invalid' : ''}`}>
            <InputText
              required
              id="username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              tooltip="Enter your email"
              className="inputTextForRegister"
            />
          </div>
          <div
            className={`input-container ${errorPassword ? 'p-invalid' : ''}`}
          >
            <Password
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              feedback={false}
              toggleMask
              toggleMaskOnClick={false}
              type={showPassword ? 'text' : 'password'}
              placeholder="Create Password"
              className="password"
              tooltip="Create your password"
            />
          </div>
          <div
            className={`input-container ${errorPassword ? 'p-invalid' : ''}`}
          >
            <Password
              id="repeatPassword"
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
              feedback={false}
              toggleMaskOnClick={false}
              type={showPassword ? 'text' : 'password'}
              placeholder="Repeat Password"
              className="password"
              tooltip="Repeat your password"
            />
          </div>

          <Toast ref={toast} />

          <Button label="Sign Up" onClick={handleRegister} />
          <Button
            label="Already have an account? Login!"
            style={{ fontSize: '0.85rem' }}
            className="p-button-secondary"
            onClick={handleLogin}
          />

          {errorNickname && <p className="error-message">{errorNickname}</p>}
          {errorEmail && <p className="error-message">{errorEmail}</p>}
          {errorPassword && <p className="error-message">{errorPassword}</p>}
          {error && <p className="error-message">{error}</p>}
          {correct && <p className="success-message">{correct}</p>}
        </div>
      </Card>
    </div>
  );
}

export default Register;