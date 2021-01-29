import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import store from "@/store";
import router from "@/router";

import { Message, MessageBox  } from "element-ui";
import { getSessionStorage, getLocalStorage } from "@/utils/storage";
import { TIME_OUT, BASE_API_URL, INTERFACE_ERROR_TEXT } from "@/config";

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_API_URL,
  // 请求后的数据处理
  transformResponse: [
    function(data: AxiosResponse) {
      return data;
    }
  ],
  // 超时设置ms
  timeout: TIME_OUT,
  // // 跨域是否带Token
  withCredentials: false,
  responseType: "json",
  // // xsrf 设置
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  // // 最多转发数，用于node.js
  maxRedirects: 5,
  // // 最大响应数据大小
  maxContentLength: 2000,
  // // 自定义错误状态码范围
  validateStatus(status: number) {
    return status >= 200 && status < 300;
  }
};

let hasMessageBox = false;

const service = axios.create(axiosConfig);

// 网络请求前拦截器
service.interceptors.request.use(
  (resquest: any = {}) => {
    return Promise.resolve(resquest);
  },
  (error = {}) => {
    return Promise.reject(error);
  }
);

// 网络响应后拦截器
service.interceptors.response.use(
  (response: any = {}) => {
    const {
      status = 0,
      data = {},
      statusText = INTERFACE_ERROR_TEXT
    } = response;
    const { message = INTERFACE_ERROR_TEXT } = data;
    if (status >= 200 && status < 300) {
      return Promise.resolve({
        ...data,
        message: message || statusText || INTERFACE_ERROR_TEXT
      });
    } else {
      return Promise.resolve({
        code: "000",
        message: message || statusText || INTERFACE_ERROR_TEXT
      });
    }
  },
  (error = {}) => {
    // 状态码验证
    const expNum = /([\d]{3})/gi;
    // 超时验证
    const expTimeout = /(timeout)/gi;
    // 是否是网络响应超时
    const isTimeOut = error.toString().match(expTimeout);
    // 兼容后台没有反正状态码的情况，自己根据axios返回的错误信息抓取状态码
    const tempStatus = ~~error.toString().match(expNum)[0];

    const { response = {} } = error;
    const {
      status = tempStatus,
      data = {},
      statusText = INTERFACE_ERROR_TEXT
    } = response;
    let { message = INTERFACE_ERROR_TEXT, type = 0 } = data;
    switch (status) {
      case 401:
        // Message.error("登录已失效，请重新登录");
        // if (!hasMessageBox) {
        //   hasMessageBox = true;
        //   const message =
        //     type == 1
        //       ? "你已经被超级管理员强制下线"
        //       : type == 2
        //       ? "该账号已在其他地方登录"
        //       : type == 3
        //       ? "资料正在审核中，请重新登录"
        //       : "登录已失效，请重新登录";
        //   MessageBox({
        //     message,
        //     title: "温馨提示",
        //     confirmButtonText: "确定",
        //     cancelButtonText: "取消",
        //     showClose: false,
        //     closeOnClickModal: false,
        //     closeOnPressEscape: false,
        //     center: true,
        //     roundButton: false,
        //     showConfirmButton: true,
        //     showCancelButton: false
        //   })
        //     .then(action => {
        //       hasMessageBox = false;
        //       if (action === "confirm") {
        //         router.push("/");
        //       }
        //     })
        //     .catch(() => {
        //       hasMessageBox = false;
        //       Message.info("已取消登录");
        //     });
        // }
        store.dispatch("notifyTokenExpired");
        return Promise.reject({
          message: message || statusText || INTERFACE_ERROR_TEXT,
          code: "401"
        });
      default:
        if (isTimeOut && isTimeOut.length > 0) {
          message = "网络响应超时！请稍后重试！";
        }
    }
    return Promise.resolve({
      message: message || statusText || INTERFACE_ERROR_TEXT,
      code: "000"
    });
  }
);

export default async ({
  method = "post",
  url = "",
  data = {},
  params = {},
  headers = {},
}: AxiosRequestConfig = {}) => {
  const config: AxiosRequestConfig = {
    url,
    method,
    params: Object.assign(
      {},
      {
        // accessToken:
        //   store.state.logInfo.accessToken || getSessionStorage("accessToken") || getLocalStorage("accessToken") || "",
        ...params
      }
    ),
    data,
    headers: {
      token:
        store.state.logInfo.accessToken || getSessionStorage("accessToken") || getLocalStorage("accessToken") || "",
      ...headers
    }
  };
  return service(config);
};
