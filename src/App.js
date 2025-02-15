import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News pageSize={6} country="us" category="sports"/>} />
        </Routes>
      </BrowserRouter>
      </>
    )
  }
}
