import React, { Component } from 'react'
import { Table, Button, Modal } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';

import './user.css'

const columns = [
    {
      title: 'نام راننده',
      dataIndex: 'driver',
    },
    {
      title: 'وضعیت',
      dataIndex: 'status',
      filters: [
        {
          text: 'در ماموریت',
          value: 'on-duty',
        },
        {
          text: 'آزاد',
          value: 'free',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
        title: 'موقعیت جغرافیایی',
        dataIndex: 'location',
    },
    {
      title: 'تاریخچه',
      dataIndex: 'history',
      
    },
    {
      title: 'امتیاز',
      dataIndex: 'score',
    },
];


export default class DriverList extends Component {
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
                driver: 'امیرهوشنگ اکبری',
                status: 'در ماموریت',
                location: <Button key={i} onClick={this.showModal}>مشاهده روی نقشه</Button>,
                history: 'سلام',
                score: 4.5
            })
        }
        const title = () => 'لیست راننده‌ها';

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
