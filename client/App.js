import React, { Component } from "react";
import Create from "./CRUD/Create";
import Liste from "./CRUD/Liste";
import Edit from "./CRUD/Edit";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component{
  render(){
    return(
      <Router>
        <Routes>
          <Route path='/' element={<Liste/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
        </Routes>
      </Router>
    )
  }
}