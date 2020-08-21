import React, {Component, useState} from 'react'
import {
    Divider,
    Form,
    Input,
    Select,
    Button, Modal, Col, Rate, Card, Row, DatePicker, Upload,
} from 'antd';
import {KeyOutlined, UploadOutlined} from '@ant-design/icons';

import '../user/user.css'
import {gql} from "@apollo/client";
import {Mutation, Query} from "react-apollo";
import Error from "../shared/Error";
import Loading from "../shared/loading";
import moment from 'moment';

const editItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
};

const { Option } = Select;


const AddOrder = ({visible, setVisible}) => {
    const [destAddress, setDestAddress] = useState("");
    const [destAddressState, setDestAddressState] = useState(false);
    const [ownerId, setOwnerId] = useState("");
    const [ownerIdState, setOwnerIdState] = useState(false);
    const [orderCode, setOrderCode] = useState("");
    const [orderCodeState, setOrderCodeState] = useState(false);
    const [cost, setCost] = useState("");



    const handleSubmit = async (event, createOrder) => {
        console.log("In the handleSubmit");
        event.preventDefault();
        const res = await createOrder();
        setVisible(false);
        info("سفارش با موفقیت اضافه شد", "");
    };

    const handleChange = (value) =>{
        setOwnerId(value);
        setOwnerIdState(true);
        console.log(ownerId);
    }


    // const normFile = e => {
    //     console.log('Upload event:', e.file);
    //     setImage(e.file);
    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //     return e && e.fileList;
    // };

    function info(message, content) {
      Modal.info({
        title: message,
        content: content,
        onOk() {},
      });
    }

    return (
        <Mutation
            mutation={ADD_ORDER}
            variables={
                {
                    "orderData": {
                        "ownerId" : ownerId,
                        "destinationAddress" : destAddress
                    },
                    "orderCode" : orderCode
                }
            }
        >
        {(createOrder, {loading, error}) => {
            return(
                <Query query={GET_ALL_CUSTOMERS}>
                    {(getCustomers) => {

                    if(getCustomers.loading) return <Loading/>;


                    return (
                       <Modal
                            title = "اضافه کردن سفارش"
                            visible={visible}
                            onOk = {event => handleSubmit(event, createOrder)}
                            onCancel = {() => setVisible(false)}
                            okButtonProps = {{
                                disabled:
                                loading
                            }}
                            okText={loading ? "در حال اضافه کردن..." : "اضافه کردن"}
                            cancelText="لغو"
                            >
                                <Form
                                    name="add order in all orders list"
                                    {...editItemLayout}
                                >

                                    <Form.Item label="نام سفارش دهنده">
                                        <Select placeholder="سفارش دهنده" onChange={handleChange} >
                                            {getCustomers.data.allCustomers.map( customer => {
                                                return(
                                                    <Option value={customer.id} >
                                                    {customer.user.firstName + " " + customer.user.lastName}
                                                    </Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>




                                    <Form.Item label="هزینه">
                                        <Input
                                            id = "transportation-cost"
                                            onChange={event => {
                                                    setCost(event.target.value);
                                                }
                                            }
                                            />
                                    </Form.Item>

                                    <Form.Item label="کد سفارش">
                                        <Input
                                            id = "order-code"
                                            onChange={event => {
                                                setOrderCode(event.target.value);
                                                setOrderCodeState(!!orderCode);
                                            }}
                                            placeholder={"U1234567"}/>
                                    </Form.Item>

                                    <Form.Item label="آدرس مقصد">
                                        <Input
                                            id = "destAddress"
                                            onChange={event => {
                                                setDestAddress(event.target.value);
                                                setDestAddressState(!!destAddress);
                                            }}
                                            placeholder={"ایران، تهران"}/>
                                    </Form.Item>


                                    {error && <Error error = {error}/>}
                                    {getCustomers.error && <Error error = {getCustomers.error}/>}

                                </Form>

                       </Modal>
                    )
                }}
                </Query>

            )
        }}
    </Mutation>
  );
};


export default (AddOrder);

const GET_ALL_CUSTOMERS = gql`
{
    allCustomers {
        id
        user{
            id
            firstName
            lastName
        }
    }
}
`;

const ADD_ORDER = gql`
  mutation ($orderData: OrderInput!, $orderCode: String!) {
  createOrder(orderData: $orderData, orderCode: $orderCode) {
    order{
       id
    }
  }
}
`;
