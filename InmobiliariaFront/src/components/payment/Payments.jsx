import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentsForm from '../../forms/PaymentsForm/PaymentsForm'; 
import { ToastContainerComponent, showSuccessToast } from '../../shared-components/notifiaction/AddUser'; 
import Card from '../../shared-components/card/Card';
import Table from '../../shared-components/table/Table';
import {
  fetchAllPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from '../../services/PaymentsService'; 

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await fetchAllPayments();
        setPayments(data);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar los pagos");
      }
    };
    fetchPayments();
  }, []);

  const handleAddPayment = async (paymentData) => {
    try {
      const newPayment = await createPayment(paymentData);
      setPayments([...payments, newPayment]);
      showSuccessToast("Pago añadido con éxito"); // Usar showSuccessToast para notificación
      setShowAddModal(false); 
    } catch (error) {
      console.error(error);
      toast.error("Error al añadir el pago");
    }
  };

  const handleEditPayment = async (updatedPayment) => {
    try {
      const payment = await updatePayment(updatedPayment.id, updatedPayment);
      setPayments(
        payments.map((p) => (p.id === updatedPayment.id ? payment : p))
      );
      showSuccessToast("Pago actualizado con éxito"); // Usar showSuccessToast para notificación
      setShowAddModal(false); 
      setSelectedPayment(null); 
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el pago");
    }
  };

  const handleDeletePayment = async (paymentId) => {
    try {
      await deletePayment(paymentId);
      setPayments(payments.filter((payment) => payment.id !== paymentId));
      showSuccessToast("Pago eliminado con éxito"); // Usar showSuccessToast para notificación
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el pago");
    }
  };

  const handleSelectPayment = (payment) => {
    setSelectedPayment(payment);
    setShowAddModal(true); 
  };

  const columns = [
    { Header: 'Monto', accessor: 'amount' },
    { Header: 'Email del Inquilino', accessor: 'tenantMail' },
  ];

  return (
    <div>
      <Card title="Pagos" FormComponent={() => (
        <PaymentsForm 
          onSubmit={selectedPayment ? handleEditPayment : handleAddPayment} 
          payment={selectedPayment} 
          fields={['amount', 'landlordMail', 'date']} 
        />
      )}>
        <Table 
          columns={columns} 
          data={payments} 
          onEdit={handleEditPayment} 
          onDelete={handleDeletePayment} 
        />
      </Card>
      <ToastContainerComponent /> 
    </div>
  );
};

export default Payments;
