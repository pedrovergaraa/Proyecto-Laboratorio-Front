import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';

import React, { useEffect } from 'react'

const URL = 'https://swapi.dev/api/people/1'



const Properties = () => {

<<<<<<< HEAD
   useEffect(()=>{
    const response = fetch(URL);
    const data = response.json();
    console.log(data)
  },[])

=======
>>>>>>> 5edb6395f28c5ecfa3b22c943c03ff45a2b42c3e
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
