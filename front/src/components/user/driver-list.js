import React, { Component } from 'react'
import { Table, Button, Modal, Tooltip, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

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

const { Search } = Input;
const title = () => (
    <div>
        <p>
            لیست راننده‌ها
        </p>
        <Search
            placeholder="جست‌وجو در لیست راننده‌ها" 
            onSearch={value => console.log(value)} 
            enterButton 
            style={{width:400}}
        />
    </div>
);
export default class DriverList extends Component {
    
    constructor(props) {
        super(props);
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
            visibleDriver: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visibleDriver: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visibleDriver: false,
        });
    };

    
    render() {
        

       

        const data = [];

        for (let i = 1; i <= 10; i++) {
            data.push({
                key: i,
                driver: 'امیرهوشنگ اکبری',
                status: 
                    <div className="driver-status">
                        <span>
                            در ماموریت
                        </span>
                        <Tooltip placement="top" title='ویرایش'>
                            <Button key={i} shape="circle" onClick={this.showModal}>
                                <EditOutlined />
                            </Button>
                            <Modal
                                title="چرا نشون نمیده؟"
                                visible={this.state.visibleDriver}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                okText="ورود"
                                cancelText="لغو"
                            >
                            <p>
                                salam
                            </p>
                            
                            
                        </Modal>
                        </Tooltip>
                    </div>,
                location: <Button key={i} onClick={this.showModal}>مشاهده روی نقشه</Button>,
                history: <Button key={i}>مشاهده تاریخچه</Button>,
                score: 4
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


// class DedicateLoad extends Component {
//     render(){
//         return (
//             <div>
//                 اختصاص دادن بار اگه آزاد بود
//             </div>
//         )
//     }
// }

// class ChangeStatus extends Component {
//     render() {
//         return (
//             <div>
//                 تغییر وضعیت به تحویل داده اگه تو ماموریت بود! شایدم باید اتوماتیک باشه!
//             </div>
//         )
//     }
// }