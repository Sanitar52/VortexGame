import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/styles.module.css';
import stylesButton from '../../styles/buttons.module.css';
import Layout from '../layout';
import {useRouter} from 'next/router';
import { type } from 'os';

interface RegisterForm {
  email: string;
  password: string;
  username: string;
  name: string;
  surname: string;
  phone: string;
}

interface ErrorResponse400v1 {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: Record<string, string[]>
    
};


interface ErrorResponse400v2{
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;

}
const base_url = process.env.BACKEND_BASE_URL;
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
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const router = useRouter()
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
      const api = '/api/Auth/Register';
      const response = await axios.post(
        base_url + api,
        registerForm
      );
  
      if (response.status === 200) {
        console.log('Registration successful!');
        setError('');
        setShowVerification(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        try {
          const errorResponse = error.response.data;
          if ('errors' in errorResponse) {
            // Handle ErrorResponse400v1
            const errorMessage = Object.values(errorResponse.errors)[0][0];
            setError(errorMessage);
          } else if ('detail' in errorResponse) {
            // Handle ErrorResponse400v2
            const errorMessage = errorResponse.detail;
            setError(errorMessage);
          }
        } catch (error) {
          console.error('Error handling 400 response:', error);
        }
      } else {
        try {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      } catch (error) {
        console.error('Error handling response:', error);
      }
      }
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const api = '/api/Auth/VerifyEmail';
      const verificationData = {
        emailOrUsername: registerForm.email,
        emailCode: verificationCode,
      };

      const response = await axios.post(
        base_url + api,
        verificationData
      );

      if (response.status === 200) {
        console.log('Email verification successful!');
        // Reset the form after successful verification
        setVerificationCode('');
        setShowVerification(false);
        setVerificationSuccess(true);
        router.push('/login');
      } else {
        try {
          const errorMessage = response.data.message;
          setError(errorMessage);
        }
        catch (error) {
          console.error('Onay kodu hatalı.');
        }
        const errorMessage = response.data.errors[0].errorMessage;
        setError(errorMessage);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      } else {
        console.error('Onay kodunu onaylanamadı', error);
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      const api = '/api/Auth/ResendVerificationMail';
      const resendData = {
        emailOrUsername: registerForm.email,
      };

      const response = await axios.post(
        base_url + api,
        resendData
      );

      if (response.status === 200) {
        console.log('Verification code resent!');
        setResendCount((resendCount) => resendCount + 1);
      } else {
        const errorMessage = response.data.message;
        setError(errorMessage);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      } else {
        console.error('Onay kodunu tekrar yollarken hata oluştu', error);
      }
    }
  };

  return (
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
                  Tekrar Gönder
                </button>
                {verificationSuccess && (
                    <p className={styles.successMessage}>
                      Onay kodu doğrulandı, anasayfaya yönlendiriliyorsunuz
                    </p>
                  )}
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

  );
};

export default RegisterPage;
