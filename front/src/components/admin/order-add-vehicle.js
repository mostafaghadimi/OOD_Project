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
import handleError from "../shared/util";

const editItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
};

const { Option } = Select;

const OrderAddVehicle = ({order, visible, setVisible}) => {
    const [vehicleId, setVehicleId] = useState("");
    const [vehicleIdState, setVehicleIdState] = useState(false);

    const handleSubmit = async (event, assignVehicleLoad) => {
        console.log("In the handleSubmit");
        event.preventDefault();
        assignVehicleLoad();
        info("ماشین با موفقیت به سفارش اختصاص یافت!", "");
        setVisible(false);
    };

    const handleChange = (value) =>{
        setVehicleId(value);
        setVehicleIdState(true);
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
            mutation={ASSIGN_VEHICLE}
            variables={
                {
                    "vehicleId":vehicleId,
                    "orderId" : order.id,
                }
            }
            onError={handleError}
        >
            {(assignVehicleLoad, {loading, error}) => {
                return (
                    <Query query={GET_ALL_VEHICLES} onError={handleError}>
                        {(getVehicles) => {

                            if (getVehicles.loading) return <Loading/>;


                            return (
                                <Modal
                                    title="اختصاص دادن ماشین"
                                    visible={visible}
                                    onOk={event => handleSubmit(event, assignVehicleLoad)}
                                    onCancel={() => setVisible(false)}
                                    okButtonProps={{
                                        disabled:
                                            loading ||
                                            !vehicleIdState
                                    }}
                                    okText={loading ? "در حال اختصاص دادن..." : "اختصاص بده"}
                                    cancelText="لغو"
                                >

                                    <Form
                                        name="edit vehicle"
                                        {...editItemLayout}
                                    >
                                        <Form.Item label="نام ماشین">
                                            <Select placeholder="ماشین" onChange={handleChange}>
                                                {getVehicles.data.allVehicles.map(vehicle => {
                                                    return (
                                                        <Option value={vehicle.id}>
                                                            {vehicle.id}
                                                        </Option>
                                                    )
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                    {/*{error && <Error error={error}/>}*/}
                                    {/*{getVehicles.error && <Error error={getVehicles.error}/>}*/}


                                </Modal>
                            )
                        }}
                    </Query>

                )
            }}
        </Mutation>
    );
};



const GET_ALL_VEHICLES = gql`
{
    allVehicles {
        id
    }
}
`;

const ASSIGN_VEHICLE= gql`
mutation ($orderId: ID!, $vehicleId: ID!){
  assignVehicleLoad(orderId: $orderId, vehicleId: $vehicleId){
    order {
      id
    }
  }
}
`;

export default (OrderAddVehicle);



