import React, {Component, useState} from 'react'
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Table, Button, Modal, Tooltip, Input } from 'antd';
import {PlusOutlined, MinusOutlined, CheckOutlined} from '@ant-design/icons';


import '../order/order.css'
import {gql} from "apollo-boost";
import {Query, Mutation} from "react-apollo";
import Loading from "../shared/loading";
import AddOrder from "./add-order"
import EditCustomer from "./all-customers-list";
import OrderAddDriver from "./order-add-driver";
import VerifyDeliveryOrder from "./verify-delivery-order";
import OrderAddVehicle from "./order-add-vehicle";
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
      title: 'ماشین',
      dataIndex: 'vehicle',
    },
    {
      title: 'آدرس',
      dataIndex: 'address',
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
      title: 'پاک کردن',
      dataIndex: 'delete',
    },
    {
      title: 'تایید ارسال',
      dataIndex: 'verifyDelivery',
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
    const [visibleAddDriver, setVisibleAddDriver] = useState(false);
    const [visibleAddVehicle, setVisibleAddVehicle] = useState(false);

    const [visibleVerifyDelivery, setVisibleVerifyDelivery] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [orderClone, setOrderClone] = useState(null);


    function plateNoConverter(plateNo) {
        return plateNo.substr(0,2)+plateNo.substr(7,1) +plateNo.substr(2,3) + "-" + plateNo.substr(5,2)
    }


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

    const handleAddDriver = (order) => {
        console.log(order);
        setOrderClone(order);
        setVisibleAddDriver(true);
    };

    const handleVerifyDelivery = (order) => {
        console.log(order);
        setOrderClone(order);
        setVisibleVerifyDelivery(true);
    };

    const handleAddVehicle = (order) => {
        console.log(order);
        setOrderClone(order);
        setVisibleAddVehicle(true);
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
        <Query query={GET_ORDERS} onError={handleError}>
            {({data, loading, error}) => {
                if (loading) return <Loading/>;

                if(data) {
                    {data.allOrders.map(order => {
                        allInfo.push(
                            {
                                key: order.id,
                                orderer: order.owner ? order.owner.user.firstName + " " + order.owner.user.lastName : "",
                                deliverer:
                                    <div>
                                        <span>{order.driver ? order.driver.user.firstName + " " + order.driver.user.lastName : ""}</span>
                                        <Tooltip placement="top" title= {"اضافه کردن راننده"}>
                                            <Button key={4 * order.id} shape="circle" onClick={() => handleAddDriver(order)} disabled = {!(order.orderStatus === "A_1")} style = {{position: 'relative', right : 2}}>
                                                <PlusOutlined />
                                            </Button>
                                        </Tooltip>
                                    </div>,
                                vehicle:
                                    <div>
                                        <span>{order.vehicle ? plateNoConverter(order.vehicle.plateNo): ""}</span>
                                        <Tooltip placement="top" title= {"اضافه کردن ماشین"}>
                                            <Button key={4 * order.id + 3} shape="circle" onClick={() => handleAddVehicle(order)} disabled = {!!(order.vehicle)} style = {{position: 'relative', right : 2}}>
                                                <PlusOutlined />
                                            </Button>
                                        </Tooltip>
                                    </div>,
                                address: order.destinationAddress,
                                cost: order.transportationCost,
                                status: order.orderStatus === "A_1" ? "ثبت شده" : order.orderStatus === "A_2" ? "در حال بارگذاری" : order.orderStatus === "A_3" ? "در حال ارسال":  order.orderStatus === "A_4" ? "ارسال شده" : "",
                                delete:
                                <div>

                                    <Mutation mutation={REMOVE_MUTATION}
                                      variables={
                                          {
                                              "orderId" : order.id
                                          }
                                      }
                                      onCompleted={() => {
                                          info("سفارش با موفقیت حذف شد")
                                      }}
                                      onError={handleError}
                                    >{(deleteOrder, deleteData) => {
                                        return (

                                            <Tooltip placement="top" title= {deleteData.loading ? "در حال پاک کردن..." : "پاک کردن"}>
                                                <Button key={3 * order.id + 1} shape="circle" onClick={event => handleDelete(event, deleteOrder)} disabled = {deleteData.loading}>
                                                    <MinusOutlined />
                                                </Button>
                                                {/*{deleteData.error && <Error error={deleteData.error} />}*/}
                                            </Tooltip>
                                        )
                                    }}
                                    </Mutation>
                                </div>,
                                verifyDelivery:
                                    <div>
                                        <Tooltip placement="top" title= {"تایید ارسال"}>
                                            <Button key={3 * order.id + 2} shape="circle" onClick={() => handleVerifyDelivery(order)} disabled = {!(order.orderStatus === "A_3")}>
                                                <CheckOutlined/>
                                            </Button>
                                        </Tooltip>
                                    </div>,

                            }
                        );
                    })}
                }
                return (
                    <div className="order-container">
                        <Table
                            {...state}
                            columns={columns}
                            dataSource={allInfo}
                        />
                        {/*{error && <Error error={error} />}*/}
                        {orderClone && <OrderAddDriver order = {orderClone} visible = {visibleAddDriver} setVisible = {setVisibleAddDriver}/>}
                        {orderClone && <VerifyDeliveryOrder order = {orderClone} visible = {visibleVerifyDelivery} setVisible = {setVisibleVerifyDelivery}/>}
                        {orderClone && <OrderAddVehicle order = {orderClone} visible = {visibleAddVehicle} setVisible = {setVisibleAddVehicle}/>}


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
        vehicle {
            id
            plateNo
        }
        owner{
            id
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
mutation($orderId: ID!){
    deleteOrder (orderId:$orderId){
        id
    }
}
`;

export default (AllOrderList)
