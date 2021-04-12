import fetch from "@/axios";

// 获取加工供应商的样件验收信息
export const GetCheckAndAcceptInfo = (params: any = {}): object => fetch({ url: `/supplier/machining/getCheckAndAcceptInfo`, method: "GET", params });

// 提交邮寄信息
export const CommitMailInfo = (data: object = {}): object => fetch({ url: "/supplier/machining/commitMailInfo", data });