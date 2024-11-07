import React, { useState, useEffect } from 'react';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser';

const PaymentsForm = ({ onSubmit, onClose, payment }) => {
  const [formData, setFormData] = useState({
    amount: '',
    landlordMail: '',
    date: ''
  });

  useEffect(() => {
    if (payment) {
      setFormData(payment);
    }
  }, [payment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    showSuccessToast("Pago realizado con éxito!");
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Monto</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email del Propietario</label>
        <input
          type="email"
          name="landlordMail"
          value={formData.landlordMail}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Fecha</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Guardar</button>
      <ToastContainerComponent />
    </form>
  );
};

export default PaymentsForm;
