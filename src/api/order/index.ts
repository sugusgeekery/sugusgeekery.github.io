import fetch from "@/axios";



// 获取订单列表
export const GetOrderList = (params: any = {}): object => fetch({ url: `/supplier/orderCenter/list`, method: "GET", params });

// 获取订单竞价指标
export const GetMyBidAdvantage = (params: any = {}): object => fetch({ url: `/supplier/orderCenter/getMyBidAdvantage`, method: "GET", params });

// 获取订单倒计时
export const GetCountdown = (params: any = {}): object => fetch({ url: `/supplier/orderCenter/getRemainTime`, method: "GET", params });

// 获取联系方式
export const GetContact = (params: any = {}): object => fetch({ url: `/supplier/dfmReport/getSupplierByOrderNo`, method: "GET", params });

// 下载dfm报告
export const ExportDfm = (params: any = {}): object => fetch({ url: `/supplier/dfmReport/exportDfm`, method: "GET", params });

// 获取DFM供应商的模具产品信息列表
export const GetMould = (params: any = {}): object => fetch({ url: `/supplier/dfmReport/selectProducts`, method: "GET", params });

// DFM供应商是否需要更新图纸
export const NeedChangeDrawing = (data: any = {}): object => fetch({ url: `/supplier/dfmReport/needChangeDrawing`, data });

// DFM供应商确认驳回图纸
export const DfmApprovalDrawing = (data: any = {}): object => fetch({ url: `/supplier/dfmReport/approvalDrawing`, data });

// 获取合模方案
export const GetArrangementScheme = (params: any = {}): object => fetch({ url: `/supplier/orderCenter/getPolyteneMatchedMould`, method: "GET", params });


