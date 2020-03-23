import React, { createContext, useContext } from 'react';
import { useQuery } from 'react-apollo';
import { GET_PAYMENTS } from './PaymentQueries';

interface IContext {
    loadingGetPayments: boolean;
    payments: Array<IPayment>;
}
const Context: IContext = {
    payments: [],
    loadingGetPayments: false
}

const PaymentContext: React.Context<IContext> = createContext(Context);

const usePaymentContext = () => useContext(PaymentContext);

const useFetch = (): { value: IContext } => {
    const { data, loading: loadingGetPayments }: any = useQuery<Array<any>>(GET_PAYMENTS, {
        onCompleted: data => {
            console.log("onCompleted: ", data);
        },
        onError: data => {
            console.log("onError: ", data);
        }
    });
    console.log("useFetch: ", data);
    return {
        value: {
            loadingGetPayments,
            payments: data ? data.payments : []
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