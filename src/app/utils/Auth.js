import lockr from 'lockr';
import {AUTH_TOKEN, GROUP, PASSWORD, PRACTICE, ROLE} from "../constants/dataKeys";
import {handleErrorResponse, makeURL} from "./common";
import axios from "axios/index";
import {LOGIN_URL} from "../constants/api";

export const loadUserDetails = function () {
    let role = lockr.get(ROLE);
    let token = lockr.get(AUTH_TOKEN);
    if (role && token) {
        return role;
    }
    return null;
}

export const logOutUser = function (successFn, errorFn) {
    lockr.rm(ROLE);
    lockr.rm(AUTH_TOKEN);
    lockr.rm('PATIENT')
    lockr.rm(PRACTICE);
    lockr.rm(GROUP);
    successFn();
};

export const getAuthToken = function () {
    let token = lockr.get(AUTH_TOKEN);
    return token;
};


export const logInUser = function (data, successFn, errorFn) {
    console.log("workign");
    // var reqData = {
    //     'mobile': data.email,
    //     [PASSWORD]: data.password
    // };
    let token = true;
    let reqData = true

    lockr.set(ROLE, reqData);
    lockr.set(AUTH_TOKEN,token);
    successFn()
    // axios.post(makeURL(LOGIN_URL), reqData)
    //     .then(function (response) {
    //     // console.log(response);
    //     let data = response.data;
    //     lockr.set(ROLE, data.user);
    //     lockr.set(AUTH_TOKEN, data.token);
    //     lockr.set(PRACTICE, data.practice_list);
    //     // lockr.set('PERMISSIONS', data.permissions_list);
    //     successFn()
    //     }).catch(function (error) {
    //         console.log(error);
    //         handleErrorResponse(error);
    //         errorFn();
    //     })
};
