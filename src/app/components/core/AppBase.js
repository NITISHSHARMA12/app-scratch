
import React from 'react';
import {Layout} from "antd";
import {Route, Switch} from "react-router-dom";
import AppHeader from "./AppHeader";
import AppSider from './AppSider';
import AppFooter from './AppFooter';
import Index from '../dashboard/Index';

class AppBase extends React.Component{
    state={
        collapsed:false,
      };
      toggleSider = (e) => {
          console.log("e",e)
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
    render() {
        return(<Layout>
                    <AppSider {...this.state}/>
            <Layout>
                <AppHeader  toggleSider={this.toggleSider}/>
                <Switch>
                    <Route exact path="/" render={(route) => <Index/>}/>
                    <Route exact path="/dashboard" render={(route) => <Index/>}/>
                </Switch>
                <AppFooter/>
           
            </Layout>
            
        </Layout>
        )
      }

}
export default AppBase;