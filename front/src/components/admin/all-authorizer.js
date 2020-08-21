import React, { useState } from 'react'
import { Table, Button, Modal, Tooltip, Input } from 'antd';
import {EditOutlined, KeyOutlined, UserOutlined, MinusOutlined} from '@ant-design/icons';
import Error from "../shared/Error";
import Loading from "../shared/loading"


import '../user/user.css'
import {Mutation, Query} from "react-apollo";
import {gql} from "apollo-boost";
import {UserType} from "../shared/user-type-enum";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from "../../admin-root";
import EditAuthorizer from "./edit-authorizer"
import AddAuthorizer from "./add-authorizer";



export const UserContext = React.createContext();

const columns = [
    {
      title: 'نام',
      dataIndex: 'firstName',
    },
    {
      title: 'نام خانوادگی',
      dataIndex: 'lastName',
    },
    {
      title: 'نام کاربری',
      dataIndex: 'username',

    },
    {
      title: 'ویرایش / پاک کردن',
      dataIndex: 'editDelete',
    }
];

const { Search } = Input;



const AllAuthorizerList = () => {
    const [visibleHistory, setVisibleHistory] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [authorizerClone, setAuthorizerClone] = useState(null);

    const title = () => (
        <div>
            <p>
                لیست راننده‌ها
            </p>
            <Search
                placeholder="جست‌وجو در لیست مدیران احراز هویت"
                onSearch={value => console.log(value)}
                enterButton
                style={{width:400}}
            />


        <Button type="primary" size="large" onClick = {() => setVisibleAdd(true)} style = {{position: 'absolute', up:2, left:1}}>
                    اضافه کردن
                </Button>

                <AddAuthorizer visible = {visibleAdd} setVisible = {setVisibleAdd}/>
        </div>
    );

    const state = {
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


    const handleEdit = (authorizer) => {
        console.log(authorizer);
        setAuthorizerClone(authorizer);
        setVisibleEdit(true);
    };

    const handleDelete = (event, deleteAuthorizer) => {
        event.preventDefault();
        deleteAuthorizer();
    };



    const allInfo = [];

    function info(message, content) {
      Modal.info({
        title: message,
        content: content,
        onOk() {},
      });
    }


    return (

        <Query query={GET_ALL_CUSTOMERS}>
        {({data, loading, error}) => {
            if(loading) return <Loading/>;
            console.log(data);

            const orderColumns = [
                {
                  title: 'مکان سفارش',
                  dataIndex: 'orderLocation',
                },
            ];


            {data.allAuthorizers.map( authorizer => {
                allInfo.push({
                    key: authorizer.id,
                    firstName:
                        authorizer.user.firstName,
                    lastName:
                        authorizer.user.lastName,
                    username:
                        authorizer.user.username,
                    editDelete:
                    <div>
                        <Tooltip placement="top" title='ویرایش'>

                            <Button key={4* authorizer.id + 2} shape="circle" onClick={() => handleEdit(authorizer)}>
                                <EditOutlined />
                            </Button>

                        </Tooltip>
                        <Mutation mutation={REMOVE_MUTATION}
                          variables={
                              {
                                  "id" : authorizer.id
                              }
                          }
                          onCompleted={() => {
                              info("مشتری با موفقیت حذف شد")
                          }}
                        >{(deleteAuthorizer, deleteData) => {
                            return (

                                <Tooltip placement="top" title= {deleteData.loading ? "در حال پاک کردن..." : "پاک کردن"}>
                                    <Button key={4* authorizer.id + 3} shape="circle" onClick={event => handleDelete(event, deleteAuthorizer)} disabled = {deleteData.loading}>
                                        <MinusOutlined />
                                    </Button>
                                    {deleteData.error && <Error error={deleteData.error} />}
                                </Tooltip>
                            )
                        }}
                        </Mutation>
                    </div>

                });

            })}
            return (
                <div className="order-container">



                    <Table
                        {...state}
                        columns={columns}
                        dataSource={allInfo}
                    />
                    {error && <Error error = {error}/>}
                    {authorizerClone && <EditAuthorizer authorizer = {authorizerClone} visible = {visibleEdit} setVisible = {setVisibleEdit}/>}
                </div>
            )
        }}
        </Query>
    )
};


const GET_ALL_CUSTOMERS = gql`
{
    allAuthorizers {
        id
        user{
            id
            firstName
            lastName
            username
            password
            email
            phoneNo
        }
    }
}
`;



const REMOVE_MUTATION = gql`
mutation($id : ID!){
    deleteAuthorizer (id : $id){
      id
    }
}
`;

export default (AllAuthorizerList);