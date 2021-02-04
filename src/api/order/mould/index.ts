import fetch from "@/axios";

// 获取DFM供应商的模具产品信息列表
export const GetProducts = (params: any = {}): object => {
  const { biddingId = "" } = params;
  return fetch({ url: `/supplier/dfmReport/selectProducts/${biddingId}`, method: "GET", params: {} });
};



// 方案设计
// 查看当前进行到哪一步
export const GetStep = (params: any = {}): object => fetch({ url: `/supplier/conceptualDesign/getStep`, method: "GET", params });

// 获取订单竞价指标
// export const GetMyBidAdvantage = (params: any = {}): object => fetch({ url: `/supplier/orderCenter/getMyBidAdvantage`, method: "GET", params });

