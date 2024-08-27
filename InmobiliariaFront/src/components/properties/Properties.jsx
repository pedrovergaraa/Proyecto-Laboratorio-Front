import Card from '../../usable/card/card';
import Table from '../../usable/table/Table';
import React from 'react'
import propertiesForm from '../../forms/prpertiesForm/propertiesForm';


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
