import React, {Component} from 'react';
import {Row, Col, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import '../styles.css'
import './Home.css'
import * as Realm from "realm-web";

const REALM_APP_ID = "application-0-eyuws"; 
const app = new Realm.App({ id: REALM_APP_ID });
const mongodb = app.currentUser.mongoClient("mongodb-atlas");
const accounts = mongodb.db("NewBeginningsUserInfo").collection("Accounts");



export class Register extends Component {
    state = {
      Email: "",
      Password: "",
      First: "",
      Last: "",
      message: "",
      emailvalid:true,
      googleEmailValid:true
    };
    
    getValue = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({[name]: value});
      this.setState({message:""});
    }
    //Registration
    handleSubmit = (event) =>{
      event.preventDefault();
      var em = document.getElementById("email");
      var pw = document.getElementById("password");
      var ft = document.getElementById("first");
      var lt = document.getElementById("last");
      //if form is valid then add details to database
      (async () => {
        const acc = await accounts.findOne({
          Email:this.state.Email.toLowerCase(),
        });
        if(acc!=null){
          this.setState({message:"emailInvalid"});
        }
        if(em.checkValidity() && pw.checkValidity() && ft.checkValidity() && lt.checkValidity() && this.state.message !== "emailInvalid"){
          const bcrypt = require('bcryptjs');
          const salt = bcrypt.genSaltSync(10);
          const passwordHash = bcrypt.hashSync(this.state.Password, salt);
          console.log(passwordHash);
          const result = await accounts.insertOne({
            Email: this.state.Email.toLowerCase(),
            Password: passwordHash,
            First: this.state.First.toLowerCase(),
            Last: this.state.Last.toLowerCase(),
          });
            //welcomes user
          this.setState({message:"success"});
          console.log("success");
        }
        else if(this.state.message === "emailInvalid"){
          this.setState({message:"emailInvalid"})
          console.log("invalidEmail");
        }
        else{
          this.setState({message:"error"});
          console.log("error");
        }
      })();
    }
    //registering with Google
    googleSuccess = (response) => {
      console.log(response);
      (async () =>{
        const acc = await accounts.findOne({
          Email:response.profileObj.email.toLowerCase(),
        });
        if(acc!==null){
          this.setState({message:"emailInvalid"});
        }
        else{
          this.setState({message:"success"});
        }
        if(this.state.message==="success"){
          const result = await accounts.insertOne({
            Email: response.profileObj.email.toLowerCase(),
            First: response.profileObj.givenName,
            Last: response.profileObj.familyName,
          });
        }
      })();
    }
    googleFailure = (response) =>{
      console.log(response);
    }

    render(){
        return (
          <div>
              <div className = "space80"></div>
                <Row className = "outline" onClick = {this.handleClick}>
                  <Col className = "centered">
                      <h2>Creating Your Account</h2>
                      <div className = "space20"></div>
                      <div className = "space10"> </div>
                      <form className = "login-style">
                        <Row className = "signin_padding">
                          <h4>First Name: </h4>    
                        </Row> 
                        <Row> 
                            <h5>
                              <input type="text" onChange = {this.getValue} placeholder="Enter First Name" name="First" id="first" required></input>
                            </h5>
                        </Row>
                        <div className = "space20"> </div>
                        <Row className = "signin_padding">
                          <h4>Last Name: </h4> 
                        </Row>
                        <Row>
                            <h5>
                              <input type="text"  onChange = {this.getValue} placeholder="Enter Last Name" name="Last" id="last" required></input>
                            </h5>
                        </Row>
                        <div className = "space20"> </div>
                        <Row className = "signin_padding">
                          <h4>Email: </h4> 
                        </Row>
                        <Row>
                            <h5>
                              <input type="email" onChange = {this.getValue} placeholder="Enter Email" name="Email" id = "email" required></input>
                            </h5>
                        </Row>
                        <div className = "space20"> </div>
                        <Row className = "signin_padding">
                          <h4>Password: </h4> 
                        </Row>
                        <Row>
                            <h5>
                              <input type="password" onChange = {this.getValue} placeholder="Enter Password" name="Password" id="password" required></input>
                            </h5>
                        </Row>
                        {this.state.message==="success"? <p className = "signin-success">Successfully created an account</p>: this.state.message==="error"? <p className = "createAcc-error">Make sure everything is typed correctly</p>: this.state.message==="emailInvalid"? <p className = "createAcc-error">Account already exists for that email. Try using another email.</p>: <p className = "createAcc-error"><br></br></p>}
                          <button className = "sign-in" style={{paddingLeft:"20px",paddingRight:"20px"}} onClick = {this.handleSubmit}> <h4>Create Account</h4> </button> 
                          <div className = "space10"></div>
                            <h5><span style={{color:"#cfcfcf",fontSize:"30px"}}>——— </span> or  <span style={{color:"#cfcfcf",fontSize:"30px"}}> ———</span></h5>
                          <div className = "space10"></div>
                          <GoogleLogin
                            clientId="762255135689-uoluckcm2dt1j14u9ko5phe484qkppmb.apps.googleusercontent.com"
                            buttonText="Sign up with Google"
                            theme = {"dark"}
                            onSuccess={this.googleSuccess}
                            onFailure={this.googleFailure}
                            cookiePolicy={'single_host_origin'}
                          />
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