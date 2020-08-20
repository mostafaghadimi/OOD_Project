import React from "react";
import Spinner from 'react-spinner-material';

const Loading = () => {
  const percentage = 66;
  return(

    <div>
      <Spinner size={120} spinner_color={"#333"} spinner_width={2} visible={true} />
    </div>

  )
};



export default (Loading);