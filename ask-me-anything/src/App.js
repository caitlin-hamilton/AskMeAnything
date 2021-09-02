import React from 'react';
import Home from './Home.js'
import AdminBoard from './Admin.js'
import {getTableData} from './api';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default function App() {
  return (
    <Router>
      <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">User</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="admin">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
        <Switch>
          <Route path="/admin">
            <AdminBoard getTableData={getTableData}></AdminBoard>
          </Route>
          <Route path="/">
            <Home getTableData={getTableData}></Home> 
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
