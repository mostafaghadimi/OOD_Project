import React, { Component } from 'react'
import { 
    Card, 
    Divider, 
    Row, 
    Col,
    Form,
    Input,
    Rate,
    Button,
} from 'antd';
import { EditOutlined, EllipsisOutlined, KeyOutlined } from '@ant-design/icons';

import './user.css'

const { Meta } = Card;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

export default class Profile extends Component {
    render() {
        const onFinish = values => {
            console.log('Received values of form: ', values);
        };
        return (
            <div className="user-profile">
                <Divider>مشخصات</Divider>
                <Row>
                    <Col span={9}>
                        <Card
                            style={{ width: 320 }}
                            cover={
                            <img
                                alt="User Profile Picture"
                                src={require('../../static/images/avatar.jpeg')}
                            />
                            }
                            hoverable
                        >
                            <Meta
                                title="امیرحسن فتحی"
                                description="راننده‌ی تریلر، خاور، وانت"
                            />
                        </Card>
                    </Col>
                    <Col span={15}>
                        <Form
                            name="user registration"
                            {...formItemLayout}
                            onFinish={onFinish}
                        >
                            <Form.Item label="نام">
                                <Input placeholder="امیرحسن" disabled/>
                            </Form.Item>

                            <Form.Item label="نام خانوادگی">
                                <Input value="فتحی" disabled/>
                            </Form.Item>

                            <Form.Item label="کد ملی">
                                <Input placeholder="0080080081" type="tel" disabled/>
                            </Form.Item>

                            <Form.Item label="تاریخ تولد">
                                <Input placeholder="1376/10/24" disabled/>
                            </Form.Item>

                            <Form.Item label="امتیاز">
                                <Rate disabled defaultValue={4} />
                            </Form.Item>
                        
                        </Form>
                    </Col>

                </Row>
                <Divider>ویرایش اطلاعات</Divider>
                <Form
                    style={{width:490}}
                >
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            ویرایش
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
