import React, { useEffect, useState, useContext } from "react";
import Card from "../../shared-components/card/Card";
import './userTenant.css';
import PaymentsFormTenant from "../paymentTenant/PaymentFormTenant"; 
import ModalForm from "../../shared-components/modal/modalForm"; 
import { AuthenticationContext } from "../../context/authenticationContext/auth.context";
import { fetchContractByMail, fetchPropertyByMail, fetchPaymentsByMail, createPayment } from "../../services/userTenantService"; 
import Table from "../../shared-components/table/Table"; 
import { toast } from 'react-toastify'; // Importa toast de react-toastify

const UserTenant = () => {
  const [contract, setContract] = useState(null);
  const [property, setProperty] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); 
  const [payments, setPayments] = useState([]); 
  const { user } = useContext(AuthenticationContext); 

  useEffect(() => {
    if (user && user.mail) { 
      fetchContractByMail(user.mail).then(setContract);
      fetchPropertyByMail(user.mail).then(setProperty);
      fetchPaymentsByMail(user.mail).then(setPayments);  
    } else {
      console.error("No se ha encontrado el correo del usuario.");
    }
  }, [user]);

  const handleOpenPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handleSubmit = async (newPaymentData) => {
    try {
      const newPayment = await createPayment(newPaymentData);
      if (newPayment) {
        setPayments((prevPayments) => [...prevPayments, newPayment]);
        toast.success("¡Pago agregado con éxito!"); // Muestra la notificación de éxito
        handleClosePaymentModal();
      } else {
        console.error("Error al crear el pago");
      }
    } catch (error) {
      console.error("Error al crear el pago:", error);
      toast.error("Hubo un error al agregar el pago."); // Notificación de error en caso de fallo
    }
  };

  const contractColumns = [
    { Header: 'Fecha de Inicio', accessor: 'date' },
    { Header: 'Fecha de Fin', accessor: 'endDate' },
  ];

  const paymentsColumns = [
    { Header: 'Fecha', accessor: 'date' },
    { Header: 'Monto', accessor: 'amount' },
  ];

  const formattedContracts = contract && contract.length > 0 
    ? contract.map(c => ({
        date: new Date(c.date).toLocaleDateString(),
        endDate: new Date(c.endDate).toLocaleDateString(),
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
            showActions={false}
          />
        ) : (
          <p>El contrato está vacío o no se encontró.</p>
        )}
      </Card>

      <Card title="Propiedad">
        {property ? (
          <div>
            <p><strong>Dirección:</strong> {property.address}</p>
            <p><strong>Descripción:</strong> {property.description}</p>
          </div>
        ) : (
          <p>La propiedad está vacía.</p>
        )}
      </Card>

      <Card title="Pagos">
        {formattedPayments.length > 0 ? (
          <Table
            columns={paymentsColumns}
            data={formattedPayments}
            showActions={false}
          />
        ) : (
          <p>No hay pagos registrados.</p>
        )}
        <button className="button-user" onClick={handleOpenPaymentModal}>Realizar pago</button>
      </Card>

      {isPaymentModalOpen && (
        <ModalForm isOpen={isPaymentModalOpen} onClose={handleClosePaymentModal}>
          <PaymentsFormTenant
            onClose={handleClosePaymentModal}
            tenantMail={user?.mail || ''} 
            onAdd={handleSubmit}
          />
        </ModalForm>
      )}
    </div>
  );
};

export default UserTenant;
