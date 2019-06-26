
import React from 'react';
import { Layout ,Icon } from 'antd';
const { Header} = Layout;
class AppHeader extends React.Component{
  

    render(){
      
      let that=this;
        return<div>
            <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={that.props.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={() => that.props.toggleSider(!that.props.collapsed)}
            />
          </Header>
        </div>
    }

}
export default AppHeader;