import toast from 'react-hot-toast';

export const showMessage = (message) => {
    switch (message.type) {
        case "error": toast.error(message.message); break;
        case "success": toast.success(message.message); break;
        case "info": toast.success(message.message); break;
        case "danger": toast.error(message.message); break;
        default: toast(message.message); break;
    }
}