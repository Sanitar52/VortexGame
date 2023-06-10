import React, { useState } from 'react';
import styles from '../../styles/payment.module.css';
import axios from 'axios';
import { useGlobalContext } from '../../contexts';

const PaymentPage = () => {
  const [showCardOptions, setShowCardOptions] = useState(false);
  const [showBankOptions, setShowBankOptions] = useState(false);
  const [showPaparaOptions, setShowPaparaOptions] = useState(false);
  const [showGiftCodeOptions, setShowGiftCodeOptions] = useState(false);
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const [amount, setAmount] = useState(0);
  const {accessToken} = useGlobalContext();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAmount(parseInt(value));
  };
  const handleCardClick = () => {
    setShowCardOptions(!showCardOptions);
  };

  const handleBankClick = () => {
    setShowBankOptions(!showBankOptions);
  };
  const handleDepositClick = async () => {
    try{
      const url = process.env.BACKEND_BASE_URL
      const api = '/api/Transaction/Deposit'
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.post(url + api, {paymentAmount:amount}, options);
      var x = response.data;
      console.log(x);
    } catch (error) {
      console.log(error);
    }
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
            <input type="text" placeholder="Miktar TL" onChange={handleInputChange} />
            <button className={styles.button} onClick={handleDepositClick}> Ödeme Bildir </button>
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

  );
};

export default PaymentPage;
