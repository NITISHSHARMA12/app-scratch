
import React from 'react';
import {Layout} from "antd";
import {Route, Switch} from "react-router-dom";
import AppHeader from "./AppHeader";
import AppSider from './AppSider';
import AppFooter from './AppFooter';
import DASHBOARD from '../dashboard/Index';
import FORM from '../Form/index';
import LAYOUT from '../Layout/index';
import HTU from '../HTU/index';
import SLIDER from '../Slider/index';
// import 

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
                <AppHeader  toggleSider={this.toggleSider} {...this.props} {...this.state}/>
                <Switch>
                    <Route exact path="/" render={(route) => <DASHBOARD/>}/>
                    <Route exact path="/dashboard" render={(route) => <DASHBOARD/>}/>
                    <Route exact path="/forms" render={(route) => <FORM/>}/>
                    <Route exact path="/layouts" render={(route) => <LAYOUT/>}/>
                    <Route exact path="/slider" render={(route) =><SLIDER/>}/>
                    <Route exact path="/how-to-use" render={(route) => <HTU/>}/>
                </Switch>
                <AppFooter/>
           
            </Layout>
            
        </Layout>
        )
      }

}
export default AppBase;