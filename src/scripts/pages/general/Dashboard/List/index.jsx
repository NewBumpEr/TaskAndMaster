
// ────────────────────────────────────────────────────────────────────────────────
// *                                  Task&Master                                 *
// *                          Created by Pavlo Mytrovtsiy                         *
// *                            Last Update: 27/07/2024                           *
// *                                                                              *
// * Copyright © 2024 Pavlo Mytrovtsiy. All rights reserved.                      *
// * GitHub: https://github.com/NewBumpEr                                         *
// ────────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../../../database/firebase';
import Navbar from '../../../../../components/Navbar';

function ToDoList() {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');
  const text = 'Soon...';

  useEffect(() => {
    if (!isLoggedIn()) {
      alert('Please log in to your account to access Task&Master!');
      navigate('/');
    }

    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => {
        const newText = text.slice(0, index + 1);
        return newText;
      });
      index += 1;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 200);
  }, [navigate]);

  return (
    <div>
      <div className="dashboard-header">
        <Navbar />
      </div>
      <div className="home-container">
        <h1>{displayText}</h1>
      </div>
    </div>
  );
}

export default ToDoList;