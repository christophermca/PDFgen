import React, {useState} from 'react';

import Output from './Output/';
import UserForm from './UserForm/';

import './App.css';


function App() {

  const [theme, setTheme] = useState("default");
  const [patientId, setPatientId] = useState("");
  const [output, setOutput] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('submit')
    /*
    // request to aws lambda to request rendered template.
    fetch('', {
      headers: {
        "Access-Control-Allow-Origin": true
      }
    }).then(res => {
      console.log(res.status);
      return res;
    });
  */
    //setOutput(res.text)
  }

  return (
    <div className="App">
      <header>
      <h2> PDF Generation </h2>
      </header>
      <main>
        <UserForm onSubmission={handleSubmit} selectTheme={setTheme} setPatientId={setPatientId} theme={theme} patientId={patientId}/>
        <Output preview={output}/>
      </main>
    </div>
  );
}

export default App;
