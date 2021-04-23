import React, {Component} from 'react';
import {Row, Col, Nav} from 'react-bootstrap';
import logo from '../assets/logo.png'; 
import {Link} from 'react-router-dom'
import '../styles.css'
import '../components/Home.css'
import * as Realm from "realm-web";

const REALM_APP_ID = "application-0-iarqd"; 
const app = new Realm.App({ id: REALM_APP_ID });
const mongodb = app.currentUser.mongoClient("mongodb-atlas");
const accounts = mongodb.db("NewBeginningsUserInfo").collection("Accounts");


export class SignIn extends Component {

  state = {
    Email: null,
    Password: null,
    message: -1
  };
  
  getValue = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value});
  }

  handleClick = (event) =>{
    event.preventDefault();
    this.setState({message:-1});
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    var em = document.getElementById("email");
    var pw = document.getElementById("password");
    (async () => {
      //if form is invalid then display message
      if(!em.checkValidity() || !pw.checkValidity()){
        this.setState({message:0});
      }
      else{
        const acc = await accounts.findOne({
          Email:this.state.Email.toLowerCase(),
          Password:this.state.Password
        });
        if(acc!=null){
          this.setState({message:1});
        }
        else{
          this.setState({message:2});
        }
      }
    })();
  };

    render(){
  
        return (
          <div>
              <Row> 
                <div className = "home-padding"></div>
                    <Col xs={12} sm={12} md={12} lg={5} xl={3} > 
                        <img className = "home-logo" src={logo}/> </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={8}>
                        <div className="home-textbox-mission">
                            <p>
                            Welcome to the New Beginnings Sign In page! 
                            Please log in below to access your account. 
                            If you have not made an account, sign up to create an account.
                            </p>
                        </div>
                    </Col>
                </Row>
                <div className = "space80"></div>

                <Row className = "outline">
                  <Col className = "centered">
                      <h2>Account Login</h2>
                      <div className = "space20"></div>
                      <form className = "login-style">
                        <Row className = "signin_padding">
                          <h4>Email: </h4>    
                        </Row> 
                        <Row> 
                            <h5>
                              <input type="email" onClick = {this.handleClick} onChange = {this.getValue} placeholder="Enter Email" name="Email" id="email" required></input>
                            </h5>
                        </Row>
                        <Row className = "signin_padding">
                          <h4>Password: </h4> 
                        </Row>
                        <Row>
                            <h5>
                              <input type="password" onClick = {this.handleClick} onChange = {this.getValue} placeholder="Enter Password" name="Password" id="password" required></input>
                            </h5>
                        </Row>
                        { this.state.message === 2? <p className = "signin-error">Incorrect password or email address</p>: this.state.message === 0? <p className = "signin-error">Make sure everything is entered correctly</p>: this.state.message === 1? <p className = "signin-success">Successful Login</p>: <p className = "signin-error"><br></br></p>}
                          <button className = "sign-in" onClick = {this.handleSubmit}> <h4>Sign In</h4> </button> 
                          <div className = "space20"></div>
                          <p>Don't have an account? <u><Link to ="/register">Click here to sign up!</Link></u></p>
                      </form>
                  </Col>
                </Row>
                <div className = "space80"></div>
          </div>  

        )
    }
  }