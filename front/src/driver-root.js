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

const DriverRoot = ({isLoggedIn, currentUser}) => {
    console.log(currentUser.id);
    return(

            <UserContext.Provider value={currentUser}>
                <Switch>
                    <Route exact path="/" render={() => (
                        <Nav isLoggedIn={isLoggedIn} currentUser = {currentUser}/>
                    )}/>

                    <Route exact path="/driver/:id/profile/" render={() => (
                        <Nav isLoggedIn={isLoggedIn} content={<DriverProfile currentUser = {currentUser}/>} currentUser = {currentUser}/>
                    )}/>

                    <Route exact path="/driver/register" render={() => (
                        <Nav isLoggedIn={isLoggedIn} content={<DriverRegister currentUser = {currentUser}/>}  currentUser = {currentUser}/>
                    )}/>


                    <Route exact path="/driver/:id/history/" render={() => (
                        <Nav isLoggedIn={isLoggedIn} content={<DriverHistory currentUser = {currentUser}/>}  currentUser = {currentUser}/>
                    )}/>

                    <Route exact path="/driver/:id/crash" render={() => (
                        <Nav isLoggedIn={isLoggedIn} content={<CrashReport currentUser = {currentUser}/>}  currentUser = {currentUser}/>
                    )}/>


                    <Route exact path="/driver/:id/addVehicle" render={() => (
                        <Nav isLoggedIn={isLoggedIn} content={<AddVehicle currentUser = {currentUser}/>}  currentUser = {currentUser}/>
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

export default (DriverRoot);
