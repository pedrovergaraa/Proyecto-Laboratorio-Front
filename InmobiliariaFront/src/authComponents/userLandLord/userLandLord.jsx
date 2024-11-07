import React, { useEffect, useState, useContext } from "react";
import './userLandLord.css';
import Card from "../../shared-components/card/Card";
import { AuthenticationContext } from "../../context/authenticationContext/auth.context";
import { fetchContractByLandLordMail, fetchPaymentsByLandLordMail, fetchPropertyByLandLordMail } from "../../services/userLandLordService";
import Table from "../../shared-components/table/Table"; 

const UserLandLord = () => {
  const [contract, setContract] = useState(null);
  const [property, setProperty] = useState(null);
  const [payments, setPayments] = useState(null)
  const { user } = useContext(AuthenticationContext); 

  useEffect(() => {
    if (user) { 
      fetchContractByLandLordMail(user.mail).then(setContract);  
      fetchPropertyByLandLordMail(user.mail).then(setProperty);   
      fetchPaymentsByLandLordMail(user.mail).then(setPayments);
    } else {
      console.error("No se ha encontrado el correo del usuario.");
    }
  }, [user]);

  const contractColumns = [
    {Header: 'Inquilino', accessor: 'tenantMail'},
    { Header: 'Fecha de Inicio', accessor: 'date' },
    { Header: 'Fecha de Fin', accessor: 'endDate' },
  ];

  const propertyColumns = [
    { Header: 'Dirección', accessor: 'address' },
    { Header: 'Descripción', accessor: 'description' },
  ];

 const paymentsColumns = [
    {Header: 'Fecha de pago', accessor: 'date'},
    {Header: 'Monto', accessor: 'amount'}
  ]

  const formattedContracts = contract && contract.length > 0 
  ? contract.map(c => {
      console.log("Contrato:", c); 
      return {
        tenantMail: c.tenantMail,
        date: new Date(c.date).toLocaleDateString(),
        endDate: new Date(c.endDate).toLocaleDateString(),
      };
    })
  : [];




  const formattedProperties = property && property.length > 0 
    ? property.map(p => ({
        address: p.address,  
        description: p.description,  
      }))
    : [];


    const formattedPayments = Array.isArray(payments) && payments.length > 0 
    ? payments.map(p => ({
        date: new Date(p.date).toLocaleDateString(),
        amount: p.amount,
      }))
    : [];



  return (
    <div className="user-body">
      <Card title="Contrato">
        {formattedContracts.length > 0 ? (
          <Table
            columns={contractColumns}
            data={formattedContracts}
            onEdit={() => {}} 
            onDelete={() => {}}
            showActions={false} 
          />
        ) : (
          <p>El contrato está vacío o no se encontró.</p>
        )}
      </Card>



      <Card title="Propiedad">
        {formattedProperties.length > 0 ? (
          <Table
            columns={propertyColumns}
            data={formattedProperties}
            onEdit={() => {}} 
            onDelete={() => {}}
            showActions={false} 
          />
        ) : (
          <p>La propiedad está vacía.</p>
        )}
      </Card>




      <Card title="Pagos">
        {formattedPayments.length > 0 ? (
          <Table
            columns={paymentsColumns}
            data={formattedPayments}
            onEdit={() => {}} 
            onDelete={() => {}}
            showActions={false} 
          />
        ) : (
          <p>No hay pagos registrados.</p>
        )}
      </Card>
    </div>
  );
};

export default UserLandLord;
