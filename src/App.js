import React from 'react';
import {Layout} from 'antd';
import './App.css';
import 'antd/dist/antd.css';
import AppBase from "../src/app/components/core/AppBase"
import {Route, Switch} from "react-router-dom";

class App extends React.Component {

  render() {
    return (<Layout>
      <Switch>
          <Route render={() =><AppBase></AppBase>}/>
      </Switch>
    </Layout>
    );
  }
}


export default App;
