import React from 'react'
import OwnersForm from '../../forms/OwnersForm/ownersForm';
import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';

const Owners = () => {
  return (
    <div>
      <h1>Inmobiliaria</h1>
      <Card title='Inmobiliaria' FormComponent={OwnersForm}>
        <Table></Table>
      </Card>
    </div>
  )
}

export default Owners
