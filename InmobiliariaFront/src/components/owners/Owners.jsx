import React, { useState, useEffect } from 'react';
import Card from '../../shared-components/card/Card';
import Table from '../../shared-components/table/Table';
import { getAllOwners } from '../../services/OwnerService';

const Owners = () => {
  const [owners, setOwners] = useState([]);

  // Define las columnas que quieres mostrar en la tabla
  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Role', accessor: 'role' },
    { Header: 'Admin ID', accessor: 'adminId' },
    // Añade más columnas si es necesario
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllOwners();
      if (data) {
        setOwners(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Owners</h1>
      <Card title="Owners">
        <Table columns={columns} data={owners} />
      </Card>
    </div>
  );
};

export default Owners;
