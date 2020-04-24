import React from "react";
import {Button, Form, Icon, message, Input} from "antd";
import {postAPI, putAPI, validatePassword} from "../../../utils/common";
import {CHANGE_PASSWORD} from "../../../constants/api";
import {NEW_PASSWORD, OLD_PASSWORD} from "../../../constants/formLabels";

const FormItem = Form.Item;
export default class ChangePasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            changePassLoading: false

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let that = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                that.setState({
                    changePassLoading: true
                });
                let data = {
                    [OLD_PASSWORD]: values.oldPass,
                    [NEW_PASSWORD]: values.newPass,
                };
                let successFn = function (data) {
                    message.success(data.message);
                    that.setState({
                        changePassLoading: false
                    });
                };
                let errorFn = function () {
                    that.setState({
                        changePassLoading: false
                    });
                };
                postAPI(CHANGE_PASSWORD, data, successFn, errorFn);
            }
        });
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value != form.getFieldValue('newPass')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    validateToNextPassword = (rule, value, callback) => {
        callback(validatePassword(rule, value, callback));
    };

    render() {
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="Old Password"  {...formItemLayout}>
                    {getFieldDecorator('oldPass', {
                        rules: [{required: true, message: 'Please enter your old Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Old Password"/>
                    )}
                </FormItem>
                <FormItem label="New Password"  {...formItemLayout}>
                    {getFieldDecorator('newPass', {
                        rules: [{
                            required: true, message: 'Please enter your new Password!'
                        }, {
                            validator: this.validateToNextPassword
                        }]
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="New Password"/>
                    )}
                </FormItem>
                <FormItem label="Confirm Password"  {...formItemLayout}>
                    {getFieldDecorator('confirmPass', {
                        rules: [{required: true, message: 'Please confirm your new Password!'}, {
                            validator: this.compareToFirstPassword
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Confirm Password" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem>
                    <Button loading={this.state.changePassLoading} type="primary" htmlType="submit"
                            className="login-form-button">
                        Change Password
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
