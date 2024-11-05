import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { showSuccessToast } from '../../shared-components/notifiaction/AddUser';

const ContractsForm = ({ contract, onSubmit, fields = [] }) => {
  const initialFormData = {
    date: contract?.date?.slice(0, 10) || '',
    endDate: contract?.endDate?.slice(0, 10) || '',
    landlordMail: contract?.landlordMail || '',
    tenantMail: contract?.tenantMail || '',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (contract) {
      setFormData({
        date: contract.date?.slice(0, 10) || '',
        endDate: contract.endDate?.slice(0, 10) || '',
        landlordMail: contract.landlordMail || '',
        tenantMail: contract.tenantMail || '',
      });
    } else {
      setFormData(initialFormData);
    }
  }, [contract]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      showSuccessToast('Contrato guardado con éxito');
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error al guardar el contrato:", error);
      // Podrías agregar un toast de error aquí si lo deseas
    }
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
  fields: [],
};

export default ContractsForm;
