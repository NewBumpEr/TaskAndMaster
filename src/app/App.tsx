
// ────────────────────────────────────────────────────────────────────────────────
// *                                  Task&Master                                 *
// *                          Created by Pavlo Mytrovtsiy                         *
// *                            Last Update: 27/07/2024                           *
// *                                                                              *
// * Copyright © 2024 Pavlo Mytrovtsiy. All rights reserved.                      *
// * GitHub: https://github.com/NewBumpEr                                         *
// ────────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import NotFound from '../scripts/pages/NotFound';
import Login from '../scripts/pages/auth/Login';
import Register from '../scripts/pages/auth/Register';
import ForgotPassword from '../scripts/pages/auth/ForgotPassword';
import Home from '../scripts/pages/general/home';
import DashboardTasksDays from '../scripts/pages/general/Dashboard/Day';
import ToDoList from '../scripts/pages/general/Dashboard/List';
import DashboardTasksMonths from '../scripts/pages/general/Dashboard/Mouth';
import About from '../scripts/pages/general/About';
import Profile from '../scripts/pages/general/Profile';
import Settings from '../scripts/pages/general/Settings';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/forgot-password" element={<ForgotPassword />} />
        <Route path="general/home" element={<Home />} />
        <Route path="general/task/days" element={<DashboardTasksDays />} />
        <Route path="general/task/to-do-list" element={<ToDoList />} />
        <Route path="general/task/months" element={<DashboardTasksMonths />} />
        <Route path="general/about" element={<About />} />
        <Route path="general/profile" element={<Profile />} />
        <Route path="general/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default App;