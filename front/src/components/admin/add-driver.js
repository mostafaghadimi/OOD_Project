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



const EditDriver = ({visible, setVisible}) => {
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
    const [nationalId, setNationalId] = useState("");
    const [NationalIdState, setNationalIdState] = useState(false);
    const [birthDay, setBirthDay] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [phoneNoState, setPhoneNoState] = useState(false);
    // const [image, setImage] = useState(driver.profilePicture);



    const handleSubmit = async (event, createDriver) => {
        console.log("In the handleSubmit");
        event.preventDefault();
        createDriver();
        setVisible(false);
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
            mutation={ADD_DRIVER}
            variables={
                {
                    "driverData": {
                        "user": {
                            "firstName": firstName,
                            "lastName": lastName,
                            "username": username,
                            "email": email,
                            "phoneNo": phoneNo,
                            "password": password
                        },
                        "nationalId": nationalId,
                        "birthday": birthDay,
                    }
                }
            }
        >
            {(createDriver, {loading, error}) => {
                return (
                   <Modal
                        title = "ویرایش راننده"
                        visible={visible}
                        onOk = {event => handleSubmit(event, createDriver)}
                        onCancel = {() => setVisible(false)}
                        okButtonProps = {{
                            disabled:
                            loading ||
                            !firstNameState ||
                            !lastNameState ||
                            !usernameState ||
                            !NationalIdState ||
                            !emailState ||
                            !passwordState ||
                            !phoneNoState
                        }}
                        okText={loading ? "در حال ویرایش..." : "ویرایش"}
                        cancelText="لغو"
                        >

                            <Form
                                name="edit driver"
                                {...editItemLayout}
                                onComplete = {
                                    () => info("اطلاعات با موفیقت تغییر کرد!", "")
                                }

                            >
                                <Form.Item label="نام">
                                <Input
                                    id = "name"
                                    onChange={event => {
                                        setFirstName(event.target.value);
                                        setFirstNameState(!!firstName);
                                    }}
                                    placeholder={"امیرحسین"}/>
                                </Form.Item>

                                <Form.Item label="نام خانوادگی">
                                    <Input
                                        id = "familyName"
                                        onChange={event => {
                                                setLastName(event.target.value);
                                                setLastNameState(!!firstName);
                                            }
                                        }
                                        placeholder={"پوسا"}/>
                                </Form.Item>

                                <Form.Item label="نام کاربری">
                                    <Input
                                        id = "username"
                                        onChange={event => {
                                                setUsername(event.target.value);
                                                setUsernameState(!!username);
                                            }
                                        }
                                        />
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
                                        placeholder={"poosa@gmail.com"}/>
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
                                        placeholder={"0912xxxxxxx"}/>
                                </Form.Item>

                                <Form.Item label="کد ملی">
                                    <Input
                                        id = "nationalId"
                                        onChange={event => {
                                            if(event.target.value.match("^[0-9]{10}$") != null){
                                                setNationalId(event.target.value);
                                                setNationalIdState(true);
                                                document.getElementById("nationalId").style.backgroundColor = 'white';
                                            }
                                            else {
                                                document.getElementById("nationalId").style.backgroundColor = 'pink';
                                                setNationalIdState(false);
                                            }
                                        }}
                                        placeholder={"0020123456"}/>
                                </Form.Item>

                                <Form.Item label="تاریخ تولد">
                                    <DatePicker id = "birthDay" onChange=
                                        {date => {
                                                setBirthDay(date);
                                            }
                                        }
                                    />
                                </Form.Item>


                            <Form.Item label="امتیاز">
                                <Rate disabled defaultValue = {3} />
                            </Form.Item>


                            {/*<Form.Item*/}
                                {/*name="عکس پرسنلی"*/}
                                {/*label="عکس پرسنلی"*/}
                                {/*valuePropName="fileList"*/}
                                {/*getValueFromEvent={normFile}*/}
                            {/*>*/}
                                {/*<Upload name="logo" action="/upload.do" listType="picture">*/}
                                {/*<Button>*/}
                                    {/*<UploadOutlined /> عکس خود را انتخاب کنید*/}
                                {/*</Button>*/}
                                {/*</Upload>*/}
                            {/*</Form.Item>*/}
                                {error && <Error error = {error}/>}
                            </Form>

                   </Modal>
          )
        }}
    </Mutation>
  );
};


export default (EditDriver);

const ADD_DRIVER = gql`
  mutation ($driverData: DriverInput!) {
  createDriver(driverData: $driverData) {
    driver{
       user{
        firstName
        lastName
       }
    }
  }
}
`;
