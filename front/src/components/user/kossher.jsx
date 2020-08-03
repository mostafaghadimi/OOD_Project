const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};






// const formItemLayout = {
//     labelCol: { span: 6 },
//     wrapperCol: { span: 14 },
// };
//
// const normFile = e => {
//     console.log('Upload event:', e);
//     if (Array.isArray(e)) {
//         return e;
//     }
//     return e && e.fileList;
// };



function DriverRegister (props) {
    // state = { visible: false };



    // handleRegister = () => {
    //     this.checkAvailability();
    //
    //     this.setState({
    //         visible: true,
    //     });
    // };

    // checkAvailability = () => {
    //     const { data, loading, error } = useQuery(DRIVERS_QUERY);
    //             // for(element in data)
    //     for (let i = 1; i <= data.drivers[i].length; i++) {
    //         console.log(data.drivers[i].username);
    //     }
    // };

    // handleOk = e => {
    //     console.log(e);
    //     this.setState({
    //         visible: false,
    //     });
    // };
    const [driverRegister, { data }]  = useMutation(DRIVERS_QUERY);

    return (
            <div>
            <Form
                className="registration-form"
                name="user registration"
                {...formItemLayout}
                // onFinish={ values => {console.log('Received values of form: ', values);}}
                onSubmit={ e => {
          console.log(driverRegister({ variables: { type: String } }));
              console.log("fuck");

          }}
            >
                <Form.Item label="نام">
                    <Input placeholder="مصطفی"/>
                </Form.Item>

                <Form.Item label="نام خانوادگی">
                    <Input placeholder="قدیمی"/>
                </Form.Item>

                <Form.Item label="شماره تماس">
                    <Input placeholder="09120727175" type="tel"/>
                </Form.Item>

                <Form.Item label="کد ملی">
                    <Input placeholder="0080080081" type="tel"/>
                </Form.Item>

                <Form.Item label="تاریخ تولد">
                    <DatePicker/>
                </Form.Item>

                <Form.Item
                    name="عکس پرسنلی"
                    label="عکس پرسنلی"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                    <Button>
                        <UploadOutlined /> عکس خود را انتخاب کنید
                    </Button>
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        ثبت کن
                    </Button>
                     {/*<Modal*/}
                        {/*title=" ثبت نام راننده در سامانه به صورت موفقیت آمیز ثبت شد"*/}
                        {/*visible={this.state.visible}*/}
                        {/*onCancel={this.handleOk}*/}
                        {/*onOk = {this.handleOk}*/}
                        {/*>*/}
                    {/*</Modal>*/}
                </Form.Item>

            </Form>

            </div>

    );
}