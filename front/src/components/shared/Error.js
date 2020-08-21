import React, { useState } from "react";
import {Modal} from "antd";
import { onError } from "@apollo/client/link/error";

const Error = ({ error }) => {
    const [visible, setVisible] = useState(true);
    var errorMessage = "";

    return (

        <Modal
            title="لیست خطا ها"
            visible={visible}
            onOk={() => {
                setVisible(false);
            }
            }
            cancelButtonProps={{type: "text"}}
            okText="تایید"
            cancelText=" "
        >
            <div>

                {error.message}
            </div>
        </Modal>
    )
};


export default (Error);