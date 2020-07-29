import React, { Component } from 'react'
import {
    Divider,
    Form,
    Input,
    Button,
} from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import DriverInfo from './driver-info';

import './user.css'

const editItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 10 },
};

export default class DriverProfile extends Component {
    render() {
        return (
            <div className="user-profile">
                <Divider>مشخصات</Divider>
                {/* <Row>
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
                            name="user profile"
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


                </Row> */}
                <DriverInfo />
                <Divider>ویرایش اطلاعات</Divider>

                <Form
                    {...editItemLayout}
                    // style={{width:490}}
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
