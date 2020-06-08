import React, { Component } from 'react'
import {
    Form,
    Select,
    Input,
    Button,
} from 'antd';

import './vehicle.css'

const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

export default class CrashReport extends Component {
    render() {

        const onFinish = values => {
            console.log('Received values of form: ', values);
        };

        return (
            <Form
                className="vehicle-add-form"
                name="user registration"
                {...formItemLayout}
                onFinish={onFinish}
            >
                <Form.Item label="انتخاب خودرو">
                    <Select placeholder="پلاک">
                        <Option value="1">۴۷ ل ۷۳۹ ایران ۹۹</Option>
                        <Option value="2">۴۷ س ۲۳۴ ایران ۶۸</Option>

                    </Select>
                </Form.Item>

                <Form.Item label="توضیحات">
                    <TextArea rows={4} placeholder="شرح وقوع حادثه"/>
                </Form.Item>

                

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="danger" htmlType="submit">
                        گزارش حادثه
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
