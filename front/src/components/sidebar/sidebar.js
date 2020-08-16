import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { CarOutlined, UserOutlined, KeyOutlined, InboxOutlined, CheckOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Modal, Input  } from 'antd';
import {Mutation, Query} from "react-apollo";
import { gql } from "apollo-boost";
import {UserType} from "../shared/user-type-enum";
import Login from "../user/login"

import './sidebar.css'


const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = (props) => {
    return (
        <Sider width={250} className="site-layout-background">
            <Menu
                mode="inline"
                className="sidebar"
                // defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{height: '100%', borderRight: 0}}
            >
                <SubMenu key="sub1" icon={<InboxOutlined/>} title="صاحب بار">
                    <Menu.Item key="14">
                        <Login type="Customer"> </Login>
                    </Menu.Item>

                    {props.isLoggedIn[UserType["Customer"]] ?
                        <Menu.Item key="1">
                            <Link to={`/user/${props.currentUser.id}}/profile`}>
                                پروفایل
                            </Link>
                        </Menu.Item>
                        : <div></div>
                    }

                    {props.isLoggedIn[UserType["Customer"]] ?
                        <Menu.Item key="2">
                            <Link to={`/customer/${props.currentUser.id}}/orderList`}>
                                سفارشات
                            </Link>
                        </Menu.Item>
                        : <div></div>
                    }

                    {props.isLoggedIn[UserType["Customer"]] ?
                        <Menu.Item key="3">
                            <Link to={`/customer/${props.currentUser.id}}/addOrder`}>
                                ثبت سفارش
                            </Link>
                        </Menu.Item>
                        : <div></div>
                    }

                    {props.isLoggedIn[UserType["Customer"]] ?
                        <Menu.Item key="4">
                            <Link to={`/customer/${props.currentUser.id}}/driverList`}>
                                لیست راننده‌ها
                            </Link>
                        </Menu.Item>
                        : <div></div>
                    }


                    {/* <Menu.Item key="19">
    <Link to="/order/detail">
        جزئیات سفارش
    </Link>
</Menu.Item> */}
                </SubMenu>
                <SubMenu key='sub2' icon={<UserOutlined/>} title="مدیر سامانه">
                </SubMenu>
                <SubMenu key="sub3" icon={<CarOutlined/>} title="راننده">

                    <Menu.Item key="14">
                        <Login type="Driver"> </Login>
                    </Menu.Item>

                    <Menu.Item key="13">
                        <Link to='/driver/register'>
                            <Button block>
                                ثبت نام
                            </Button>
                        </Link>
                    </Menu.Item>

                    {props.isLoggedIn[UserType["Driver"]] ?
                        <Menu.Item key="20">
                            <Link to={`/driver/${props.currentUser.id}}/profile`}>
                                پروفایل
                            </Link>
                        </Menu.Item>
                        : <div></div>
                    }


                    {props.isLoggedIn[UserType["Driver"]] ?
                        <Menu.Item key="9">
                            <Link to={`/driver/${props.currentUser.id}}/history`}>
                                تاریخچه بار
                            </Link>
                        </Menu.Item>
                        : <div></div>
                    }


                    {props.isLoggedIn[UserType["Driver"]] ?
                        <Menu.Item key="10">
                            <Link to={`/driver/${props.currentUser.id}}/crash`}>
                                اعلام حادثه
                            </Link>
                        </Menu.Item>
                        : <div></div>
                    }


                    {props.isLoggedIn[UserType["Driver"]] ?
                        <Menu.Item key="11">
                            <Link to={`/driver/${props.currentUser.id}}/addVehicle`}>
                                ثبت خودرو حمل‌بار جدید
                            </Link>
                        </Menu.Item>
                        : <div></div>
                    }

                </SubMenu>

                <SubMenu key="sub4" icon={<CheckOutlined/>} title="مدیر احراز هویت">
                    <Menu.Item key="14">
                        <Login type="Authorizer"> </Login>
                    </Menu.Item>

                    {props.isLoggedIn[UserType["Authorizer"]] ?
                        <Menu.Item key="22">
                            <Link to={`/authorizer/${props.currentUser.id}}/authorizeDrivers`}>
                                لیست درخواست های ثبت نام
                            </Link>
                        </Menu.Item>
                        : <div></div>
                    }


                </SubMenu>
            </Menu>
        </Sider>
    )

};


export default (Sidebar);