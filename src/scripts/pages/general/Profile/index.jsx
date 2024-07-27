
// ────────────────────────────────────────────────────────────────────────────────
// *                                  Task&Master                                 *
// *                          Created by Pavlo Mytrovtsiy                         *
// *                            Last Update: 27/07/2024                           *
// *                                                                              *
// * Copyright © 2024 Pavlo Mytrovtsiy. All rights reserved.                      *
// * GitHub: https://github.com/NewBumpEr                                         *
// ────────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../../../components/Navbar';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import {
  isLoggedIn,
  auth,
  selectDataProfile,
  saveUserProfile,
} from '../../../database/firebase';
import { Toast } from 'primereact/toast';

import './index.css';

function Profile() {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);

  const [nickname, setNickname] = useState('');
  const [initialNickname, setInitialNickname] = useState('');
  const [email, setEmail] = useState('');
  const [initialEmail, setInitialEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  const showSaveProfileMessage = message => {
    if (toast.current) {
      toast.current.show({
        severity: 'success',
        summary: 'Profile Updated',
        detail: 'Your profile has been successfully updated.',
      });
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      alert('Please log in to your account to access Task&Master!');
      navigate('/');
    } else {
      const fetchUserProfile = async () => {
        try {
          const userData = await selectDataProfile(auth.currentUser.uid);
          setNickname(userData.nickname);
          setInitialNickname(userData.nickname);
          setEmail(userData.email);
          setInitialEmail(userData.email);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user profile data:', error);
        }
      };

      fetchUserProfile();
    }
  }, []);

  const handleGoToHome = () => {
    navigate('/general/home');
  };

  const handleForgotPassword = () => {
    navigate('/auth/forgot-password');
  };

  const handleSaveProfile = async () => {
    try {
      if (nickname !== initialNickname || email !== initialEmail) {
        await saveUserProfile(auth.currentUser.uid, nickname, email);
        showSaveProfileMessage('Succes');
      }
      setVisible(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Save"
        icon="pi pi-check"
        iconPos="right"
        severity="help"
        onClick={handleSaveProfile}
        autoFocus
      />
    </div>
  );

  return (
    <div>
      <div className="dashboard-header">
        <Navbar />
        <Toast ref={toast} />
      </div>
      <div className="profile-content">
        <Card className="profile-card" title="Profile">
          {loading ? (
            <div>Loading ...</div>
          ) : (
            <>
              <div className="btnEdit">
                <Button
                  label="Edit "
                  severity="success"
                  icon="pi pi-pencil"
                  iconPos="right"
                  onClick={() => setVisible(true)}
                />
              </div>
              <div className="p-grid p-fluid">
                <div className="p-col-12 p-md-6">
                  <label>Nickname: </label>
                  <InputText
                    value={nickname}
                    className="inputTextForProfile"
                    onChange={e => setNickname(e.target.value)}
                    readOnly={!visible}
                  />
                </div>
                <div className="p-col-12 p-md-6">
                  <label>Email: </label>
                  <InputText
                    value={email}
                    className="inputTextForProfile"
                    onChange={e => setEmail(e.target.value)}
                    readOnly={!visible}
                  />
                </div>
                {/*<div className="p-col-12 p-md-6">
                  <label>Password:</label>
                  <Password
                    value={password}
                    className="inputTextForProfile"
                    onChange={(e) => setPassword(e.target.value)}
                    readOnly={!visible}
                  />
                </div> */}
              </div>
              <div className="p-col-13">
                <Button
                  label="Home"
                  className="btnGoToHome"
                  onClick={handleGoToHome}
                />
              </div>
            </>
          )}
        </Card>
        <div className="card flex justify-content-center">
          <Dialog
            header="Edit Profile"
            visible={visible}
            onHide={() => setVisible(false)}
            style={{ width: '50vw' }}
            breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            footer={footerContent}
            modal
            draggable={false}
          >
            <div className="p-grid p-fluid">
              <div className="p-col-12 p-md-6">
                <label>
                  Nickname: <span className="star">*</span>
                </label>
                <InputText
                  value={nickname}
                  className="inputTextForProfile"
                  onChange={e => setNickname(e.target.value)}
                />
              </div>
              <div className="p-col-12 p-md-6">
                <label>Email: </label>
                <InputText
                  value={email}
                  className="inputTextForProfile"
                  readOnly
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="p-col-12 p-md-6">
                <label>Password:</label>
                <div className="forgot-passwordBtn">
                  <Button
                    label="Forgot password?"
                    severity="info"
                    onClick={handleForgotPassword}
                  />
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Profile;