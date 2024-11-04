// src/forms/ContractsForm/ContractsForm.jsx

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ContractsForm = ({ contract, onSubmit, fields = [] }) => { // Valor por defecto para fields
  const initialFormData = {
    date: '',         // Cambiado de startDate a date
    endDate: '',
    landlordMail: '', // Cambiado de ownerEmail a landlordMail
    tenantMail: '',   // Cambiado de tenantEmail a tenantMail
    rentAmount: '',
    ...contract,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (contract) {
      setFormData(contract);
    }
  }, [contract]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.includes('date') && (
        <label>
          Fecha de Inicio:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
      )}
      {fields.includes('endDate') && (
        <label>
          Fecha de Finalización:
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </label>
      )}
      {fields.includes('landlordMail') && (
        <label>
          Email del Propietario:
          <input
            type="email"
            name="landlordMail"
            value={formData.landlordMail}
            onChange={handleChange}
            required
          />
        </label>
      )}
      {fields.includes('tenantMail') && (
        <label>
          Email del Inquilino:
          <input
            type="email"
            name="tenantMail"
            value={formData.tenantMail}
            onChange={handleChange}
            required
          />
        </label>
      )}
      {fields.includes('rentAmount') && (
        <label>
          Monto:
          <input
            type="number"
            name="rentAmount"
            value={formData.rentAmount}
            onChange={handleChange}
            required
          />
        </label>
      )}
      <button type="submit">Guardar</button>
    </form>
  );
};

ContractsForm.propTypes = {
  contract: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string),
};

ContractsForm.defaultProps = {
  fields: [], // Valor predeterminado si fields no está definido
};

export default ContractsForm;
