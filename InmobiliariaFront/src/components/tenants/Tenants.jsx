import React from 'react'
import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';
import TenantsForm from '../../forms/TenantsForm/TenantsForm';


const Tenants = () => {


  return (
    <div>
      <Card title='Inquilinos' FormComponent={TenantsForm}>
        <Table></Table>
      </Card>
    </div>
  )
}

export default Tenants
