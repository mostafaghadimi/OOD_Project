import {Button, Input, Modal} from 'antd';
import {KeyOutlined, UserOutlined} from "@ant-design/icons";
import {Mutation, Query} from "react-apollo";
import React, {useState} from "react";
import {gql} from "apollo-boost";


import Error from "../shared/Error";
// import { Query } from "react-apollo";

const UserTypeEnum = Object.freeze({"Driver":0, "Customer":1, "Authorizer":2});

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
        userType[UserTypeEnum.Driver] = data.me.isDriver;
        userType[UserTypeEnum.Customer] = data.me.isCustomer;
        userType[UserTypeEnum.Authorizer] = data.me.isAuthorizer;

        var flag = false;
        const key = UserTypeEnum[props.type];
        if(userType[key]) {
            console.log ("This is " + props.type.toLowerCase() +"!");
            switch(props.type) {
                case("Driver"):
                    client.writeData({data:{isDriverLoggedIn : true}});
                    break;
                case("Authorizer"):
                    client.writeData({data:{isAuthorizerLoggedIn : true}});
                    break;
                case("Customer"):
                    client.writeData({data:{isCustomerLoggedIn : true}});
                    break;
            }
            localStorage.setItem("usertype", key);
            setVisible(false);
        }
        else {
            localStorage.setItem("authToken", null);
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
                return (
                    <Query query={ME_QUERY}>
                        {({data, loading, error}) => {
                            return (
                                <div>
                                    <Button block onClick={showModal}>
                                        {loading ? "در حال ورود ..." : "ورود"}
                                    </Button>‍
                                    <Modal
                                        title= {titles[props.type]}
                                        visible={visible}
                                        onOk={event => handleSubmit(event, tokenAuth, client, data, type)}
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
                                    {error && <Error error={error}/>}
                                </div>
                            );
                        }}
                    </Query>
                )
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
            firstName
            lastName
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
