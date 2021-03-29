import fetch from "@/axios";

// 获取DFM供应商的模具产品信息列表
export const GetProducts = (params: any = {}): object => fetch({ url: `/supplier/dfmReport/selectProducts`, method: "GET", params });

// DFM供应商是否需要更新图纸
export const NeedChangeDrawing = (data: any = {}): object => fetch({ url: `/supplier/dfmReport/needChangeDrawing`, data });

// DFM供应商确认驳回图纸
export const DfmApprovalDrawing = (data: any = {}): object => fetch({ url: `/supplier/dfmReport/approvalDrawing`, data });



// 获取加工供应商下的模具信息 
export const GetMouldDetail = (params: any = {}): object => fetch({ url: `/supplier/machining/getMouldDetail`, method: "GET", params });

// 获取修模列表
export const GetAllRepair = (params: any = {}): object => fetch({ url: `/supplier/machining/getAllRepair`, method: "GET", params });

// 提交修模信息 
export const CommitRepairMould = (data: any = {}): object => fetch({ url: `/supplier/machining/commitRepairMould`, data });



// 获取合模方案
export const GetClampingPlan = (params: any = {}): object => fetch({ url: `/supplier/orderCenter/getPolyteneMatchedMould`, method: "GET", params });


