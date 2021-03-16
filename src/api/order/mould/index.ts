import fetch from "@/axios";

// 获取DFM供应商的模具产品信息列表
export const GetProducts = (params: any = {}): object => {
  const { biddingId = "" } = params;
  return fetch({ url: `/supplier/dfmReport/selectProducts/${biddingId}`, method: "GET", params: {} });
};

// DFM供应商确认驳回图纸
export const DfmApprovalDrawing = (data: any = {}): object => fetch({ url: `/supplier/dfmReport/approvalDrawing`, data });

// DFM供应商是否需要更新图纸
export const NeedChangeDrawing = (data: any = {}): object => fetch({ url: `/supplier/dfmReport/needChangeDrawing`, data });

