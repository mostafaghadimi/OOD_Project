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


const Logout = (props) => {
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

    const handleSubmit = e => {
        console.log(e);
        setVisible(false);
    };

    const titles = [
                    "خروج راننده از سامانه",
                    "خروج صاحب بار از سامانه",
                    "خروچ مدیراحراز هویت از سامانه",
                ];
    return (



        <div>

            <Button block onClick={showModal}>
                {props.loading ? "در حال خروج ..." : "خروج"}
            </Button>‍
            <Modal
                title={titles[UserType[props.type]]}
                visible={visible}
                onOk={event => handleSubmit(event)}
                onCancel={handleCancel}
                okText="خروج"
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



    )
};





export default (Logout);
