import React from 'react';
import './Card.module.css'; // Import your CSS file with styles
import Image from 'next/image';

const Card = ({ imageUrl, title, description }) => {
  return (
    <div className="card">
      <div
        className="card-image"
      />
      <Image src={imageUrl} alt={title} width={300} height={300} />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;