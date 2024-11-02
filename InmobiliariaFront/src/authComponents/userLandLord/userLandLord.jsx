import React, { useEffect, useState, useContext } from "react";
import './UserLandLord.css';
import Card from "../../shared-components/card/card";
import PaymentsForm from "../../forms/PaymentsForm/PaymentsForm";
import ModalForm from "../../shared-components/modal/modalForm"; // Importa tu modal
import { AuthenticationContext } from "../../context/authenticationContext/auth.context";


const UserLandLord = () => {
  const [contract, setContract] = useState(null);
  const [property, setProperty] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // Estado para el modal de pagos
  const { user } = useContext(AuthenticationContext);

  const fetchContract = async () => {
    try {
      const response = await fetch(`https://api.example.com/contracts/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setContract(data);
      } else {
        setContract(null);
      }
    } catch (error) {
      console.error("Error fetching contract:", error);
      setContract(null);
    }
  };

  const fetchProperty = async () => {
    try {
      const response = await fetch(`https://api.example.com/properties/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setProperty(data);
      } else {
        setProperty(null);
      }
    } catch (error) {
      console.error("Error fetching property:", error);
      setProperty(null);
    }
  };

  useEffect(() => {
    fetchContract();
    fetchProperty();
  }, []);

  const handleOpenPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="user-body">

      <Card title="Contrato">
        {contract ? (
          <div>
            <p><strong>Tipo de Contrato:</strong> {contract.type}</p>
            <p><strong>Fecha de Inicio:</strong> {contract.startDate}</p>
            <p><strong>Fecha de Fin:</strong> {contract.endDate}</p>
          </div>
        ) : (
          <p>El contrato está vacío.</p>
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


      
      {/* Modal para realizar el pago */}
      {isPaymentModalOpen && (
        <ModalForm isOpen={isPaymentModalOpen} onClose={handleClosePaymentModal}>
          <PaymentsForm onClose={handleClosePaymentModal} /> {/* Asegúrate de que el formulario tenga esta prop */}
        </ModalForm>
      )}
    </div>
  );
};

export default UserLandLord;
