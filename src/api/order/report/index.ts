import fetch from "@/axios";

// 获取DFM供应商下的DFM报告订单列表
export const GetDfmReportList = (params: any = {}): object => fetch({ url: `/supplier/dfmReport/getReportsByOrder`, method: "GET", params });

// 获取加工供应商下的DFM报告验收订单列表
export const GetMachiningDfmReportList = (params: any = {}): object => fetch({ url: `/supplier/machining/getDfmReportList`, method: "GET", params });

// 获取注塑供应商下的DFM报告验收订单列表
export const GetInjectDfmReportList = (params: any = {}): object => fetch({ url: `/supplier/injectModel/getDfmReportList`, method: "GET", params });

// 提交DFM报告
export const CommitReport = (data: any = {}): object => fetch({ url: `/supplier/dfmReport/commitReport`, data });

// 加工供应商确认驳回
export const MachiningApprovalDfmReport = (data: any = {}): object => fetch({ url: `/supplier/machining/approvalDfmReport`, data });

// 注塑供应商确认驳回
export const InjectApprovalDfmReport = (data: any = {}): object => fetch({ url: `/supplier/injectModel/approvalDfmReport`, data });

