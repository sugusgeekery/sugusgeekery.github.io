// 项目名称 supplier （好品供应商端）
const APPLICATION_NAME = "supplier";

// 项目版本号
const APPLICATION_VERSION = "0.1.1";

// 项目更新信息
const APPLICATION_UPDATE_INFORMATION = `
            1、无；
`

// 超时时间，单位ms
const TIME_OUT = 180000;

// 接口错误统一提示语
const INTERFACE_ERROR_TEXT = "出了点小问题";

// 验证码倒计时时长，单位s
const VERIFICATION_CODE_NUMBER = 60;

// 缩略图后缀
const BASE_IMAGE_THUMBNAIL = "";

let BASE_API_URL = "";
let BASE_IMAGE_URL = "";
let WX_APPID = ""; 
let WX_REDIRECT_URL = "";

// 开发打包下对应的环境
const NODE_ENV: string = process.env.NODE_ENV;

switch(NODE_ENV) {
  case "development":
    // 测试环境
    BASE_API_URL = "http://testsupplierapi.hotpick.com";
    BASE_IMAGE_URL = "http://testsupplierapi.hotpick.com/upload";
    WX_APPID = "wx483c7d15d7b94566";
    WX_REDIRECT_URL = "http://testsupplier.hotpick.com";
    console.log(`
        项目环境：测试环境（${NODE_ENV}）；
        项目版本：${APPLICATION_VERSION}；
        项目更新内容：${APPLICATION_UPDATE_INFORMATION}；

    `);
    break;
  case "production":
    // 正式环境
    BASE_API_URL = "https://supplierapi.hotpick.com";
    BASE_IMAGE_URL = "https://supplierapi.hotpick.com/upload";
    WX_APPID = "wx483c7d15d7b94566";
    WX_REDIRECT_URL = "https://supplier.hotpick.com";
    console.log(`
        项目环境：正式环境（${NODE_ENV}）；
        项目版本：${APPLICATION_VERSION}；
        项目更新内容：${APPLICATION_UPDATE_INFORMATION}；

    `)
    break;
  default:
    break;
}

export {
  APPLICATION_NAME,
  APPLICATION_VERSION,
  APPLICATION_UPDATE_INFORMATION,
  TIME_OUT,
  INTERFACE_ERROR_TEXT,
  BASE_API_URL,
  BASE_IMAGE_URL,
  WX_APPID, 
  WX_REDIRECT_URL,
  BASE_IMAGE_THUMBNAIL,
  VERIFICATION_CODE_NUMBER,
  NODE_ENV
};
