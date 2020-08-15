import React from "react";
import {Query} from "react-apollo";
import Nav from './components/nav/nav';
import AuthorizeDrivers from './components/user/authorizer-drivers'
import {gql} from "apollo-boost";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Error from "./components/shared/Error";
import OrderList from "./customer-root";
import DriverProfile from "./driver-root";

export const UserContext = React.createContext();

const AuthorizerRoot = (props) => {
    return (
        <Query query={ME_QUERY} fetchPolicy="cache-and-network">
            {({data, loading, error}) => {
                if(loading) return;
                if (error) return <Error error={error} />;
                const currentUser = data.me;

                return (
                    <UserContext.Provider value={currentUser}>
                        <Switch>
                            <Route exact path="/" render={() => (
                                <Nav isLoggedIn={props.isLoggedIn}/>
                            )}/>

                            <Route exact path="/authorizer/:id/authorizeDrivers" render={() => (
                                <Nav isLoggedIn={props.isLoggedIn} content={<AuthorizeDrivers/>}/>
                            )}/>
                        </Switch>
                    </UserContext.Provider>
                )
            }}
        </Query>
    );
};

const ME_QUERY = gql`
    {
        me{
            id
            isDriver
            isAuthorizer
            isCustomer
            isSuperuser
            firstName
            lastName
        }
    }
`;

export default (AuthorizerRoot);