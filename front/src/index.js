import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/es/locale/fa_IR'

import * as serviceWorker from './serviceWorker';


import "antd/dist/antd.css";
import './static/css/normalizer.css'
import OrderDetail from './components/order/order-detail';
import UserProfile from './components/user/user-profile';
import DriverList from './components/user/driver-list';
import OrderList from './components/order/order-list';
import AddOrder from './components/order/order-add';
import DriverRegister from './components/user/driver-register';
import DriverProfile from './components/user/driver-profile';
import CrashReport from './components/vehicle/crash-report';
import AddVehicle from './components/vehicle/add-vehicle';
import DriverHistory from './components/user/driver-history';
import AuthorizeDrivers from './components/user/authorizer-drivers'
import {UserType} from "./components/shared/user-type-enum";
import Nav from './components/nav/nav';
import Error from "./components/shared/Error";
// import DriverRoot from './driver-root';
// import CustomerRoot from './customer-root';
// import AuthorizerRoot, {UserContext} from './authorizer-root';
// import {
//   ApolloClient,
//   InMemoryCache,
//   HttpLink,
//   ApolloProvider,
// } from "@apollo/client";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient, { gql } from "apollo-boost";
export const UserContext = React.createContext();



const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    fetchOptions: {
        credentials: "include"
    },
    request: operation => {
        const token = localStorage.getItem("authToken") || "";
        operation.setContext({
            headers: {
            Authorization: `JWT ${token}`
            }
        });
    },
    clientState: {
        defaults: {
            isDriverLoggedIn: (localStorage.getItem("userType") === UserType["Driver"]),
            isCustomerLoggedIn: (localStorage.getItem("userType") === UserType["Customer"]),
            isAuthorizerLoggedIn: (localStorage.getItem("userType") === UserType["Authorizer"]),
        }
    }
});

const IS_LOGGED_IN_QUERY = gql`
    query {
        isDriverLoggedIn @client
        isCustomerLoggedIn 
        isAuthorizerLoggedIn  
    }
`;

const App = () =>{
    return (
        <Query query={IS_LOGGED_IN_QUERY} >
            {({ data , loading, error}) => {

                var isLoggedIn = [];
                isLoggedIn[UserType["Driver"]] = data.isDriverLoggedIn;
                isLoggedIn[UserType["Customer"]] = data.isCustomerLoggedIn;
                isLoggedIn[UserType["Authorizer"]] = data.isAuthorizerLoggedIn;


                return(
                    <Query query={ME_QUERY} fetchPolicy="cache-and-network">
                        {({data, loading, error}) => {
                            if (error) return <Error error={error}/>;
                            const currentUser = data.me;

                            return (
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

                                        {/* Driver */}
                                        <Route exact path="/driver/:id/profile/" render={() => (
                                            <Nav isLoggedIn={isLoggedIn} content={<DriverProfile currentUser = {currentUser}/>} currentUser = {currentUser}/>
                                        )}/>

                                        <Route exact path="/driver/register" render={() => (
                                            <Nav isLoggedIn={isLoggedIn} content={<DriverRegister currentUser = {currentUser}/>} currentUser = {currentUser}/>
                                        )}/>


                                        <Route exact path="/driver/:id/history/" render={() => (
                                            <Nav isLoggedIn={isLoggedIn} content={<DriverHistory currentUser = {currentUser}/>} currentUser = {currentUser}/>
                                        )}/>

                                        <Route exact path="/driver/:id/crash" render={() => (
                                            <Nav isLoggedIn={isLoggedIn} content={<CrashReport currentUser = {currentUser}/>} currentUser = {currentUser}/>
                                        )}/>


                                        <Route exact path="/driver/:id/addVehicle" render={() => (
                                            <Nav isLoggedIn={isLoggedIn} content={<AddVehicle currentUser = {currentUser}/>} currentUser = {currentUser}/>
                                        )}/>
                                        {/* Authorizer*/}
                                        <Route exact path="/authorizer/:id/authorizeDrivers" render={() => (
                                            <Nav isLoggedIn={isLoggedIn} content={<AuthorizeDrivers currentUser = {currentUser}/>} currentUser = {currentUser}/>
                                        )}/>
                                    </Switch>
                                </UserContext.Provider>
                            )
                        }}
                    </Query>
                )
            }}
        </Query>
    )
};

const ME_QUERY = gql`
    {
        me{
            id
        }
    }
`;



ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <ConfigProvider direction='rtl' locale={fa_IR}>
                <App />
            </ConfigProvider>
        </BrowserRouter>
    </ApolloProvider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
