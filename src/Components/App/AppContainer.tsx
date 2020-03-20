import React from 'react';
import { useApolloClient } from 'react-apollo';

const AppContainer = () => {
    const client = useApolloClient();
    console.log("Client: ", client);
    return <AppPresenter />;
}
const AppPresenter = () => (
    <div>
        Hello world.
    </div>
)
export default AppContainer;