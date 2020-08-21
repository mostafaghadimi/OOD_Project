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
import AddVehicle from "./add-vehicle";



const columns = [
    {
      title: 'نوع ماشین',
      dataIndex: 'vehicleType',
      filters: [
        {
          text: 'ماشین سنگین',
          value: 'heavyCar',
        },
        {
          text: 'ماشین سبک',
          value: 'automobile',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: 'پلاک',
      dataIndex: 'plateNo',
    },
    {
      title: 'وضعیت ماشین',
      dataIndex: 'status',
      filters: [
        {
          text: 'آزاد',
          value: 'free',
        },
        {
          text: 'مشغول',
          value: 'busy',
        },
        {
          text: 'تصادف کرده',
          value: 'crashed',
        },

      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: 'تاریخچه',
      dataIndex: 'history',

    },
    {
      title: 'تصادفات',
      dataIndex: 'crashes',
    },
    {
      title: 'حذف',
      dataIndex: 'delete',
    }

];

const { Search } = Input;


const AllVehiclesList = () => {
    const [visibleHistory, setVisibleHistory] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [vehicleClone, setVehicleClone] = useState(null);
    const [visibleCrashes, setVisibleCrashes] = useState(false);


    const title = () => (
        <div>
            <p>
                لیست ماشین‌ها
            </p>
            <Search
                placeholder="جست‌وجو در لیست ماشین‌ها"
                onSearch={value => console.log(value)}
                enterButton
                style={{width:400}}
            />

            <Button type="primary" size="large" onClick = {() => setVisibleAdd(true)} style = {{position: 'absolute', up:2, left:1}}>
                اضافه کردن
            </Button>

            <AddVehicle visible = {visibleAdd} setVisible = {setVisibleAdd}/>
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


    const handleEdit = (vehicle) => {
        console.log(vehicle);
        setVehicleClone(vehicle);
        setVisibleEdit(true);
    };

    const handleDelete = (event, deleteVehicle) => {
        event.preventDefault();
        deleteVehicle();
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

        <Query query={GET_ALL_VEHICLES}>
        {({data, loading, error}) => {
            if(loading) return <Loading/>;
            console.log(data);

            const orderColumns = [
                {
                  title: 'مکان سفارش',
                  dataIndex: 'orderLocation',
                },
            ];

            const crashesColumns = [
                {
                  title: 'زمان تصادف',
                  dataIndex: 'crashDate',
                },
                {
                  title: 'نام راننده',
                  dataIndex: 'DriverName',
                },
            ];

            const orderInfo = [];
            const crashesInfo = [];


            {data.allVehicles.map( vehicle => {
                {vehicle.orders.map( order=> {
                    orderInfo.push({orderLocation: "(" + order.latitude+ ", " + order.longitude + ")"});
                })}

                {vehicle.crash.map( crash=> {
                    crashesInfo.push({Driver: crash.driver.user.firstName+ " " + crash.driver.user.lastName, crashDate: crash.crashDate});
                })}

                allInfo.push({
                    key: vehicle.id,
                    vehicleType:
                        <div className="vehicle-type">
                            <span>
                                {vehicle.vehicleType === "A_1" ? "ماشین سنگین" : vehicle.vehicleType === "A_2" ? "ماشین سبک" : ""}
                            </span>
                        </div>,
                    plateNo:
                        vehicle.plateNo,
                    status:
                        <div className="vehicle-status">
                            <span>
                                {vehicle.vehicleStatus === "A_1" ? "آزاد" : vehicle.vehicleStatus === "A_2" ? "مشغول" : vehicle.vehicleStatus === "A_3" ? "تصادف کرده" : ""}
                            </span>
                        </div>,
                    history:
                        <div>
                            <Button key={4*vehicle.id + 1} onClick={() =>
                                info("نمایش تاریخچه ماشین",
                                    <Table
                                    columns={orderColumns}
                                    dataSource={orderInfo}/>)} >
                                مشاهده تاریخچه
                            </Button>
                        </div>,
                    crashes:
                        <div>
                            <Button key={4*vehicle.id + 1} onClick={() =>
                                info("نمایش تصادفات ماشین",
                                    <Table
                                    columns={crashesColumns}
                                    dataSource={crashesInfo}/>)} >
                                مشاهده تصادفات ماشین
                            </Button>
                        </div>,
                    delete:
                        <Mutation mutation={REMOVE_MUTATION}
                          variables={
                              {
                                  "vehicleId" : vehicle.id
                              }
                          }
                          onCompleted={() => {
                              info("ماشین با موفقیت حذف شد")
                          }}
                        >{(deleteVehicle, deleteData) => {
                            return (

                                <Tooltip placement="top" title= {deleteData.loading ? "در حال پاک کردن..." : "پاک کردن"}>
                                    <Button key={4* vehicle.id + 3} shape="circle" onClick={event => handleDelete(event, deleteVehicle)} disabled = {deleteData.loading}>
                                        <MinusOutlined />
                                    </Button>
                                    {deleteData.error && <Error error={deleteData.error} />}
                                </Tooltip>
                            )
                        }}
                        </Mutation>
                });

            })}
            console.log(!!vehicleClone);
            return (
                <div className="order-container">



                    <Table
                        {...state}
                        columns={columns}
                        dataSource={allInfo}
                    />
                    {error && <Error error = {error}/>}
                    {/*{!!vehicleClone && <EditVehicle vehicle = {vehicleClone} visible = {visibleEdit} setVisible = {setVisibleEdit}/>}*/}

                </div>
            )
        }}
        </Query>
    )
};


const GET_ALL_VEHICLES = gql`
{
    allVehicles{
        id
        vehicleType
        plateNo
        vehicleStatus
        orders {
            latitude
            longitude
        }
        crash {
            driver{
                user{
                  firstName
                  lastName
                }
            }
            id
            crashDate
        }
    }
}

`;



const REMOVE_MUTATION = gql`
    mutation($vehicleId: ID!){
        deleteVehicle (vehicleId: $vehicleId){
            id
        }
    }
`;

export default (AllVehiclesList);