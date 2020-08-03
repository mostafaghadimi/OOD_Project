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



export default class DriverInfo extends Component {
    render() {
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
                

            </Row>
        )
    }
}