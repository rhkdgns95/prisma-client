import React, { useEffect } from 'react';
import PaymentProvider, { usePaymentContext } from './PaymentProvider';
import { useAppContext } from '../../Components/App/AppProvider';
import { RouteComponentProps } from 'react-router-dom';
import navigations from '../../navigations';
import Grid from '../../ApiComponents/Grid';

interface IProps extends RouteComponentProps<any> {

}

const Payment: React.FC<IProps> = ({ match: { path }}) => {
    const { handleChangeNavigation } = useAppContext();
    useEffect(() => {
        if(path) {
            const newNav: ILink | null = navigations.find(item => item.path === path) || null;
            if(newNav) {
                handleChangeNavigation(newNav);    
            }
        }
    }, []);

    return (
        <PaymentProvider>
            <PaymentPresenter />
        </PaymentProvider>
    );
};

const PaymentPresenter = () => {
    const { loadingGetPayments, payments, queryUpdatePayment } = usePaymentContext();
    return (
        <>
        {
            loadingGetPayments ? "Loading..." :
                <>
                    <Grid orders={payments} updatePayment={queryUpdatePayment}/>
                </>
        }
            {/* <Grid orders={service.getNewOrders()}/> */}
        </>
    )
};

export default Payment;