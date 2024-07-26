import React, { useEffect } from 'react';
import Navbar from '../../../Components/Navbar';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate, Link } from 'react-router-dom';
import { isLoggedIn } from '../../../../../firebase';
import './index.css';

function About() {
  const navigate = useNavigate();
  const handleGitHubLink = () => {
    window.open('https://github.com/NewBumpEr', '_blank');
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      alert('Please log in to your account to access Task&Master!');
      navigate('/');
    }
  }, []);

  return (
    <div>
      <div className="dashboard-header">
        <Navbar />
      </div>
      <div className="main">
        <div className="about-container">
          <Card className="p-card-about">
            <div className="p-card-body">
              <h1 className="text-2xl font-bold text-center mb-4">
                About Project
              </h1>
              <p className="text-lg leading-relaxed mb-4">
                Task&Master is a web application for managing daily tasks,
                helping users efficiently plan their time and track task
                completion.
              </p>
              <h2 className="text-xl font-semibold mb-2">Project Goal</h2>
              <p className="text-lg leading-relaxed mb-4">
                Create a convenient and intuitive tool for organizing daily
                activities, allowing users to register, log in, add, edit, mark
                tasks as completed, and view planned tasks for future days.
              </p>
              <h2 className="text-xl font-semibold mb-2">Technologies</h2>
              <ul className="list-disc pl-6 mb-4">
                <li className="text-lg leading-relaxed">
                  <strong>React:</strong> For building the user interface.
                </li>
                <li className="text-lg leading-relaxed">
                  <strong>PrimeReact:</strong> For a rich set of ready-to-use UI
                  components.
                </li>
                <li className="text-lg leading-relaxed">
                  <strong>Electron:</strong> For building a desktop application from the web app.
                </li>
                <li className="text-lg leading-relaxed">
                  <strong>Firebase:</strong> For user authentication and data
                  storage.
                </li>
              </ul>
              <div className="btnGitHub">
                <Button
                  className=""
                  icon="pi pi-github"
                  label="Creator: BumpEr"
                  onClick={handleGitHubLink}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default About;
