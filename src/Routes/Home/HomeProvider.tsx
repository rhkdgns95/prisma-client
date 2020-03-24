import React, { useContext, createContext } from 'react';

interface IContext {
}

const Context: IContext = {

};

const HomeContext: React.Context<IContext> = createContext(Context);

const useHomeContext = () => useContext(HomeContext);

const useFetch = (): { value: IContext } => {

    return {
        value: {

        }
    };
};

const HomeProvider: React.FC<any> = ({
    children
}) => (
    <HomeContext.Provider { ...useFetch() }>
        {
            children
        }
    </HomeContext.Provider>
);

export { useHomeContext };
export default HomeProvider;