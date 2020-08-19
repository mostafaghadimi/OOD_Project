import React from "react";
import {Query} from "react-apollo";
import Nav from './components/nav/nav';
import AuthorizeDrivers from './components/user/authorizer-drivers'
import {gql} from "apollo-boost";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Error from "./components/shared/Error";

export const UserContext = React.createContext();

const AuthorizerRoot = ({isLoggedIn, currentUser}) => {
    return (
        <UserContext.Provider value={currentUser}>
            <Switch>
                <Route exact path="/" render={() => (
                    <Nav isLoggedIn={isLoggedIn} currentUser = {currentUser}/>
                )}/>

                <Route exact path="/authorizer/:id/authorizeDrivers" render={() => (
                    <Nav isLoggedIn={isLoggedIn} content={<AuthorizeDrivers currentUser = {currentUser}/>} currentUser = {currentUser}/>
                )}/>
            </Switch>
        </UserContext.Provider>
    );
};

export default (AuthorizerRoot);