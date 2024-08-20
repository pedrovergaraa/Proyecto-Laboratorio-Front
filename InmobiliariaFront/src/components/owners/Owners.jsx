import { useState, useEffect } from 'react';
import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';
import { getAllOwners } from '../../services/OwnerService';

const Owners = () => {
  const [owners, setOwners] = useState([]);

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    // Añade más columnas según lo necesario
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
      <Card title='Owners'>
        <Table columns={columns} data={owners} />
      </Card>
    </div>
  );
};

export default Owners;
