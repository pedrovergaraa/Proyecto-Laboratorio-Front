import React, { useContext } from 'react';
import { AuthenticationContext } from '../../context/authenticationContext/auth.context';
import { createPayment } from '../../services/userTenantService';
import { toast } from 'react-toastify'; // Importa toast

const PaymentsForm = ({ onClose }) => {
    const { user } = useContext(AuthenticationContext); 
    const tenantMail = user?.mail; 

    const handleAddClick = async (event) => {
        event.preventDefault();

        if (!tenantMail) {
            console.error("Email no está disponible.");
            return;
        }

        const paymentData = {
            tenantMail, 
            amount: parseFloat(event.target.price.value),
        };

        console.log("Payment data:", paymentData);

        const result = await createPayment(paymentData);
        if (result) {
            toast.success("¡Pago realizado con éxito!"); // Muestra la notificación de éxito
            onClose(); 
        } else {
            console.error("Error al realizar el pago.");
            toast.error("Hubo un error al realizar el pago."); // Notificación de error en caso de fallo
        }
    };

    return (
        <form onSubmit={handleAddClick}>
            <div>
                <label>Total</label>
                <input type="number" name="price" required />
            </div>
            <button type="submit">Pagar</button>
        </form>
    );
};

export default PaymentsForm;
