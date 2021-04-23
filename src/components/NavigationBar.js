import React from "react";
import {Button, Nav, Navbar, Row, Col} from "react-bootstrap";
import {Link, HashRouter as Router} from "react-router-dom";
import "../styles.css";
export const NavigationBar = () => (

  <Navbar expand = "md">
  <Navbar.Toggle aria-controls="basic-navbar-nav">

  </Navbar.Toggle>
  <Navbar.Collapse id="basic-navbar-nav" >

    <Nav className="navbar-nav nav-fill w-100 " >
     <Router>
      
      <Nav.Item><Nav.Link as = {Link} to = "/"><h5>Home</h5></Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link as = {Link} to = "/mentorship"><h5>Mentorship</h5></Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link as = {Link} to = "/employment"><h5>Employment</h5></Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link as = {Link} to = "/resources"><h5>Resources</h5></Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link as = {Link} to = "/mobileapp"><h5>App</h5></Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link as = {Link} to = "/signin"><h5>Sign In</h5></Nav.Link></Nav.Item>
      
      </Router>
    </Nav>


  </Navbar.Collapse>
  </Navbar>

)