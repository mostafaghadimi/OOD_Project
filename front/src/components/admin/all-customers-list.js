import React, { useState } from 'react'
import { Table, Button, Modal, Tooltip, Input } from 'antd';
import {EditOutlined, KeyOutlined, UserOutlined, MinusOutlined} from '@ant-design/icons';
import Error from "../shared/Error";
import Loading from "../shared/loading"


import '../user/user.css'
import {Mutation, Query} from "react-apollo";
import {gql} from "apollo-boost";
import {UserType} from "../shared/user-type-enum";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from "../../admin-root";
import EditCustomer from "./edit-customer"
import AddCustomer from "./add-customer";
import AddDriver from "./all-driver-list";



export const UserContext = React.createContext();

const columns = [
    {
      title: 'نام',
      dataIndex: 'firstName',
    },
    {
      title: 'نام خانوادگی',
      dataIndex: 'lastName',
    },
    {
      title: 'تاریخچه',
      dataIndex: 'history',

    },
    {
      title: 'تاریخ تولد',
      dataIndex: 'birthday',
    },
    {
      title: 'ویرایش / پاک کردن',
      dataIndex: 'editDelete',
    }
];

const { Search } = Input;



const AllCustomersList = () => {
    const [visibleHistory, setVisibleHistory] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [customerClone, setCustomerClone] = useState(null);

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


        <Button type="primary" size="large" onClick = {() => setVisibleAdd(true)} style = {{position: 'absolute', up:2, left:1}}>
                    اضافه کردن
                </Button>

                <AddCustomer visible = {visibleAdd} setVisible = {setVisibleAdd}/>
        </div>
    );

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


    const handleEdit = (customer) => {
        console.log(customer);
        setCustomerClone(customer);
        setVisibleEdit(true);
    };

    const handleDelete = (event, deleteCustomer) => {
        event.preventDefault();
        deleteCustomer();
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

        <Query query={GET_ALL_CUSTOMERS}>
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


            {data.allCustomers.map( customer => {
                {customer.orders.map( order=> {
                    orderInfo.push({orderLocation: "(" + order.latitude+ ", " + order.longitude + ")"})
                })}
                allInfo.push({
                    key: customer.id,
                    firstName:
                        customer.user.firstName,
                    lastName:
                        customer.user.lastName,
                    birthday:
                        customer.birthday,
                    location: <Button key={4*customer.id} >مشاهده روی نقشه</Button>,
                    history:
                        <div>
                            <Button key={4*customer.id + 1} onClick={() =>
                                info("نمایش تاریخچه راننده",
                                    <Table
                                    columns={orderColumns}
                                    dataSource={orderInfo}/>)} >
                                مشاهده تاریخچه
                            </Button>
                        </div>,
                    editDelete:
                    <div>
                        <Tooltip placement="top" title='ویرایش'>

                            <Button key={4* customer.id + 2} shape="circle" onClick={() => handleEdit(customer)}>
                                <EditOutlined />
                            </Button>

                        </Tooltip>
                        <Mutation mutation={REMOVE_MUTATION}
                          variables={
                              {
                                  "id" : customer.id
                              }
                          }
                          onCompleted={() => {
                              info("مشتری با موفقیت حذف شد")
                          }}
                        >{(deleteCustomer, deleteData) => {
                            return (

                                <Tooltip placement="top" title= {deleteData.loading ? "در حال پاک کردن..." : "پاک کردن"}>
                                    <Button key={4* customer.id + 3} shape="circle" onClick={event => handleDelete(event, deleteCustomer)} disabled = {deleteData.loading}>
                                        <MinusOutlined />
                                    </Button>
                                    {deleteData.error && <Error error={deleteData.error} />}
                                </Tooltip>
                            )
                        }}
                        </Mutation>
                    </div>

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
                    {customerClone && <EditCustomer customer = {customerClone} visible = {visibleEdit} setVisible = {setVisibleEdit}/>}
                </div>
            )
        }}
        </Query>
    )
};


const GET_ALL_CUSTOMERS = gql`
{
    allCustomers {
        id
        user{
            id
            firstName
            lastName
            username
            password
            email
            phoneNo
        }
        birthday
        orders {
            longitude
            latitude
        }
    }
}
`;



const REMOVE_MUTATION = gql`
mutation($id : ID!){
    deleteCustomer (id : $id){
       id
    }
}
`;

export default (AllCustomersList);