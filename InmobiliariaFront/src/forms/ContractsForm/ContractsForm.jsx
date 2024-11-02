// src/forms/ContractsForm/ContractsForm.jsx

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ContractsForm = ({ contract, onSubmit, fields }) => {
  const initialFormData = {
    startDate: '',
    endDate: '',
    ownerEmail: '',
    tenantEmail: '',
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
      {fields.includes('startDate') && (
        <label>
          Fecha de Inicio:
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
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
      {fields.includes('ownerEmail') && (
        <label>
          Email del Propietario:
          <input
            type="email"
            name="ownerEmail"
            value={formData.ownerEmail}
            onChange={handleChange}
            required
          />
        </label>
      )}
      {fields.includes('tenantEmail') && (
        <label>
          Email del Inquilino:
          <input
            type="email"
            name="tenantEmail"
            value={formData.tenantEmail}
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
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ContractsForm;
