import React from 'react'
import Card from '../../usable/card/card';
import Table from '../../usable/table/Table';
import ContractsForm from '../../forms/ContractsForm/ContractsForm';

const Contracts = () => {
  return (
    <div>
      <h1>Contracts</h1>
      <Card title='Contratos' FormComponent={ContractsForm}>
        <Table></Table>
      </Card>
      
    </div>
  )
}

export default Contracts;
