import React, { Component } from 'react'

import {
    Form,
    Select,
    Input,
    Button,
    Radio,
} from 'antd';


import './vehicle.css'

const { Option } = Select;

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



export default class AddVehicle extends Component {
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
                <Form.Item label="نوع سواری">
                    <Select placeholder="انتخاب نوع سواری">
                        <Option value="trailer">تریلر</Option>
                        <Option value="truck">کامیون</Option>
                        <Option value="khavar">خاور</Option>
                        <Option value="vanet">وانت</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="مالک">
                    <Radio.Group>
                        <Radio value="me">خودم</Radio>
                        <Radio value="company">شرکت</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="پلاک">
                    <Input.Group compact>
                        <Form.Item style={{'width':'20%'}}>
                            <Input placeholder="ایران" />
                        </Form.Item>
                        <Form.Item style={{'width':'40%'}}>
                            <Input placeholder="سه رقم سمت راست"/>
                        </Form.Item>
                        <Form.Item style={{'width':'10%'}}>
                            <Select placeholder="حرف" style={{'width':'100%'}}>
                                <Option value="trailer">تریلر</Option>
                                <Option value="truck">کامیون</Option>
                                <Option value="khavar">خاور</Option>
                                <Option value="vanet">وانت</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item style={{'width':'30%'}}>
                            <Input placeholder="دو رقم سمت چپ"/>
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
                
                

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        ثبت اطلاعات
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
