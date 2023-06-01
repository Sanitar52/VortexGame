import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/styles.module.css';
import stylesButton from '../../styles/buttons.module.css';
import Layout from '../layout';
interface RegisterForm {
  email: string;
  password: string;
  username: string;
  name: string;
  surname: string;
  phone: string;
}

interface ErrorResponse {
  isValid: boolean;
  errors: Array<{
    propertyName: string;
    errorMessage: string;
    attemptedValue: string;
    customState: string;
    severity: number;
    errorCode: string;
    formattedMessagePlaceholderValues: {
      [key: string]: string;
    };
  }>;
  ruleSetsExecuted: string[];
}

const RegisterPage: React.FC = () => {
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: '',
    password: '',
    username: '',
    name: '',
    surname: '',
    phone: '',
  });
  const [error, setError] = useState<string>('');
  const [showVerification, setShowVerification] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [resendCount, setResendCount] = useState<number>(0);
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (resendCount === 3) {
      setResendDisabled(true);
    } else {
      const timer = setTimeout(() => {
        setResendDisabled(false);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [resendCount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://vortex-game-production.up.railway.app/api/Auth/Register',
        registerForm
      );
      if (response.status === 200) {
        console.log('Registration successful!');

        setError('');
        setShowVerification(true);
      } else {
        const errorMessage = response.data.errors[0].errorMessage;
        setError(errorMessage);
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errorMessage = error.response.data.errors[0].errorMessage;
        setError(errorMessage);
      } else {
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const verificationData = {
        emailOrUsername: registerForm.email,
        emailCode: verificationCode,
      };

      const response = await axios.post(
        'https://vortex-game-production.up.railway.app/api/Auth/VerifyEmail',
        verificationData
      );

      if (response.status === 200) {
        console.log('Email verification successful!');
        // Reset the form after successful verification
        setVerificationCode('');
        setShowVerification(false);
      } else {
        const errorMessage = response.data.errors[0].errorMessage;
        setError(errorMessage);
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errorMessage = error.response.data.errors[0].errorMessage;
        setError(errorMessage);
      } else {
        console.error('Error submitting verification code:', error);
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      const resendData = {
        emailOrUsername: registerForm.email,
      };

      const response = await axios.post(
        'https://vortex-game-production.up.railway.app/api/Auth/ResendVerificationMail',
        resendData
      );

      if (response.status === 200) {
        console.log('Verification code resent!');
        setResendCount((prevCount) => prevCount + 1);
      } else {
        const errorMessage = response.data.errors[0].errorMessage;
        setError(errorMessage);
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errorMessage = error.response.data.errors[0].errorMessage;
        setError(errorMessage);
      } else {
        console.error('Error resending verification code:', error);
      }
    }
  };

  return (
    <Layout>
        <div>
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>Register</div>
          <div className={styles.cardBody}>
            {showVerification ? (
              <form onSubmit={handleVerificationSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="verificationCode" className={styles.formLabel}>
                    Verification Code:
                  </label>
                  <input
                    type="text"
                    id="verificationCode"
                    name="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className={styles.formControl}
                  />
                </div>

                {error && <p className={styles.errorMessage}>{error}</p>}

                <button type="submit" className={`${stylesButton.button} ${stylesButton.verifyButton}`}>
                  Verify Email
                </button>

                <button
                  type="button"
                  className={`${stylesButton.button} ${stylesButton.resendButton}`}
                  onClick={handleResendVerification}
                  disabled={resendDisabled}
                >
                  Resend Verification Code
                </button>
              </form>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={registerForm.email}
                    onChange={handleInputChange}
                    className={styles.formControl}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.formLabel}>
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={registerForm.password}
                    onChange={handleInputChange}
                    className={styles.formControl}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="username" className={styles.formLabel}>
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={registerForm.username}
                    onChange={handleInputChange}
                    className={styles.formControl}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={registerForm.name}
                    onChange={handleInputChange}
                    className={styles.formControl}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="surname" className={styles.formLabel}>
                    Surname:
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={registerForm.surname}
                    onChange={handleInputChange}
                    className={styles.formControl}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>
                    Phone:
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={registerForm.phone}
                    onChange={handleInputChange}
                    className={styles.formControl}
                  />
                </div>

                {error && <p className={styles.errorMessage}>{error}</p>}

                <button type="submit" className={stylesButton.verifyButton}>
                  Register
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
    </Layout>
  );
};

export default RegisterPage;
