import React from 'react'
import ContractsForm from '../../forms/ContractsForm/ContractsForm';
import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';
import { fetchAllContracts } from '../../services/SysAdminService';


const Contracts = () => {

  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    // Llamar a la API para obtener los contratos
    const fetchContracts = async () => {
      const data = await fetchAllContracts();
      setContracts(data);
    };

    fetchContracts();
  }, []);

  // Definir las columnas para la tabla
  const columns = [
    { Header: 'Contract ID', accessor: 'contractId' },
    { Header: 'Property ID', accessor: 'propertyId' },
    { Header: 'Tenant', accessor: 'tenantName' },
    { Header: 'Rent Amount', accessor: 'rentAmount' },
    { Header: 'Status', accessor: 'status' },
  ];

  return (
    <div>
      <Card title='Contratos' FormComponent={ContractsForm}>
        <Table columns={columns} data={contracts}></Table>
      </Card>
      
    </div>
  )
}

export default Contracts;
