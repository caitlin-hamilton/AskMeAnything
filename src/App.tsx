import UserHome from './user_components/UserHome'
import AdminHome from './admin_components/AdminHome'
import {getQuestionData, getVoteData} from './api';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const userId: string = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";

export default function App() {
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
            <AdminHome getTableData={getQuestionData}></AdminHome>
          </Route>
          <Route path="/">
            <UserHome getQuestions={getQuestionData} getUserData={getVoteData} userId={userId}></UserHome> 
          </Route>
        </Switch>
      </div>
    </Router>
  );
}