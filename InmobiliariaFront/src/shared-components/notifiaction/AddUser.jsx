// src/notification/toastHelper.js

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const showSuccessToast = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};