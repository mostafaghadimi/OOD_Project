import React, { useState } from 'react'
import { Table } from 'antd';
import {Query} from "react-apollo";
import {gql} from "apollo-boost";
import Error from "../shared/Error";

const columns = [
    {
      title: 'صاحب بار',
      dataIndex: 'orderer',
    },
    {
      title: 'تحویل گیرنده',
      dataIndex: 'deliverer',
    },
    {
      title: 'هزینه ارسال',
      dataIndex: 'cost',
    },
    {
      title: 'مکان ارسال',
      dataIndex: 'destAddress',
    },
];

const DriverHistory = ({driver}) => {

    const title = () => 'تاریخچه بار';
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

    

    const allInfo = [];



    return (
        <Query query={GET_DRIVER_ORDERS} variables={{"id": driver.id}}>
            {({data, loading, error}) => {
                if(loading) return <div> is loading </div>;
                console.log(data);

                {data.driverLoad.map( order => {
                    allInfo.push(
                        {
                            kay: order.id,
                            orderer: order.owner.user.firstName + " " + order.owner.user.lastName,
                            deliverer: order.driver.user.firstName + " " + order.driver.user.lastName,
                            destAddress: order.destinationAddress,
                            cost: order.transportationCost
                        }
                    );
                    console.log(allInfo);

                })}
                return (
                    <div className="order-container">
                        <Table
                            {...state}
                            columns={columns}
                            dataSource={allInfo}
                        />
                        {/* Error Handling */}
                        {error && <Error error={error} />}
                    </div>
                )
            }}
        </Query>

    )
};

const GET_DRIVER_ORDERS = gql`
query ($id : ID!){
    driverLoad(id:$id) {
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
        transportationCost   
    }
}
`;




export default (DriverHistory);