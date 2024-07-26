import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { forgotPassword } from "../../../../../firebase";
import { Toast } from 'primereact/toast';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [correct, setCorrect] = useState(null);
  const navigate = useNavigate();
  const toast = useRef(null);

  const showErrorMessage = (message) => {
    toast.current.show({ severity: 'error', summary: 'Login failed.', detail: message });
  };

  const showSuccessMessage = (message) => {
    toast.current.show({ severity: 'success', summary: 'Logged in successfully', detail: message });
  };  
  

  const handleResetPassword = async () => {
    try {
      await forgotPassword(email);
      showSuccessMessage("Password reset email sent successfully. Please check your inbox.");
      setError(null);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        showErrorMessage("Sorry, but the email address you entered is not valid. Please check it and try again.");
        setError(null);
        setCorrect(null);
      } else {
        setError(error.message);
        setCorrect(null);
      }
    }
  };

  const BackToHome = () => {
    navigate(-1);
  };

  return (
    <div className="forgot-password-container">
      <Card className="forgot-password-card">
        <h1>Forgot Password?</h1>
        <p className="forgot-password-description">
          Enter your email below and click "Reset Password". You will receive a
          link on your email to create a new password.
        </p>
        <div className={`input-container ${error ? "p-invalid" : ""}`}>
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={error ? "p-invalid" : ""}
            tooltip="Enter your email"
          />
        </div>

        <Toast ref={toast} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {correct && <p style={{ color: "green" }}>{correct}</p>}

        <Button
          label="Reset Password"
          className="p-button-raised p-button-secondary"
          onClick={handleResetPassword}
        />
        <div className="BtnBackToHome">
          <Button label="Back" className="p-button-link" onClick={BackToHome} />
        </div>
      </Card>
    </div>
  );
}

export default ForgotPassword;
