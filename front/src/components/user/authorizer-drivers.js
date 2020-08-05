import React, {Component, useState} from 'react'
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Table, Button, Modal, Tooltip, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

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

    return(
        <Query query={GET_DRIVERS}>
            {({data, loading, error}) => {
                console.log(loading);
                console.log(data);
                console.log(error);




                if(loading) return <div> is loading </div>;
                if (error) return <div> is error </div>;

                data.allDrivers.map( driver => (
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
                                <Button >تایید</Button>
                                <Button >رد</Button>
                            </div>

                    })
                ));

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
    }
  }
`;

const _MUTATION = gql`
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