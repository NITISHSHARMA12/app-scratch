
import React from 'react';
import { Layout} from 'antd';

const { Content } = Layout;
class Index extends React.Component{

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
                <h1>HTu Page</h1>
                <p>paragraph</p>
          </Content>
        </div>
    }

}
export default Index;