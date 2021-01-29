import fetch from "@/axios";





// 方案设计
// 查看当前进行到哪一步
export const GetStep = (params: any = {}): object => fetch({ url: `/supplier/conceptualDesign/getStep`, method: "GET", params });

// 获取订单竞价指标
// export const GetMyBidAdvantage = (params: any = {}): object => fetch({ url: `/supplier/orderCenter/getMyBidAdvantage`, method: "GET", params });

