import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/styles.module.css';
import { useGlobalContext } from '../../contexts';
import { set } from 'date-fns';
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
const LoginPage: React.FC = () => {
  const { user, setUser, setAccessToken } = useGlobalContext();
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
      const base_url = process.env.BACKEND_BASE_URL;
      const api = '/api/Auth/Login';
      console.log('BASE URL', base_url);
      const webUrl = base_url + api;
      const response = await axios.post(
        webUrl,
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
        setAccessToken(accessToken);
        try {
          const headers = {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          };
          const requestBody = {
            query: `
              query {
                me {
                  id
                  name
                  surname
                  username
                  balance
                }
              }
            `,
          };
          const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody),
          };
          
          const response = await fetch(process.env.GRAPHQL_BASE_URL, options);
          const data = await response.json();
          console.log('RESPONSE FROM FETCH REQUEST', data?.data);
          setUser(data?.data?.me ?? null);
          router.push('/');
        } catch (err) {
          console.log('ERROR DURING FETCH REQUEST', err);
        }
        
        
      } 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        try {
          const errorResponse = error.response.data;
          if (errorResponse.errors && errorResponse.errors.emailOrUsername) {
            const errorMessage = errorResponse.errors.emailOrUsername[0];
            setError(errorMessage);
          }
          else if(errorResponse.errors && errorResponse.errors.password) {
            const errorMessage = errorResponse.errors.password[0];
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

  return (

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
