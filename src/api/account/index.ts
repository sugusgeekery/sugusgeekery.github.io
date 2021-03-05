import fetch from "@/axios";


// 更改供应商类型
export const ChangeSupplierType = (data: object = {}): object => fetch({ url: "/supplier/userManage/changeSupplierType", data });


// 获取个人信息
export const GetUserInfo = (params: any): object => fetch({ url: `/supplier/userManage/getUserInfo`, method: "GET", params });

// 保存个人信息
export const SaveUserInfo = (data: object = {}): object => fetch({ url: "/supplier/userManage/saveUserInfo", data });


// 获取个人资质信息
export const GetPersonQualifyInfo = (params: any): object => fetch({ url: `/supplier/userManage/getPersonQualifyInfo`, method: "GET", params });

// 保存个人资质信息
export const SavePersonQualifyInfo = (data: object = {}): object => fetch({ url: "/supplier/userManage/savePersonQualifyInfo", data });


// 获取公司信息
export const GetCompanyInfo = (params: any): object => fetch({ url: `/supplier/userManage/getCompanyInfo`, method: "GET", params });

// 保存公司信息
export const SaveCompanyInfo = (data: object = {}): object => fetch({ url: "/supplier/userManage/saveCompanyinfo", data });


// 获取公司资质信息
export const GetCompQualifyInfo = (params: any): object => fetch({ url: `/supplier/userManage/getCompQualifyInfo`, method: "GET", params });

// 保存公司资质信息
export const SaveCompanyQualifyInfo = (data: object = {}): object => fetch({ url: "/supplier/userManage/saveCompanyQualifyInfo", data });