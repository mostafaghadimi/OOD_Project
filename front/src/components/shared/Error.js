import React, { useState } from "react";
import {Modal} from "antd";

const Error = ({ error }) => {
  const [visible, setVisible] = useState(true);

  return (
   <Modal
        title = "خطا به وجود آمده است"
        visible={visible}
        onOk = {() => {
            setVisible(false);
          }
        }
        cancelButtonProps={{ type: "text"}}
        okText="تایید"
        cancelText=" "
        >
       <p>
           متن خطا:
           {error.message}
       </p>
   </Modal>
  )
};


export default (Error);