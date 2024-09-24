import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';
import React from 'react'
import PropertiesForm from '../../forms/PropertiesForm/PropertiesForm';
import { fetchAllProperties } from '../../services/SysAdminService';


const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Llamar a la API para obtener las propiedades
    const fetchProperties = async () => {
      const data = await fetchAllProperties();
      setProperties(data);
    };

    fetchProperties();
  }, []);

  // Definir las columnas para la tabla
  const columns = [
    { Header: 'Address', accessor: 'address' },
    { Header: 'Owner', accessor: 'ownerName' },
    { Header: 'Rent', accessor: 'rent' },
  ];

  return (
    <div>
      <Card title='Propiedades' FormComponent={PropertiesForm}>
        <Table columns={columns} data={properties} ></Table>
      </Card>
    </div>
  )
}

export default Properties
