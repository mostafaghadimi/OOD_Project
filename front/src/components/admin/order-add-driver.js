import React, {Component, useState} from 'react'
import {
    Divider,
    Form,
    Input,
    Button, Modal, Col, Rate, Card, Row, DatePicker, Upload, Select,
} from 'antd';
import {KeyOutlined, UploadOutlined} from '@ant-design/icons';

import '../user/user.css'
import {gql} from "@apollo/client";
import {Mutation, Query} from "react-apollo";
import Error from "../shared/Error";
import moment from 'moment';
import Loading from "./add-order";

const editItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
};

const { Option } = Select;

const OrderAddDriver = ({order, visible, setVisible}) => {
    const [driverId, setDriverId] = useState("");
    const [driverIdState, setDriverIdState] = useState(false);





    const handleSubmit = async (event, updateOrder, assignDriverLoad) => {
        console.log("In the handleSubmit");
        event.preventDefault();
        updateOrder();
        assignDriverLoad();
        info("راننده با موفقیت به سفارش اختصاص یافت!", "");
        setVisible(false);
    };

    const handleChange = (value) =>{
        setDriverId(value);
        setDriverIdState(true);
    };

    function info(message, content) {
      Modal.info({
        title: message,
        content: content,
        onOk() {},
      });
    }

    console.log(order);

    return (
        <Mutation
            mutation={ASSIGN_DRIVER}
            variables={
                {
                    "driverId":driverId,
                    "orderId" : order.id,
                }
            }
        >
            {(assignDriverLoad, {loading, error}) => {
                return (
                    <Mutation
                        mutation={UPDATE_ORDER}
                        variables={
                            {
                                "orderStatus": "3",
                                "orderId": order.id,
                            }
                        }
                    >
                        {(updateDriver, updateData) => {
                            return (
                                <Query query={GET_ALL_DRIVERS}>
                                    {(getDrivers) => {

                                        if (getDrivers.loading) return <Loading/>;


                                        return (
                                            <Modal
                                                title="اختصاص دادن راننده"
                                                visible={visible}
                                                onOk={event => handleSubmit(event, updateDriver, assignDriverLoad)}
                                                onCancel={() => setVisible(false)}
                                                okButtonProps={{
                                                    disabled:
                                                        loading || updateData.loading ||
                                                        !driverIdState
                                                }}
                                                okText={loading || updateData.loading ? "در حال اختصاص دادن..." : "اختصاص بده"}
                                                cancelText="لغو"
                                            >

                                                <Form
                                                    name="edit driver"
                                                    {...editItemLayout}
                                                >
                                                    <Form.Item label="نام سفارش دهنده">
                                                        <Select placeholder="سفارش دهنده" onChange={handleChange}>
                                                            {getDrivers.data.allDrivers.map(driver => {
                                                                return (
                                                                    <Option value={driver.id}>
                                                                        {driver.user.firstName + " " + driver.user.lastName}
                                                                    </Option>
                                                                )
                                                            })}
                                                        </Select>
                                                    </Form.Item>
                                                </Form>
                                                {error && <Error error={error}/>}
                                                {updateData.error && <Error error={updateData.error}/>}
                                                {getDrivers.error && <Error error={getDrivers.error}/>}


                                            </Modal>
                                        )
                                    }}
                                </Query>
                            )
                        }}
                    </Mutation>
                )
            }}
        </Mutation>
    );
};



const UPDATE_ORDER = gql`
mutation ($orderId : ID!, $orderStatus: String) {
  editOrder(orderId: $orderId, orderStatus: $orderStatus) {
     order {
        id
     }
  }
}
`;


const GET_ALL_DRIVERS = gql`
{
    allDrivers {
        id
        user{
            id
            firstName
            lastName
        }
    }
}
`;

const ASSIGN_DRIVER= gql`
mutation ($orderId: ID!, $driverId: ID!){
  assignDriverLoad(orderId: $orderId, driverId: $driverId){
    order {
      id
    }
  }
}
`;

export default (OrderAddDriver);



