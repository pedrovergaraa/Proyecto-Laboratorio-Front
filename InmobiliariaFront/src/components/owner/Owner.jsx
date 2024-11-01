// src/components/Owner.jsx
import React, { useEffect, useState } from 'react';
import Table from '../../shared-components/table/Table';
import Card from '../../shared-components/card/card';
import { fetchAllProperties, fetchAllLandlords, fetchAllTenants, fetchAllContracts } from '../../services/OwnerService';

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
        ...properties.map((property) => ({ type: 'Property', email: property.email })),
        ...landlords.map((landlord) => ({ type: 'Landlord', email: landlord.email })),
        ...tenants.map((tenant) => ({ type: 'Tenant', email: tenant.email })),
        ...contracts.map((contract) => ({ type: 'Contract', email: contract.email })),
      ];

      setAllEntities(formattedData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const columns = [
    { Header: 'Tipo', accessor: 'type' },
    { Header: 'Email', accessor: 'email' },
  ];

  return (
    <Card title="Resumen de Entidades Inmobiliarias" allowAdd={false}>
      <Table columns={columns} data={allEntities} />
    </Card>
  );
};

export default Owner;