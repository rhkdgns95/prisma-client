import { gql } from "apollo-boost";
import { FragmentPayment } from "../../fragment";

export const GET_PAYMENTS = gql`
    query GetPayments {
        payments {
            ...ItemPayment
        }
    }
    ${FragmentPayment}
`;

export const handleUpdatePayments = (items: Array<any>) => {
    console.log("ITEMS: ", items);

    // return gql`
    //     ${}
    // `;
}

export const UPDATE_PAYMENT = gql`
    mutation UpdatePayment($data: PaymentUpdateInput! $where: PaymentWhereUniqueInput!) {
        updatePayment(data: $data where: $where) {
            ...ItemPayment
        }
    }
    ${FragmentPayment}
`;

export const SUBSCRIPTION_PAYMENTS = gql`
    subscription SubscriptionPayment {
        payment(where: {
            mutation_in: [CREATED UPDATED DELETED]
        }) {
            mutation
            node {
                ...ItemPayment
            }
            updatedFields
            previousValues {
                ...ItemPayment
            }
        }
    }
    ${FragmentPayment}
`;