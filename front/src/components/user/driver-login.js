import { Button, Modal, Input  } from 'antd';
import {KeyOutlined, UserOutlined} from "@ant-design/icons";
import {Mutation} from "react-apollo";
import React, {useState} from "react";
import {gql} from "apollo-boost";

import Error from "../shared/Error";
// import { Query } from "react-apollo";



const DriverLogin = () => {
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

    // const isDriver = (res, client) => {
    //     return(
    //         <Query query={ME_QUERY}>
    //         {({data, loading, error}) => {
    //             if( data.isDriver ){
    //                 console.log("is driver");
    //                 localStorage.setItem("authToken", res.data.tokenAuth.token);
    //                 client.writeData({ data: { isDriverLoggedIn: true } });
    //                 console.log("Is logged in");
    //                 setVisible(false);
    //             }
    //         }}
    //         </Query>
    //
    //     )
    // };

    const handleSubmit = async (event, tokenAuth, client) => {
        event.preventDefault();
        const res = await tokenAuth();
        // isDriver(res, client);
        console.log("is driver");
        localStorage.setItem("authToken", res.data.tokenAuth.token);
        client.writeData({ data: { isDriverLoggedIn: true } });
        console.log("Is logged in");
        setVisible(false);
    };

    return(
        <Mutation mutation={LOGIN_MUTATION} variables={{ "username" : username, "password": password }}>
            {(tokenAuth, { loading, error, called, client }) => {

                return (
                        <div>
                            <Button block onClick={showModal}>
                                {loading ? "در حال ورود ..." : "ورود"}
                            </Button>‍
                            <Modal
                                title="ورود راننده به سامانه"
                                visible={visible}
                                onOk= {event => handleSubmit(event, tokenAuth, client)}
                                onCancel={handleCancel}
                                okText="ورود"
                                cancelText="لغو"
                                >
                                <p>
                                    <Input size="large" placeholder="نام کاربری" onChange={event => setUsername(event.target.value)} prefix={<UserOutlined />} />
                                </p>
                                <p>
                                    <Input.Password  size="large" placeholder="رمز عبور" onChange={event => setPassword(event.target.value)} prefix={<KeyOutlined />} />

                                </p>

                            </Modal>
                            {error && <Error error={error} />}
                        </div>
                );
            }}
        </Mutation>
    )
};


const LOGIN_MUTATION = gql`
    {
        me{
            isDriver
        }
    }
`;

const ME_QUERY = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export default (DriverLogin);
