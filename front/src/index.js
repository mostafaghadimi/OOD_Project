import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/es/locale/fa_IR'

import * as serviceWorker from './serviceWorker';


import "antd/dist/antd.css";
import './static/css/normalizer.css'

import {UserType} from "./components/shared/user-type-enum";
import DriverRegister from './components/user/driver-register';
import DriverProfile from './components/user/driver-profile';
import CrashReport from './components/vehicle/crash-report';
import OrderDetail from './components/order/order-detail';
import AddVehicle from './components/vehicle/add-vehicle';
import UserProfile from './components/user/user-profile';
import DriverList from './components/user/driver-list';
import OrderList from './components/order/order-list';
import AddOrder from './components/order/order-add';
import Nav from './components/nav/nav';
import DriverHistory from './components/user/driver-history';
import AuthorizeDrivers from './components/user/authorizer-drivers'
// import {
//   ApolloClient,
//   InMemoryCache,
//   HttpLink,
//   ApolloProvider,
// } from "@apollo/client";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient, { gql } from "apollo-boost";


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

export default class App extends Component {
    test = (data) => {
            console.log(data);
    };

    render() {

        return (
            <Query query={IS_LOGGED_IN_QUERY} >
                {({ data }) => (
                   <Nav
                       isLoggedIn = {
                           [
                               data.isDriverLoggedIn,
                               data.isCustomerLoggedIn,
                               data.isAuthorizerLoggedIn
                           ]
                       }
                   />
                )}
            </Query>


        )
    }
}


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
