import React from 'react';
import { useApolloClient, useQuery } from 'react-apollo';
import { gql } from "apollo-boost";

const GET_TABLES = gql`
    query {
        tables {
            id
            title
        }
    }
`;
const AppContainer = () => {
    const { data } = useQuery(GET_TABLES, {
        onCompleted: data => {
            console.log("onCompleted: ", data);
        },
        onError: data => {
            console.log("onError: ", data);
        }
    });
    console.log("RESULT : ", data);
    return <AppPresenter />;
}
const AppPresenter = () => (
    <div>
        Hello world.
    </div>
)
export default AppContainer;