import React, { useState } from 'react'
import { Table, Button, Modal, Tooltip, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Error from "../shared/Error";
import Loading from "../shared/loading"


import './user.css'
import {Query} from "react-apollo";
import {gql} from "apollo-boost";

const columns = [
    {
      title: 'نام راننده',
      dataIndex: 'driver',
    },
    {
      title: 'وضعیت',
      dataIndex: 'status',
      filters: [
        {
          text: 'آزاد',
          value: 'free',
        },
        {
          text: 'در ماموریت',
          value: 'on-duty',
        },
        {
          text: 'تصادف کرده',
          value: 'crashed',
        },

      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
        title: 'موقعیت جغرافیایی',
        dataIndex: 'location',
    },
    {
      title: 'تاریخچه',
      dataIndex: 'history',

    },
    {
      title: 'امتیاز',
      dataIndex: 'score',
    },
];

const { Search } = Input;
const title = () => (
    <div>
        <p>
            لیست راننده‌ها
        </p>
        <Search
            placeholder="جست‌وجو در لیست راننده‌ها"
            onSearch={value => console.log(value)}
            enterButton
            style={{width:400}}
        />
    </div>
);
const DriverList = ({customer}) => {
    const [visible, setVisible] = useState(false);
    const [visibleHistory, setVisibleHistory] = useState(false);


    const state = {
        bordered: true,
        loading: false,
        pagination: false,
        size: 'default',
        title,
        showHeader: true,
        rowSelection: {},
        scroll: undefined,
        tableLayout: undefined,
        top: 'none',
        bottom: 'bottomRight',
    };


    const showModal = () => {
        setVisible(true);
    };



    const allInfo = [];

    function info(message, content) {
      Modal.info({
        title: message,
        content: content,
        onOk() {},
      });
    }


    return (
        <Query query={GET_CUSTOMER_DRIVERS} variables={{"id": customer.user.id}}>
        {({data, loading, error}) => {
            if(loading) return <Loading/>;
            console.log(data);

            const orderColumns = [
                {
                  title: 'مکان سفارش',
                  dataIndex: 'orderLocation',
                },
            ];

            const orderInfo = [];


            {data.customerDrivers.map( driver => {
                {driver.orders.map( order=> {
                    orderInfo.push({orderLocation: "(" + order.latitude+ ", " + order.longitude + ")"})
                })}
                allInfo.push({
                    key: driver.id,
                    driver: driver.user.firstName + " " + driver.user.lastName,
                    status:
                        <div className="driver-status">
                            <span>
                                {driver.driverStatus === "A_1" ? "آزاد" : driver.driverStatus === "A_2" ? "در ماموریت" : driver.driverStatus === "A_3" ? "تصادف کرده" : ""}
                            </span>
                        </div>,
                    location: <Button key={driver.id} onClick={showModal}>مشاهده روی نقشه</Button>,
                    history:
                        <div>
                            <Button key={driver.id} onClick={() =>
                                info("نمایش تاریخچه راننده",
                                    <Table
                                    columns={orderColumns}
                                    dataSource={orderInfo}/>)} >
                                مشاهده تاریخچه
                            </Button>



                        </div>,
                    score: driver.rating
                });

            })}
            return (
                <div className="order-container">
                    <Table
                        {...state}
                        columns={columns}
                        dataSource={allInfo}
                    />
                    {error && <Error error = {error}/>}
                </div>
            )
        }}
        </Query>
    )
};


const GET_CUSTOMER_DRIVERS = gql`
query ($id : ID!){
    customerDrivers(id:$id) {
        id,
        user{
            firstName,
            lastName
        }
        latitude,
        longitude,
        rating,
        orders{
          latitude
          longitude
        }
        driverStatus,
        rating
    }
}
`;

export default (DriverList);