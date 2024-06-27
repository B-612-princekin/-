"use strict";

import Vue from 'vue';
import axios from "axios";
import { Toast } from 'vant';

Vue.use(Toast);

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);
// 请求拦截
_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    
    //启动加载提示
    Toast.loading({
      message: '加载中...',
      //禁止穿透点击
      forbidClick: true,
      loadingType: 'spinner',
      //不会自动关闭提示
      duration: 0
    })

    return config;
  },
  function (error) {
    // Do something with request error

    //关闭加载提示
    Toast.clear();
    return Promise.reject(error);
  }
);
// 响应拦截
// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data

    //关闭加载提示
    Toast.clear();
    return response;
  },
  function (error) {
    // Do something with response error

    //关闭加载提示
    Toast.clear();
    return Promise.reject(error);
  }
);

Plugin.install = function (Vue, options) {
  options
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
