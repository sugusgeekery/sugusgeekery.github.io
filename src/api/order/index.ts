import fetch from "@/axios";

// 获取订单列表
export const GetOrderList = (params: any = {}): object => fetch({ url: `/supplier/orderCenter/list`, method: "GET", params });

// 获取订单竞价指标
export const GetMyBidAdvantage = (params: any = {}): object => fetch({ url: `/supplier/orderCenter/getMyBidAdvantage`, method: "GET", params });

// 获取订单倒计时
export const GetOrderTime = (params: any = {}): object => {
  const { orderId = "" } = params;
  return fetch({ url: `/supplier/downTime/getOrderTime/${orderId}`, method: "GET", params: {} });
};