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

const UserProfile = ({currentUser}) => {
    return (
        <Query query={CUSTOMER_QUERY} variables={{"id": currentUser.id}}>
            {({ data , loading, error}) => {
                if (loading) return <div> loading ...</div>;
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
                                <Input value= {data.customer.user.firstName} disabled/>
                            </Form.Item>

                            <Form.Item label="نام خانوادگی">
                                <Input value= {data.customer.user.lastName} disabled/>
                            </Form.Item>

                            <Form.Item label="تاریخ تولد">
                                <Input value= {data.customer.user.birthday} disabled/>
                            </Form.Item>


                            <Form.Item label="شماره تماس">
                                <Input value= {data.customer.user.phoneNo} type="tel" disabled/>
                            </Form.Item>

                        </Form>
                    </div>
                )
            }}
        </Query>
    )
};

const CUSTOMER_QUERY = gql`
query ($id : ID!){
    customer (id: $id){
        user{
            firstName
            lastName
            username
            password
            phoneNo
            email
        }
    }
}
`;

export default (UserProfile);