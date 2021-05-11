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


