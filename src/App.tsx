import React from 'react';
import Home from './Home'
import AdminBoard from './Admin.js'
import {getTableData, getVoteData} from './api';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default function App() {
  let userId = 100;
  let userData = getVoteData(userId);
  let questionData = getTableData();


  return (
    <Router>
      <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="admin">Admin</Nav.Link>
            <Nav.Link href="/">User</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
        <Switch>
          <Route path="/admin">
            <AdminBoard getTableData={getTableData}></AdminBoard>
          </Route>
          <Route path="/">
            <Home questions={questionData} userData={userData} userId={userId}></Home> 
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
