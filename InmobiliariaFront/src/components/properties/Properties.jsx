import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';
import React from 'react'
import PropertiesForm from '../../forms/PropertiesForm/PropertiesForm';


const Properties = () => {

  return (
    <div>
      <Card title='Propiedades' FormComponent={PropertiesForm}>
        <Table></Table>
      </Card>
    </div>
  )
}

export default Properties
