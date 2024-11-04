// src/components/Owner.jsx
import React, { useEffect, useState } from 'react';
import Table from '../../shared-components/table/Table';
import Card from '../../shared-components/card/card';
import {
  fetchAllProperties,
  fetchAllLandlords,
  fetchAllTenants,
  fetchAllContracts,
  createProperty,
  updateProperty,
  deleteProperty,
  createLandlord,
  updateLandlord,
  deleteLandlord,
  createTenant,
  updateTenant,
  deleteTenant,
  createContract,
  updateContract,
  deleteContract,
} from '../../services/OwnerService';

const Owner = () => {
  const [allEntities, setAllEntities] = useState([]);

  useEffect(() => {
    loadAllEntities();
  }, []);

  const loadAllEntities = async () => {
    try {
      const [properties, landlords, tenants, contracts] = await Promise.all([
        fetchAllProperties(),
        fetchAllLandlords(),
        fetchAllTenants(),
        fetchAllContracts(),
      ]);

      const formattedData = [
        ...properties.map((property) => ({ id: property.id, type: 'Property', email: property.email })),
        ...landlords.map((landlord) => ({ id: landlord.id, type: 'Landlord', email: landlord.email })),
        ...tenants.map((tenant) => ({ id: tenant.id, type: 'Tenant', email: tenant.email })),
        ...contracts.map((contract) => ({ id: contract.id, type: 'Contract', email: contract.email })),
      ];

      setAllEntities(formattedData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleCreate = async (newEntity) => {
    try {
      if (newEntity.type === 'Property') await createProperty(newEntity);
      else if (newEntity.type === 'Landlord') await createLandlord(newEntity);
      else if (newEntity.type === 'Tenant') await createTenant(newEntity);
      else if (newEntity.type === 'Contract') await createContract(newEntity);

      loadAllEntities();
    } catch (error) {
      console.error("Error creating entity", error);
    }
  };

  const handleEdit = async (editedEntity) => {
    try {
      if (editedEntity.type === 'Property') await updateProperty(editedEntity);
      else if (editedEntity.type === 'Landlord') await updateLandlord(editedEntity);
      else if (editedEntity.type === 'Tenant') await updateTenant(editedEntity);
      else if (editedEntity.type === 'Contract') await updateContract(editedEntity);

      loadAllEntities();
    } catch (error) {
      console.error("Error updating entity", error);
    }
  };

  const handleDelete = async (id, type) => {
    try {
      if (type === 'Property') await deleteProperty(id);
      else if (type === 'Landlord') await deleteLandlord(id);
      else if (type === 'Tenant') await deleteTenant(id);
      else if (type === 'Contract') await deleteContract(id);

      loadAllEntities();
    } catch (error) {
      console.error("Error deleting entity", error);
    }
  };

  const columns = [
    { Header: 'Tipo', accessor: 'type' },
    { Header: 'Email', accessor: 'mail' },
  ];

  return (
    <Card title="Resumen de Entidades Inmobiliarias" allowAdd={true} onAdd={handleCreate}>
      <Table columns={columns} data={allEntities} onEdit={handleEdit} onDelete={handleDelete} />
    </Card>
  );
};

export default Owner;
