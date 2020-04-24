import React from 'react';
import {Layout} from 'antd';
import './App.css';
import 'antd/dist/antd.css';
import AppBase from "../src/app/components/core/AppBase"
import {Route, Switch} from "react-router";
import {loadUserDetails, logInUser, logOutUser} from "./app/utils/Auth";
import Auth from "./app/components/auth/Auth";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: loadUserDetails(),
      redirect: false,
      active_practiceId:10
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(data) {
    let that = this;
    let successFn = function () {
      let user = loadUserDetails();
      that.setState({
        user: user,
      });
    };
    let errorFn = function () {

    };
    logInUser(data, successFn, errorFn);

  }

  logout() {
    let that = this;
    let successFn = function () {
      that.setState({
        user: null
      });
    };
    let errorFn = function () {
    };
    logOutUser(successFn, errorFn);
  }

  render() {
    console.log("STATE",this.state.user)
    return (<Layout>
      <Switch>
        <Route exact path="/login" render={() => <Auth {...this.state} login={this.login}/>}/>
        <Route exact path="/password-reset/:token"
               render={(route) => <Auth {...route} {...this.state} login={this.login}/>}/>
        <Route render={() => (this.state.user ?
            <AppBase {...this.state} logout={this.logout}/> :
            <Auth {...this.state} login={this.login}/>)}/>



      </Switch>
    </Layout>
    );
  }
}


export default App;
