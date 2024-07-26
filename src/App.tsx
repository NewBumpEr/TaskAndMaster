import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import NotFound from "./app/Scripts/Pages/NotFound/index.jsx";
import Login from "./app/Scripts/Pages/auth/Login/index.jsx";
import Register from "./app/Scripts/Pages/auth/Register/index.jsx";
import ForgotPassword from "./app/Scripts/Pages/auth/ForgotPassword/index.jsx";
import Home from "./app/Scripts/Pages/general/home/index.jsx";
import DashboardTasksDays from "./app/Scripts/Pages/general/Dashboard/Day";
import ToDoList from "./app/Scripts/Pages/general/Dashboard/List";
import DashboardTasksMonths from "./app/Scripts/Pages/general/Dashboard/Mouth";
import About from "./app/Scripts/Pages/general/About/index.jsx";
import Profile from "./app/Scripts/Pages/general/Profile/index.jsx";
import Settings from "./app/Scripts/Pages/general/Settings/index.jsx";

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
