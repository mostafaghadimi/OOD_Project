import React, {Component, useState} from 'react'
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Table, Button, Modal, Tooltip, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Mutation } from "react-apollo";

import './user.css'


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


    const handleSubmit = (event, createDriver) => {
                        console.log("In the handleSubmit");
                        event.preventDefault();
                        createDriver();
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
                if (error) return <div> is error </div>;

                {data.allDrivers.map( driver => {
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
                                          variables={{
                                              "driverData": {
                                                  "firstName": driver.firstName,
                                                  "lastName": driver.lastName,
                                                  "username": driver.username + "1",
                                                  "email": driver.email,
                                                  "phoneNo": driver.phoneNo,
                                                  "nationalId": driver.nationalId,
                                                  "password": driver.password
                                              }
                                          }}
                                          onCompleted={data => {
                                              console.log({data});
                                              setVisible(true);
                                          }}
                                >{(createDriver, {loading, error}) => {
                                    return (
                                        <div>
                                            <Button onClick={event => handleSubmit(event, createDriver)}>تایید</Button>
                                            <Modal

                                                title= {modalConfirmTitle}
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
                                        </div>
                                    )
                                }}
                                </Mutation>
                                <Mutation mutation={AUTHORIZE_MUTATION}
                                          variables={{
                                              "driverData": {
                                                  "firstName": driver.firstName,
                                                  "lastName": driver.lastName,
                                                  "username": driver.username + "2",
                                                  "email": driver.email,
                                                  "phoneNo": driver.phoneNo,
                                                  "nationalId": driver.nationalId,
                                                  "password": driver.password
                                              }
                                          }}
                                          onCompleted={data => {
                                              console.log({data});
                                              setVisible(true);
                                          }}
                                >{(createDriver, {loading, error}) => {
                                    return (
                                        <div>
                                            <Button onClick={event => handleSubmit(event, createDriver)}>رد</Button>
                                            <Modal

                                                title= {modalRejectTitle}
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

                    </div>
                );

            }}
        </Query>

    );
};








export const GET_DRIVERS = gql`
  {
    allDrivers {
      id,
      firstName,
      lastName,
      username,
      email,
      phoneNo,
      nationalId,
      password,
    }
  }
`;


// This mutation is supposed to update the Driver Auhtorization state. However, we didn't have it in back. Now we just add new.
const AUTHORIZE_MUTATION = gql`
  mutation ($driverData: DriverInput!) {
  createDriver(driverData: $driverData) {
    driver{
      firstName
      lastName
    }
  }
}
`;
export default (AuthorizeDrivers);