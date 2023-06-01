import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import Router from 'next/router';
import styles from '../styles/header.module.css';


interface User {
  name: string;
  surname: string;
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleLogout = () => {
    // Perform logout actions here
    localStorage.removeItem('jwtToken');
    setUser(null);
  };

  const handleUserClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = () => {
    setShowOptions(false);
  };
  const handleBalanceClick = () => {
    // Redirect to "/banka-hesaplari" page
    Router.push('/banka-hesaplari');
  };


  const fetchUserData = () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      axios
        .get('https://vortex-game-production.up.railway.app/api/Auth/AllUserData', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const { name, surname } = response.data;
            setUser({ name, surname });
          } else {
            // Handle error response
            console.error('Error fetching user data:', response);
          }
        })
        .catch((error) => {
          // Handle error
          console.error('Error fetching user data:', error);
        });
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={400} height={100} />
          </Link>
        </div>
        <nav className={styles.navLinks}>
          <ul>
            <li>
              <Link href="/">Ana Sayfa</Link>
            </li>
            <li>
              <Link href="/about">GB Satın Al</Link>
            </li>
            <li>
              <Link href="/logintest">Biz Kimiz</Link>
            </li>
            <li>
              <Link href="/logintest">İletişim</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.userActions}>
          {user ? (
            <div className={styles.userDropdown}>
              <button className={styles.userButton} onClick={handleUserClick}>
                {`${user.name} ${user.surname}`}
              </button>
              {showOptions && (
                <div className={styles.dropdownContent}>
                  <button className={styles.balanceButton} onClick={handleBalanceClick} >
                    Bakiye Ekle
                  </button>  
                  <Link href="/account" onClick={handleOptionClick}>
                    Hesabım
                  </Link>
                  <Link href="/payments" onClick={handleOptionClick}>
                    Ödemelerim
                  </Link>
                  <Link href="/settings" onClick={handleOptionClick}>
                    Ayarlarım
                  </Link>
                  <button className={styles.logoutButton} onClick={handleLogout}>Çıkış Yap</button>
                </div>
              )}
              
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link href="/login">
                <button className={styles.loginButton}>Giriş yap</button>
              </Link>
              <Link href="/register">
                <button className={styles.signupButton}>Kayıt ol</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;