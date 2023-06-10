import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../layout';
import Card from '../../components/Card';

interface userInfo {
  id: string;
  balance: number;
}

interface itemInfo {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  quantity: number;
}

const ItemPage = () => {
  const [amount, setAmount] = useState<number>(0);
  const [userBalance, setUserBalance] = useState<number>(0);
  const itemPrice = 10; // Replace with actual item price

  const getUserDetailByFetchAPICall = async () => {
    try {
      const headers = {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      };
      const requestBody = {
        query: `
          query {
            me {
              id
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
      const response = await fetch('https://vortex-game-production.up.railway.app/graphql/', options);
      const data = await response.json();
      console.log('RESPONSE FROM FETCH REQUEST', data?.data);
      setUserBalance(data?.data?.me?.balance ?? 0);
    } catch (err) {
      console.log('ERROR DURING FETCH REQUEST', err);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleBuyClick = () => {
    const totalPrice = amount * itemPrice;
    if (totalPrice > userBalance) {
      alert('Yeterince paranız yok');
    } else {
      // Perform the purchase action
      alert('Satın alma işlemi tamamlandı');
    }
  };

  const fetchUserBalance = () => {
    // Call your API to fetch the user's balance
    axios
      .get('https://example.com/api/user/balance') // Replace with your actual API endpoint
      .then((response) => {
        setUserBalance(response.data.balance); // Assuming the API response contains the user's balance
      })
      .catch((error) => {
        console.error('Error fetching user balance:', error);
      });
  };

  // Fetch the user's balance on component mount
  useEffect(() => {
    getUserDetailByFetchAPICall();
    // fetchUserBalance(); // Uncomment this line if you want to use the axios request
  }, []);

  return (

      <div style={{ textAlign: 'center' }}>
        <h1>Rise Online Parası Satın Al</h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <Card
            imageUrl="/images/homepage.jpg"
            title="Title"
            description="Description"
          />
          <Card
            imageUrl="/images/homepage.jpg"
            title="Title"
            description="Description"
          />
          <Card
            imageUrl="/images/homepage.jpg"
            title="Title"
            description="Description"
          />
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" value={amount} onChange={handleAmountChange} />
        </div>
        <button onClick={handleBuyClick}>Satın Al</button>
      </div>
  );
};

export default ItemPage;
