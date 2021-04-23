import React, {Component} from 'react';
import {Row, Col, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import '../styles.css'
import './Home.css'
import * as Realm from "realm-web";

const REALM_APP_ID = "application-0-iarqd"; 
const app = new Realm.App({ id: REALM_APP_ID });
const mongodb = app.currentUser.mongoClient("mongodb-atlas");
const accounts = mongodb.db("NewBeginningsUserInfo").collection("Accounts");



export class Register extends Component {
    state = {
      Email: "",
      Password: "",
      First: "",
      Last: "",
      Date: "",
      Phone: 0,
      Address: "",
      message: -1,
      emailvalid:true
    };
    
    getValue = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({[name]: value});
      this.setState({message:-1});
    }

    handleSubmit = (event) =>{
      event.preventDefault();
      var em = document.getElementById("email");
      var pw = document.getElementById("password");
      var ft = document.getElementById("first");
      var lt = document.getElementById("last");
      var dt = document.getElementById("date");
      var pn = document.getElementById("phone");
      var ad = document.getElementById("address");
      (async () => {
        //if form is valid then add details to database
        const acc = await accounts.findOne({
          Email:this.state.Email.toLowerCase(),
        });
        if(acc!=null){
          this.setState({emailvalid:false});
        }
        else{
          this.setState({emailvalid:true});
        }
        if(em.checkValidity() && pw.checkValidity() && ft.checkValidity() && lt.checkValidity() && 
        dt.checkValidity() && pn.checkValidity() && ad.checkValidity() && this.state.emailvalid){
          const result = await accounts.insertOne({
            Email: this.state.Email.toLowerCase(),
            Password: this.state.Password,
            First: this.state.First.toLowerCase(),
            Last: this.state.Last.toLowerCase(),
            Date_of_Birth: this.state.Date,
            Phone: this.state.Phone,
            Address: this.state.Address.toLowerCase()
          });
            //welcomes user
          this.setState({message:1});
          console.log("success");
        }
        else{
          this.setState({message:0});
          console.log("error");
        }
      })();
    }

    render(){
        return (
          <div>
              <div className = "space80"></div>
                <Row className = "outline" onClick = {this.handleClick}>
                  <Col className = "centered">
                      <h2>Creating Your Account</h2>
                      <div className = "space20"></div>
                      <form className = "login-style">
                        <Row className = "signin_padding">
                          <h4>First Name: </h4>    
                        </Row> 
                        <Row> 
                            <h5>
                              <input type="text" onChange = {this.getValue} placeholder="Enter First Name" name="First" id="first" required></input>
                            </h5>
                        </Row>
                        <Row className = "signin_padding">
                          <h4>Last Name: </h4> 
                        </Row>
                        <Row>
                            <h5>
                              <input type="text"  onChange = {this.getValue} placeholder="Enter Last Name" name="Last" id="last" required></input>
                            </h5>
                        </Row>
                        <Row className = "signin_padding">
                          <h4>Date of Birth: </h4> 
                        </Row>
                        <Row>
                            <h5>
                              <input onChange = {this.getValue} type="date"  name="Date" id="date" required></input>
                            </h5>
                        </Row>
                        <Row className = "signin_padding">
                          <h4>Email: </h4> 
                        </Row>
                        <Row>
                            <h5>
                              <input type="email" onChange = {this.getValue} placeholder="Enter Email" name="Email" id = "email" required></input>
                              {!this.state.emailvalid?<p className = "email-error">Account already exists</p>: <p className = "email-error"><br></br></p>}
                            </h5>
                        </Row>
                        <Row className = "signin_padding">
                          <h4>Password: </h4> 
                        </Row>
                        <Row>
                            <h5>
                              <input type="password" onChange = {this.getValue} placeholder="Enter Password" name="Password" id="password" required></input>
                            </h5>
                        </Row>
                        <Row className = "signin_padding">
                          <h4>Phone Number: </h4> 
                        </Row>
                        <Row> 
                            <h5>
                              <input type="text" onChange = {this.getValue} placeholder="Enter Phone Number" name="Phone" id="phone" required></input>
                            </h5>
                        </Row>
                        <Row className = "signin_padding">
                          <h4>Home Address: </h4> 
                        </Row>
                        <Row>
                            <h5>
                              <input type="text" onChange = {this.getValue} placeholder="Enter Home Address" name="Address" id="address" required></input>
                            </h5>
                        </Row>
                        {this.state.message === 1? <p className = "signin-success">Successfully created an account</p>: this.state.message === 0? <p className = "createAcc-error">Make sure everything is typed correctly</p>: <p className = "createAcc-error"><br></br></p>}
                          <button className = "sign-in" onClick = {this.handleSubmit}> <h4>Create Account</h4> </button> 
                          <div className = "space20"></div>
                          <p>Already have an account? <u><Link to ="/signin">Click here to sign in.</Link></u></p>
                      </form>
                  </Col>
                </Row>
                <div className = "space80"></div>
          </div>  

        )
    }
}