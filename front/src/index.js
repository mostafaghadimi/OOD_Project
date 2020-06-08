import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/es/locale/fa_IR'

import * as serviceWorker from './serviceWorker';

import "antd/dist/antd.css";
import './static/css/normalizer.css'

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


export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => (
                    <Nav/>
                )}/>
                
                {/* Order */}
                <Route exact path="/order/list" render={() => (
                    <Nav content={<OrderList/>}/>
                )}/>

                <Route exact path="/order/add" render={() => (
                    <Nav content={<AddOrder/>}/>
                )}/>

                <Route exact path="/order/detail" render={() => (
                    <Nav content={<OrderDetail/>}/>
                )}/>

                {/* User */}
                <Route exact path="/user/profile" render={() => (
                    <Nav content={<UserProfile/>}/>
                )}/>
                
                <Route exact path="/driver/profile" render={() => (
                    <Nav content={<DriverProfile/>}/>
                )}/>

                <Route exact path="/driver/register" render={() => (
                    <Nav content={<DriverRegister/>}/>
                )}/>

                <Route exact path="/vehicle/add" render={() => (
                    <Nav content={<AddVehicle/>}/>
                )}/>

                <Route exact path="/driver/crash" render={ () => (
                    <Nav content={<CrashReport/>} />
                )}/>

                <Route exact path="/driver/list" render={() => (
                    <Nav content={<DriverList/>} />
                )}/>
            </Switch>
        )
    }
}


ReactDOM.render(
    <BrowserRouter>
        <ConfigProvider direction='rtl' locale={fa_IR}>
            <App />
        </ConfigProvider>
    </BrowserRouter>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
