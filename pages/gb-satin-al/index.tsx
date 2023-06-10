import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../layout';
import Card from '../../components/Card';
import { set } from 'date-fns';

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
  const [items, setItems] = useState<itemInfo[]>([]);
 
  const FetchItems = async () => {
    try {
     
      const requestBody = {
        query: `
          query {
            items{
              nodes{
                id,
                title,
                price,
                imageUrl,
                description,
                quantity
              }
            }
          }
        `,
      };
      const headers = {
        'content-type': 'application/json'
      };
      const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      };
      
      
      console.log(process.env.GRAPHQL_BASE_URL)
      const response = await fetch(process.env.GRAPHQL_BASE_URL, options);
      const data = await response.json();
      setItems(data?.data?.items?.nodes);
      console.log('RESPONSE FROM FETCH REQUEST', data?.data?.items?.nodes);
      
    } catch (err) {
      console.log('ERROR DURING FETCH REQUEST', err);
    }
  }
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

  

  // Fetch the user's balance on component mount
useEffect(() => {
    FetchItems();
  }
, []);

  return (

      <div style={{ textAlign: 'center' }}>
        <h1>Rise Online Parası Satın Al</h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
          }}
        >{/* 
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
          /> */}
          {items.map((item) => (
            <Card
              key = {item.id}
              id = {item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              description={item.description}
              price={item.price}
              quantity={item.quantity}
            />  
          ))}
        </div>
        
      </div>
  );
};

export default ItemPage;
