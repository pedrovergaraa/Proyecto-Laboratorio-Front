import React, { useContext } from 'react';
import { AuthenticationContext } from '../../context/authenticationContext/auth.context';
import { createPayment } from '../../services/userTenantService';
import { toast } from 'react-toastify'; // Importa 'toast'

const PaymentsFormTenant = ({ onClose, tenantMail, onAdd }) => {

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!tenantMail) {
            console.error("Email no está disponible.");
            toast.error("No se pudo obtener el correo del inquilino.");
            return;
        }

        let amount = event.target.price.value.trim();
        
        // Reemplazamos el punto (.) de miles y la coma (,) por punto (.) decimal
        amount = amount.replace(/\./g, ''); 
        amount = amount.replace(',', '.');  

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            console.error("Monto no válido");
            toast.error("Por favor ingrese un monto válido.");
            return;
        }

        const paymentData = {
            tenantMail, 
            amount: parsedAmount,
        };

        console.log("Payment data:", paymentData); 
        try {
            const result = await createPayment(paymentData); // Llamamos a createPayment sin el token aquí
            if (result) {
                toast.success("¡Pago realizado con éxito!");
                onAdd(paymentData); 
                onClose(); 
            } else {
                toast.error("Error al realizar el pago.");
            }
        } catch (error) {
            console.error("Error al realizar el pago:", error);
            toast.error("Error al realizar el pago.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>  {/* Aquí no necesitas hacer nada más, ya que handleSubmit se encarga */}
            <div>
                <label>Total</label>
                <input 
                    type="text"  // Cambié de "number" a "text" para permitir formato con comas y puntos
                    name="price"
                    required 
                />
            </div>
            <button type="submit">Pagar</button>
        </form>
    );
};

export default PaymentsFormTenant;
