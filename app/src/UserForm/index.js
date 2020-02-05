import React from 'react';
import './styles/index.css'

function UserForm() {
  return (
      <form>
        <label>
          <span> Theme: </span>
          <select type="dropdown" name="theme" value="default" >
            <option value="default"> default </option>
            <option value="blue"> blue </option>
          </select>
        </label>
        <label>
          <span>patient ID:</span>
          <input type="text" name="theme" placeholder="000000"/>
        </label>
        <div className="buttons">
          <input type="submit" value="Preview" />
          <input type="submit" value="Download" />
        </div>
      </form>
  )
}

export default UserForm;
