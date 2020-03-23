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