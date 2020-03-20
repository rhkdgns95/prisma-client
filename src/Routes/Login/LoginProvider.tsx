import React, { createContext, useContext } from 'react';

interface IContext {

}
const Context: IContext = {

}

const LoginContext: React.Context<IContext> = createContext<IContext>(Context);

const useLoginContext = () => useContext(LoginContext);

const useFetch = (): { value: IContext } => {

    return {
        value: {

        }
    };
};

const LoginProvider: React.FC<any> = ({
    children
}) => (
    <LoginContext.Provider { ...useFetch() }>
        {
            children
        }
    </LoginContext.Provider>
);

export { useLoginContext };
export default LoginProvider;