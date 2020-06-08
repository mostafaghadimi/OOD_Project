import React, { Component } from 'react'
import { Table, Button, Modal } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import OrderDetail from './order-detail';

import './order.css'

const columns = [
    {
      title: 'سفارش‌دهنده',
      dataIndex: 'orderer',
    },
    {
      title: ' وزن بار',
      dataIndex: 'weight',
      sorter: (a, b) => a.weight - b.weight,
    },
    {
        title: 'مشخصات',
        dataIndex: 'info',
    },
    {
      title: 'آدرس',
      dataIndex: 'address',
      filters: [
        {
          text: 'تهران',
          value: 'Tehran',
        },
        {
          text: 'شیراز',
          value: 'Shiraz',
        },
      ],
      // TODO: make it work
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: 'وضعیت',
      dataIndex: 'status',
      render: () => (
        <span>
            <CheckCircleTwoTone twoToneColor="#52c41a"/>
        </span>
      ),
    },
];

export default class OrderList extends Component {
    constructor(props) {
        super(props);
        const title = () => 'سفارش‌های ثبت شده';
        this.state = {
            visible: false,
            bordered: true,
            loading: false,
            pagination: false,
            size: 'default',
            title,
            showHeader: true,
            rowSelection: {},
            scroll: undefined,
            tableLayout: undefined,
            top: 'none',
            bottom: 'bottomRight',
          };
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    
    render() {
        const data = []

        for (let i = 1; i <= 10; i++) {
            data.push({
                key: i,
                orderer: 'مصطفی قدیمی',
                weight: 82 + i,
                info: <Button key={i} onClick={this.showModal}>جزئیات سفارش</Button>,
                address: 'تهران، دانشگاه شریف، مترو حبیب‌الله، روبه‌روی فلافلی عمو اکبر',
            })
        }

        return (
            <div className="order-container">
                 <Table
                    {...this.state}
                    columns={columns}
                    dataSource={data}
                    scroll={this.scroll}
                />
                
                <Modal
                    title="جزئیات سفارش"
                    visible={this.state.visible}
                    // onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width='80%'
                    bodyStyle={{overflow: 'auto'}}
                >
                    <OrderDetail />
                </Modal>
            </div>
        )
    }
}
