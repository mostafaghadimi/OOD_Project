import React, { useState } from 'react'
import { Table, Button, Modal, Tooltip, Input } from 'antd';
import {EditOutlined, KeyOutlined, UserOutlined, MinusOutlined} from '@ant-design/icons';
// import Error from "../shared/Error";
import Loading from "../shared/loading";


import '../user/user.css'
import {Mutation, Query} from "react-apollo";
import {gql} from "apollo-boost";
import {UserType} from "../shared/user-type-enum";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import EditDriver from "./edit-driver";
import AddDriver from "./add-driver";
import handleError from "../shared/util";
import SimpleMap from "../map/map"



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
    {
      title: 'ویرایش / پاک کردن',
      dataIndex: 'editDelete',
    }
];

const { Search } = Input;


const AllDriversList = () => {
    const [visibleHistory, setVisibleHistory] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [driverClone, setDriverClone] = useState(null);

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

            <AddDriver visible = {visibleAdd} setVisible = {setVisibleAdd}/>
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


    const handleEdit = (driver) => {
        console.log(driver);
        setDriverClone(driver);
        setVisibleEdit(true);
    };

    const handleDelete = (event, deleteDriver) => {
        event.preventDefault();
        deleteDriver();
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

        <Query query={GET_ALL_DRIVERS} onError={handleError}>
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

            if(data) {
                {data.allDrivers.map(driver => {
                        {
                            driver.orders.map(order => {
                                orderInfo.push({orderLocation: "(" + order.latitude + ", " + order.longitude + ")"})
                            })
                        }
                        allInfo.push({
                            key: driver.id,
                            firstName:
                            driver.user.firstName,
                            lastName:
                            driver.user.lastName,
                            status:
                                <div className="driver-status">
                            <span>
                                {driver.driverStatus === "A_1" ? "آزاد" : driver.driverStatus === "A_2" ? "در ماموریت" : driver.driverStatus === "A_3" ? "تصادف کرده" : ""}
                            </span>
                                </div>,
                            location: <Button key={4 * driver.id} onClick={() =>
                                info("موقعیت مکانی",
                                            <SimpleMap lat={driver.latitude} lng={driver.longitude}/>)
                            }>
                            مشاهده روی نقشه</Button>,
                            history:
                                <div>
                                    <Button key={4 * driver.id + 1} onClick={() =>
                                        info("نمایش تاریخچه راننده",
                                            <Table
                                                columns={orderColumns}
                                                dataSource={orderInfo}/>)}>
                                        مشاهده تاریخچه
                                    </Button>
                                </div>,
                            score: driver.rating,
                            editDelete:
                                <div>
                                    <Tooltip placement="top" title='ویرایش'>

                                        <Button key={4 * driver.id + 2} shape="circle"
                                                onClick={() => handleEdit(driver)}>
                                            <EditOutlined/>
                                        </Button>

                                    </Tooltip>
                                    <Mutation mutation={REMOVE_MUTATION}
                                              variables={
                                                  {
                                                      "id": driver.user.id
                                                  }
                                              }
                                              onCompleted={() => {
                                                  info("راننده با موفقیت حذف شد")
                                              }}
                                              onError={handleError}
                                    >{(deleteDriver, deleteData) => {
                                        return (

                                            <Tooltip placement="top"
                                                     title={deleteData.loading ? "در حال پاک کردن..." : "پاک کردن"}>
                                                <Button key={4 * driver.id + 3} shape="circle"
                                                        onClick={event => handleDelete(event, deleteDriver)}
                                                        disabled={deleteData.loading}>
                                                    <MinusOutlined/>
                                                </Button>
                                                {/*{deleteData.error && <Error error={deleteData.error} />}*/}
                                            </Tooltip>
                                        )
                                    }}
                                    </Mutation>
                                </div>

                        });

                    })}
            }
            console.log(!!driverClone);
            return (
                <div className="order-container">



                    <Table
                        {...state}
                        columns={columns}
                        dataSource={allInfo}
                    />
                    {/*{error && <Error error = {error}/>}*/}
                    {!!driverClone && <EditDriver driver = {driverClone} visible = {visibleEdit} setVisible = {setVisibleEdit}/>}
                    {/*<AddDriver visible = {visibleAdd} setVisible = {setVisibleAdd}/>*/}

                </div>
            )
        }}
        </Query>
    )
};


const GET_ALL_DRIVERS = gql`
{
    allDrivers {
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
        latitude
        longitude
        rating
        driverStatus
        rating
        profilePicture
        birthday
        nationalId
        orders{
          latitude
          longitude
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

export default (AllDriversList);