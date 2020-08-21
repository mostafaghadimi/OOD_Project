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



const EditDriver = ({driver, visible, setVisible}) => {
    const [username, setUsername] = useState(driver.user.username);
    const [usernameState, setUsernameState] = useState(true);
    const [email, setEmail] = useState(driver.user.email);
    const [emailState, setEmailState] = useState(true);
    const [password, setPassword] = useState(driver.user.password);
    const [passwordState, setPasswordState] = useState(true);
    const [firstName, setFirstName] = useState(driver.user.firstName);
    const [firstNameState, setFirstNameState] = useState(true);
    const [lastName, setLastName] = useState(driver.user.lastName);
    const [lastNameState, setLastNameState] = useState(true);
    const [nationalId, setNationalId] = useState(driver.nationalID);
    const [NationalIdState, setNationalIdState] = useState(true);
    const [birthDay, setBirthDay] = useState(driver.birthday);
    const [phoneNo, setPhoneNo] = useState(driver.user.phoneNo);
    const [phoneNoState, setPhoneNoState] = useState(true);
    // const [image, setImage] = useState(driver.profilePicture);



    const handleSubmit = async (event, updateDriver) => {
        console.log("In the handleSubmit");
        event.preventDefault();
        updateDriver();
        info("اطلاعات با موفیقت تغییر کرد!", "");
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
            mutation={UPDATE_DRIVER}
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
                    },
                    "id" : driver.id
                }
            }
        >
            {(updateDriver, {loading, error}) => {
                return (
                   <Modal
                        title = "ویرایش راننده"
                        visible={visible}
                        onOk = {event => handleSubmit(event, updateDriver)}
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
                            >
                                <Form.Item label="نام">
                                <Input
                                    id = "name"
                                    onChange={event => {
                                        setFirstName(event.target.value);
                                        setFirstNameState(!!firstName);
                                    }}
                                    defaultValue={driver.user.firstName}/>
                                </Form.Item>

                                <Form.Item label="نام خانوادگی">
                                    <Input
                                        id = "familyName"
                                        onChange={event => {
                                                setLastName(event.target.value);
                                                setLastNameState(!!firstName);
                                            }
                                        }
                                        defaultValue={driver.user.lastName}/>
                                </Form.Item>

                                <Form.Item label="نام کاربری">
                                    <Input
                                        id = "username"
                                        onChange={event => {
                                                setUsername(event.target.value);
                                                setUsernameState(!!username);
                                            }
                                        }
                                        defaultValue={driver.user.username}/>
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
                                        defaultValue={driver.user.email}/>
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
                                        defaultValue={driver.user.phoneNo}/>
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
                                        defaultValue={driver.nationalId}/>
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


                            <Form.Item label="امتیاز">
                                <Rate disabled defaultValue={driver.rating} />
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

const UPDATE_DRIVER = gql`
  mutation ($id : ID!, $driverData: DriverInput!) {
  updateDriver(id: $id, driverData: $driverData) {
    driver{
       user{
        firstName
        lastName
       }
    }
  }
}
`;
