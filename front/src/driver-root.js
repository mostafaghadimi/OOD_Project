import React from "react";
import {Query} from "react-apollo";
import DriverRegister from './components/user/driver-register';
import DriverProfile from './components/user/driver-profile';
import CrashReport from './components/vehicle/crash-report';
import AddVehicle from './components/vehicle/add-vehicle';
import Nav from './components/nav/nav';
import DriverHistory from './components/user/driver-history';
import {gql} from "apollo-boost";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Error from "./components/shared/Error";

export const UserContext = React.createContext();

const DriverRoot = (props) => {

    return(
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

                            <Route exact path="/driver/:id/profile/" render={() => (
                                <Nav isLoggedIn={props.isLoggedIn} content={<DriverProfile/>}/>
                            )}/>

                            <Route exact path="/driver/register" render={() => (
                                <Nav isLoggedIn={props.isLoggedIn} content={<DriverRegister/>}/>
                            )}/>


                            <Route exact path="/driver/:id/history/" render={() => (
                                <Nav isLoggedIn={props.isLoggedIn} content={<DriverHistory/>}/>
                            )}/>

                            <Route exact path="/driver/:id/crash" render={() => (
                                <Nav isLoggedIn={props.isLoggedIn} content={<CrashReport/>}/>
                            )}/>


                            <Route exact path="/driver/:id/addVehicle" render={() => (
                                <Nav isLoggedIn={props.isLoggedIn} content={<AddVehicle/>}/>
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

export default (DriverRoot);
