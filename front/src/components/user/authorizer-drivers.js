import React, {Component, useState} from 'react'
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import {Table, Button, Modal, Tooltip, Input, Form} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Mutation } from "react-apollo";

import './user.css'
import Error from "./driver-profile";


const columns = [
    {
      title: 'نام راننده',
      dataIndex: 'firstName',
    },
    {
      title: 'نام خانوادگی راننده',
      dataIndex: 'lastName',
    },
    {
        title: 'ایمیل',
        dataIndex: 'email',
    },
    {
      title: 'نام کاربری',
      dataIndex: 'username',

    },
    {
      title: 'شماره موبایل',
      dataIndex: 'phoneNo',
    },
    {
      title: 'کد ملی',
      dataIndex: 'nationalId',
    },
    {
      title: 'تایید و رد',
      dataIndex: 'verifyRemove',
    },
];


const AuthorizeDrivers = (Props) => {
    // const [username, setUsername] = useState("");
    const allInfo = [];


    const handleSubmitAuthorize = (event, verifyDriver) => {
                        // console.log("In the handleSubmit");
                        event.preventDefault();
                        verifyDriver();
                    };

    const handleSubmitDelete = (event, deleteDriver) => {
                        // console.log("In the handleSubmit");
                        event.preventDefault();
                        deleteDriver();
                    };

    const [visible, setVisible] = useState(false);
    const [modalConfirmTitle, setModalConfirmTitle] = useState("");
    const [modalRejectTitle, setModalRejectTitle] = useState("");

    return(
        <Query query={GET_DRIVERS}>
            {({data, loading, error}) => {
                console.log(loading);
                console.log(data);
                console.log(error);

                if(loading) return <div> is loading </div>;
                // if (error) return <div> is error </div>;

                {data.unverifiedDrivers.map( driver => {
                    // setModalConfirmTitle("هویت ".concat(driver.firstName).concat(" تایید شد"));
                    // setModalRejectTitle(driver.firstName.concat(" رد شد"));

                    allInfo.push({
                        key: driver.id,
                        firstName: driver.firstName,
                        lastName: driver.lastName,
                        username: driver.username,
                        email: driver.email,
                        phoneNo: driver.phoneNo,
                        nationalId: driver.nationalId,
                        verifyRemove:
                            <div className="driver-status">
                                <Mutation mutation={AUTHORIZE_MUTATION}
                                          variables={
                                              {
                                              "id" : driver.id
                                              }
                                          }
                                          onCompleted={data => {
                                              console.log({data});
                                              setVisible(true);
                                          }}
                                    >{(verifyDriver, {loading, error}) => {
                                        return (
                                            <div>
                                                <Button onClick={event => handleSubmitAuthorize(event, verifyDriver)}>تایید</Button>
                                                <Modal

                                                    title= "هویت راننده تایید شد"
                                                    visible={visible}
                                                    onCancel={() => {
                                                        setVisible(false);
                                                    }}
                                                    onOk={() => {
                                                        setVisible(false);
                                                    }}
                                                >
                                                </Modal>
                                                {/* Error Handling */}
                                                {error && <Error error={error} />}
                                            </div>
                                        )
                                }}
                                </Mutation>
                                <Mutation mutation={REMOVE_MUTATION}
                                          variables={
                                              {
                                                  "id" : driver.id
                                              }
                                          }
                                          onCompleted={data => {
                                              console.log({data});
                                              setVisible(true);
                                          }}
                                    >{(deleteDriver, {loading, error}) => {
                                        return (
                                            <div>
                                                <Button onClick={event => handleSubmitDelete(event, deleteDriver)}>رد</Button>
                                                <Modal

                                                    title= "هویت راننده رد شد"
                                                    visible={visible}
                                                    onCancel={() => {
                                                        setVisible(false);
                                                    }
                                                    }
                                                    onOk={() => {
                                                        setVisible(false);
                                                    }
                                                    }
                                                >
                                                </Modal>
                                                {/* Error Handling */}
                                                {error && <Error error={error} />}
                                            </div>
                                        )
                                    }}
                                </Mutation>
                            </div>

                    })
                })}

                return (

                    <div className="order-container">

                        <Table

                            columns={columns}
                            dataSource={allInfo}
                            // scroll={this.scroll}
                        />
                        {/* Error Handling */}
                        {error && <Error error={error} />}
                    </div>

                );

            }}
        </Query>

    );
};








export const GET_DRIVERS = gql`
    {
    unverifiedDrivers {
        user{
            id,
            firstName,
            lastName,
            username,
            email,
            phoneNo
        }
        nationalId
    }
}
`;


// This mutation is supposed to update the Driver Auhtorization state. However, we didn't have it in back. Now we just add new.
const AUTHORIZE_MUTATION = gql`
mutation($id: ID!){
    verifyDriver (id:$id){
      id
    }
}
`;


const REMOVE_MUTATION = gql`
mutation($id: ID!){
     deleteDriver (id:$id){
      id
    }
}
`;

export default (AuthorizeDrivers);