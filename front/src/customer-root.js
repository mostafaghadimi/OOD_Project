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
import Loading from "./components/shared/loading";
import Install from "./components/shared/install";

export const UserContext = React.createContext();

const CustomerRoot = ({isLoggedIn, currentUser}) => {

    return(
        <Query query={CUSTOMER_QUERY} variables={{"id": currentUser.id}}>
            {({ data , loading, error}) => {
                if (loading) return <Loading/>;

                const customer = data.customer;

                return (

                    <UserContext.Provider value={currentUser}>
                        <Switch>
                            <Route exact path="/" render={() => (
                                <Nav isLoggedIn={isLoggedIn} currentUser={currentUser}/>
                            )}/>

                            <Route exact path="/install" render={() => (
                                <Nav isLoggedIn={isLoggedIn} content={<Install/>} currentUser={currentUser}/>
                            )}/>


                            {/* Order */}
                            <Route exact path="/customer/:id/orderList" render={() => (
                                <Nav isLoggedIn={isLoggedIn} content={<OrderList customer={customer}/>}
                                     currentUser={currentUser}/>
                            )}/>

                            <Route exact path="/customer/:id/addOrder" render={() => (
                                <Nav isLoggedIn={isLoggedIn} content={<AddOrder customer={customer}/>}
                                     currentUser={currentUser}/>
                            )}/>

                            <Route exact path="/customer/:id/orderDetail" render={() => (
                                <Nav isLoggedIn={isLoggedIn} content={<OrderDetail customer={customer}/>}
                                     currentUser={currentUser}/>
                            )}/>

                            <Route exact path="/customer/:id/driverList" render={() => (
                                <Nav isLoggedIn={isLoggedIn} content={<DriverList customer={customer}/>}
                                     currentUser={currentUser}/>
                            )}/>

                            {/* User */}
                            <Route exact path="/user/:id/profile/" render={() => (
                                <Nav isLoggedIn={isLoggedIn} content={<UserProfile customer={customer}/>}
                                     currentUser={currentUser}/>
                            )}/>
                        </Switch>
                        {error && <Error error={error} />}
                    </UserContext.Provider>
                )
            }}
        </Query>
    )

};


const CUSTOMER_QUERY = gql`
    query ($id : ID!){
        customer (id: $id){
            user{
                id
                firstName
                lastName
                username
                password
                phoneNo
                email
            }
            id
        }
    }
`;

export default (CustomerRoot);