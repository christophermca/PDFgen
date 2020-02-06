import React, {useCallback, useContext} from 'react';
import './styles/index.css'


function UserForm({setPatientId, patientId, selectTheme, theme, onSubmission}) {
  const handlePatientId = useCallback(({target: {value}}) => {
    setPatientId(value);
  },[patientId])

  return (
      <form onSubmit={onSubmission}>
        <label>
          <span> Theme: </span>
          <select type="dropdown" name="theme"
                  onChange={(evt) => selectTheme(evt.target.value)} value={theme}
          >
            <option value="default"> default </option>
          </select>
        </label>
        <label>
          <span>patient ID:</span>
          <input type="text"
                 required
                 value={patientId}
                 onChange={handlePatientId} name="theme"
                 placeholder="Patient ID (000000)"
          />
        </label>
        <div className="controls">
          <input type="submit" value="Preview" />
          <input type="submit" value="Download" />
        </div>
      </form>
  )
}

export default UserForm;
