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
    const { loadingGetPayments, payments, queryUpdatePayment, queryDeletePayment } = usePaymentContext();

    /** 
     *  향후 보완점 [매우 중요!]
     * 
     *  새로운 행 추가, 수정, 삭제 작업 시,
     *  loading을 잘 활용한다면, 행의 업데이트가 발생할 때,
     *  다른 작업자가 작업중인 테이블의 선택한 셀, 수정한 셀(저장하기 전)내용 등의 
     *  여러 작업을 초기화로 바꿀 수 있다. 
     */
    console.log("loadingGetPayments: ", loadingGetPayments);

    return (
        <>
        {
            payments && 
            payments.length > 0 &&  
            <Grid orders={payments} updatePayment={queryUpdatePayment} deletePayment={queryDeletePayment}/>
        }
        </>
    )
};

export default Payment;