import React, {Component, useState} from 'react'
import {
    Form,
    Input,
    Button,
    DatePicker, Modal,
} from 'antd';

import './order.css'
import {gql} from "apollo-boost";
import {Mutation} from "react-apollo";
import Error from "../user/driver-register";


const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
const { TextArea } = Input;

const AddOrder = () => {
    const [sourceAddress, setSourceAddress] = useState("");
    const [destAddress, setDestAddress] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [visible, setVisible] = useState(false);
    const [weight, setWeight] = useState(null);
    const [receiveDate, setReceiveDate] = useState(null);
    const [extraInfo, setExtraInfo] = useState("");

    const handleSubmit = (event, createOrder) => {
        console.log("In the handleSubmit");
        event.preventDefault();
        createOrder();
    };

    return (
        <Mutation
        mutation={NEW_ORDER_MUTATION}
        variables={
          {
              // TODO
          }
        }

        onCompleted={data => {
        console.log({ data });
        setVisible(true);
        }}
        >
        {(createOrder, { loading, error }) => {
            return (
                <Form
                    className="order-container padding"
                    name="Add Order"
                    {...formItemLayout}
                    // onFinish={onFinish}
                >
                    <Form.Item label="صاحب بار">
                        <Input placeholder="امیرحسن فتحی" disabled/>
                    </Form.Item>


                    <Form.Item label="آدرس مبدا">
                        <Input placeholder="آدرس مبدا بارگیری" type="text"
                            onChange={event => setSourceAddress(event.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label="آدرس مقصد">
                        <Input placeholder="آدرس مقصد تحویل بار" type="text"
                            onChange={event => setDestAddress(event.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label="نام تحویل‌گیرنده">
                        <Input placeholder="نام تحویل‌گیرنده بار" type="text"
                            onChange={event => setReceiverName(event.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label="شماره تماس">
                        <Input placeholder="شماره تماس تحویل‌گیرنده بار" type="tel"
                        onChange={event => setPhoneNo(event.target.value)}
                        />
                    </Form.Item>


                    <Form.Item label="وزن بار">
                        <Input placeholder="وزن بار به عدد (کیلوگرم)" type="number"
                        onChange={event => setWeight(event.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label="تاریخ تحویل بار">
                        <DatePicker
                        onChange={date => setReceiveDate(date)}
                        />
                    </Form.Item>

                    <Form.Item label="توضیحات">
                        <TextArea rows={4} placeholder="توضیحات را در این قسمت بنویسید..."
                        onChange={event => setExtraInfo(event.target.value)}
                        />
                    </Form.Item>


                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit"
                            disabled={
                            loading ||
                            !sourceAddress.trim() ||
                            !destAddress.trim() ||
                            !receiverName.trim() ||
                            !weight||
                            !receiveDate||
                            !phoneNo.trim()
                            }
                            onClick={event => handleSubmit(event, createOrder)}
                        >
                            {loading ? "در حال ثبت کردن..." : "ثبت سفارش"}
                        </Button>
                        <Modal
                        title="سفارش با موفقیت ثبت شد"
                        visible={visible}
                        onCancel={() => {
                            setVisible(false);
                          }
                        }
                        onOk = {() => {
                            setVisible(false);
                          }
                        }
                        >
                    </Modal>
                    </Form.Item>
                    {error && <Error error={error} />}
                </Form>
            )
        }}
        </Mutation>
    )
};


// TODO
const NEW_ORDER_MUTATION = gql`
mutation {
  createOrder {
     order { 
         id
     }
  }
}
`;

export default (AddOrder)