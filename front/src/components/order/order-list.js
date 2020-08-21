import React, {Component, useState} from 'react'
import { Table, Button, Modal } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import OrderDetail from './order-detail';

import './order.css'
import {gql} from "apollo-boost";
import {Query} from "react-apollo";
// import Error from "../shared/Error";
import Loading from "../shared/loading";
import handleError from "../shared/util";


const columns = [
    {
      title: 'صاحب بار',
      dataIndex: 'orderer',
    },
    {
      title: 'راننده',
      dataIndex: 'deliverer',
    },
    {
      title: 'آدرس',
      dataIndex: 'address',
      filters: [
        {
          text: 'تهران',
          value: 'Tehran',
        },
        {
          text: 'شیراز',
          value: 'Shiraz',
        },
      ],
      // TODO: make it work
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: 'وضعیت',
      dataIndex: 'status',
        filters: [
        {
          text: "ثبت شده",
          value: 'submitted',
        },
        {
          text: "در حال بارگذاری" ,
          value: 'loading',
        },
        {
          text: "در حال ارسال",
          value: 'sending',
        },
        {
          text: "ارسال شده",
          value: 'delivered',
        },

      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: 'هزینه',
      dataIndex: 'cost',
    },
];

const OrderList = ({customer}) => {
    const title = () => 'سفارش‌های ثبت شده';

    const [visible, setVisible] = useState(false);


    const state = {
        visible: false,
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

    
    const allInfo = [];



    return (
        <Query query={GET_CUSTOMER_ORDERS} variables={{"id": customer.id}} onError={handleError}>
            {({data, loading, error}) => {
                if (loading) return <Loading/>;

                if(data) {
                    {data.customerOrders.map(order => {
                            allInfo.push(
                                {
                                    key: order.id,
                                    orderer: order.owner ? order.owner.user.firstName + " " + order.owner.user.lastName : "",
                                    deliverer: order.driver ? order.driver.user.firstName + " " + order.driver.user.lastName : "",
                                    address: order.destinationAddress,
                                    cost: order.transportationCost,
                                    status: order.orderStatus === "A_1" ? "ثبت شده" : order.orderStatus === "A_2" ? "در حال بارگذاری" : order.orderStatus === "A_3" ? "در حال ارسال" : order.orderStatus === "A_4" ? "ارسال شده" : "",
                                }
                            );
                            console.log(allInfo);

                        })}
                }
                console.log(allInfo);
                return (
                    <div className="order-container">
                        <Table
                            {...state}
                            columns={columns}
                            dataSource={allInfo}
                        />
                        {/*{error && <Error error={error} />}*/}
                    </div>

                );
            }}
        </Query>
    )
};

const GET_CUSTOMER_ORDERS = gql`
query ($id : ID!){
    customerOrders(id : $id) {
        id,
        owner{
            user{
                firstName,
                lastName
            }
        },
        driver{
            user{
                firstName,
                lastName
            }
        },
        destinationAddress,
        orderCode,
        transportationCost,
        orderStatus
    }
}
`;


export default (OrderList)
