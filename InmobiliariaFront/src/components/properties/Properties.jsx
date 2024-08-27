import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';

import React, { useEffect } from 'react'

const URL = 'https://swapi.dev/api/people/1'



const Properties = () => {

  return (
    <div>
      <h1>Propiedades</h1>
      <Card title='Propiedades'>
        <Table></Table>
      </Card>
    </div>
  )
}

export default Properties
