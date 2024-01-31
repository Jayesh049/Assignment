import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import ShowList from './components/ShowList';
import ShowDetails from './components/ShowDetail';

function App() {
  return (
    <Router>
      <Routes>
        
      <Route exact path="/" element={<ShowList />}></Route>
        
        <Route path="/show/:id" element={<ShowDetails />} ></Route>
      </Routes>
    </Router>
  );
}

export default App;
