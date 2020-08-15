import {Button, Input, Modal} from 'antd';
import {KeyOutlined, UserOutlined} from "@ant-design/icons";
import {Mutation, Query} from "react-apollo";
import React, {useState} from "react";
import {gql} from "apollo-boost";

import {UserType} from "../shared/user-type-enum";
import Error from "../shared/Error";
// import { Query } from "react-apollo";


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


    const handleSubmit = async (event, tokenAuth, client, data) => {
        event.preventDefault();
        const res = await tokenAuth();
        localStorage.setItem("authToken", res.data.tokenAuth.token);
        console.log(data);

        var userType = [];
        userType[UserType["Driver"]] = data.me.isDriver;
        userType[UserType["Customer"]] = data.me.isCustomer;
        userType[UserType["Authorizerr"]] = data.me.isAuthorizer;


        const key = UserType[props.type];
        if(userType[key]) {
            console.log ("This is " + props.type.toLowerCase() +"!");
            switch(props.type) {
                case("Driver"):
                    client.writeData({data:{"isDriverLoggedIn" : true}});
                    client.writeData({data:{"isCustomerLoggedIn" : false}});
                    client.writeData({data:{"isAuthorizerLoggedIn" : false}});
                    break;
                case("Authorizer"):
                    client.writeData({data:{"isDriverLoggedIn" : false}});
                    client.writeData({data:{"isCustomerLoggedIn" : false}});
                    client.writeData({data:{"isAuthorizerLoggedIn" : true}});
                    break;
                case("Customer"):
                    client.writeData({data:{"isDriverLoggedIn" : false}});
                    client.writeData({data:{"isCustomerLoggedIn" : true}});
                    client.writeData({data:{"isAuthorizerLoggedIn" : false}});
                    break;
            }
            localStorage.setItem("userType", key);
            setVisible(false);
        }
        else {
            localStorage.setItem("authToken", null);
            client.writeData({data:{"isDriverLoggedIn" : false}});
            client.writeData({data:{"isCustomerLoggedIn" : false}});
            client.writeData({data:{"isAuthorizerLoggedIn" : false}});
        }

    };

    return (
        <Mutation mutation={LOGIN_MUTATION} variables={{"username": username, "password": password}}>
            {(tokenAuth, {loading, error, called, client}) => {
                const titles = [
                    "ورود راننده به سامانه",
                    "ورود صاحب بار به سامانه",
                    "ورود مدیراحراز هویت به سامانه",
                ];

                if (error) return <Error error={error} />;

                return (
                    <Query query={ME_QUERY}>
                        {({data, loading, error}) => {
                            // if (loading) return;
                            if (error) return <Error error={error} />;

                            return (
                                <div>
                                    <Button block onClick={showModal}>
                                        {loading ? "در حال ورود ..." : "ورود"}
                                    </Button>‍
                                    <Modal
                                        title={titles[UserType[props.type]]}
                                        visible={visible}
                                        onOk={event => handleSubmit(event, tokenAuth, client, data)}
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

                                </div>
                            )
                        }}
                    </Query>
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
