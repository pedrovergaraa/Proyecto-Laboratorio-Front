import React from 'react'
import ContractsForm from '../../forms/ContractsForm/ContractsForm';
import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';


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
