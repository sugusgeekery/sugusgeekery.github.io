import fetch from "@/axios";

// 获取DFM供应商下的DFM报告订单列表
export const GetDfmReportList = (params: any = {}): object => {
  const { biddingId = "" } = params;
  return fetch({ url: `/supplier/dfmReport/getReportsByOrder/${biddingId}`, method: "GET", params: {} });
};

// 获取加工供应商下的DFM报告验收订单列表
export const GetMachiningDfmReportList = (params: any = {}): object => {
  const { biddingId = "" } = params;
  return fetch({ url: `/supplier/machining/getDfmReportList/${biddingId}`, method: "GET", params: {} });
};

// 获取注塑供应商下的DFM报告验收订单列表
export const GetInjectDfmReportList = (params: any = {}): object => {
  const { biddingId = "" } = params;
  return fetch({ url: `/supplier/injectModel/getDfmReportList/${biddingId}`, method: "GET", params: {} });
};

// 提交DFM报告
export const CommitReport = (data: any = {}): object => fetch({ url: `/supplier/dfmReport/commitReport`, data });

// DFM供应商确认驳回
export const DfmApprovalDfmReport = (data: any = {}): object => fetch({ url: `/supplier/dfmReport/approvalDrawing`, data });

// 加工供应商确认驳回
export const MachiningApprovalDfmReport = (data: any = {}): object => fetch({ url: `/supplier/machining/approvalDfmReport`, data });

// 注塑供应商确认驳回
export const InjectApprovalDfmReport = (data: any = {}): object => fetch({ url: `/supplier/injectModel/approvalDfmReport`, data });

// export const GetMyBidAdvantage = (params: any = {}): object => fetch({ url: `/supplier/orderCenter/getMyBidAdvantage`, method: "GET", params });

