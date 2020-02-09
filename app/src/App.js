import React, {useState, useCallback} from 'react';

import Output from './Output/';
import UserForm from './UserForm/';
import Loading from './Loading/';

import './App.css';

function App() {

  const [theme, setTheme] = useState("default");
  const [patientId, setPatientId] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, isLoading] = useState(false);

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();
    isLoading(!loading);
    return fetch(`/generate_pdf?id=${patientId}&theme=${theme}`)
      .then(response =>  response.json())
      .then(data => {
        isLoading(!data);
        setOutput(data);
      });

  }, [loading, patientId, theme])

  return (
    <div className="App">
      <header>
      <h2> PDF Generation </h2>
      </header>
      {loading && <Loading />}
      <main>
        <UserForm pdf={output && output.pdf} onSubmission={handleSubmit} selectTheme={setTheme} setPatientId={setPatientId} theme={theme} patientId={patientId}/>
        <Output data={output}/>
      </main>
    </div>
  );
}

export default App;
