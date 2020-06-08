import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { CarOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Modal, Input  } from 'antd';

import './sidebar.css'

const { SubMenu } = Menu;
const { Sider } = Layout;

export default class Sidebar extends Component {

    state = { visible: false };
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
        return (
            <Sider width={250} className="site-layout-background">
                <Menu
                mode="inline"
                className="sidebar"
                // defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                >
                <SubMenu key="sub1" icon={<UserOutlined />} title="سفارش‌دهنده">
                    
                    <Menu.Item key="1">
                        <Link to="/user/profile">
                            پروفایل
                        </Link>
                    </Menu.Item>
                    
                    <Menu.Item key="2">
                        <Link to="/order/list">
                            سفارشات
                        </Link>
                    </Menu.Item>
                    
                    <Menu.Item key="3">
                        <Link to="/order/add">
                            ثبت سفارش 
                        </Link>
                    </Menu.Item>
                    
                    <Menu.Item key="4">
                        <Link to="/driver/list">
                            لیست راننده‌ها
                        </Link>
                    </Menu.Item>

                    {/* <Menu.Item key="19">
                        <Link to="/order/detail">
                            جزئیات سفارش
                        </Link>
                    </Menu.Item> */}
                </SubMenu>
                
                <SubMenu key="sub3" icon={<CarOutlined />} title="راننده">

                    <Menu.Item key="14">
                          <Button block onClick={this.showModal}>
                            ورود
                        </Button>‍
                        <Modal
                            title="ورود راننده به سامانه"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            okText="ورود"
                            cancelText="لغو"
                            >
                            <p>
                                <Input size="large" placeholder="نام کاربری" prefix={<UserOutlined />} />  
                            </p>
                            <p>
                                <Input.Password  size="large" placeholder="رمز عبور" prefix={<KeyOutlined />} />

                            </p>
                            
                        </Modal>
                    </Menu.Item>

                    <Menu.Item key="13">
                        <Link to='/driver/register'>
                            <Button block>
                                ثبت نام
                            </Button>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="20">
                        <Link to="/driver/profile">
                            پروفایل
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="9">
                        <Link to='/driver/history'>
                            تاریخچه بار
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="10">
                        <Link to='/driver/crash'>
                            اعلام حادثه
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="11">
                        <Link to='/vehicle/add'>
                        ثبت خودرو حمل‌بار جدید
                        </Link>
                    </Menu.Item>
                </SubMenu>
                </Menu>
            </Sider>
        )
    }
}
