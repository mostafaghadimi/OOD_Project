import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import * as serviceWorker from './serviceWorker';

import "antd/dist/antd.css";
import './static/css/normalizer.css'

import CrashReport from './components/vehicle/crash-report';
import AddVehicle from './components/vehicle/add-vehicle';
import Register from './components/register/register';
import Nav from './components/nav/nav';


export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => (
                    <Nav/>
                )}/>
                
                <Route exact path="/register" render={() => (
                    <Nav content={<Register/>}/>
                )}/>

                <Route exact path="/vehicle/add" render={() => (
                    <Nav content={<AddVehicle/>}/>
                )}/>

                <Route exact path="/driver/crash" render={ () => (
                    <Nav content={<CrashReport/>} />
                )}/>
            </Switch>

            
        )
    }
}


ReactDOM.render(
    <BrowserRouter>
        <ConfigProvider direction='rtl'>
            <App />
        </ConfigProvider>
    </BrowserRouter>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
