import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './navbar';
import SignIn from './signIn';
import SignUp from './signUp';


class Main extends Component{
  constructor(props) {
    super(props);
    this.state={
      token:window.localStorage.getItem('token')?window.localStorage.getItem('token'):null
    }
  }
  render()
  {
    const { token } = this.state;
    console.log(token);
    return (

      <>
      <Navbar token={token}/>

          <Switch>
            <Route path="/signin" component={()=><SignIn token={token}/>}/>
            <Route path="/signup" component={()=><SignUp token={token}/>}/>
            <Redirect to="/signin"/>
          </Switch>
      </>

    );

  }
}

export default Main;
