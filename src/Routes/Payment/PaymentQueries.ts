import { gql } from "apollo-boost";
import { FragmentPayment } from "../../fragment";

/**
 *  Graphql의 Query작성
 *   - Payment 테이블에 CRUD를 요청할 쿼리문을 작성.
 * 
 */

export const GET_PAYMENTS = gql`
    query GetPayments {
        payments {
            ...ItemPayment
        }
    }
    ${FragmentPayment}
`;

/**
 *  handleUpdatePayments
 *  
 *  값이 변경된 모든 행들을 한번의 요청으로
 *  변경하는 함수.
 * 
 *  @param items: 업데이트 할 Grid의 Rows
 */

export const handleUpdatePayments = (items: Array<any>) => {
    console.log("ITEMS: ", items);
}

export const UPDATE_PAYMENT = gql`
    mutation UpdatePayment($data: PaymentUpdateInput! $where: PaymentWhereUniqueInput!) {
        updatePayment(data: $data where: $where) {
            ...ItemPayment
        }
    }
    ${FragmentPayment}
`;

export const DELETE_PAYMENT = gql`
    mutation DeletePayment($where: PaymentWhereUniqueInput!) {
        deletePayment(where: $where) {
            ...ItemPayment
        }
    }
    ${FragmentPayment}
`;

export const SUBSCRIPTION_PAYMENTS = gql`
    subscription SubscriptionPayment($where: PaymentSubscriptionWhereInput) {
        payment(where: $where) {
            mutation
            node {
                ...ItemPayment
            }
            updatedFields
        }
    }
    ${FragmentPayment}
`;
