import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { CarOutlined, UserOutlined, KeyOutlined, InboxOutlined, CheckOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Modal, Input  } from 'antd';
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import Error from "../shared/Error";
import './sidebar.css'

const { SubMenu } = Menu;
const { Sider } = Layout;

export default class Sidebar extends Component {

    state = { visibleDriver: false ,
        visibleAuthorizer:false,
    };

    showDriverModal = () => {
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

    handleDriverCancel = e => {
        console.log(e);
        this.setState({
            visibleDriver: false,
        });
    };


    showAuthorizerModal = () => {
        this.setState({
            visibleAuthorizer: true,
        });
    };

    handleAuthorizerCancel = e => {
        console.log(e);
        this.setState({
            visibleAuthorizer: false,
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
                <SubMenu key="sub1" icon={<InboxOutlined />} title="صاحب بار">
                    
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
                <SubMenu key='sub2' icon={<UserOutlined />} title="مدیر سامانه" >
                </SubMenu>
                <SubMenu key="sub3" icon={<CarOutlined />} title="راننده">

                    <Menu.Item key="14">
                          <Button block onClick={this.showDriverModal}>
                            ورود
                        </Button>‍
                        <Modal
                            title="ورود راننده به سامانه"
                            visible={this.state.visibleDriver}
                            // onOk={() => setNewUser(true)}
                            onCancel={this.handleDriverCancel}
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

                <SubMenu key="sub4" icon={<CheckOutlined />} title="مدیر احراز هویت">
                    <Menu.Item key="21">
                          <Button block onClick={this.showAuthorizerModal}>
                            ورود
                        </Button>‍
                        <Modal
                            title="ورود مدیر احراز هویت به سامانه"
                            visible={this.state.visibleAuthorizer}
                            // onOk={() => setNewUser(true)}
                            onCancel={this.handleAuthorizerCancel}
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

                    <Menu.Item key="22">
                        <Link to='/authorizer/registeredDro'>
                            لیست درخواست های ثبت نام
                        </Link>
                    </Menu.Item>


                </SubMenu>
                </Menu>
            </Sider>
        )
    }
}


const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;





