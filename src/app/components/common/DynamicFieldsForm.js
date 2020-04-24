import React from "react";
import {
    Button,
    Checkbox,
    DatePicker,
    Divider,
    Form,
    Icon,
    Input,
    InputNumber,
    message,
    Modal,
    Radio,
    Select,
    Tag,
    TimePicker,
    Upload,
} from "antd";
import {
    CHECKBOX_FIELD,
    CITY_FIELD,
    COLOR_PICKER,
    COUNTRY_FIELD,
    DATE_PICKER,
    DATE_TIME_PICKER,
    DIVIDER_FIELD,
    EMAIL_FIELD,
    INPUT_FIELD, LABEL_FIELD,
    MAIL_TEMPLATE_FIELD,
    MULTI_IMAGE_UPLOAD_FIELD,
    MULTI_SELECT_FIELD,
    NUMBER_FIELD,
    PASSWORD_FIELD,
    QUILL_TEXT_FIELD,
    RADIO_FIELD,
    SELECT_FIELD,
    SINGLE_CHECKBOX_FIELD,
    SINGLE_IMAGE_UPLOAD_FIELD,
    SMS_FIELD,
    STATE_FIELD,
    SUCCESS_MSG_TYPE,
    TEXT_FIELD,
    TIME_PICKER
} from "../../constants/dataKeys";
import {REQUIRED_FIELD_MESSAGE} from "../../constants/messages";
import {displayMessage, getAPI, makeFileURL, makeURL, postAPI, putAPI} from "../../utils/common";
import moment from "moment";

const {TextArea} = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;


class DynamicFieldsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: this.props.fields, //Fields data to create the form
            formData: {},
            formProp: this.props.formProp,    //Form data to send on form submission
            disabled: false,
            loading: false,
            countryOptions: [],
            stateOptions: [],
            cityOptions: [],
            smsFields: {},
            urlInitialValues: {},
            webCamState: {},
            editorState: {}
        }
        this.resetFormData = this.resetFormData.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.colorChange = this.colorChange.bind(this);
        this.loadCountryData = this.loadCountryData.bind(this);
        this.addSMSTag = this.addSMSTag.bind(this);
        // this.onFormFieldDataChange = this.onFormFieldDataChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        // console.log("Recieved New Props in Dynamic Form", nextProps);
    }

    fieldDecorators = (field, formData) => {
        let urlInitialValues = this.state.urlInitialValues;
        // console.log(urlInitialValues);
        if (field.type == MULTI_SELECT_FIELD) {
            return {
                initialValue: formData[field.key] ? formData[field.key] : (urlInitialValues[field.key] ? urlInitialValues[field.key] : formData[field.key]),
                rules: [{
                    required: field.required,
                    message: REQUIRED_FIELD_MESSAGE,
                    type: 'array'
                }]
            }
        }

        return {
            initialValue: formData[field.key] ? formData[field.key] : (urlInitialValues[field.key] ? urlInitialValues[field.key] : formData[field.key]),
            rules: [{
                required: field.required,
                message: REQUIRED_FIELD_MESSAGE
            }]
        }
    }

    componentDidMount() {
        let that = this;
        this.resetFormData();
        this.props.fields.forEach(function (field) {
            if (field.type == COUNTRY_FIELD) {
                that.loadCountryData();
            }
        });
        if (this.props.history && this.props.history.location.search) {
            let pairValueArray = this.props.history.location.search.substr(1).split('&');
            if (pairValueArray.length) {
                let urlInitialValue = {};
                pairValueArray.forEach(function (item) {
                    let keyValue = item.split('=');
                    if (keyValue && keyValue.length == 2) {
                        if (!isNaN(keyValue[1]) && keyValue[1].toString().indexOf('.') != -1) {
                            urlInitialValue[keyValue[0]] = parseFloat(keyValue[1]);
                        } else if (!isNaN(keyValue[1])) {
                            urlInitialValue[keyValue[0]] = parseInt(keyValue[1]);
                        } else {
                            urlInitialValue[keyValue[0]] = keyValue[1];
                        }
                    }
                });
                this.setState({
                    urlInitialValues: urlInitialValue
                })
            }
        }
    }

    resetFormData() {
        let formData = {};
        this.state.fields.forEach(function (field) {
            formData[field.key] = field.initialValue
        });
        this.setState({
            formData: formData
        })
    }

    // onFormFieldDataChange() {
    //     if (this.props.formProp.onFieldsDataChange) {
    //         let values = this.props.form.getFieldsValue();
    //         console.log(values);
    //         this.props.formProp.onFieldsDataChange(values);
    //     }
    // }

    handleSubmit = (e) => {
        let that = this;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (this.props.defaultValues) {
                    this.props.defaultValues.forEach(function (object) {
                        // values[object.key] = object.value;
                        values = {[object.key]: object.value, ...values}
                    })
                }

                if (that.state.formProp.beforeSend) {
                    values = that.state.formProp.beforeSend(values);
                }
                if (that.state.formProp.confirm) {
                    Modal.confirm({
                        title: that.state.formProp.confirmText || "Are you sure to submit?",
                        onOk: function () {
                            that.submitForm(values);
                        },
                        onCancel: function () {

                        }
                    })
                } else {
                    that.submitForm(values);
                }

            }
        });
    }

    submitForm(data) {
        let that = this;
        this.setState({
            disabled: true,
            loading: true,
        });
        let successFn = function (data) {
            that.state.formProp.successFn(data);
            that.setState({
                disabled: false,
                loading: false,
            });
            if (that.props.changeRedirect) {
                that.props.changeRedirect();
            }
        };
        let errorFn = function () {
            that.state.formProp.errorFn();
            that.setState({
                disabled: false,
                loading: false,
            });
        };
        if (this.props.formProp.method == "post") {
            postAPI(this.props.formProp.action, data, successFn, errorFn);
        } else if (this.props.formProp.method == "put") {
            putAPI(this.props.formProp.action, data, successFn, errorFn);
        }
    }

    colorChange(color, key) {
        let that = this;
        this.setState({
            colorPickerKey: key,
            colorPickerColor: color.hex,
        }, function () {
            that.props.form.setFieldsValue({[key]: color.hex})
        });
    }





    render() {
        const that = this;
        const formItemLayout = (this.props.formLayout ? this.props.formLayout : {
            labelCol: {span: 8},
            wrapperCol: {span: 14},
        });
        const {getFieldDecorator} = this.props.form;
        return <div>
            <Form onSubmit={this.handleSubmit}>
                {this.props.title ? <h2>{this.props.title}</h2> : null}
                {this.state.fields ? this.state.fields.map(function (field) {
                    switch (field.type) {
                        case PASSWORD_FIELD:
                            return <Form.Item key={field.key} label={field.label}  {...formItemLayout}
                                              extra={field.extra}>
                                {getFieldDecorator(field.key, that.fieldDecorators(field, that.state.formData))(
                                    <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           type="password"
                                           placeholder={field.placeholder}
                                           onChange={(e) => function () {
                                               if (field.onChange)
                                                   field.onChange(e)
                                           }}
                                           disabled={field.disabled ? field.disabled : that.state.disabled}/>
                                )}
                            </Form.Item>;
                        case INPUT_FIELD:
                            return <FormItem key={field.key} label={field.label}  {...formItemLayout}
                                             extra={field.extra}>
                                {getFieldDecorator(field.key, that.fieldDecorators(field, that.state.formData))(
                                    <Input placeholder={field.placeholder}
                                           onChange={(e) => function () {
                                               if (field.onChange)
                                                   field.onChange(e)
                                           }}
                                           disabled={field.disabled ? field.disabled : that.state.disabled}/>
                                )}
                                {field.follow ? <span className="ant-form-text">{field.follow}</span> : null}
                            </FormItem>;
                        case SELECT_FIELD:
                            return <FormItem key={field.key} {...formItemLayout} label={field.label}
                                             extra={field.extra}>
                                {getFieldDecorator(field.key, that.fieldDecorators(field, that.state.formData))(
                                    <Select placeholder={field.placeholder}
                                            disabled={field.disabled ? field.disabled : that.state.disabled}
                                            mode={field.mode ? field.mode : "default"}>
                                        {field.options.map((option) => <Select.Option
                                            value={option.value}>{option.label}</Select.Option>)}
                                    </Select>
                                )}
                                {field.follow ? <span className="ant-form-text">{field.follow}</span> : null}
                            </FormItem>;
                        case MULTI_SELECT_FIELD:
                            return <FormItem key={field.key} {...formItemLayout} label={field.label}
                                             extra={field.extra}>
                                {getFieldDecorator(field.key, {...that.fieldDecorators(field, that.state.formData)})(
                                    <Select mode="multiple" placeholder={field.placeholder}
                                            showSearch={field.showSearch ? field.showSearch : null}
                                            disabled={field.disabled ? field.disabled : that.state.disabled}>
                                        {field.options.map((option) => <Select.Option
                                            value={option.value}>{option.label}</Select.Option>)}
                                    </Select>
                                )}
                                {field.follow ? <span className="ant-form-text">{field.follow}</span> : null}
                            </FormItem>;
                        case RADIO_FIELD:
                            return <FormItem key={field.key} label={field.label} {...formItemLayout}
                                             extra={field.extra}>
                                {getFieldDecorator(field.key, that.fieldDecorators(field, that.state.formData))(
                                    <RadioGroup disabled={field.disabled ? field.disabled : that.state.disabled}>
                                        {field.options.map((option) => <Radio
                                            value={option.value}>{option.label}</Radio>)}
                                    </RadioGroup>
                                )}
                            </FormItem>;
                        case CHECKBOX_FIELD:
                            return <FormItem key={field.key} label={field.label} {...formItemLayout}
                                             extra={field.extra}>
                                {getFieldDecorator(field.key, that.fieldDecorators(field, that.state.formData))(
                                    <CheckboxGroup options={field.options}
                                                   disabled={field.disabled ? field.disabled : that.state.disabled}/>
                                )}
                            </FormItem>;
                        case SINGLE_CHECKBOX_FIELD:
                            return <FormItem key={field.key} label={field.label} {...formItemLayout}
                                             extra={field.extra}>
                                {getFieldDecorator(field.key, {
                                        valuePropName: 'checked',
                                        initialValue: field.initialValue
                                    },
                                    {
                                        rules: [{required: field.required, message: REQUIRED_FIELD_MESSAGE}],
                                    })(
                                    <Checkbox
                                        disabled={field.disabled ? field.disabled : that.state.disabled}>{field.follow}</Checkbox>
                                )}
                            </FormItem>;
                        case NUMBER_FIELD:
                            return <FormItem key={field.key}
                                             {...formItemLayout}
                                             label={field.label} extra={field.extra}>
                                {getFieldDecorator(field.key, that.fieldDecorators(field, that.state.formData))(
                                    <InputNumber min={field.min} max={field.max}
                                                 disabled={field.disabled ? field.disabled : that.state.disabled}/>
                                )}
                                <span className="ant-form-text">{field.follow}</span>
                            </FormItem>;
                        case DATE_PICKER:
                            return <FormItem key={field.key} label={field.label} {...formItemLayout}
                                             extra={field.extra}>
                                {getFieldDecorator(field.key,
                                    {
                                        initialValue: field.initialValue ? moment(field.initialValue) : null,
                                        rules: [{required: field.required, message: REQUIRED_FIELD_MESSAGE}],
                                    })(
                                    <DatePicker format={field.format}/>
                                )}
                            </FormItem>;
                        case DATE_TIME_PICKER:
                            return <FormItem key={field.key} label={field.label} {...formItemLayout}
                                             extra={field.extra}>
                                {getFieldDecorator(field.key,
                                    {initialValue: field.initialValue ? moment(field.initialValue) : null},
                                    {
                                        rules: [{required: field.required, message: REQUIRED_FIELD_MESSAGE}],
                                    })(
                                    <DatePicker format={field.format} showTime onChange={(e) => (field.onChange ?
                                        field.onChange(e) :
                                        function () {
                                        })}/>
                                )}
                            </FormItem>;
                        case TEXT_FIELD:
                            return <div key={field.key}>
                                <FormItem key={field.key} label={field.label}  {...formItemLayout} extra={field.extra}>
                                    {getFieldDecorator(field.key, that.fieldDecorators(field, that.state.formData))(
                                        <TextArea autosize={{minRows: field.minRows, maxRows: field.maxRows}}
                                                  placeholder={field.placeholder}
                                                  disabled={field.disabled ? field.disabled : that.state.disabled}
                                                  onChange={that.inputChange}/>
                                    )}

                                </FormItem>
                            </div>;

                        case COUNTRY_FIELD:
                            return <FormItem key={field.key} {...formItemLayout} label={field.label}
                                             extra={field.extra}>
                                {getFieldDecorator(field.key, that.fieldDecorators(field, that.state.formData))(
                                    <Select placeholder={field.placeholder}
                                            disabled={field.disabled ? field.disabled : that.state.disabled}
                                            mode={field.mode ? field.mode : "default"}
                                            onChange={(value) => that.setAddressField('country', value)}>
                                        {that.state.countryOptions.map((option) => <Select.Option
                                            value={option.id}>{option.name}</Select.Option>)}
                                    </Select>
                                )}
                            </FormItem>;
                        case STATE_FIELD:
                            return <FormItem key={field.key} {...formItemLayout} label={field.label}
                                             extra={field.extra}>
                                {getFieldDecorator(field.key, that.fieldDecorators(field, that.state.formData))(
                                    <Select placeholder={field.placeholder}
                                            disabled={field.disabled ? field.disabled : that.state.disabled}
                                            mode={field.mode ? field.mode : "default"}
                                            onChange={(value) => that.setAddressField('state', value)}>
                                        {that.state.stateOptions.map((option) => <Select.Option
                                            value={option.id}>{option.name}</Select.Option>)}
                                    </Select>
                                )}
                            </FormItem>;

                        case EMAIL_FIELD:
                            return <Form.Item
                                key={field.key}
                                {...formItemLayout}
                                label={field.label}
                                extra={field.extra}
                            >
                                {getFieldDecorator(field.key, {
                                    initialValue: that.state.formData[field.key],
                                    rules: [{
                                        type: 'email', message: 'The input is not valid E-mail!',
                                    }, {
                                        required: true, message: 'Please input your E-mail!',
                                    }],
                                })(
                                    <Input placeholder={field.placeholder}
                                           disabled={field.disabled ? field.disabled : that.state.disabled}
                                           onChange={that.inputChange}/>
                                )}
                            </Form.Item>

                        case CITY_FIELD:
                            return <FormItem key={field.key} {...formItemLayout} label={field.label}
                                             extra={field.extra}>
                                {getFieldDecorator(field.key, that.fieldDecorators(field, that.state.formData))(
                                    <Select placeholder={field.placeholder}
                                            disabled={field.disabled ? field.disabled : that.state.disabled}
                                            mode={field.mode ? field.mode : "default"}>
                                        {that.state.cityOptions.map((option) => <Select.Option
                                            value={option.id}>{option.name}</Select.Option>)}
                                    </Select>
                                )}
                            </FormItem>;
                        // case DIVIDER_FIELD :
                        //     return <Divider style={{margin: 4}}/>


                        // case LABEL_FIELD :
                        //     return <FormItem key={field.key} {...formItemLayout} label={field.label}
                        //                      extra={field.extra}>
                        //
                        //         {field.follow ? <span className="ant-form-text">{field.follow}</span> : null}
                        //
                        //     </FormItem>;
                        default:
                            return null;
                    }
                }) : null}
                <FormItem {...formItemLayout}>
                    {/*<Button onClick={this.resetFormData}>Reset</Button>*/}
                    <Button loading={that.state.loading} type="primary" htmlType="submit" style={{margin: 5}}>
                        Submit
                    </Button>
                    {that.props.history ?
                        <Button style={{margin: 5}} onClick={() => that.props.history.goBack()}>
                            Cancel
                        </Button> : null}
                </FormItem>
            </Form>
        </div>
    }
}

export default DynamicFieldsForm;
