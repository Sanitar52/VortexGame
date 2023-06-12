import React, { useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import Router from 'next/router';
import styles from '../styles/header.module.css';
import { useGlobalContext } from '../contexts';





const Navbar = () => {
  //const [user, setUser] = useState<User | null>(null);
  const { user, setUser, accessToken, setAccessToken } = useGlobalContext();
  const [showOptions, setShowOptions] = useState(false);

  const handleLogout = () => {
    // Perform logout actions here
    setAccessToken(null);
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


  

  return (
    <div className={styles.header}>
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
              <Link href="/gb-satin-al">GB Satın Al</Link>
            </li>
            <li>
              <Link href="/about">Biz Kimiz</Link>
            </li>
            <li>
              <Link href="/iletisim">İletişim</Link>
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
      </div>
  );
};

export default Navbar;