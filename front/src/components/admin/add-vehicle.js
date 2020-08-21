import React, {Component, useState} from 'react'
import {
    Divider,
    Form,
    Input,
    Button, Modal, Col, Rate, Card, Row, DatePicker, Upload, Select,
} from 'antd';
import {KeyOutlined, UploadOutlined} from '@ant-design/icons';

import '../user/user.css'
import {gql} from "@apollo/client";
import {Mutation, Query} from "react-apollo";
import moment from 'moment';
import handleError from "../shared/util";


const editItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 30 },
};

const { Option } = Select;

const AddVehicle = ({visible, setVisible}) => {
    const [plateNo1, setPlateNo1] = useState("");
    const [plateNo1State, setPlateNo1State] = useState(false);
    const [plateNo2, setPlateNo2] = useState("");
    const [plateNo2State, setPlateNo2State] = useState(false);
    const [plateNo3, setPlateNo3] = useState("");
    const [plateNo3State, setPlateNo3State] = useState(false);
    const [plateLetter, setPlateLetter] = useState("");
    const [plateLetterSate, setPlateLetterState] = useState(false);

    const [maxCapacity, setMaxCapacity] = useState(0);
    const [vehicleType, setVehicleType] = useState("");
    const [vehicleTypeState, setVehicleTypeState] = useState(false);






    // const [image, setImage] = useState(vehicle.profilePicture);



    const handleSubmit = async (event, createVehicle) => {
        console.log("In the handleSubmit");
        event.preventDefault();
        const res = await createVehicle();
        setVisible(false);
        info("ماشین با موفقیت اضافه شد", "");
    };

    const handleChangeType = (value) => {
        console.log(value);
        setVehicleType(value);
        setVehicleTypeState(true);
    };

    const handleChangePlateLetter = (value) => {
        console.log(value);
        setPlateLetter(value);
        setPlateLetterState(true);
    };


    // const normFile = e => {
    //     console.log('Upload event:', e.file);
    //     setImage(e.file);
    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //     return e && e.fileList;
    // };

    function info(message, content) {
      Modal.info({
        title: message,
        content: content,
        onOk() {},
      });
    }

    return (
        <Mutation
            mutation={ADD_DRIVER}
            variables={
                {
                    "vehicleData": {
                        "vehicleType": vehicleType,
                        "plateNo": plateNo1 + plateNo2 + plateNo3 + plateLetter,
                        "maxCapacity": maxCapacity,
                    }
                }
            }
            onError={handleError}
        >
            {(createVehicle, {loading, error}) => {
                return (
                   <Modal
                        title = "اضافه کردن ماشین"
                        visible={visible}
                        onOk = {event => handleSubmit(event, createVehicle)}
                        onCancel = {() => setVisible(false)}
                        okButtonProps = {{
                            disabled:
                            loading ||
                            !vehicleTypeState ||
                            !plateLetterSate ||
                            !plateNo1State ||
                            !plateNo2State ||
                            !plateNo3State
                        }}
                        okText={loading ? "در حال اضافه کردن..." : "اضافه کردن"}
                        cancelText="لغو"
                        >
                            <Form
                                name="add vehicle in all vehicles list"
                                {...editItemLayout}
                                // onComplete = {() => info("ماشین با موفقیت اضافه شد", "")}

                            >
                                <Form.Item label="نوع سواری" >
                                    <Select placeholder="انتخاب نوع سواری" onChange = {handleChangeType}>
                                        <Option value="1">ماشین سنگین</Option>
                                        <Option value="2">ماشین سبک</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="پلاک">
                                    <Input.Group compact>
                                        <Form.Item style={{'width':'20%'}}>
                                            <Input placeholder="ایران" maxLength={2} id={"iran"} onChange = {event => {
                                                    if(event.target.value.match("^[0-9]{2}$") != null) {
                                                        setPlateNo3(event.target.value);
                                                        setPlateNo3State(true);
                                                        document.getElementById("iran").style.backgroundColor = 'white';
                                                    }
                                                    else {
                                                        setPlateNo3("");
                                                        setPlateNo3State(false);
                                                        document.getElementById("iran").style.backgroundColor = 'pink';
                                                    }
                                                }

                                            }/>
                                        </Form.Item>
                                        <Form.Item style={{'width':'40%'}}>
                                            <Input placeholder="سه رقم سمت راست" maxLength={3} id={"right3"} onChange = {event =>{
                                                    if(event.target.value.match("^[1-9]{3}$") != null) {
                                                        setPlateNo2(event.target.value);
                                                        setPlateNo2State(true);
                                                        document.getElementById("right3").style.backgroundColor = 'white';
                                                    }
                                                    else {
                                                        setPlateNo2("");
                                                        setPlateNo2State(false);
                                                        document.getElementById("right3").style.backgroundColor = 'pink';
                                                    }
                                                }

                                            }/>
                                        </Form.Item>
                                        <Form.Item style={{'width':'10%'}}>
                                            <Select placeholder="حرف" style={{'width':'100%'}} onChange = {handleChangePlateLetter}>
                                                <Option value="ع">ع</Option>
                                                <Option value="ب">ب</Option>
                                                <Option value="ا">الف</Option>
                                                <Option value="خ">خ</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item style={{'width':'30%'}}>
                                            <Input placeholder="دو رقم سمت چپ" maxLength={2} id={"left2"} onChange = { event =>{
                                                    if(event.target.value.match("^[1-9]{2}$") != null) {
                                                        setPlateNo1(event.target.value);
                                                        setPlateNo1State(true);
                                                        document.getElementById("left2").style.backgroundColor = 'white';
                                                    }
                                                    else {
                                                        setPlateNo1("");
                                                        setPlateNo1State(false);
                                                        document.getElementById("left2").style.backgroundColor = 'pink';
                                                    }
                                                }

                                            }/>
                                        </Form.Item>
                                    </Input.Group>
                                </Form.Item>

                                <Form.Item label="بشینه وزن قابل تحمل" onChange = {event => {
                                    setMaxCapacity(event.target.value)
                                }}>
                                    <Input placeholder="20"/>
                                </Form.Item>

                                {/*{error && <Error error = {error}/>}*/}
                            </Form>

                   </Modal>
          )
        }}
    </Mutation>
  );
};


export default (AddVehicle);

const ADD_DRIVER = gql`
  mutation ($vehicleData: VehicleInput!) {
  createVehicle(vehicleData: $vehicleData) {
    vehicle{
       id
    }
  }
}
`;
