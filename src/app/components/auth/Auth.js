import React from "react";
import LoginForm from "./forms/LoginForm";
import {Card, Col, Divider, Form, Layout, Row, Button} from "antd";
import {Link, Route, Switch} from "react-router-dom";
import DynamicFieldsForm from "../common/DynamicFieldsForm";
import {PASSWORD_FIELD, SUCCESS_MSG_TYPE} from "../../constants/dataKeys";
import {RESET_PASSWORD} from "../../constants/api";
import {displayMessage} from "../../utils/common";

class Auth extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const LoginFormLayout = Form.create()(LoginForm);
        const PasswordResetForm = Form.create()(DynamicFieldsForm);

        let tokenDefaultValues = [{
            key: 'code',
            value: (this.props.match && this.props.match.params.token ? this.props.match.params.token : null)
        }];
        let resetPasswordFields = [{
            label: 'Password',
            key: 'password',
            type: PASSWORD_FIELD,
            required: true
        }, {
            label: 'Retype Password',
            key: 're-password',
            type: PASSWORD_FIELD,
            required: true
        }];
        const formProp = {
            successFn: function (data) {
                displayMessage(SUCCESS_MSG_TYPE, "success")

            },
            errorFn: function () {

            },
            action: RESET_PASSWORD,
            method: "post",
        }
        return <Layout className="loginLayout">

            <Switch>
                <Route path="/password-reset/">
                    <Row>
                        {/*<Col xs={{span: 20, offset: 2}} sm={{span: 16, offset: 4}} md={{span: 12, offset: 6}}*/}
                        {/*lg={{span: 8, offset: 8}} xl={{span: 8, offset: 8}} style={{padding: '35px'}}>*/}
                        {/*</Col>*/}
                        <Col xs={{span: 20, offset: 2}} sm={{span: 16, offset: 4}} md={{span: 12, offset: 6}}
                             lg={{span: 8, offset: 8}} xl={{span: 8, offset: 8}}>
                            <div className="loginFormWrapper" style={{textAlign: 'center'}}>
                                <img src={""} alt="" style={{maxWidth: '100%', minWidth: '50%', margin: '20px'}}/>
                                <Card>
                                    <PasswordResetForm {...this.props}
                                                       formProp={formProp}
                                                       fields={resetPasswordFields}
                                                       defaultValues={tokenDefaultValues}/>
                                </Card>
                                <Divider/>
                                <h4>
                                    {/*<Link to="/login">Login </Link>
                                    <Divider type="vertical"/>
                                    <Link to="/privacypolicy">Privacy Policy</Link>
                                    <Divider style={{margin:'0px'}}>Patient</Divider>*/}
                                </h4>
                            </div>
                        </Col>
                    </Row>
                </Route>
                <Route>
                    <Row>
                        {/*<Col xs={{span: 20, offset: 2}} sm={{span: 16, offset: 4}} md={{span: 12, offset: 6}}*/}
                        {/*lg={{span: 8, offset: 8}} xl={{span: 8, offset: 8}} style={{padding: '35px'}}>*/}
                        {/*</Col>*/}
                        <Col xs={{span: 20, offset: 2}} sm={{span: 16, offset: 4}} md={{span: 12, offset: 6}}
                             lg={{span: 8, offset: 8}} xl={{span: 8, offset: 8}} style={{padding: '35px'}}>
                            <div className="loginFormWrapper" style={{textAlign: 'center'}}>
                                <img src={'AppLogo'} alt="" style={{maxWidth: '100%', minWidth: '50%', margin: '20px'}}/>
                                <Switch>

                                    <Route >
                                        <LoginFormLayout {...this.props} login={this.props.login}/>
                                    </Route>
                                </Switch>


                                <h4 style={{textAlign: 'center'}}>
                                    Powered By: <a href="https://plutonic.co.in/" target="_blank">Plutonic Services</a>
                                </h4>
                            </div>
                        </Col>
                    </Row>
                </Route>
            </Switch>
        </Layout>
    }
}


export default Auth;
