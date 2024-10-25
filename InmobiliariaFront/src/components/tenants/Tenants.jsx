import { useState, useEffect } from 'react';
import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';
import { fetchAllTenants } from '../../services/SysAdminService';
import TenantsForm from '../../forms/TenantsForm/TenantsForm';

const Tenants = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      const data = await fetchAllTenants();
      setTenants(data);
    };
    fetchTenants();
  }, []);

  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'mail', accessor: 'mail' },
    { Header: 'Phone', accessor: 'phone' },
  ];

  return (
    <div>
      <Card title='Inquilinos' FormComponent={TenantsForm}>
        <Table columns={columns} data={tenants} />
      </Card>
    </div>
  );
};

export default Tenants;
