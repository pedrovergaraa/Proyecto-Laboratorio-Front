import React from 'react';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser'; 

const PaymentsForm = ({ onAdd, onClose }) => {
  const handleAddClick = (event) => {
    event.preventDefault(); 

    if (onAdd) {
      onAdd();
    }

    showSuccessToast("Pago realizado con exito!");

    if (onClose) {
      onClose(); 
    }
  };

  return (
    <form>
      <div>
        <label>Total</label>
        <input type="number" name="price" />
      </div>
      <div>
        <label>Fecha</label>
        <input type="date" name="date" />
      </div>
      <button type="submit" onClick={handleAddClick}>Pagar</button>
      <ToastContainerComponent />
    </form>
  );
};

export default PaymentsForm;
