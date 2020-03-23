import { gql } from "apollo-boost";

export const FragmentPayment = gql`
    fragment ItemPayment on Payment {
        tscode
        tok
        tnumber
        mname
        mid
        spay
        trno
        reg_date
        pay_dtm
        content
        bpay
        qpay
        brefund
        qrefund
        accea
        qaccea
        req_day
        req_qday
        endday
        qendday
        msg2
        createdAt
        updatedAt
    }
`;