import React, {useState} from 'react'
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import {Table, Button, Modal, Tooltip, Input, Form} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Mutation } from "react-apollo";

import './user.css'
import Error from "../shared/Error";
import Loading from "../shared/loading";
import handleError from "../shared/util";


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


const AuthorizeDrivers = ({currentUser}) => {
    // const [username, setUsername] = useState("");
    const allInfo = [];

    function info(message) {
      Modal.info({
        title: message,
        onOk() {},
      });
    }

    const handleSubmitAuthorize = (event, verifyDriver, id) => {
                        // console.log("In the handleSubmit");
                        event.preventDefault();
                        verifyDriver();
                        delete allInfo[id];
                    };

    const handleSubmitDelete = (event, deleteDriver, id) => {
                        // console.log("In the handleSubmit");
                        event.preventDefault();
                        deleteDriver();
                        delete allInfo[id];
                    };

    const [visible, setVisible] = useState(false);
    const [modalConfirmTitle, setModalConfirmTitle] = useState("");
    const [modalRejectTitle, setModalRejectTitle] = useState("");

    return(
        <Query query={GET_DRIVERS} onError={handleError}>
            {({data, loading, error}) => {
                if(loading) return <Loading/>;
                // if (error) return <div> is error </div>;
                if(data) {
                    {data.unverifiedDrivers.map(driver => {
                            // setModalConfirmTitle("هویت ".concat(driver.firstName).concat(" تایید شد"));
                            // setModalRejectTitle(driver.firstName.concat(" رد شد"));

                            allInfo.push({
                                key: driver.id,
                                firstName: driver.user.firstName,
                                lastName: driver.user.lastName,
                                username: driver.user.username,
                                email: driver.user.email,
                                phoneNo: driver.user.phoneNo,
                                nationalId: driver.nationalId,
                                verifyRemove:
                                    <div className="driver-status">
                                        <Mutation mutation={AUTHORIZE_MUTATION}
                                                  variables={
                                                      {
                                                          "id": driver.user.id
                                                      }
                                                  }
                                                  onCompleted={() => {
                                                      info("هویت راننده تایید شد")
                                                  }}
                                                  onError={handleError}
                                        >{(verifyDriver, authorizeData) => {
                                            return (
                                                <div>
                                                    <Button
                                                        onClick={event => handleSubmitAuthorize(event, verifyDriver, driver.id)}
                                                        disabled={authorizeData.loading}>
                                                        {authorizeData.loading ? "در حال تایید کردن..." : "تایید"}
                                                    </Button>
                                                    {/*{authorizeData.error && <Error error={authorizeData.error}/>}*/}
                                                </div>
                                            )
                                        }}
                                        </Mutation>
                                        <Mutation mutation={REMOVE_MUTATION}
                                                  variables={
                                                      {
                                                          "id": driver.user.id
                                                      }
                                                  }
                                                  onCompleted={() => {
                                                      info("هویت راننده رد شد")
                                                  }}
                                        >{(deleteDriver, deleteData) => {
                                            return (
                                                <div>
                                                    <Button
                                                        onClick={event => handleSubmitDelete(event, deleteDriver, driver.id)}
                                                        disabled={deleteData.loading}>
                                                        {deleteData.loading ? "در حال رد کردن..." : "رد"}
                                                    </Button>
                                                    {/* Error Handling */}
                                                    {deleteData.error && <Error error={deleteData.error}/>}
                                                </div>
                                            )
                                        }}
                                        </Mutation>
                                    </div>

                            })
                        })}
                }

                return (

                    <div className="order-container">

                        <Table

                            columns={columns}
                            dataSource={allInfo}
                            // scroll={this.scroll}
                        />
                        {/* Error Handling */}
                        {/*{error && <Error error={error} />}*/}
                    </div>

                );

            }}
        </Query>

    );
};




const GET_DRIVERS = gql`
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
        driver{
            id
        }
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