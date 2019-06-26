
import React from 'react';
import { Layout} from 'antd';

const { Content } = Layout;
class AppContent extends React.Component{

    render(){
        return<div>
             <Content
                style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
                }}
            >
                Content
          </Content>
        </div>
    }

}
export default AppContent;