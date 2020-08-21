import {Button, Input, Modal} from 'antd';
import {KeyOutlined, UserOutlined} from "@ant-design/icons";
import {Mutation, Query} from "react-apollo";
import React, {useState} from "react";
// import {gql} from "apollo-boost";
import { gql, useQuery } from '@apollo/client';

import {UserType} from "../shared/user-type-enum";
import Error from "../shared/Error";
import { ApolloConsumer } from "react-apollo";
import {onError} from "@apollo/client/link/error";
import handleError from "../shared/util";
// import { Query } from "react-apollo";
// import CheckUserType from "./check-user-type"


const Login = (props) => {
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    var userType = [];
    userType[UserType["Driver"]] = true;
    userType[UserType["Customer"]] = true;
    userType[UserType["Authorizer"]] = true;
    userType[UserType["Admin"]] = true;

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
        if(res) localStorage.setItem("authToken", res.data.tokenAuth.token);
        else return;

        const key = UserType[props.type];
        if (userType[key]) {
            console.log("This is " + props.type.toLowerCase() + "!");
            switch (props.type) {
                case("Driver"):
                    client.writeData({data: {"isDriverLoggedIn": true, "isCustomerLoggedIn": false, "isAuthorizerLoggedIn": false, "isAdminLoggedIn": false}});
                    break;
                case("Authorizer"):
                    client.writeData({data: {"isDriverLoggedIn": false, "isCustomerLoggedIn": false, "isAuthorizerLoggedIn": true, "isAdminLoggedIn": false}});
                    break;
                case("Customer"):
                    client.writeData({data: {"isDriverLoggedIn": false, "isCustomerLoggedIn": true, "isAuthorizerLoggedIn": false, "isAdminLoggedIn": false}});
                    break;
                case("Admin"):
                    client.writeData({data: {"isDriverLoggedIn": false, "isCustomerLoggedIn": false, "isAuthorizerLoggedIn": false, "isAdminLoggedIn": true}});
                    break;
            }
            localStorage.setItem("userType", key);

        } else {
            localStorage.removeItem("authToken");
            client.writeData({data: {"isDriverLoggedIn": false, "isCustomerLoggedIn": false, "isAuthorizerLoggedIn": false, "isAdminLoggedIn": false}});
        }
        setVisible(false);
    };


    return (

        <Mutation mutation={LOGIN_MUTATION} variables={{"username": username, "password": password}}
        onError={handleError}
        >
            {(tokenAuth, {loading, error, called, client}) => {

                const titles = [
                    "ورود راننده به سامانه",
                    "ورود صاحب بار به سامانه",
                    "ورود مدیراحراز هویت به سامانه",
                    "ورود مدیر به سامانه",
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
                            okButtonProps={{ href: "/"}}
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
                        {/*{error && <Error error={error} />}*/}


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
