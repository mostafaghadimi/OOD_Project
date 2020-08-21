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
// import Error from "../shared/Error";
import handleError from "../shared/util";
import moment from 'moment';

const editItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
};



const EditCustomer = ({customer, visible, setVisible}) => {
    const [username, setUsername] = useState(customer.user.username);
    const [usernameState, setUsernameState] = useState(true);
    const [email, setEmail] = useState(customer.user.email);
    const [emailState, setEmailState] = useState(true);
    const [password, setPassword] = useState(customer.user.password);
    const [passwordState, setPasswordState] = useState(true);
    const [firstName, setFirstName] = useState(customer.user.firstName);
    const [firstNameState, setFirstNameState] = useState(true);
    const [lastName, setLastName] = useState(customer.user.lastName);
    const [lastNameState, setLastNameState] = useState(true);
    const [birthDay, setBirthDay] = useState(customer.birthday);
    const [phoneNo, setPhoneNo] = useState(customer.user.phoneNo);
    const [phoneNoState, setPhoneNoState] = useState(true);



    const handleSubmit = async (event, updateCustomer) => {
        console.log("In the handleSubmit");
        event.preventDefault();
        updateCustomer();
        info("اطلاعات با موفیقت تغییر کرد!", "")
        setVisible(false);
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
            mutation={UPDATE_CUSTOMER}
            variables={
                {
                    "customerData": {
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
                    "customerId" : customer.id
                }
            }
            onError={handleError}
        >
            {(updateCustomer, {loading, error}) => {
                return (
                   <Modal
                        title = "ویرایش مشتری"
                        visible={visible}
                        onOk = {event => handleSubmit(event, updateCustomer)}
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
                                name="edit customer"
                                {...editItemLayout}
                            >
                                <Form.Item label="نام">
                                <Input
                                    id = "name"
                                    onChange={event => {
                                        setFirstName(event.target.value);
                                        setFirstNameState(!!firstName);
                                    }}
                                    defaultValue={customer.user.firstName}/>
                                </Form.Item>

                                <Form.Item label="نام خانوادگی">
                                    <Input
                                        id = "familyName"
                                        onChange={event => {
                                                setLastName(event.target.value);
                                                setLastNameState(!!firstName);
                                            }
                                        }
                                        defaultValue={customer.user.lastName}/>
                                </Form.Item>

                                <Form.Item label="نام کاربری">
                                    <Input
                                        id = "username"
                                        onChange={event => {
                                                setUsername(event.target.value);
                                                setUsernameState(!!username);
                                            }
                                        }
                                        defaultValue={customer.user.username}/>
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
                                        defaultValue={customer.user.email}/>
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
                                        defaultValue={customer.user.phoneNo}/>
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
                                {/*{error && <Error error = {error}/>}*/}
                            </Form>

                   </Modal>
                )
            }}
    </Mutation>
  );
};


export default (EditCustomer);

const UPDATE_CUSTOMER = gql`
 mutation ($customerId : ID!, $customerData: CustomerInput!) {
  updateCustomer(customerId: $customerId, customerData: $customerData) {
    customer{
       user{
        firstName
        lastName
       }
    }
  }
}
`;
