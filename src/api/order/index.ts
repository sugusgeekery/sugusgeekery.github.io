import fetch from "@/axios";

// 获取订单类型筛选项
export const GetMouldOrderType = (params: any = {}): object => fetch({ url: `/supplier/common/getMouldOrderType`, method: "GET", params });

// 获取订单状态筛选项
export const GetOrderStatus = (params: any = {}): object => fetch({ url: `/supplier/common/getOrderStatus`, method: "GET", params });

// 获取订单列表
export const GetOrderList = (params: any = {}): object => fetch({ url: `/supplier/orderCenter/list`, method: "GET", params });

// 获取订单竞价指标
export const GetMyBidAdvantage = (params: any = {}): object => fetch({ url: `/supplier/orderCenter/getMyBidAdvantage`, method: "GET", params });

// 获取订单倒计时
export const GetRemainTime = (params: any = {}): object => fetch({ url: `/supplier/orderCenter/getRemainTime`, method: "GET", params });

// 获取DFM订单倒计时
// export const GetDfmRemainTime = (params: any = {}): object => {
//   const { biddingId = "" } = params;
//   return fetch({ url: `/supplier/dfmReport/getRemainTime/${biddingId}`, method: "GET", params: {} });
// };
// 获取加工订单倒计时
// export const GetMachiningRemainTime = (params: any = {}): object => {
//   const { biddingId = "" } = params;
//   return fetch({ url: `/supplier/machining/getRemainTime/${biddingId}`, method: "GET", params: {} });
// };
// 获取注塑订单倒计时
// export const GetInjectRemainTime = (params: any = {}): object => {
//   const { biddingId = "" } = params;
//   return fetch({ url: `/supplier/injectModel/getRemainTime/${biddingId}`, method: "GET", params: {} });
// };