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

const CustomerRoot = ({isLoggedIn, currentUser}) => {

    return(
        

        <UserContext.Provider value={currentUser}>
            <Switch>
                <Route exact path="/" render={() => (
                    <Nav isLoggedIn={isLoggedIn} currentUser = {currentUser}/>
                )}/>
                {/* Order */}
                <Route exact path="/customer/:id/orderList" render={() => (
                    <Nav isLoggedIn={isLoggedIn} content={<OrderList currentUser = {currentUser}/>} currentUser = {currentUser}/>
                )}/>

                <Route exact path="/customer/:id/addOrder" render={() => (
                    <Nav isLoggedIn={isLoggedIn} content={<AddOrder currentUser = {currentUser}/>} currentUser = {currentUser}/>
                )}/>

                <Route exact path="/customer/:id/orderDetail" render={() => (
                    <Nav isLoggedIn={isLoggedIn} content={<OrderDetail currentUser = {currentUser}/>} currentUser = {currentUser}/>
                )}/>

                <Route exact path="/customer/:id/driverList" render={() => (
                    <Nav isLoggedIn={isLoggedIn} content={<DriverList currentUser = {currentUser}/>} currentUser = {currentUser}/>
                )}/>

                {/* User */}
                <Route exact path="/user/:id/profile/" render={() => (
                    <Nav isLoggedIn={isLoggedIn} content={<UserProfile currentUser = {currentUser}/>} currentUser = {currentUser}/>
                )}/>
            </Switch>
        </UserContext.Provider>
    )


};

const ME_QUERY = gql`
    {
        me{
            id
        }
    }
`;

export default (CustomerRoot);