import fetch from "@/axios";

// 获取个人统计信息
export const GetStatistics = (params: any = {}): object => fetch({ url: `/supplier/mainPage/getStatistics`, method: "GET", params });

// 获取待办任务
export const GetToBeDeal = (params: any = {}): object => fetch({ url: `/supplier/mainPage/getToBeDeal`, method: "GET", params });

