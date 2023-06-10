import React, { useState } from 'react';
import './Card.module.css'; // Import your CSS file with styles
import Image from 'next/image';

const Card = ({id, imageUrl, title, description, price, quantity }) => {
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
          <input />
          <button onClick ={() => console.log(id)}>Sepete ekle</button>
        </div>
    </div>
  );
};

export default Card;