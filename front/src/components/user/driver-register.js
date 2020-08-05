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





const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};


const DriverRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [birthDay, setBirthDay] = useState(null);
  const [phoneNo, setPhoneNo] = useState("");
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);


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
                        onChange={event => setFirstName(event.target.value)}
                        placeholder="مصطفی"/>
                  </Form.Item>

                  <Form.Item label="نام خانوادگی">
                    <Input
                        id = "familyName"
                        onChange={event => setLastName(event.target.value)}
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
                        onChange={event => {
                            if(event.target.value.match("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[a-zA-Z]{2,4}$") != null){
                                setEmail(event.target.value);
                            }
                            else {
                                setEmail("");
                                console.log("SAG");
                            }
                        }}/>
                  </Form.Item>

                  <Form.Item label="شماره تماس">
                    <Input
                        id = "phoneNumber"
                        onChange={event => {
                            if(event.target.value.match("^[0-9]{8,11}$") != null){
                                setPhoneNo(event.target.value);
                            }
                            else {
                                setPhoneNo("");
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
                            }
                            else {
                                setNationalId("")
                            }
                        }}
                        placeholder="0020996519"/>
                  </Form.Item>

                  <Form.Item label="تاریخ تولد">
                    <DatePicker id = "birthDay" onChange=
                        {date => setBirthDay(date)}/>
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
                            !firstName.trim() ||
                            !lastName.trim() ||
                            !username.trim() ||
                            !nationalId.trim() ||
                            !birthDay||
                            !email.trim() ||
                            !password.trim() ||
                            !phoneNo.trim()
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