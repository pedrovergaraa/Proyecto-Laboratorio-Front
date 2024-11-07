import React, { useState } from 'react';

const PaymentsForm = ({ onSubmit, payment }) => {
  const [formData, setFormData] = useState({
    amount: payment?.amount || '',
    landlordMail: payment?.landlordMail || '',
    date: payment?.date || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Monto"
      />
      <input
        type="email"
        name="landlordMail"
        value={formData.landlordMail}
        onChange={handleChange}
        placeholder="Email del propietario"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Fecha de Pago"
      />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default PaymentsForm;
