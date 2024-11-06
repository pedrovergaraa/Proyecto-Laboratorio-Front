// PaymentsForm.jsx
import React, { useContext } from 'react';
import { AuthenticationContext } from '../../context/authenticationContext/auth.context';
import { createPayment } from '../../services/userTenantService'; 

const PaymentsForm = ({ onClose }) => {
    const { user } = useContext(AuthenticationContext); 
    const token = user?.token; 
    const tenantMail = user?.mail; 

    const handleAddClick = async (event) => {
        event.preventDefault();

        // Verificamos que el email esté definido
        if (!tenantMail) {
            console.error("Email no está disponible.");
            return;
        }

        const paymentData = {
            tenantMail, 
            amount: parseFloat(event.target.price.value),
            // date: event.target.date.value 
        };

        console.log("Payment data:", paymentData); // Verificamos que el email se está enviando

        const result = await createPayment(paymentData); // Llamamos a createPayment sin el token aquí
        if (result) {
            // showSuccessToast("Pago realizado con éxito!");
            onClose(); 
        } else {
            console.error("Error al realizar el pago.");
        }
    };

    return (
        <form onSubmit={handleAddClick}>
            <div>
                <label>Total</label>
                <input type="number" name="price" required />
            </div>
            {/* <div>
                <label>Fecha</label>
                <input type="date" name="date" required />
            </div> */}
            <button type="submit">Pagar</button>
        </form>
    );
};

export default PaymentsForm;
