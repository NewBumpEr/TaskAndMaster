import React, { useEffect } from "react";
import Navbar from "../../../Components/Navbar";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useNavigate, Link } from "react-router-dom";
import { isLoggedIn } from "../../../../../firebase";
import "./index.css";

function Settings() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      alert("Please log in to your account to access Task&Master!");
      navigate("/");
    }
  }, []);

  const handleGoToHome = () => {
    navigate("/general/home");
  };
  return (
    <div>
      <div className="dashboard-header">
        <Navbar />
      </div>
      <div className="settings-content">
        <Card className="settings-card" title="Settings of Task&Master">
          <div className="settings-grid settings-fluid">
            <div className="settings-col-12 settings-md-6">
              <label>Version: </label>
              <InputText value="0.7" readOnly />
            </div>
          </div>
          <div className="p-col-13">
            <Button
              label="Home"
              className="btnGoToHome"
              onClick={handleGoToHome}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Settings;
