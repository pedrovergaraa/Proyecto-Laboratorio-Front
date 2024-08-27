import React from 'react'
import Card from '../../usable/card/card';
import Table from '../../usable/table/Table';
import TenantsForm from '../../forms/TenantsForm/TenantsForm';


const Tenants = () => {
  return (
    <div>
      <h1>Tenants</h1>
      <Card title='Inquilinos' FormComponent={TenantsForm}>
        <Table></Table>
      </Card>
    </div>
  )
}

export default Tenants
