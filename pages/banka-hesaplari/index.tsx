import React, { useState } from 'react';
import styles from '../../styles/payment.module.css';
import Layout from '../layout';

const PaymentPage = () => {
  const [showCardOptions, setShowCardOptions] = useState(false);
  const [showBankOptions, setShowBankOptions] = useState(false);
  const [showPaparaOptions, setShowPaparaOptions] = useState(false);
  const [showGiftCodeOptions, setShowGiftCodeOptions] = useState(false);
  const [showOtherOptions, setShowOtherOptions] = useState(false);

  const handleCardClick = () => {
    setShowCardOptions(!showCardOptions);
  };

  const handleBankClick = () => {
    setShowBankOptions(!showBankOptions);
  };

  const handlePaparaClick = () => {
    setShowPaparaOptions(!showPaparaOptions);
  };

  const handleGiftCodeClick = () => {
    setShowGiftCodeOptions(!showGiftCodeOptions);
  };

  const handleOtherClick = () => {
    setShowOtherOptions(!showOtherOptions);
  };

  return (
    <Layout><div>
    <div className={styles.container}>
      <h1>Ödeme Yöntemleri</h1>
      <div>
        <button className={styles.button} onClick={handleCardClick}>
          Kredi / Banka Kartı
        </button>
        {showCardOptions && (
          <div className={styles.entryBox}>
            <img src="example.png" alt="Example" />
            {/* Add entry boxes for card options */}
          </div>
        )}
      </div>
      <div>
        <button className={styles.button} onClick={handleBankClick}>
          Havale / EFT / ATM
        </button>
        {showBankOptions && (
          <div className={styles.entryBox}>
            <img src="example.png" alt="Example" />
            {/* Add entry boxes for bank options */}
          </div>
        )}
      </div>
      <div>
        <button className={styles.button} onClick={handlePaparaClick}>
          Papara
        </button>
        {showPaparaOptions && (
          <div className={styles.entryBox}>
            <img src="example.png" alt="Example" />
            {/* Add entry boxes for Papara options */}
          </div>
        )}
      </div>
      <div>
        <button className={styles.button} onClick={handleGiftCodeClick}>
          Hediye Kodu
        </button>
        {showGiftCodeOptions && (
          <div className={styles.entryBox}>
            <img src="example.png" alt="Example" />
            {/* Add entry boxes for Gift Code options */}
          </div>
        )}
      </div>
      <div>
        <button className={styles.button} onClick={handleOtherClick}>
          Diğer
        </button>
        {showOtherOptions && (
          <div className={styles.entryBox}>
            <img src="example.png" alt="Example" />
            {/* Add entry boxes for Other options */}
          </div>
        )}
      </div>
    </div>
    </div>
    </Layout>
  );
};

export default PaymentPage;
