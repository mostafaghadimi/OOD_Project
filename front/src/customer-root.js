import React from "react";
import {Query} from "react-apollo";
import OrderDetail from './components/order/order-detail';
import UserProfile from './components/user/user-profile';
import DriverList from './components/user/driver-list';
import OrderList from './components/order/order-list';
import AddOrder from './components/order/order-add';

import Nav from './components/nav/nav';
import {gql} from "apollo-boost";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Error from "./components/shared/Error";

export const UserContext = React.createContext();

const CustomerRoot = (props) => {

    return(
        <Query query={ME_QUERY} fetchPolicy="cache-and-network">
            {({data, loading, error}) => {
                if (loading) return;
                if (error) return <Error error={error} />;
                const currentUser = data.me;

                return (
                    <UserContext.Provider value={currentUser}>
                        <Switch>
                            <Route exact path="/" render={() => (
                                <Nav isLoggedIn={props.isLoggedIn}/>
                            )}/>
                            {/* Order */}
                            <Route exact path="/customer/:id/orderList" render={() => (
                                <Nav isLoggedIn={props.isLoggedIn} content={<OrderList/>}/>
                            )}/>

                            <Route exact path="/customer/:id/addOrder" render={() => (
                                <Nav isLoggedIn={props.isLoggedIn} content={<AddOrder/>}/>
                            )}/>

                            <Route exact path="/customer/:id/orderDetail" render={() => (
                                <Nav isLoggedIn={props.isLoggedIn} content={<OrderDetail/>}/>
                            )}/>

                            <Route exact path="/customer/:id/driverList" render={() => (
                                <Nav isLoggedIn={props.isLoggedIn} content={<DriverList/>}/>
                            )}/>

                            {/* User */}
                            <Route exact path="/user/:id/profile/" render={() => (
                                <Nav isLoggedIn={props.isLoggedIn} content={<UserProfile/>}/>
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

export default (CustomerRoot);