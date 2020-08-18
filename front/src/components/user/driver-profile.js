import React, {Component, useState} from 'react'
import {
    Divider,
    Form,
    Input,
    Button, Modal,
} from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import DriverInfo from './driver-info';

import './user.css'
import {gql} from "@apollo/client";
import {Mutation, Query} from "react-apollo";
import Error from "../shared/Error";

const editItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 10 },
};



const DriverProfile = ({currentUser}) => {

    // const [prevPassword, setPrevPassword] = useState("");
    // const [newPassword, setNewPassword] = useState("");
    // const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
    // const [phoneNo, setPhoneNo] = useState("");
    // const [visible, setVisible] = useState(false);
    // const [message, setMessage] = useState("");


    // const handleSubmit = async (event, updateDriver, data) => {
    //     console.log("In the handleSubmit");
    //     event.preventDefault();
    //     if (newPassword === newPasswordRepeat) {
    //         updateDriver();
    //         setMessage("اطلاعات شما با موفقیت تغییر کرد");
    //     } else if (!(newPassword === newPasswordRepeat)) {
    //         setMessage("تکرار رمز عبور نا درست است");
    //     } else {
    //         setMessage("رمز قبلی را اشتباه وارد کرده اید");
    //     }
    //
    //     setVisible(true);
    // };
    console.log(currentUser.id);
    // const id = props.match.params.id;
    // console.log(id);
    return (
        <Query query={DRIVER_QUERY} variables={{"id": currentUser.id}}>
            {({ data , loading, error}) => {
                if (loading) return <div> loading ...</div>;

                console.log(data);
                return (
                    // <Mutation
                        // mutation={UPDATE_DRIVER}
                        // variables={
                        //     {
                        //         "driverData": {
                        //             "user": {
                        //                 "firstName": data.driver.user.firstName,
                        //                 "lastName": data.driver.user.lastName,
                        //                 "username": data.driver.user.username,
                        //                 "email": data.driver.user.email,
                        //                 "phoneNo": phoneNo,
                        //                 "password": newPassword
                        //             },
                        //             "nationalId": data.driver.nationalId,
                        //             "birthday": data.driver.birthday,
                        //             "latitude": data.driver.latitude,
                        //             "longitude": data.driver.longitude
                        //         },
                        //         "id" : 7
                        //     }
                        // }
                        //
                        // onCompleted={data => {
                        //     console.log({data});
                        //     setVisible(true);
                        // }}
                    // >
                    //     {(updateDriver, {loading, error}) => {
                    //         return (
                    <div className="user-profile">

                        <Divider>مشخصات</Divider>

                        <DriverInfo data={data}/>
                        {/*<Divider>ویرایش اطلاعات</Divider>*/}

                        {/* Error Handling */}
                        {error && <Error error={error}/>}
                    </div>
                            // )
                        // }}
                    // </Mutation>
                )
            }}
        </Query>
    )
};


const DRIVER_QUERY = gql`
query ($id : ID!){
    driver (id: $id){
        user{
            firstName
            lastName
            username
            password
            phoneNo
            email
        }
        nationalId
        birthday
        rating
        latitude
        longitude
        birthday
    }
}
`;


export default (DriverProfile);
