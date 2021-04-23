import React, { Component,} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Container, Jumbotron} from 'react-bootstrap';
import {HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import {Mentorship} from './components/Mentorship';
import Resources from './components/Resources';
import {Employment} from './components/Employment';
import {MobileApp} from './components/MobileApp';
import {SignIn} from './components/SignIn';
import {Home} from './components/Home';
import {Register} from './components/Register';
import { NavigationBar } from './components/NavigationBar';
import { Helmet } from 'react-helmet';
import "./styles.css";
import * as Realm from "realm-web";

const REALM_APP_ID = "application-0-iarqd";
const app = new Realm.App({ id: REALM_APP_ID });

  async function Login({setUser}){
    const user = await app.logIn(Realm.Credentials.anonymous());
    setUser(user);
    console.log("Main "+user.id)
  };

function App(){
    const [user, setUser] = React.useState(app.currentUser);
    const [logged, setLogged] = React.useState(false)
    // if(!logged){
    //   setLogged(true)
    //   Login({setUser})
    // }
    return (
      <>
      <div>
        <Helmet>
          <title> New Beginnings </title>
        </Helmet>
      </div>
      <Jumbotron fluid className = "jumbo-main"/>
      
      <NavigationBar/>
      <div className = "space20"></div>
      <Container fluid className = 'container'>
        <Router>

         <Route path = "/" exact component = {Home} />
         <Route path = "/mentorship" exact component = {Mentorship} />
         <Route path = "/resources" >
           <Resources/>
         </Route>
         <Route path = "/employment" exact component = {Employment} />
         <Route path = "/mobileapp" exact component = {MobileApp} />
         <Route path = "/signin" exact component = {SignIn} />
         <Route path = "/register" exact component = {Register} />
         
        </Router>
      </Container>

      </>
    );
}

export default App;
