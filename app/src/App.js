import React from 'react';
import logo from './logo.svg';
import './App.css';
import Output from './Output/';
import UserForm from './UserForm/';

function App() {
  return (
    <div className="App">
      <UserForm />
      <Output />
    </div>
  );
}

export default App;
