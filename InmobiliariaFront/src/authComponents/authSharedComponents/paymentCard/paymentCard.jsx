import React from 'react';
import './PaymentCard.css';

const PaymentCard = ({ title, children }) => {
  return (
    <div className="payment-card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-content">
        {children}
      </div>
      <button className="pay-button">Pagar</button>
    </div>
  );
};

export default PaymentCard;
