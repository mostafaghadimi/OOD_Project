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

const VerifyDeliveryOrder= ({order, visible, setVisible}) => {
    const [rate, setRate] = useState("");
    const [rateState, setRateState] = useState(false);


    const handleSubmit = async (event, verifyDelivery) => {
        console.log("In the handleSubmit");
        event.preventDefault();
        verifyDelivery();
        info("راننده با موفقیت به سفارش اختصاص یافت!", "");
        setVisible(false);
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
            mutation={VERIFY_DELIVERY}
            variables={
                {
                    "rate": rate,
                    "orderId" : order.id,
                }
            }
        >
            {(verifyDelivery, {loading, error}) => {
                return (

                    <Modal
                        title="تایید ارسال"
                        visible={visible}
                        onOk={event => handleSubmit(event, verifyDelivery)}
                        onCancel={() => setVisible(false)}
                        okButtonProps={{
                            disabled:
                                loading ||
                                !rate
                        }}
                        okText={loading ? "در حال تایید..." : "تایید"}
                        cancelText="لغو"
                    >

                        <Form
                            name="verify delivery"
                            {...editItemLayout}
                        >
                            <Form.Item label="امتیاز">
                                <Rate defaultValue={3} onChange = {value => {
                                    setRate(value);
                                    setRateState(!!value);
                                }}/>
                            </Form.Item>

                        </Form>
                        {error && <Error error={error}/>}


                    </Modal>
                )
            }}
        </Mutation>
    );
};



const VERIFY_DELIVERY= gql`
mutation ($orderId: ID!, $rate: Int){
  verifyDelivery(orderId: $orderId, rate: $rate){
    order {
      id
    }
  }
}
`;

export default (VerifyDeliveryOrder);



