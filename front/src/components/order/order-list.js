import React, { Component } from 'react'
import { Table, Button, Modal } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';

import './order.css'

const columns = [
    {
      title: 'سفارش‌دهنده',
      dataIndex: 'orderer',
    },
    {
      title: ' وزن بار',
      dataIndex: 'weight',
      sorter: (a, b) => a.age - b.age,
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
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: 'وضعیت',
      key: 'status',
      render: () => (
        <span>
            <CheckCircleTwoTone twoToneColor="#52c41a"/>
        </span>
      ),
    },
];


export default class OrderList extends Component {
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
                address: 'دانشگاه شریف، مترو حبیب‌الله، روبه‌روی فلافلی عمو اکبر',
            })
        }
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

        

        return (
            <div className="order-container">
                 <Table
                    {...this.state}
                    columns={columns}
                    dataSource={data}
                    scroll={this.scroll}
                />
                
                {/* TODO: Modal doesn't work */}
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
}
