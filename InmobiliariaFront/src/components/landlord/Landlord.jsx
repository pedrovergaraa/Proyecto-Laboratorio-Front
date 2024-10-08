import React from 'react'
import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';
import LandlordForm from '../../forms/LandlordsForm/LandlordsForm';


const Landlord = () => {


  return (
    <div>
      <Card title='Propietarios' FormComponent={LandlordForm}>
        <Table></Table>
      </Card>
    </div>
  )
}

export default Landlord;
