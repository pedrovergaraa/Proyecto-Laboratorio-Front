import React, { useState, useEffect } from 'react'
import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';
import LandlordForm from '../../forms/LandlordsForm/LandlordsForm';
import { fetchAllLandlords } from '../../services/LandlordService';


const Landlord = () => {
  const [landlords, setLandlords] = useState([]);

  useEffect(() => {
    // Llamar a la API para obtener los landlords
    const fetchLandlords = async () => {
      const data = await fetchAllLandlords();
      setLandlords(data);
    };

    fetchLandlords();
  }, []);

  // Definir las columnas para la tabla
  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'mail', accessor: 'mail' },
    { Header: 'Phone', accessor: 'phone' },
  ];


  return (
    <div>
      <Card title='Propietarios' FormComponent={LandlordForm}>
        <Table  columns={columns} data={landlords} ></Table>
      </Card>
    </div>
  )
}

export default Landlord;
