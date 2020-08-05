import React, { useState } from 'react'
import { Component } from 'react'
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import Error from "../shared/Error";

import {
    Form,
    Input,
    Button,
    Upload,
    DatePicker, Modal,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import { useQuery, gql, useMutation } from "@apollo/client";

import './user.css'


const DRIVERS_QUERY = gql`
  mutation {
  createDriver(
    driverData: {
      firstName: "Amir Hasan",
      lastName: "Fathi",
      email: "amirmail1376@yahoo.com",
      username: "AmirHasanFathi",
      phoneNo: "0912****175",
      nationalId: "00123103",
      password: "asdf"
    }
  ){
    driver {
      username
    }
   }
  }
`;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};


const DriverRegister = () => {
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
  const [birthDay, setBirthDay] = useState(null);
  const [birthDayState, setBirthDayState] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const [phoneNoState, setPhoneNoState] = useState(false);
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [imageState, setImageState] = useState(false);


  const handleSubmit = (event, createDriver) => {
      console.log("In the handleSubmit");
      event.preventDefault();
    createDriver();
  };

  const normFile = e => {
    console.log('Upload event:', e.file);
    setImage(e.file);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
  };


  return (
    <div>


        <Mutation
          mutation={REGISTER_MUTATION}
          variables={{
             "driverData" : {
               "firstName":firstName,
               "lastName":lastName,
               "username":username,
               "email":email,
               "phoneNo":phoneNo,
               "nationalId":nationalId,
               "password":password
          }
          }}
          onCompleted={data => {
            console.log({ data });
            setVisible(true);
          }}
        >
          {(createDriver, { loading, error }) => {
            return (
              <Form
                className="registration-form"
                name="user registration"
                {...formItemLayout}
                // onSubmit={event => handleSubmit(event, createUser)}
              >


                  <Form.Item label="نام">
                    <Input
                        id = "name"
                        onChange={event => {
                                setFirstName(event.target.value);
                                setFirstNameState(true);
                            }
                        }
                        placeholder="مصطفی"/>
                  </Form.Item>

                  <Form.Item label="نام خانوادگی">
                    <Input
                        id = "familyName"
                        onChange={event => {
                                setLastName(event.target.value);
                                setLastNameState(true);
                            }
                        }
                        placeholder="خمینی"/>
                  </Form.Item>

                  <Form.Item label="نام کاربری">
                    <Input
                        id = "username"
                        onChange={event => {
                                setUsername(event.target.value);
                                setUsernameState(true);
                            }
                        } />

                  </Form.Item>

                  <Form.Item label="رمز عبور">
                    <Input
                        id = "password"
                        onChange={event => {
                                setPassword(event.target.value);
                                setPasswordState(true);
                            }
                        }/>

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
                        }}/>
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
                        placeholder= "09092929912"/>
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
                        placeholder="0020996519"/>
                  </Form.Item>

                  <Form.Item label="تاریخ تولد">
                    <DatePicker id = "birthDay" onChange=
                        {date => {
                                setBirthDay(date);
                                setBirthDayState(true);
                            }
                        }/>
                  </Form.Item>

                  <Form.Item
                    name="عکس پرسنلی"
                    label="عکس پرسنلی"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                    <Button>
                        <UploadOutlined /> عکس خود را انتخاب کنید
                    </Button>
                    </Upload>
                </Form.Item>


                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            loading ||
                            !firstNameState ||
                            !lastNameState ||
                            !usernameState ||
                            !NationalIdState ||
                            !birthDayState||
                            !emailState ||
                            !passwordState ||
                            !phoneNoState
                        }
                        onClick={event => handleSubmit(event, createDriver)}
                    >
                        {loading ? "در حال ثبت کردن..." : "ثبت کن"}
                    </Button>
                    {/*{error && <Error error={error} />}*/}
                     <Modal
                        title=" ثبت نام راننده در سامانه به صورت موفقیت آمیز ثبت شد"
                        visible={visible}
                        onCancel={() => {
                            setVisible(false);
                          }
                        }
                        onOk = {() => {
                            setVisible(false);
                          }
                        }
                        >
                    </Modal>
                </Form.Item>
                {/* Error Handling */}
                {error && <Error error={error} />}
              </Form>
            );
          }}
        </Mutation>
      {/* Success Dialog */}
      {/*<Dialog*/}
        {/*open={open}*/}
        {/*disableBackdropClick={true}*/}
        {/*TransitionComponent={Transition}*/}
      {/*>*/}
        {/*<DialogTitle>*/}
          {/*<VerifiedUserTwoTone className={classes.icon} />*/}
          {/*New Account*/}
        {/*</DialogTitle>*/}
        {/*<DialogContent>*/}
          {/*<DialogContentText>User successfully created!</DialogContentText>*/}
        {/*</DialogContent>*/}
        {/*<DialogActions>*/}
          {/*<Button*/}
            {/*color="primary"*/}
            {/*variant="contained"*/}
            {/*onClick={() => setNewUser(false)}*/}
          {/*>*/}
            {/*Login*/}
          {/*</Button>*/}
        {/*</DialogActions>*/}
      {/*</Dialog>*/}
    </div>
  );
};

const REGISTER_MUTATION = gql`
  mutation ($driverData: DriverInput!) {
  createDriver(driverData: $driverData) {
    driver{
      firstName
      lastName
    }
  }
}
`;


export default (DriverRegister);