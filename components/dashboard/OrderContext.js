import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function useOrderContext() {
    return useContext(OrderContext);
}

export function OrderProvider({ children }) {
    const [orderId, setOrderId] = useState();

    return (
        <OrderContext.Provider value={{ orderId, setOrderId }}>
            {children}
        </OrderContext.Provider>
    )
}