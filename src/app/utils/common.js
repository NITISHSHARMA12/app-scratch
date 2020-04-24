import {API_URL} from "../constants/api";
import {message} from 'antd';
import axios from "axios/index";

import {ERROR_MSG_TYPE, INFO_MSG_TYPE, SUCCESS_MSG_TYPE, WARNING_MSG_TYPE} from "../constants/dataKeys";
import {getAuthToken} from "./Auth";
import {ERROR_MESSAGE_404, ERROR_MESSAGE_500} from "../constants/messages";
export const makeURL = function (URL) {
    return API_URL + '/' + URL;
};

export const makeFileURL = function(URL){
    return API_URL + '/' + URL;
}


export const postOuterAPI = function (URL, data, successFn, errorFn, headerConfig = {}) {
    // console.log("sending to " + makeURL(URL), data);
    axios({
        method: 'post',
        url: URL,
        data: data,
        headers: {
            ...headerConfig
        }
    }).then(function (response) {
        // console.log(response);
        let data = response.data;
        successFn(data);
    }).catch(function (error) {
        console.log(error);
        handleErrorResponse(error);
        errorFn();
    });
};

export const getAPI = function (URL, successFn, errorFn, params = {}) {
    // console.log(getAuthToken());
    axios({
        method: 'get',
        url: makeURL(URL),
        headers: {
            Authorization: 'Token ' + getAuthToken()
        },
        params: params
    }).then(function (response) {
        console.log(response);
        let data = response.data;
        successFn(data);
    }).catch(function (error) {
        console.log("Error aa rhi ", error);
        handleErrorResponse(error);
        errorFn();
    });
};


export const postAPI = function (URL, data, successFn, errorFn, headerConfig = {}) {
    // console.log("sending to " + makeURL(URL), data);
    axios({
        method: 'post',
        url: makeURL(URL),
        data: data,
        headers: {
            Authorization: 'Token ' + getAuthToken(),
            ...headerConfig
        }
    }).then(function (response) {
        // console.log(response);
        let data = response.data;
        successFn(data);
    }).catch(function (error) {
        console.log(error);
        handleErrorResponse(error);
        errorFn();
    });
};

export const putAPI = function (URL, data, successFn, errorFn, headerConfig = {}) {
    // console.log("sending to " + makeURL(URL), data);
    axios({
        method: 'put',
        url: makeURL(URL),
        data: data,
        headers: {
            Authorization: 'Token ' + getAuthToken(),
            ...headerConfig
        }
    }).then(function (response) {
        // console.log(response);
        let data = response.data;
        successFn(data);
    }).catch(function (error) {
        handleErrorResponse(error);
        errorFn(data);
    });
};

export const handleErrorResponse = function (error) {
    let response = error.response;
    if (response) {
        console.info("Error Response Recieved", response);
        let status = response.status;
        if (status == 400) {
            if (response.data.detail) {
                message.error(response.data.detail);
            }
        } else if (status == 401) {
            if (response.data.detail) {
                message.error(response.data.detail);
            }
        } else if (status == 404) {
            if (response.data.detail) {
                message.error(response.data.detail);
            } else {
                message.error(ERROR_MESSAGE_404);
            }
        } else if (status == 500) {
            message.error(ERROR_MESSAGE_500);
        }
    } else {
        // message.error(ERROR_INTERNET_CONNECTIVITY);
        console.error("ERROR: ",response);
    }
};


export const displayMessage = function (type, msg) {
    if (type == SUCCESS_MSG_TYPE)
        message.success(msg);
    else if (type == INFO_MSG_TYPE)
        message.info(msg);
    else if (type == WARNING_MSG_TYPE)
        message.warning(msg);
    else if (type == ERROR_MSG_TYPE)
        message.error(msg);
};
