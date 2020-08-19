import {Button, Input, Modal} from 'antd';
import {KeyOutlined, UserOutlined} from "@ant-design/icons";
import {Mutation, Query} from "react-apollo";
import React, {useState} from "react";
// import {gql} from "apollo-boost";
import { gql, useQuery } from '@apollo/client';

import {UserType} from "../shared/user-type-enum";
import Error from "../shared/Error";
import { ApolloConsumer } from "react-apollo";
// import { Query } from "react-apollo";
// import CheckUserType from "./check-user-type"


const Login = (props) => {
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = e => {
        console.log(e);
        setVisible(false);
    };


    const handleSubmit = async (event, tokenAuth, client) => {
        event.preventDefault();
        const res = await tokenAuth();
        localStorage.setItem("authToken", res.data.tokenAuth.token);


        var userType = [];
        userType[UserType["Driver"]] = true;
        userType[UserType["Customer"]] = true;
        userType[UserType["Authorizer"]] = true;

        const key = UserType[props.type];
        if (userType[key]) {
            console.log("This is " + props.type.toLowerCase() + "!");
            switch (props.type) {
                case("Driver"):
                    client.writeData({data: {"isDriverLoggedIn": true}});
                    client.writeData({data: {"isCustomerLoggedIn": false}});
                    client.writeData({data: {"isAuthorizerLoggedIn": false}});
                    break;
                case("Authorizer"):
                    client.writeData({data: {"isDriverLoggedIn": false}});
                    client.writeData({data: {"isCustomerLoggedIn": false}});
                    client.writeData({data: {"isAuthorizerLoggedIn": true}});
                    break;
                case("Customer"):
                    client.writeData({data: {"isDriverLoggedIn": false}});
                    client.writeData({data: {"isCustomerLoggedIn": true}});
                    client.writeData({data: {"isAuthorizerLoggedIn": false}});
                    break;
            }
            localStorage.setItem("userType", key);

        } else {
            localStorage.removeItem("authToken");
            client.writeData({data: {"isDriverLoggedIn": false}});
            client.writeData({data: {"isCustomerLoggedIn": false}});
            client.writeData({data: {"isAuthorizerLoggedIn": false}});
        }

        setVisible(false);

    };


    return (

        <Mutation mutation={LOGIN_MUTATION} variables={{"username": username, "password": password}}>
            {(tokenAuth, {loading, error, called, client}) => {

                const titles = [
                    "ورود راننده به سامانه",
                    "ورود صاحب بار به سامانه",
                    "ورود مدیراحراز هویت به سامانه",
                ];

                return (

                    <div>

                        <Button block onClick={showModal} disabled = {loading}>
                            {loading ? "در حال ورود ..." : "ورود"}
                        </Button>‍
                        <Modal
                            title={titles[UserType[props.type]]}
                            visible={visible}
                            onOk={event => handleSubmit(event, tokenAuth, client)}
                            onCancel={handleCancel}
                            okText="ورود"
                            cancelText="لغو"
                        >
                            <p>
                                <Input size="large" placeholder="نام کاربری"
                                       onChange={event => setUsername(event.target.value)}
                                       prefix={<UserOutlined/>}/>
                            </p>
                            <p>
                                <Input.Password size="large" placeholder="رمز عبور"
                                                onChange={event => setPassword(event.target.value)}
                                                prefix={<KeyOutlined/>}/>

                            </p>

                        </Modal>
                        {error && <Error error={error} />}


                    </div>
                );

            }}

        </Mutation>
    )
};



const ME_QUERY = gql`
    {
        me{
            isDriver
            isAuthorizer
            isCustomer
            isSuperuser
        }
    }
`;
const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export default (Login);
