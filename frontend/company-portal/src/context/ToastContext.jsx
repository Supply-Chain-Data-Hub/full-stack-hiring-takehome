import { createContext, useState } from "react";

const ToastContext = createContext();

const ToastProvider = ({children}) => {
    const [toast, setToast] = useState(null);

    return (
        <ToastContext.Provider value={{toast, setToast}}>
            {children}
        </ToastContext.Provider>
    )
}

export {
    ToastProvider,
    ToastContext
}
