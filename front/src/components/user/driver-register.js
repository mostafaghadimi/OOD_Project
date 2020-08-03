import React, { useState } from 'react'
import { Component } from 'react'
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
// import Error from "../Shared/Error";

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

const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const DriverRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [melliCode, setMelliCode] = useState("");
  const [birthDay, setBirthDay] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState("");
  const [visible, setVisible] = useState(false);



  const handleSubmit = (event, createUser) => {
    event.preventDefault();
    console.log("pouya kosshere");
    createUser();
  };

  return (
    <div>


        <Mutation
          mutation={REGISTER_MUTATION}
          variables={{ username, email, password,  }}
          onCompleted={data => {
            console.log({ data });
            setVisible(true);
          }}
        >
          {(createUser, { loading, error }) => {
            return (
              <Form
                className="registration-form"
                name="user registration"
                {...formItemLayout}
                onSubmit={event => handleSubmit(event, createUser)}
              >


                  <Form.Item label="نام">
                    <Input
                        id = "name"
                        onChange={event => setName(event.target.value)}
                        placeholder="مصطفی"/>
                  </Form.Item>

                  <Form.Item label="نام خانوادگی">
                    <Input
                        id = "familyName"
                        onChange={event => setFamilyName(event.target.value)}
                        placeholder="خمینی"/>
                  </Form.Item>

                  <Form.Item label="نام کاربری">
                    <Input
                        id = "username"
                        onChange={event => setUsername(event.target.value)}/>
                  </Form.Item>

                  <Form.Item label="رمز عبور">
                    <Input
                        id = "password"
                        onChange={event => setPassword(event.target.value)}/>
                  </Form.Item>

                  <Form.Item label="ایمیل">
                    <Input
                        id = "email"
                        onChange={event => setEmail(event.target.value)}/>
                  </Form.Item>

                  <Form.Item label="شماره تماس">
                    <Input
                        id = "phoneNumber"
                        onChange={event => setPhoneNumber(event.target.value)}
                        placeholder= "09092929912"/>
                    </Form.Item>

                  <Form.Item label="کد ملی">
                    <Input
                        id = "melliCode"
                        onChange={event => setMelliCode(event.target.value)}
                        placeholder="0020996519"/>
                  </Form.Item>

                  <Form.Item label="تاریخ تولد">
                    <DatePicker id = "birthDay" onChange={date => setBirthDay(date)}/>
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
                            !name.trim() ||
                            !familyName.trim() ||
                            !username.trim() ||
                            !melliCode.trim() ||
                            // !birthDay.valueOf()||
                            !email.trim() ||
                            !password.trim()||
                            !phoneNumber.trim()
                          }
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
  mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user {
        username
        email
      }
    }
  }
`;


export default (DriverRegister);