import React, { useState } from 'react';
import styles from '../../styles/styles.module.css';
import Header from '../index'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <div className={styles.container}>
      <div className="row justify-content-center">
        <div className={`col-md-6 ${styles.card}`}>
          <div className={`card-header text-center ${styles['card-header']}`}>
            Login
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control ${styles['form-control']}`}
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control ${styles['form-control']}`}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className={`btn btn-primary ${styles['btn-primary']}`}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
