import React, { useState } from 'react';
import './Card.module.css'; // Import your CSS file with styles
import Image from 'next/image';
import axios from 'axios';
import Router from 'next/router';
import { useGlobalContext } from '../contexts';

const Card = ({id, imageUrl, title, description, price, quantity }) => {
  const [itemQuantity, setItemQuantity] = useState(0);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemQuantity(+value);
  };
  const {accessToken} = useGlobalContext();
  const handleBuyClick = async () => {
    try{
      const url = process.env.BACKEND_BASE_URL
      const api = '/api/Transaction/BuyItem'
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.post(url + api, {items: [{itemId:id, count:itemQuantity}]}, options);
      var x = response.data;
      console.log(x);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card">
      <div
        className="card-image"
      />
      <Image src={imageUrl} alt={title} width={300} height={300} />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <h3 className="card-price">{price} TL STOK: {quantity}</h3>
      </div>
      <div>
          <label>Miktar:</label>
          <input onChange={handleInputChange} />
          <button onClick ={handleBuyClick}>Satın al</button>
        </div>
    </div>
  );
};

export default Card;