import React from "react";
import Spinner from 'react-spinner-material';

const Loading = () => {
  const percentage = 66;
  return(

    <div>
      <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />
    </div>

  )
};



export default (Loading);