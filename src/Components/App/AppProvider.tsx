import React, { createContext, useContext, useState, useEffect } from 'react';

interface IContext {
    loggedIn: boolean;
    isHiddenNav: boolean;
    navigation: ILink | null;
    handleChangeNavigation: (navIndex: ILink) => void;
    toggleIsHiddenNav: () => void;
}

const Context: IContext = {
    loggedIn: false,
    isHiddenNav: false,
    navigation: null,
    handleChangeNavigation: () => {},
    toggleIsHiddenNav: () => {}
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
    const [ loggedIn ] = useState<boolean>(true);
    const [ isHiddenNav, setIsHiddenNav ] = useState<boolean>(false);
    const [ navigation, setNavigation ] = useState<ILink | null>(null);
    
    useEffect(() => {

        // Navigation에 따라서, web title값 수정 - Login된 경우만 실행 됨.
        if(navigation) {
            window.document.title = `Careda | ${navigation.name}`;
        }
    }, [navigation]);

    const toggleIsHiddenNav = () => {
        setIsHiddenNav(!isHiddenNav);
    } 

    const handleChangeNavigation = (newNav: ILink) => {
        setNavigation(newNav);
    };

    // const [ navLeftLink ] = useState<>();
    // const [ topLinkGroup ] = useState<>();
    
    return {
        value: {
            loggedIn,
            isHiddenNav,
            navigation,
            handleChangeNavigation,
            toggleIsHiddenNav
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