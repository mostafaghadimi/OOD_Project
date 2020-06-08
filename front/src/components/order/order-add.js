import React, { Component } from 'react'
import {
    Form,
    Input,
    Button,
    DatePicker,
} from 'antd';

import './order.css'


const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
const { TextArea } = Input;

export default class AddOrder extends Component {
    render() {
        const onFinish = values => {
            console.log('Received values of form: ', values);
        };

        return (
            <Form
                className="order-container padding"
                name="Add Order"
                {...formItemLayout}
                onFinish={onFinish}
            >
                <Form.Item label="سفارش‌دهنده">
                    <Input placeholder="امیرحسن فتحی" disabled/>
                </Form.Item>


                <Form.Item label="آدرس مبدا">
                    <Input placeholder="آدرس مبدا بارگیری" type="text"/>
                </Form.Item>

                <Form.Item label="آدرس مقصد">
                    <Input placeholder="آدرس مقصد تحویل بار" type="text"/>
                </Form.Item>

                <Form.Item label="نام تحویل‌گیرنده">
                    <Input placeholder="نام تحویل‌گیرنده بار" type="text"/>
                </Form.Item>

                <Form.Item label="شماره تماس">
                    <Input placeholder="شماره تماس تحویل‌گیرنده بار" type="tel"/>
                </Form.Item>


                <Form.Item label="وزن بار">
                    <Input placeholder="وزن بار به عدد (کیلوگرم)" type="number"/>
                </Form.Item>

                <Form.Item label="تاریخ تحویل بار">
                    <DatePicker/>
                </Form.Item>

                <Form.Item label="توضیحات">
                    <TextArea rows={4} placeholder="توضیحات را در این قسمت بنویسید..."/>
                </Form.Item>
                

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        ثبت سفارش
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
