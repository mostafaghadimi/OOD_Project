import React, { Component } from 'react'
import {
    Form,
    Divider, 
    Row, 
    Col,
    Space,
    Button,
    message,
    Select,
} from 'antd';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import DriverInfo from '../user/driver-info';

import './order.css'


const { Option } = Select;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

export default class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        }
    }
    componentDidMount(){
        mapboxgl.accessToken = "pk.eyJ1IjoibW9zdGFmYWdoYWRpbWkiLCJhIjoiY2tiNXM5aDN1MWExMDJvcGE5OWZxZzZzaSJ9.PSVotM-8-Uz6-oAUFIxpRA";

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [51.388973, 35.689198],
            zoom: 12
        });
    }

    render() {
        const onFinish = values => {
            console.log('Received values of form: ', values);
        };

        const success = () => {
            message.success('بار با موفقیت تحویل گرفته شد.');
        };

        return (
            <div className='order-container'>
            <Divider>سفارش</Divider>
            <Form
                className="padding"
                name="Add Order"
                {...formItemLayout}
                onFinish={onFinish}
            >
            <Row>
            <Col span={15}>
                
                <Form.Item label="سفارش‌دهنده">
                    امیرحسن فتحی
                </Form.Item>

                <Form.Item label="آدرس مبدا">
                    پاسداران، آشپزخونه حاج ناصر، انبار حاج مهرداد، پلاک ۲۴، اسم رمز سلطان
                </Form.Item>

                <Form.Item label="آدرس مقصد">
                    یاخچی‌آباد، چهارراه دخانیات
                </Form.Item>

                <Form.Item label="نام تحویل‌گیرنده">
                    امیرهوشنگ اکبری
                </Form.Item>

                <Form.Item label="شماره تحویل‌گیرنده">
                    09120727715
                </Form.Item>


                <Form.Item label="وزن بار">
                    250 کیلوگرم
                </Form.Item>

                <Form.Item label="تاریخ تحویل بار">
                    1399/08/25
                </Form.Item>

                <Form.Item label="وضعیت">
                    در حال ارسال
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Space>
                        <Button type="primary" htmlType="submit" onClick={success}>
                            تایید تحویل بار
                        </Button>
                    </Space>
                </Form.Item>
                </Col>
                <Col span={9}>
                    <div id="map" style={{width:400, height:400}}></div>
                </Col>
                </Row>
            </Form>
            <Divider>راننده</Divider>
            {this.state.selected ? 
            <div>
                <DriverInfo />
                <br/>
                <Button className='change-driver-btn' type="primary" onClick={(e) => this.setState({selected: false})}>تغییر راننده</Button>
            </div>:
            <div>
                <Form layout='inline'>
                    <Form.Item label="اختصاص راننده">
                        <Select placeholder="راننده">
                            <Option value="1">امیرحسن فتحی</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item >
                        <Button type='primary' onClick={(e) => this.setState({selected: true})}>
                            ثبت
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            }
            </div>
        )
    }
}
