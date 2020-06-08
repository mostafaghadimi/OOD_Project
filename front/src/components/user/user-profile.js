import React, { Component } from 'react'
import { 
    Divider, 
    Form,
    Input,
    Avatar,
    Button,
} from 'antd';
import { KeyOutlined } from '@ant-design/icons';

import './user.css'

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

export default class UserProfile extends Component {
    render() {
        return (
            <div className="user-profile">
                <Divider>ویرایش اطلاعات</Divider>
                    
                <Form
                    {...formItemLayout}
                    // style={{width:490}}
                >
                    <Form.Item label="عکس کاربر">
                        <Avatar 
                            src={require('../../static/images/avatar.jpeg')} 
                            size={100}
                        />
                    </Form.Item>
                    <Form.Item label="نام">
                        <Input value="امیرحسن"/>
                    </Form.Item>

                    <Form.Item label="نام خانوادگی">
                        <Input value="فتحی"/>
                    </Form.Item>

                    <Form.Item label="تاریخ تولد">
                        <Input value="1376/10/24"/>
                    </Form.Item>

                    
                    <Form.Item label="شماره تماس">
                        <Input value="09151231231" type="tel"/>
                    </Form.Item>
                    
                    <Form.Item label="رمز عبور قبلی">
                        <Input.Password  placeholder="رمز عبور قبلی" prefix={<KeyOutlined />} />
                    </Form.Item>

                    <Form.Item label="رمز عبور جدید">
                        <Input.Password  placeholder="رمز عبور جدید" prefix={<KeyOutlined />} />
                    </Form.Item>
                    
                    <Form.Item label="تکرار رمز عبور">
                        <Input.Password  placeholder=" تکرار رمز عبور جدید" prefix={<KeyOutlined />} />
                    </Form.Item>

                    <Form.Item label>
                        <Button type="primary" htmlType="submit">
                            ویرایش
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
