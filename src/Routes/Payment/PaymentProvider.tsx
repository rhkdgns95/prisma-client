import React, { createContext, useContext } from 'react';

interface IContext {

}
const PaymentContext: React.Context<IContext> = createContext({});

const usePaymentContext = () => useContext(PaymentContext);

const useFetch = (): { value: IContext } => {

    return {
        value: {

        }
    };
};

const PaymentProvider: React.FC<any> = ({ children }) => (
    <PaymentContext.Provider { ...useFetch() }>
        {
            children
        }
    </PaymentContext.Provider>
);

export { usePaymentContext };
export default PaymentProvider;