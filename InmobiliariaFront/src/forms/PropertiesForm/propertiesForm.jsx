// propertiesForm.jsx
import React, { useState, useEffect } from 'react';
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser';
import { createProperty } from '../../services/PropertyService'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import { fetchAllOwners } from '../../services/OwnerService'; // Asegúrate de ajustar la ruta

const PropertiesForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    address: '',
    description: '',
    landlordMail: '',
    tenantMail: '',
    ownerMail: 'owner@hotmail.com',
  });

  const [landlordMails, setLandlordMails] = useState([]); // Estado para correos de landlords
  const [tenantMails, setTenantMails] = useState([]); // Estado para correos de tenants

  // Obtener landlords y tenants al cargar el formulario
  useEffect(() => {
    const fetchmails = async () => {
      try {
        const { landlordMails, tenantMails } = await fetchAllOwners();
        setLandlordMails(landlordMails);
        setTenantMails(tenantMails);
      } catch (error) {
        console.error('Error fetching owner mails:', error);
      }
    };

    fetchmails();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddClick(formData); // Llama a la función para agregar la propiedad
    setFormData({
      address: '',
      description: '',
      landlordMail: '',
      tenantMail: '',
      ownerMail: 'owner@hotmail.com',
    });
  };

  const handleAddClick = async (property) => {
    try {
      const newProperty = await createProperty(property); // Llama al servicio para crear la propiedad
      showSuccessToast('Propiedad añadida exitosamente'); // Muestra la notificación de éxito
      onAdd(newProperty); // Llama a la función onAdd pasada como prop para actualizar la lista de propiedades
    } catch (error) {
      console.error('Error al añadir la propiedad:', error);
      // Aquí podrías manejar la notificación de error si es necesario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Aquí van tus campos de formulario */}
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
      
      {/* Dropdown para seleccionar el mail del propietario (landlord) */}
      <label>Email Propietario:</label>
      <select
        value={formData.landlordMail}
        onChange={(e) => setFormData({ ...formData, landlordMail: e.target.value })}
      >
        <option value="">Seleccionar propietario</option>
        {landlordMails.map((mail, index) => (
          <option key={index} value={mail}>
            {mail}
          </option>
        ))}
      </select>

      {/* Dropdown para seleccionar el mail del inquilino (tenant) */}
      <label>Email Inquilino:</label>
      <select
        value={formData.tenantMail}
        onChange={(e) => setFormData({ ...formData, tenantMail: e.target.value })}
      >
        <option value="">Seleccionar inquilino</option>
        {tenantMails.map((mail, index) => (
          <option key={index} value={mail}>
            {mail}
          </option>
        ))}
      </select>

      <button type="submit">Añadir Propiedad</button>
      <ToastContainerComponent /> {/* Asegúrate de incluir el componente Toast */}
    </form>
  );
};

export default PropertiesForm;
