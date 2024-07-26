import React, {useEffect, useState} from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../../../../../firebase';
import Navbar from '../../../../Components/Navbar';

function DashboardTasksMonths() {
    const navigate = useNavigate();
    const [displayText, setDisplayText] = useState('');
    const text = 'Soon...';

    useEffect(() => {
        if (!isLoggedIn()) {
            alert("Please log in to your account to access Task&Master!");
            navigate("/");
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
                <Navbar/>
            </div>
            <div className="home-container">
                <h1>{displayText}</h1>
            </div>
        </div>
    );
}

export default DashboardTasksMonths;
