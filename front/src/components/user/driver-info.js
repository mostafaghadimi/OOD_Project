import React, { Component } from 'react'
import { 
    Card, 
    Row, 
    Col,
    Form,
    Input,
    Rate,
} from 'antd';

const { Meta } = Card;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};



const DriverInfo = ({driver}) => {
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <Row>
            <Col span={15}>
                <Form
                    name="user profile"
                    {...formItemLayout}
                    onFinish={onFinish}
                >
                    <Form.Item label="نام">
                        <Input placeholder={driver.user.firstName} disabled/>
                    </Form.Item>

                    <Form.Item label="نام خانوادگی">
                        <Input value={driver.user.lastName} disabled/>
                    </Form.Item>

                    <Form.Item label="کد ملی">
                        <Input placeholder={driver.nationalId} type="tel" disabled/>
                    </Form.Item>

                    <Form.Item label="تاریخ تولد">
                        <Input placeholder={driver.birthday} disabled/>
                    </Form.Item>


                    <Form.Item label="نام کاربری">
                        <Input value={driver.user.username} type="tel" disabled/>
                    </Form.Item>

                    <Form.Item label="ایمیل">
                        <Input value={driver.user.email} type="tel" disabled/>
                    </Form.Item>

                    <Form.Item label="شماره تماس">
                        <Input value={driver.user.phoneNo} type="tel" disabled/>
                    </Form.Item>


                    <Form.Item label="امتیاز">
                        <Rate disabled defaultValue={driver.rating} />
                    </Form.Item>

                </Form>
            </Col>
            <Col span={9}>
                <Card
                    style={{ width: 320 }}
                    cover={
                    <img
                        alt="User Profile"
                        src={require('../../static/images/avatar.jpeg')}
                    />
                    }
                    hoverable
                >
                    <Meta
                        title= {driver.firstName}
                        description="راننده‌ی تریلر، خاور، وانت"
                    />
                </Card>
            </Col>



        </Row>
    )
};

export default (DriverInfo);