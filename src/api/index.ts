import fetch from "@/axios";

// 获取oss的TST授权信息
export const GetOssfsToken = (data: object = {}): object => fetch({ url: "/sz/api/common/common/getOssfsTokenFileExt", data });


// 上传文件
export const UploadForm = (data: object = {}): object => fetch({ url: "/supplier/common/uploadForm", headers: { "Content-Type": "multipart/form-data;" }, data });

// 统一处理 step文件
export const GetStpRender = (params: object = {}): object => fetch({ url: "/supplier/common/getStpRender", params });



// 获取验证码
export const GetVerificationCode = (params: object = {}): object => fetch({ url: "/supplier/oauth/sendCode", method: "GET", params });

// 验证码登录
export const VerificationCodeLogin = (data: object = {}): object => fetch({ url: "/supplier/oauth/loginByCode", data });

// 微信扫码登录
export const WechatLogin = (data: object = {}): object => fetch({ url: "/supplier/oauth/wxLogin", data });

// 微信扫码登录
export const PhoneLogin = (params: object = {}): object => fetch({ url: "/supplier/common/loginByPhone", method: "GET", params });

// 注册
export const Register = (data: object = {}): object => fetch({ url: "/supplier/oauth/register", data });

// 获取用户信息 
export const GetAccountInfo = (params: object = {}): object => fetch({ url: "/supplier/userManage/getLoginedUserInfo", method: "GET", params });

// 退出登录 
export const Logout = (params: object = {}): object => fetch({ url: "/supplier/oauth/logout", method: "GET", params });




// 获取订单类型筛选项
export const GetMouldOrderType = (params: any = {}): object => fetch({ url: `/supplier/common/getMouldOrderType`, method: "GET", params });

// 获取资质认证生产能力标签
export const GetCompQualifyLabelInfo = (params: any = {}): object => fetch({ url: `/supplier/userManage/getLabelList`, method: "GET", params });

// 获取订单状态筛选项
export const GetOrderStatus = (params: any = {}): object => fetch({ url: `/supplier/common/getOrderStatus`, method: "GET", params });



