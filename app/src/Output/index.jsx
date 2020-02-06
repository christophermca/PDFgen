import React from 'react';
import './styles/index.css'

function Output({data}) {
  let value = "Click \"Preview\" to generate a preview of PDF";
  if (data) {
    if(data.error) {
      value = data.error;
    } else if(data.preview) {
      value = (<img alt="preview of generated report" width="100%" src={"data:image/jpeg;base64," + data.preview} />)
    }
  }

  return ( <div id="output"> {value} </div>)
};

export default Output;
