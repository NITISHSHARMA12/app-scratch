import React from "react";
import {Button, Result, Row} from "antd";
import {Link} from "react-router-dom";

class PermissionDenied extends React.Component {
    render() {
        return <Row style={{marginTop: '20px'}}>
            <Result
                status="403"
                title={<span><h1><b>403</b></h1>
        <h2>Permission Denied</h2></span>}
                subTitle="You don't have permission to view this page."
                extra={<Link to="/"><Button type="primary">Go to Home</Button></Link>}
            />
        </Row>
    }
}

export default PermissionDenied;
