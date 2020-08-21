import React, {Component, useState} from 'react'
import {
    Divider,
    Form,
    Input,
    Button, Modal, Col, Rate, Card, Row, DatePicker, Upload,
} from 'antd';
import {KeyOutlined, UploadOutlined} from '@ant-design/icons';

import '../user/user.css'
import {gql} from "@apollo/client";
import {Mutation, Query} from "react-apollo";
import Error from "../shared/Error";
import moment from 'moment';

const editItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
};



const EditAuthorizer = ({authorizer, visible, setVisible}) => {
    const [username, setUsername] = useState(authorizer.user.username);
    const [usernameState, setUsernameState] = useState(true);
    const [email, setEmail] = useState(authorizer.user.email);
    const [emailState, setEmailState] = useState(true);
    const [password, setPassword] = useState(authorizer.user.password);
    const [passwordState, setPasswordState] = useState(true);
    const [firstName, setFirstName] = useState(authorizer.user.firstName);
    const [firstNameState, setFirstNameState] = useState(true);
    const [lastName, setLastName] = useState(authorizer.user.lastName);
    const [lastNameState, setLastNameState] = useState(true);
    const [birthDay, setBirthDay] = useState(authorizer.birthday);
    const [phoneNo, setPhoneNo] = useState(authorizer.user.phoneNo);
    const [phoneNoState, setPhoneNoState] = useState(true);



    const handleSubmit = async (event, updateAuthorizer) => {
        console.log("In the handleSubmit");
        event.preventDefault();
        updateAuthorizer();
        setVisible(false);
        info("اطلاعات با موفقیت تغییر کرد!", "")

    };



    function info(message, content) {
      Modal.info({
        title: message,
        content: content,
        onOk() {},
      });
    }

    return (
        <Mutation
            mutation={UPDATE_AUTHORIZER}
            variables={
                {
                    "authorizerData": {
                        "user": {
                            "firstName": firstName,
                            "lastName": lastName,
                            "username": username,
                            "email": email,
                            "phoneNo": phoneNo,
                            "password": password
                        },
                        // "birthday": birthDay,
                    },
                    "id" : authorizer.id
                }
            }
        >
            {(updateAuthorizer, {loading, error}) => {
                return (
                   <Modal
                        title = "ویرایش مدیر احراز هویت"
                        visible={visible}
                        onOk = {event => handleSubmit(event, updateAuthorizer)}
                        onCancel = {() => setVisible(false)}
                        okButtonProps = {{
                            disabled:
                            loading ||
                            !firstNameState ||
                            !lastNameState ||
                            !usernameState ||
                            !emailState ||
                            !passwordState ||
                            !phoneNoState
                        }}
                        okText={loading ? "در حال ویرایش..." : "ویرایش"}
                        cancelText="لغو"
                        >

                            <Form
                                name="edit authorizer"
                                {...editItemLayout}

                            >
                                <Form.Item label="نام">
                                <Input
                                    id = "name"
                                    onChange={event => {
                                        setFirstName(event.target.value);
                                        setFirstNameState(!!firstName);
                                    }}
                                    defaultValue={authorizer.user.firstName}/>
                                </Form.Item>

                                <Form.Item label="نام خانوادگی">
                                    <Input
                                        id = "familyName"
                                        onChange={event => {
                                                setLastName(event.target.value);
                                                setLastNameState(!!firstName);
                                            }
                                        }
                                        defaultValue={authorizer.user.lastName}/>
                                </Form.Item>

                                <Form.Item label="نام کاربری">
                                    <Input
                                        id = "username"
                                        onChange={event => {
                                                setUsername(event.target.value);
                                                setUsernameState(!!username);
                                            }
                                        }
                                        defaultValue={authorizer.user.username}/>
                                </Form.Item>

                                <Form.Item label="رمز عبور">
                                    <Input
                                        id = "password"
                                        onChange={event => {
                                                setPassword(event.target.value);
                                                setPasswordState(!!password);
                                            }}
                                      />
                                </Form.Item>

                                <Form.Item label="ایمیل" >
                                    <Input
                                        id = "email"
                                        onChange={event => {
                                            if(event.target.value.match("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}$") != null){
                                                setEmail(event.target.value);
                                                setEmailState(true);
                                                document.getElementById("email").style.backgroundColor = 'white';
                                            }
                                            else {
                                                setEmailState(false);
                                                document.getElementById("email").style.backgroundColor = 'pink';
                                            }
                                        }}
                                        defaultValue={authorizer.user.email}/>
                                </Form.Item>

                                <Form.Item label="شماره تماس">
                                    <Input
                                        id = "phoneNumber"
                                        onChange={event => {
                                            if(event.target.value.match("^[0-9]{8,11}$") != null){
                                                setPhoneNo(event.target.value);
                                                setPhoneNoState(true);
                                                document.getElementById("phoneNumber").style.backgroundColor = 'white';
                                            }
                                            else {
                                                setPhoneNoState(false);
                                                document.getElementById("phoneNumber").style.backgroundColor = 'pink';
                                            }
                                        }}
                                        defaultValue={authorizer.user.phoneNo}/>
                                </Form.Item>


                                <Form.Item label="تاریخ تولد">
                                    <DatePicker id = "birthDay" onChange=
                                        {date => {
                                                setBirthDay(date);
                                            }
                                        }
                                        defaultValue={birthDay? moment(birthDay, "YYYY-MM-DD") : ""}
                                    />
                                </Form.Item>
                                {error && <Error error = {error}/>}
                            </Form>

                   </Modal>
                )
            }}
    </Mutation>
  );
};


export default (EditAuthorizer);

const UPDATE_AUTHORIZER = gql`
 mutation ($id : ID!, $authorizerData: AuthorizerInput!) {
  updateAuthorizer(id: $id, authorizerData: $authorizerData) {
    authorizer{
       user{
        firstName
        lastName
       }
    }
  }
}
`;
