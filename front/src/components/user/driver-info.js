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



const DriverInfo = ({data}) => {
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <Row>
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
                        title= {data.firstName}
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
                        <Input placeholder={data.driver.user.firstName} disabled/>
                    </Form.Item>

                    <Form.Item label="نام خانوادگی">
                        <Input value={data.driver.user.lastName} disabled/>
                    </Form.Item>

                    <Form.Item label="کد ملی">
                        <Input placeholder={data.driver.nationalId} type="tel" disabled/>
                    </Form.Item>

                    <Form.Item label="تاریخ تولد">
                        <Input placeholder={data.driver.birthday} disabled/>
                    </Form.Item>

                    <Form.Item label="امتیاز">
                        <Rate disabled defaultValue={data.driver.rating} />
                    </Form.Item>

                </Form>
            </Col>


        </Row>
    )
};

export default (DriverInfo);