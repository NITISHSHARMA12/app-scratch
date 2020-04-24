import React from "react";
import {Button, Result, Row} from "antd";
import {Link} from "react-router-dom";

class Error404 extends React.Component {
    render() {
        return <Row style={{marginTop: '20px'}} gutter={24}>
            <Result
                status="404"
                title={<span><h1><b>404</b></h1>
        <h2>Page Not Found</h2></span>}
                subTitle="The page you are looking for has been temporarily moved or did not exist."
                extra={<Link to="/"><Button type="primary">Go to Home</Button></Link>}
            />
        </Row>
    }
}

export default Error404;
