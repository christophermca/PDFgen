import React from 'react';
import './styles/index.css'

function UserForm({pdf, setPatientId, patientId, selectTheme, theme, onSubmission}) {

  const handlePatientId = ({target: {value}}) => {
      setPatientId(value);
  }

  const downloadButton = () => {
    return (
      <input onClick={download} type='button' value='download'></input>);
 }

const download = () => {
  const data = Buffer.from(pdf, 'base64');

  const dwnldlnk = document.createElement('a')
  dwnldlnk.download = ((!patientId.length) ? 'patient_000000_' : `${patientId}_`) + 'report';
  dwnldlnk.href="data:application/pdf;base64," + data.toString('base64');
  dwnldlnk.click();
}

  return (
      <form data-testid="UserForm" onSubmit={onSubmission}>
        <label>
          <span> Theme: </span>
          <select type="dropdown" name="theme"
                  onChange={(evt) => selectTheme(evt.target.value)} value={theme}
          >
            <option value="default"> default </option>
            <option value="tester"> webkit-styles-test  </option>
          </select>
        </label>
        <label>
          <span>patient ID:</span>
          <input type="text"
                 value={patientId}
                 onChange={handlePatientId} name="patientId" required="required" placeholder="Patient ID (0000000)"
          />
        </label>
        <div className="controls">
          <input type="submit" value="Preview" />
          {pdf && downloadButton()}
        </div>
      </form>
  )
}

export default UserForm;
