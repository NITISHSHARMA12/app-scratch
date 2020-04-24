
import React from 'react';
import { Layout} from 'antd';

const { Content } = Layout;
class Index extends React.Component{

    render(){
        var arr=['fb','instagram','twitter'];
        var abs={ fb:{active:1},instagram:{active:0},twitter:{active:1}};

        // console.log(arr[0]);
        
        // console.log(abs)
        let array=[];
        for(var i=0; i<arr.length;i++){
            if(abs.fb.active===1){
                console.log("r",arr[i])
            }
            
        }
        console.log("abs",array)
        return<div>
             <Content
                style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
                }}
            >
                <h1>Form Page</h1>
                <p>Form</p>
          </Content>
        </div>
    }

}
export default Index;