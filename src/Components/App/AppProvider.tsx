import React, { createContext, useContext, useState } from 'react';
interface IContext {
    loggedIn: boolean;
    navigation: ILink | null;
    handleChangeNavigation: (navIndex: ILink) => void;
}

const Context: IContext = {
    loggedIn: false,
    navigation: null,
    handleChangeNavigation: () => {}
};


// const NavTopLink: Array<ILink> = [
//     {
//         id: 0,
//         path: "/home",
//         name: "HOME"
//     }
// ];



const AppContext: React.Context<IContext> = createContext<IContext>(Context);

const useAppContext = () => useContext(AppContext);

const useFetch = (): { value: IContext } => {
    const [ navigation, setNavigation ] = useState<ILink | null>(null);
    
    const handleChangeNavigation = (newNav: ILink) => {
        setNavigation(newNav);
    };

    const [ loggedIn ] = useState<boolean>(true);
    // const [ navLeftLink ] = useState<>();
    // const [ topLinkGroup ] = useState<>();
    
    return {
        value: {
            loggedIn,
            navigation,
            handleChangeNavigation
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