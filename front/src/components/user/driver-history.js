import React, { Component } from 'react'
import { Table } from 'antd';

const columns = [
    {
      title: 'صاحب بار',
      dataIndex: 'orderer',
    },
    {
      title: 'تحویل گیرنده',
      dataIndex: 'deliverer',
    },
    {
      title: 'وزن بار',
      dataIndex: 'weight',
    },
    {
      title: 'تاریخ تحویل',
      dataIndex: 'date',
    },
];

export default class DriverHistory extends Component {
    constructor(props) {
        super(props);
        const title = () => 'تاریخچه بار';
        this.state = {
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
    
    render() {
        const data = [];

        for (let i = 1; i <= 10; i++) {
            data.push({
                key: i,
                orderer: 'مصطفی قدیمی',
                deliverer: 'امیرهوشنگ اکبری',
                weight: 82 + i,
                date: '1399/08/25'
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
            </div>
        )
    }
}
