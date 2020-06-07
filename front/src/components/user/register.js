import React, { Component } from 'react'

import {
    Form,
    Input,
    Button,
    Upload,
    DatePicker,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import './user.css'


const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

export default class Register extends Component {
    render() {
        const onFinish = values => {
            console.log('Received values of form: ', values);
        };

        return (
            <Form
                className="registration-form"
                name="user registration"
                {...formItemLayout}
                onFinish={onFinish}
            >
                <Form.Item label="نام">
                    <Input placeholder="مصطفی"/>
                </Form.Item>

                <Form.Item label="نام خانوادگی">
                    <Input placeholder="قدیمی"/>
                </Form.Item>

                <Form.Item label="شماره تماس">
                    <Input placeholder="۰۹۱۲۰۷۲۷۱۷۵" type="tel"/>
                </Form.Item>
                
                <Form.Item label="کد ملی">
                    <Input placeholder="0080080081" type="tel"/>
                </Form.Item>

                <Form.Item label="تاریخ تولد">
                    <DatePicker/>
                </Form.Item>

                <Form.Item
                    name="عکس پرسنلی"
                    label="عکس پرسنلی"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                    <Button>
                        <UploadOutlined /> عکس خود را انتخاب کنید
                    </Button>
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        ثبت کن
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
