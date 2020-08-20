import React, {Component, useState} from 'react'
import {
    Divider,
    Form,
    Input,
    Button, Modal,
} from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import DriverInfo from './driver-info';

import './user.css'
import {gql} from "@apollo/client";
import {Mutation, Query} from "react-apollo";
import Error from "../shared/Error";

const editItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 10 },
};



const DriverProfile = ({driver}) => {
    return(
        <div className="user-profile">
            <Divider>مشخصات</Divider>
            <DriverInfo driver={driver}/>
        </div>
    )
};


export default (DriverProfile);


