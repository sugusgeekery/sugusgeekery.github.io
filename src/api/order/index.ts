import fetch from "@/axios";

// 获取oss的TST授权信息
export const GetOssfsToken = (data: object = {}): object => fetch({ url: "/sz/api/common/common/getOssfsTokenFileExt", data });

// 家长端验证码登录
export const Login = (data: object = {}): object => fetch({ url: "/sz/api/parents/parents/V2/phoneLogin", data });