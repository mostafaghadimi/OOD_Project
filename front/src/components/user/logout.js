import {Button, Input, Modal} from 'antd';
import {KeyOutlined, UserOutlined} from "@ant-design/icons";
import {Mutation, Query} from "react-apollo";
import React, {useState} from "react";

import {UserType} from "../shared/user-type-enum";
import Error from "../shared/Error";
import { ApolloConsumer } from "react-apollo";
import {Link, Redirect} from "react-router-dom";
import { HttpLink } from 'apollo-link-http';
import {execute} from 'apollo-link';



const Logout = (props) => {
    const [visible, setVisible] = useState(false);


    const handleSignout = client => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userType");

        client.writeData({data: {"isDriverLoggedIn": false}});
        client.writeData({data: {"isCustomerLoggedIn": false}});
        client.writeData({data: {"isAuthorizerLoggedIn": false}});
        console.log("Signed out user", client);


    };

  return (
    <ApolloConsumer>
      {client => (
        <div>

            {/*<Link to="/" onClick={() => setVisible(true)}>*/}
            <Button block onClick={() => setVisible(true)}>
            خروج
            </Button>
            {/*</Link>*/}
            <Modal
                title= "آیا مطمئن هستید میخواهید خارج شوید؟"
                visible={visible}
                onOk={() => handleSignout(client)}
                onCancel={() => setVisible(false)}
                okButtonProps={{ href: "/"}}
                okText="بله"
                cancelText="خیر"
            >

            </Modal>
        </div>
      )}
    </ApolloConsumer>
  );
};



export default (Logout);
