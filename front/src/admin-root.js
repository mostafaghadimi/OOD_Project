import React from "react";
import {Query} from "react-apollo";
import Nav from './components/nav/nav';
import {gql} from "apollo-boost";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Error from "./components/shared/Error";
import AllDriversList from "./components/admin/all-driver-list";
import AllCustomersList from "./components/admin/all-customers-list";
import AllAuthorizersList from "./components/admin/all-authorizer";
import Install from "./components/shared/install";



export const UserContext = React.createContext();

const AdminRoot = ({isLoggedIn, currentUser}) => {
    return (
        <UserContext.Provider value={currentUser}>
            <Switch>
                <Route exact path="/" render={() => (
                    <Nav isLoggedIn={isLoggedIn} currentUser = {currentUser}/>
                )}/>

                <Route exact path="/install" render={() => (
                    <Nav isLoggedIn={isLoggedIn} content={<Install/>} currentUser={currentUser}/>
                )}/>

                <Route exact path="/admin/allDriversList" render={() => (
                    <Nav isLoggedIn={isLoggedIn} content={<AllDriversList/>} currentUser = {currentUser}/>
                )}/>

                <Route exact path="/admin/allCustomersList" render={() => (
                    <Nav isLoggedIn={isLoggedIn} content={<AllCustomersList/>} currentUser = {currentUser}/>
                )}/>


                <Route exact path="/admin/allAuthorizersList" render={() => (
                    <Nav isLoggedIn={isLoggedIn} content={<AllAuthorizersList/>} currentUser = {currentUser}/>
                )}/>

            </Switch>
        </UserContext.Provider>
    );
};

const ME_QUERY = gql`
    {
        me{
            id

        }
    }
`;

export default (AdminRoot );