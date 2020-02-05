import React from 'react';
import './styles/index.css'

function Output({preview}) {
  return ( <div id="output"> {preview ? preview : "Preview Not Available"}</div> )
};

export default Output;
