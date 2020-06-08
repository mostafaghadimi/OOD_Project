import React, { Component } from 'react'
import {
    Form,
    Input,
    Space,
    Button,
    message,
    Typography,
} from 'antd';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

import './order.css'


const { Title } = Typography;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
const { TextArea } = Input;
const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

export default class OrderDetail extends Component {
    componentDidMount(){
        mapboxgl.accessToken = "pk.eyJ1IjoibW9zdGFmYWdoYWRpbWkiLCJhIjoiY2tiNXM5aDN1MWExMDJvcGE5OWZxZzZzaSJ9.PSVotM-8-Uz6-oAUFIxpRA";

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [51.388973, 35.689198],
            zoom: 12
            
            });
             
            var marker = new mapboxgl.Marker()
            .setLngLat([51.4021, 35.6891])
            .addTo(map);
    }

    render() {
        const onFinish = values => {
            console.log('Received values of form: ', values);
        };

        const success = () => {
            message.success('بار با موفقیت تحویل گرفته شد.');
        };

        return (
            <Form
                className="order-container padding"
                name="Add Order"
                {...formItemLayout}
                onFinish={onFinish}
            >
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Title level={4}>
                        جزئیات سفارش
                    </Title>
                </Form.Item>
                
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

                <Form.Item label="موقعیت">
                    <div id="map" style={{width:400, height:400}}></div>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Space>
                        <Button type="primary" htmlType="submit" onClick={success}>
                            تایید تحویل بار
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        )
    }
}
