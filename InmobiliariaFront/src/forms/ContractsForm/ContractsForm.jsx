import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ContractsForm = ({ contract, onSubmit }) => {
  const [formData, setFormData] = useState({
    contractId: contract ? contract.contractId : '',
    propertyId: contract ? contract.propertyId : '',
    tenantName: contract ? contract.tenantName : '',
    rentAmount: contract ? contract.rentAmount : '',
    status: contract ? contract.status : '',
  });

  useEffect(() => {
    if (contract) {
      setFormData({
        contractId: contract.contractId,
        propertyId: contract.propertyId,
        tenantName: contract.tenantName,
        rentAmount: contract.rentAmount,
        status: contract.status,
      });
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
      <label>
        Contract ID:
        <input type="text" name="contractId" value={formData.contractId} onChange={handleChange} required />
      </label>
      <label>
        Property ID:
        <input type="text" name="propertyId" value={formData.propertyId} onChange={handleChange} required />
      </label>
      <label>
        Tenant:
        <input type="text" name="tenantName" value={formData.tenantName} onChange={handleChange} required />
      </label>
      <label>
        Rent Amount:
        <input type="number" name="rentAmount" value={formData.rentAmount} onChange={handleChange} required />
      </label>
      <label>
        Status:
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
      <button type="submit">Guardar</button>
    </form>
  );
};

ContractsForm.propTypes = {
  contract: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default ContractsForm;
