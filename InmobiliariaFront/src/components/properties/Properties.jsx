import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';
import React from 'react'
import propertiesForm from '../../forms/prpertiesForm/propertiesForm';

// const URL = 'https://swapi.dev/api/people/1'



const Properties = () => {

  return (
    <div>
      <h1>Propiedades</h1>
      <Card title='Propiedades' FormComponent={propertiesForm}>
        <Table></Table>
      </Card>
    </div>
  )
}

export default Properties
