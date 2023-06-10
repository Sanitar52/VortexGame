import React, { useState } from 'react';
import '../../styles/testgb.module.css'; // Import your CSS file with style

const HomePage = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [itemAmount, setItemAmount] = useState('');

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  const handleAmountChange = (event) => {
    setItemAmount(event.target.value);
  };

  return (
    <div className="container">
      <div className="button-container">
        <button
          className={`item-button ${selectedButton === 1 ? 'active' : ''}`}
          onClick={() => handleButtonClick(1)}
        >
          Button 1
        </button>
        <button
          className={`item-button ${selectedButton === 2 ? 'active' : ''}`}
          onClick={() => handleButtonClick(2)}
        >
          Button 2
        </button>
        <button
          className={`item-button ${selectedButton === 3 ? 'active' : ''}`}
          onClick={() => handleButtonClick(3)}
        >
          Button 3
        </button>
      </div>
      <div className="amount-box-container">
        {selectedButton && (
          <div className="amount-box">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={itemAmount}
              onChange={handleAmountChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
