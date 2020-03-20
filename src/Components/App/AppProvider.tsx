import React, { createContext, useContext, useState } from 'react';

interface IContext {
    loggedIn: boolean;
}
const Context: IContext = {
    loggedIn: false
}

const AppContext: React.Context<IContext> = createContext<IContext>(Context);

const useAppContext = () => useContext(AppContext);

const useFetch = (): { value: IContext } => {
    const [ loggedIn ] = useState<boolean>(true);
    
    return {
        value: {
            loggedIn
        }
    };
};

const AppProvider: any = ({ children }: any) => (
    <AppContext.Provider { ...useFetch() }>
        {
            children
        }
    </AppContext.Provider >
);

export { useAppContext };
export default AppProvider;