import React, { useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../../../../firebase';
import Navbar from '../../../Components/Navbar';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            alert("Please log in to your account to access Task&Master!");
            navigate("/");
        }
    }, [navigate]);

    const goToDaysTasks = () => {
        navigate("/general/task/days");
    };
    const goToDoList = () => {
        navigate("/general/task/to-do-list");
    };
    const goToMonthsTasks = () => {
        navigate("/general/task/months");
    };


    return (
        <div>
            <div className="dashboard-header">
                <Navbar />
            </div>
            <div className="home-container">
                <Card title="Daily Tasks" className="home-card">
                    <Button label="Tasks for Today" icon="pi pi-calendar" className="home-button" onClick={goToDaysTasks} />
                </Card>
                <Card title="To Do List" className="home-card">
                    <Button label="My To Do List" icon="pi pi-check" className="home-button" onClick={goToDoList} />
                </Card>
                <Card title="Monthly Tasks" className="home-card">
                    <Button label="Tasks for Month" icon="pi pi-calendar-times" className="home-button" onClick={goToMonthsTasks} />
                </Card>
            </div>
        </div>
    );
}

export default Home;
