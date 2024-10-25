import React from "react";
import PaymentCard from "../authSharedComponents/paymentCard/paymentCard";
import './userTenant.css'

const UserTenant = () => {
    return(
        <div className="user-body">
            <PaymentCard title={'pagos'}>
                <h3>hola</h3>
            </PaymentCard>
                
            <PaymentCard title={'otro'}/>
        </div>
        
        
    )
}

export default UserTenant;