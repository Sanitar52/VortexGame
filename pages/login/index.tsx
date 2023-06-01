import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/styles.module.css';
import Layout from '../layout';

const LoginPage: React.FC = () => {
  const [loginForm, setLoginForm] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [accessToken, setJwtToken] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://vortex-game-production.up.railway.app/api/Auth/Login',
        loginForm
      );
      if (response.data.accessToken) {
        const { message, accessToken } = response.data;
        setLoginForm({
          emailOrUsername: '',
          password: '',
        });
        setError('');
        setLoginMessage('Login successful!');
        setJwtToken(accessToken);
        localStorage.setItem('accessToken', accessToken);
        
        
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

  return (
<Layout>
    <div>
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>Login</div>
          <div className={styles.cardBody}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="email">
                Email/Username:
              </label>
              <input
                type="text"
                name="emailOrUsername"
                value={loginForm.emailOrUsername}
                onChange={handleInputChange}
                className={styles.formControl}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                className={styles.formControl}
              />
            </div>
            <div className={styles.textCenter}>
              <button
                onClick={handleLogin}
                className={styles.btnPrimary}
              >
                Login
              </button>
            </div>
            {error && <p className={styles.errorMessage}>{error}</p>}
            {loginMessage && <p className={styles.loginMessage}>{loginMessage}</p>}
            {accessToken && <p className={styles.jwtToken}>JWT Token: {accessToken}</p>}
          </div>
        </div>
      </div>
    </div>
    </div>
</Layout>
  );
};

export default LoginPage;
