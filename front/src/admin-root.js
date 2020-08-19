import React from "react";
import {Query} from "react-apollo";
import Nav from './components/nav/nav';
import {gql} from "apollo-boost";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Error from "./components/shared/Error";

export const UserContext = React.createContext();

const AdminRoot = ({isLoggedIn, currentUser}) => {
    return (
        <UserContext.Provider value={currentUser}>
            <Switch>
                <Route exact path="/" render={() => (
                    <Nav isLoggedIn={isLoggedIn} currentUser = {currentUser}/>
                )}/>

                <Route exact path="/admin/:id/driverList" render={() => (
                    <Nav isLoggedIn={isLoggedIn} content={<driverList currentUser = {currentUser}/>} currentUser = {currentUser}/>
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