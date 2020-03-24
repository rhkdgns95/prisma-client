import React, { useEffect } from 'react';
import HomeProvider from './HomeProvider';
import { RouteComponentProps } from 'react-router-dom';
import navigations from '../../navigations';
import { useAppContext } from '../../Components/App/AppProvider';

interface IProps extends RouteComponentProps<any> {

}

const Home: React.FC<IProps> = ({ match: { path }}) => {
    const { handleChangeNavigation } = useAppContext();
    useEffect(() => {
        if(path) {
            const newNav: ILink | null = navigations.find(item => item.path === path) || null;
            console.log("newNav: ", newNav);
            if(newNav) {
                handleChangeNavigation(newNav);    
            }
        }
    }, []);
    
    return (
        <HomeProvider>
            <HomePresenter />
        </HomeProvider>
    );
}

const HomePresenter = () => {
    
    return (
        <>
            Hello Home.
        </>
    );
}

export default Home;