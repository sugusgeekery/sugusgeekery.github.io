import fetch from "@/axios";

// 获取订单列表
export const GetOrderList = (params: any): object => fetch({ url: `/supplier/mouldBiddingHead/list`, method: "GET", params });

