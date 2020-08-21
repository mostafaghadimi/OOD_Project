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
import Loading from "./components/shared/loading";
import Install from "./components/shared/install";


export const UserContext = React.createContext();

const DriverRoot = ({isLoggedIn, currentUser}) => {
    console.log(currentUser.id);
    return(
        <Query query={DRIVER_QUERY} variables={{"id": currentUser.id}}>
            {({ data , loading, error}) => {
                if (loading) return <Loading/>;

                const driver = data.driver;
                return (
                    <UserContext.Provider value={currentUser}>
                        <Switch>
                            <Route exact path="/" render={() => (
                                <Nav isLoggedIn={isLoggedIn} currentUser={currentUser}/>
                            )}/>

                            <Route exact path="/install" render={() => (
                                <Nav isLoggedIn={isLoggedIn} content={<Install/>} currentUser={currentUser}/>
                            )}/>


                            <Route exact path="/driver/:id/profile/" render={() => (
                                <Nav isLoggedIn={isLoggedIn} content={<DriverProfile driver={driver}/>}
                                     currentUser={currentUser}/>
                            )}/>

                            {/*<Route exact path="/driver/register" render={() => (*/}
                                {/*<Nav isLoggedIn={isLoggedIn} content={<DriverRegister driver={driver}/>}*/}
                                     {/*currentUser={currentUser}/>*/}
                            {/*)}/>*/}


                            <Route exact path="/driver/:id/history/" render={() => (
                                <Nav isLoggedIn={isLoggedIn} content={<DriverHistory driver={driver}/>}
                                     currentUser={currentUser}/>
                            )}/>

                            <Route exact path="/driver/:id/crash" render={() => (
                                <Nav isLoggedIn={isLoggedIn} content={<CrashReport driver={driver}/>}
                                     currentUser={currentUser}/>
                            )}/>


                            {/*<Route exact path="/driver/:id/addVehicle" render={() => (*/}
                                {/*<Nav isLoggedIn={isLoggedIn} content={<AddVehicle driver={driver}/>}*/}
                                     {/*currentUser={currentUser}/>*/}
                            {/*)}/>*/}
                        </Switch>
                        {error && <Error error={error} />}
                    </UserContext.Provider>
                )
            }}
        </Query>
    )
};


const DRIVER_QUERY = gql`
    query ($id : ID!){
        driver (id: $id){
            user{
                firstName
                lastName
                username
                password
                phoneNo
                email
            }
            nationalId
            birthday
            rating
            latitude
            longitude
            birthday
            id
        }
    }
    `;

export default (DriverRoot);
