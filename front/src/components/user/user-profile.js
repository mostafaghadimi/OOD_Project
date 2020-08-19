import React, { Component } from 'react'
import { 
    Divider, 
    Form,
    Input,
    Avatar,
    Button,
} from 'antd';
import { KeyOutlined } from '@ant-design/icons';

import './user.css'
import {Query} from "react-apollo";
import {gql} from "@apollo/client";

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const UserProfile = ({customer}) => {
    return (
        <div className="user-profile">
            <Divider>ویرایش اطلاعات</Divider>

            <Form
                {...formItemLayout}
                // style={{width:490}}
            >
                <Form.Item label="عکس کاربر">
                    <Avatar
                        src={require('../../static/images/avatar.jpeg')}
                        size={100}
                    />
                </Form.Item>
                <Form.Item label="نام">
                    <Input value= {customer.user.firstName} disabled/>
                </Form.Item>

                <Form.Item label="نام خانوادگی">
                    <Input value= {customer.user.lastName} disabled/>
                </Form.Item>

                <Form.Item label="تاریخ تولد">
                    <Input value= {customer.user.birthday} disabled/>
                </Form.Item>


                <Form.Item label="شماره تماس">
                    <Input value= {customer.user.phoneNo} type="tel" disabled/>
                </Form.Item>

            </Form>
        </div>
    )
};



export default (UserProfile);