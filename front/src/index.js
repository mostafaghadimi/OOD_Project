import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/es/locale/fa_IR'

import * as serviceWorker from './serviceWorker';
import {UserType} from './components/shared/user-type-enum';

import "antd/dist/antd.css";
import './static/css/normalizer.css'
import Nav from './components/nav/nav';
import Error from "./components/shared/Error";
import Install from "./components/shared/install";
import Loading from "./components/shared/loading";
import DriverRoot from './driver-root';
import CustomerRoot from './customer-root';
import AuthorizerRoot from './authorizer-root';
import AdminRoot from './admin-root';
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient, { gql } from "apollo-boost";
import DriverRegister from './components/user/driver-register';




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
            isDriverLoggedIn: (localStorage.getItem("userType") == UserType["Driver"]),
            isCustomerLoggedIn: (localStorage.getItem("userType") == UserType["Customer"]),
            isAuthorizerLoggedIn: (localStorage.getItem("userType") == UserType["Authorizer"]),
            isAdminLoggedIn: (localStorage.getItem("userType") == UserType["Admin"]),
        }
    }
});

const IS_LOGGED_IN_QUERY = gql`
    query {
        isDriverLoggedIn @client
        isCustomerLoggedIn 
        isAuthorizerLoggedIn
        isAdminLoggedIn
    }
`;

const App = () =>{
    console.log(localStorage.getItem("userType"));
    console.log(UserType["Admin"]);
    console.log(localStorage.getItem("userType") === UserType["Admin"]);
    return (
        <Query query={IS_LOGGED_IN_QUERY} >
            {({ data , loading, error}) => {

                if (loading) return <div> loading </div>;
                if (error) return <Error error = {error}/>;

                var isLoggedIn = [];
                isLoggedIn[UserType["Driver"]] = data.isDriverLoggedIn;
                isLoggedIn[UserType["Customer"]] = data.isCustomerLoggedIn;
                isLoggedIn[UserType["Authorizer"]] = data.isAuthorizerLoggedIn;
                isLoggedIn[UserType["Admin"]] = data.isAdminLoggedIn;

                console.log(isLoggedIn[UserType["Driver"]]);
                console.log(isLoggedIn[UserType["Customer"]]);
                console.log(isLoggedIn[UserType["Authorizer"]]);
                console.log(isLoggedIn[UserType["Admin"]]);
                // console.log(localStorage.getItem(auth));

                if (!isLoggedIn[UserType["Driver"]] && !isLoggedIn[UserType["Customer"]]
                && !isLoggedIn[UserType["Authorizer"]]&& !isLoggedIn[UserType["Admin"]]) {
                    return (
                        <Switch>
                            <Route exact path="/" render={() => (<Nav isLoggedIn={isLoggedIn}/>)}/>

                            <Route exact path="/driver/register" render={() => (
                                <Nav isLoggedIn={isLoggedIn} content={<DriverRegister/>}/>
                            )}/>

                            <Route exact path="/install" render={() => (<Nav isLoggedIn={isLoggedIn} content={<Install/>}/>)}/>
                        </Switch>
                    )
                }
                return(
                    <Query query={ME_QUERY} >
                             {(meData) => {
                                 if (meData.loading) return <Loading/>;
                                 if (meData.error) return <Error error = {meData.error}/>;

                                 const currentUser = meData.data.me;
                                 console.log(meData.data);
                                 if(isLoggedIn[UserType["Driver"]]){
                                     console.log("HERE");
                                     return <DriverRoot isLoggedIn = {isLoggedIn} currentUser = {currentUser}/>
                                 }
                                 if(isLoggedIn[UserType["Customer"]]){
                                     return <CustomerRoot isLoggedIn = {isLoggedIn} currentUser = {currentUser}/>
                                 }
                                 if(isLoggedIn[UserType["Authorizer"]]){
                                     return <AuthorizerRoot isLoggedIn = {isLoggedIn} currentUser = {currentUser}/>
                                 }
                                return <AdminRoot isLoggedIn = {isLoggedIn} currentUser = {currentUser}/>
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
