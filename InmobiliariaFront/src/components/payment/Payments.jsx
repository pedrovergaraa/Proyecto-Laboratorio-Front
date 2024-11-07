import React, { useState, useEffect } from 'react';
import {  toast } from 'react-toastify';
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
      toast.success("Pago añadido con éxito");
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
      toast.success("Pago actualizado con éxito");
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
      toast.success("Pago eliminado con éxito");
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
    { Header: 'Email del Propietario', accessor: 'landlordMail' },
    { 
      Header: 'Fecha de Pago', 
      accessor: 'date', 
      Cell: ({ value }) => new Date(value).toLocaleDateString() 
    },
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
