import React, {Component, useState} from 'react'
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Table, Button, Modal, Tooltip, Input } from 'antd';
import {EditOutlined, KeyOutlined, UserOutlined, MinusOutlined} from '@ant-design/icons';


import '../order/order.css'
import {gql} from "apollo-boost";
import {Query, Mutation} from "react-apollo";
import Error from "../shared/Error";
import Loading from "../shared/loading";
import AddOrder from "./add-order"


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
    {
      title: 'ویرایش / پاک کردن',
      dataIndex: 'editDelete',
    }
];

const AllOrderList = () => {
    const title = () => (
        <div>

            <Button type="primary" size="large" onClick = {() => setVisibleAdd(true)} style = {{position: 'absolute', up:0, left:1}}>
                اضافه کردن
            </Button>

            <p>
                لیست سفارشات
            </p>


            <AddOrder visible = {visibleAdd} setVisible = {setVisibleAdd}/>

        </div>
    );

    const [visible, setVisible] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [orderClone, setOrderClone] = useState(null);


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

    const handleEdit = (order) => {
        console.log(driver);
        setOrderClone(driver);
        setVisibleEdit(true);
    };

    const handleDelete = (event, deleteOrder) => {
        event.preventDefault();
        deleteOrder();
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
        <Query query={GET_ORDERS} >
            {({data, loading, error}) => {
                if (loading) return <Loading/>;


                {
                    data.allOrders.map(order => {
                        allInfo.push(
                            {
                                key: order.id,
                                orderer: order.owner ? order.owner.user.firstName + " " + order.owner.user.lastName : "",
                                deliverer: order.driver ? order.driver.user.firstName + " " + order.driver.user.lastName : "",
                                address: order.destinationAddress,
                                cost: order.transportationCost,
                                status: order.orderStatus === "A_1" ? "ثبت شده" : order.orderStatus === "A_2" ? "در حال بارگذاری" : order.orderStatus === "A_3" ? "در حال ارسال":  order.orderStatus === "A_4" ? "ارسال شده" : "",
                                editDelete:
                                <div>
                                    <Tooltip placement="top" title='ویرایش'>

                                        <Button key={4* order.id + 2} shape="circle" onClick={() => handleEdit(order)}>
                                            <EditOutlined />
                                        </Button>

                                    </Tooltip>
                                    <Mutation mutation={REMOVE_MUTATION}
                                      variables={
                                          {
                                              "id" : order.id
                                          }
                                      }
                                      onCompleted={() => {
                                          info("سفارش با موفقیت حذف شد")
                                      }}
                                    >{(deleteOrder, deleteData) => {
                                        return (

                                            <Tooltip placement="top" title= {deleteData.loading ? "در حال پاک کردن..." : "پاک کردن"}>
                                                <Button key={4* order.id + 3} shape="circle" onClick={event => handleDelete(event, deleteOrder)} disabled = {deleteData.loading}>
                                                    <MinusOutlined />
                                                </Button>
                                                {deleteData.error && <Error error={deleteData.error} />}
                                            </Tooltip>
                                        )
                                    }}
                                    </Mutation>
                                </div>

                            }
                        );
                        console.log(allInfo);

                    })
                }
                console.log(allInfo);
                return (
                    <div className="order-container">
                        <Table
                            {...state}
                            columns={columns}
                            dataSource={allInfo}
                        />
                        {error && <Error error={error} />}

                    </div>

                );
            }}
        </Query>
    )
};

const GET_ORDERS = gql`
{
    allOrders {
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

const REMOVE_MUTATION = gql`
mutation($id: ID!){
    deleteOrder (id:$id){
        id
    }
}
`;



export default (AllOrderList)
