import { useState, useEffect } from 'react';
import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';

const Owners = () => {
  const [owners, setOwners] = useState([]);


  const getAllOwners = async (owners) => {
    try {
      const response = await fetch(`http://localhost:8080/Admin/all`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    // Añade más columnas según lo necesario
  ];


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOwners();
        if (data) {
          setOwners(data);
        }
      } catch (error) {
        console.error('Error fetching owners:', error);
        // Puedes agregar un estado para manejar los errores y mostrar un mensaje al usuario.
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
