import React from 'react';
import PaymentProvider from './PaymentProvider';

const Payment = () => (
    <PaymentProvider>
        <PaymentPresenter />
    </PaymentProvider>
)
const PaymentPresenter = () => {

    return (
        <>
            hello payment
        </>
    )
}
export default Payment;