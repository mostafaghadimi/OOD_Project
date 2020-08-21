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
import moment from 'moment';
import handleError from "../shared/util";

const editItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
};



const AddAuthorizer = ({visible, setVisible}) => {
    const [username, setUsername] = useState("");
    const [usernameState, setUsernameState] = useState(false);
    const [email, setEmail] = useState("");
    const [emailState, setEmailState] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordState, setPasswordState] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [firstNameState, setFirstNameState] = useState(false);
    const [lastName, setLastName] = useState("");
    const [lastNameState, setLastNameState] = useState(false);
    const [phoneNo, setPhoneNo] = useState("");
    const [phoneNoState, setPhoneNoState] = useState(false);
    // const [image, setImage] = useState(driver.profilePicture);



    const handleSubmit = async (event, createAuthorizer) => {
        console.log("In the handleSubmit");
        event.preventDefault();
        const res = await createAuthorizer();
        setVisible(false);
        info("مدیر احراز هویت با موفقیت اضافه شد", "");
    };



    // const normFile = e => {
    //     console.log('Upload event:', e.file);
    //     setImage(e.file);
    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //     return e && e.fileList;
    // };

    function info(message, content) {
      Modal.info({
        title: message,
        content: content,
        onOk() {},
      });
    }

    return (
        <Mutation
            mutation={ADD_AUTHORIZER}
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
                        }
                    }
                }
            }
            onError={handleError}
        >
            {(createAuthorizer, {loading, error}) => {
                return (
                   <Modal
                        title = "اضافه کردن مدیر احراز هویت"
                        visible={visible}
                        onOk = {event => handleSubmit(event, createAuthorizer)}
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
                        okText={loading ? "در حال اضافه کردن..." : "اضافه کردن"}
                        cancelText="لغو"
                        >
                            <Form
                                name="add authorizer in all authorizers list"
                                {...editItemLayout}
                                // onComplete = {() => info("راننده با موفقیت اضافه شد", "")}

                            >
                                <Form.Item label="نام">
                                <Input
                                    id = "name-add"
                                    onChange={event => {
                                        setFirstName(event.target.value);
                                        setFirstNameState(!!firstName);
                                    }}
                                    placeholder={"امیرحسین"}/>
                                </Form.Item>

                                <Form.Item label="نام خانوادگی">
                                    <Input
                                        id = "familyName-add"
                                        onChange={event => {
                                                setLastName(event.target.value);
                                                setLastNameState(!!firstName);
                                            }
                                        }
                                        placeholder={"پوسا"}/>
                                </Form.Item>

                                <Form.Item label="نام کاربری">
                                    <Input
                                        id = "username-add"
                                        onChange={event => {
                                                setUsername(event.target.value);
                                                setUsernameState(!!username);
                                            }
                                        }
                                        />
                                </Form.Item>

                                <Form.Item label="رمز عبور">
                                    <Input
                                        id = "password-add"
                                        onChange={event => {
                                                setPassword(event.target.value);
                                                console.log(password);
                                                console.log(event.target.value);
                                                setPasswordState(!!password);
                                                console.log(passwordState);
                                            }}
                                      />
                                </Form.Item>

                                <Form.Item label="ایمیل" >
                                    <Input
                                        id = "email-add"
                                        onChange={event => {
                                            if(event.target.value.match("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}$") != null){
                                                setEmail(event.target.value);
                                                setEmailState(true);
                                                document.getElementById("email-add").style.backgroundColor = 'white';
                                            }
                                            else {
                                                setEmailState(false);
                                                document.getElementById("email-add").style.backgroundColor = 'pink';
                                            }
                                        }}
                                        placeholder={"poosa@gmail.com"}/>
                                </Form.Item>

                                <Form.Item label="شماره تماس">
                                    <Input
                                        id = "phoneNumber-add"
                                        onChange={event => {
                                            if(event.target.value.match("^[0-9]{8,11}$") != null){
                                                setPhoneNo(event.target.value);
                                                setPhoneNoState(true);
                                                document.getElementById("phoneNumber-add").style.backgroundColor = 'white';
                                            }
                                            else {
                                                setPhoneNoState(false);
                                                document.getElementById("phoneNumber-add").style.backgroundColor = 'pink';
                                            }
                                        }}
                                        placeholder={"0912xxxxxxx"}/>
                                </Form.Item>

                                {/*{error && <Error error = {error}/>}*/}
                            </Form>

                   </Modal>
          )
        }}
    </Mutation>
  );
};

const ADD_AUTHORIZER = gql`
  mutation ($authorizerData: AuthorizerInput!) {
  createAuthorizer(authorizerData: $authorizerData) {
    authorizer{
       id
    }
  }
}
`;

export default (AddAuthorizer);
