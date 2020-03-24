import React, { createContext, useContext } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { GET_PAYMENTS, UPDATE_PAYMENT } from './PaymentQueries';

interface IContext {
    loadingGetPayments: boolean;
    payments: Array<IPayment>;
    queryUpdatePayment: () => any;
}
const Context: IContext = {
    payments: [],
    loadingGetPayments: false,
    queryUpdatePayment: () => {}
}

const PaymentContext: React.Context<IContext> = createContext(Context);

const usePaymentContext = () => useContext(PaymentContext);

const useFetch = (): { value: IContext } => {
const [ queryUpdatePayment, { data: updatePaymentData } ] = useMutation(UPDATE_PAYMENT, {
        onCompleted: data => {
            console.log("UpdatePayment onCompleted ", data)
        },
        onError: data => {
            console.log("UpdatePayment onError ", data)
        }
    });
    const { data, loading: loadingGetPayments }: any = useQuery<Array<any>>(GET_PAYMENTS, {
        onCompleted: data => {
            console.log("GetPayments onCompleted: ", data);
        },
        onError: data => {
            console.log("GetPayments onError: ", data);
        }
    });
    console.log("updatePaymentData: ", updatePaymentData);
    console.log("useFetch: ", data);
    return {
        value: {
            loadingGetPayments,
            payments: data ? data.payments : [],
            queryUpdatePayment
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