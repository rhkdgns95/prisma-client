import React, { createContext, useContext, useEffect } from 'react';
import { useQuery, useMutation, useSubscription } from 'react-apollo';
import { GET_PAYMENTS, UPDATE_PAYMENT, SUBSCRIPTION_PAYMENTS, DELETE_PAYMENT } from './PaymentQueries';
import { SubscribeToMoreOptions } from 'apollo-boost';

interface IContext {
    loadingGetPayments: boolean;
    payments: Array<IPayment>;
    queryUpdatePayment: () => any;
    queryDeletePayment: () => any;
}
const Context: IContext = {
    payments: [],
    loadingGetPayments: false,
    queryUpdatePayment: () => {},
    queryDeletePayment: () => {}
}

const PaymentContext: React.Context<IContext> = createContext(Context);

const usePaymentContext = () => useContext(PaymentContext);

const useFetch = (): { value: IContext } => {   
   
    
    /**
     *  [1] GetPayments
     */
    const { data, loading: loadingGetPayments, subscribeToMore } = useQuery<{payments: Array<any> | [], payment: any}>(GET_PAYMENTS, {
        onCompleted: data => {
            // console.log("GetPayments onCompleted: ", data);
        },
        onError: data => {
            console.log("GetPayments onError: ", data);
        },
        fetchPolicy: "cache-and-network"
    });

    /**
     *  [2] UpdatePayment
     */
    const [ queryUpdatePayment ] = useMutation(UPDATE_PAYMENT, {
        onCompleted: data => {
            // console.log("UpdatePayment onCompleted ", data)
        },
        onError: data => {
            console.log("UpdatePayment onError ", data)
        }
    });
    /**
     *  [3] DeletePayment
     */
    const [ queryDeletePayment, { data: deletedPayment }] = useMutation(DELETE_PAYMENT, {
        onCompleted: data => {
            console.log("DeletePayment onCompleted: ", data);
        },
        onError: data => {
            console.log("DeletePayment onError: ", data);
        }
    });

    /**
     *  [4] Subscription Payment Actions - CREATED, UPDATED, DELETED
     */
    const { data: subscriptionPayments } = useSubscription(SUBSCRIPTION_PAYMENTS, {
        variables: {
            where: {
                mutation_in: ['CREATED', 'UPDATED', 'DELETED']
            }
        },
        onSubscriptionData: data => {
            data.client.reFetchObservableQueries(true);
        }
    });
    console.log("deletedPayment: ", deletedPayment);
    console.log("subscriptionPayments: ", subscriptionPayments);

    useEffect(() => {
        const subscribeToMoreOptions: SubscribeToMoreOptions = {
            document: SUBSCRIPTION_PAYMENTS,
            variables: {
                where: {
                    mutation_in: ['CREATED', 'UPDATED', 'DELETED']
                }
            },
            updateQuery: (prev, { subscriptionData }) => {
                if(!subscriptionData.data) {
                    return prev;
                }
                // console.log("updateQuery Start: ")
                if(subscriptionData.data.payment && subscriptionData.data.payment.mutation && subscriptionData.data.payment.node) {
                    let updatePayments;   // 새로 업데이트 될 payments.
                    const { mutation } = subscriptionData.data.payment;
                    switch(mutation) {   
                        case "CREATED":   // 현 데이터에서 새 데이터 값 추가하면 됨.
                            console.log("(Subscription)데이터 추가: ", subscriptionData.data.payment.node);
                            updatePayments = [
                                ...prev.payments,
                                subscriptionData.data.payment.node
                            ];
                            break;

                        case "UPDATED":   // 현 데이터에서 업데이트 값 변경해주면 됨.
                            console.log("(Subscription)데이터 업데이트: ", subscriptionData.data.payment.node);
                            var updatedData = prev.payments.filter((payment: IPayment) => payment.id !== subscriptionData.data.payment.node.id);
                            updatePayments = [ 
                                ...updatedData, 
                                subscriptionData.data.payment.node
                            ];
                            break;

                        case "DELETED":  // 현 데이터에서 삭제된 값 찾아서 제거하면 됨.
                            console.log("(Subscription)데이터 삭제: ", subscriptionData.data.payment.node);
                            var updatedData = prev.payments.filter((payment: IPayment) => payment.id !== subscriptionData.data.payment.node.id);
                            updatePayments = [ 
                                ...updatedData
                            ];
                            break;

                        default:
                            return prev;
                    };
                    
                    if(updatePayments.length <= 0) { 
                        return prev; 
                    }

                    const updated = Object.assign({}, {
                        payments: updatePayments
                    });

                    // console.log("updated: ", updated);
                    return updated as any;
                  
                } else {
                    return prev;
                }
            }
        };

        subscribeToMore(subscribeToMoreOptions);
    }, []);

    console.log("useFetch: ", data);
    
    // const payments: any  = data &&data?.payments || [];
    return {
        value: {
            loadingGetPayments,
            payments: data?.payments || [],
            queryUpdatePayment,
            queryDeletePayment
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