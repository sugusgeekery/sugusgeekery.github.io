import fetch from "@/axios";


// 获取省市区
export const GetProvinceCityCountry = (params: any): object => fetch({ url: `/supplier/common/wechat`, method: "GET", params });

// 更改供应商类型
export const ChangeSupplierType = (data: object = {}): object => fetch({ url: "/supplier/userManage/changeSupplierType", data });


// 获取个人信息
export const GetUserInfo = (params: any): object => fetch({ url: `/supplier/userManage/getUserInfo`, method: "GET", params });

// 保存个人信息
export const SaveUserInfo = (data: object = {}): object => fetch({ url: "/supplier/userManage/saveUserInfo", data });


// 获取个人资质信息
export const GetPersonQualifyInfo = (params: any): object => fetch({ url: `/supplier/userManage/getPersonQualifyInfoV1`, method: "GET", params });

// 保存个人资质信息
export const SavePersonQualifyInfo = (data: object = {}): object => fetch({ url: "/supplier/userManage/savePersonQualifyInfoV1", data });


// 获取公司信息
export const GetCompanyInfo = (params: any): object => fetch({ url: `/supplier/userManage/getCompanyInfo`, method: "GET", params });

// 保存公司信息
export const SaveCompanyInfo = (data: object = {}): object => fetch({ url: "/supplier/userManage/saveCompanyinfo", data });


// 获取公司资质信息
export const GetCompQualifyInfo = (params: any): object => fetch({ url: `/supplier/userManage/getCompQualifyInfoV1`, method: "GET", params });

// 保存公司资质信息
export const SaveCompanyQualifyInfo = (data: object = {}): object => fetch({ url: "/supplier/userManage/saveCompanyQualifyInfoV1", data });