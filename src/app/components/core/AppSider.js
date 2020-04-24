
import React from 'react';
import { Menu, Icon,Layout, Divider} from 'antd';
import {Link} from 'react-router-dom';
import { hidden } from 'ansi-colors';
// const SubMenu = Menu;
const {Sider } = Layout;
class AppSider extends React.Component{

  
      render() {
        console.log("props sider",this.props);
        return ( <Sider trigger={null} collapsible collapsed={this.props.collapsed} style={{transition:'1.4s'}}>
          <div className="logo" >
            <Link to="/">
              {this.props.collapsed ?<span>ETU</span>
              :
              <span>Easy To Use</span>
              }
              
            </Link>
          </div>
          <Divider style={{marginTop:0 ,borderStyle:hidden}} dashed={true}/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
                <Link to="/dashboard">
                  <Icon type="dashboard" />
                  {this.props.collapsed ? <span className="nav-text">Dash</span>
                  :<span className="nav-text">Dashboard</span>
                  }
                  
                </Link>
              
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/layouts">
                  <Icon type="layout" />
                  <span className="nav-text">Layout</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/forms">
                  <Icon type="form" />
                  <span className="nav-text">Form</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="4">
                <Link to="/slider">
                  <Icon type="sliders" />
                  <span className="nav-text">Slider</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="5">
                <Link to="/how-to-use">
                  <Icon type="file-word" />
                  <span className="nav-text">HTU</span>
                </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        );
      }
 }
 export default AppSider;
    