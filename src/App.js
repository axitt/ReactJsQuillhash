import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import Main from './component/main';


function App() {
  return (
    <>
    <BrowserRouter>
    <Main/>
    </BrowserRouter>
  </>
);
}

export default App;
