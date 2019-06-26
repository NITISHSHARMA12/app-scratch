
import React from 'react';
import { Layout } from 'antd';

const { Footer} = Layout;
class AppFooter extends React.Component{


    render(){
        return<div>
            <Footer style={{ textAlign: 'center' }}>Plutonic Service @2019 Team's</Footer>
        </div>
    }
}
export default AppFooter;