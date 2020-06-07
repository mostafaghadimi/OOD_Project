import React, { Component } from 'react';

import { Layout, Menu } from 'antd';
import Sidebar from '../sidebar/sidebar'
import './nav.css'

const { Header, Content } = Layout;


export default class Nav extends Component {
    render() {
        return (
            <Layout>
                <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">خانه</Menu.Item>
                    <Menu.Item key="2">نصب اپلیکیشن</Menu.Item>
                    <Menu.Item key="3">تماس با ما</Menu.Item>
                    <Menu.Item key="4">درباره ما</Menu.Item>
                </Menu>
                </Header>
                <Layout>
                    <Sidebar/>
                    <Layout className="nav-layout">
                        <Content
                            className="site-layout-background"
                        >
                        Content
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
