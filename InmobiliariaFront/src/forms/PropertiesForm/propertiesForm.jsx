import React, { useState, useEffect } from 'react';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser';
import { createProperty } from '../../services/PropertyService'; 
import { fetchAllLandlords } from '../../services/LandlordService';
import { fetchAllTenants } from '../../services/TenantService';

const PropertiesForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    address: '',
    description: '',
    landlordMail: '',
    tenantMail: '',
    ownerMail: '', // asumiendo que también tienes este campo en `formData`
  });

  const [landlord, setLandlord] = useState([]); 
  const [tenant, setTenant] = useState([]); 

  useEffect(() =>  {
    const fetchTenants = async () => {
      const tenants = await fetchAllTenants();
      if (tenants) {
        setTenant(tenants);
      }
    };

    const fetchLandlords = async () => {
      const landlords = await fetchAllLandlords();
      if (landlords) {
        setLandlord(landlords);
      }
    };

    fetchTenants();
    fetchLandlords();
  }, []); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newProperty = await createProperty(formData); 
      showSuccessToast('Propiedad añadida exitosamente'); 
      onAdd(newProperty); 
    } catch (error) {
      console.error('Error al añadir la propiedad:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Dirección:</label>
      <input
        type="text"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
      <label>Descripción:</label>
      <input
        type="text"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      
      <label>Email Propietario:</label>
      <select
        value={formData.landlordMail}
        onChange={(e) => setFormData({ ...formData, landlordMail: e.target.value })}
      >
        <option value="">Seleccionar propietario</option>
        {landlord.map((item, index) => (
          <option key={index} value={item.mail}>
            {item.mail}
          </option>
        ))}
      </select>

      <label>Email Inquilino:</label>
      <select
        value={formData.tenantMail}
        onChange={(e) => setFormData({ ...formData, tenantMail: e.target.value })}
      >
        <option value="">Seleccionar inquilino</option>
        {tenant.map((item, index) => (
          <option key={index} value={item.mail}>
            {item.mail}
          </option>
        ))}
      </select>

      <button type="submit">Añadir Propiedad</button>
      <ToastContainerComponent /> 
    </form>
  );
};

export default PropertiesForm;
