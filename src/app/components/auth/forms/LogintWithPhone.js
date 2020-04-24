import React from 'react';
import {Button, Col, Divider, Form, Icon, Input, Row} from 'antd';
import {displayMessage, makeURL} from "../../../utils/common";
import {SUCCESS_MSG_TYPE, WARNING_MSG_TYPE} from "../../../constants/dataKeys";
import {LOGIN_RESEND_OTP, LOGIN_SEND_OTP} from "../../../constants/api";
import {logInUser, sendLoginOTP} from "../../../utils/auth";

const Search = Input.Search;
const FormItem = Form.Item;

class LoginWithPhone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            otpSent: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    handleSubmit = (e) => {
        let that = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let successFn = function (data) {
                    displayMessage(SUCCESS_MSG_TYPE, "Logged in successfully!!");
                    if (that.props.login)
                        that.props.login();
                };
                let errorFn = function () {

                };
                logInUser({...values}, successFn, errorFn)
            }
        });
    }
    setPhone = (type, value) => {
        this.setState({
            [type]: value
        })
    }
    sendOTP = () => {
        let that = this;
        if (this.state.phone) {
            let successFn = function (data) {
                that.setState({
                    otpSent: true
                });
                displayMessage(SUCCESS_MSG_TYPE, data.detail)
            }
            let errorFn = function () {

            }
            if (this.state.otpSent) {
                sendLoginOTP(makeURL(LOGIN_RESEND_OTP), this.state.phone, successFn, errorFn);
            } else {
                sendLoginOTP(makeURL(LOGIN_SEND_OTP), this.state.phone, successFn, errorFn);
            }
        } else {
            displayMessage(WARNING_MSG_TYPE, "Phone No can not be empty!!");
        }
    }

    render() {
        console.log("otpSend", this.state.otpSent);
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Input.Group size="large">
                    <Row>
                        <Col span={this.state.otpSent ? 24 : 18}>
                            <FormItem>
                                {getFieldDecorator('phone_no', {
                                    rules: [{required: true, message: 'Please input your phone!'}],
                                })(
                                    <Input prefix={<Icon type="phone" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           type="text"
                                           placeholder="Phone"
                                           onChange={(e) => this.setPhone('phone', e.target.value)}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={this.state.otpSent ? 0 : 6}>
                            <Button type="primary" size={"large"} block onClick={this.sendOTP}>Send OTP</Button>
                        </Col>
                    </Row>
                </Input.Group>
                {/* <Input.Group size="large">
                    <Row>
                        <Col span={this.state.otpSent ? 24 : 18}>
                            <FormItem>
                                {getFieldDecorator('phone_no', {
                                    rules: [{required: true, message: 'Please input your phone!'}],
                                })(
                                    <Input prefix={<Icon type="phone" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           type="text"
                                           placeholder="Phone"
                                           onChange={(e) => this.setPhone('phone', e.target.value)}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={this.state.otpSent ? 0 : 6}>
                            <Button type="primary" size={"large"} block onClick={this.sendOTP}>Send OTP</Button>
                        </Col>
                    </Row>
                </Input.Group> */}


                <FormItem>
                    {getFieldDecorator('otp', {
                        rules: [{required: true, message: 'Please input otp!'}],
                    })(
                        <Input size="large" prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               type="text"
                               placeholder="OTP"
                               disabled={this.state.otpSent ? false : true}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {this.state.otpSent ? <a style={{float: 'right'}} type="primary" onClick={this.sendOTP}>
                        Resend OTP ?
                    </a> : null}
                    <Button size="large" type="primary" htmlType="submit"
                            className="login-form-button">
                        Log in
                    </Button>
                </FormItem>

                {/*<Divider>OR</Divider>*/}
                {/*<h4>*/}
                {/*<Link to={"/"}> <Button size="large"  type="primary" htmlType="submit"*/}
                {/*className="login-form-button">Log in with username </Button>*/}
                {/**/}
                {/*</Link>*/}
                {/*</h4>*/}
                <Divider/>


            </Form>
        );
    }

}

export default LoginWithPhone;
