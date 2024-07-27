
// ────────────────────────────────────────────────────────────────────────────────
// *                                  Task&Master                                 *
// *                          Created by Pavlo Mytrovtsiy                         *
// *                            Last Update: 27/07/2024                           *
// *                                                                              *
// * Copyright © 2024 Pavlo Mytrovtsiy. All rights reserved.                      *
// * GitHub: https://github.com/NewBumpEr                                         *
// ────────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import './index.css';

function NotFound() {
  const navigate = useNavigate();

  const handleBackToHomepage = () => {
    navigate(-1);
  };
  return (
    <div className="not-found-container">
      <Card className="not-found-card">
        <h1>404 Not Found</h1>
        <p>Oops! The page you're looking for could not be found.</p>
        <Button
          label="Back to homepage"
          onClick={handleBackToHomepage}
          className="p-button-raised p-button-secondary"
          icon="pi pi-home"
          iconPos="left"
        />
      </Card>
    </div>
  );
}

export default NotFound;