import fetch from "@/axios";

// 获取方案设计主数据
// 获取方案设计方方案设计
export const GetPlanDesignRealtime = (params: any = {}): object => fetch({ url: `/supplier/planDesign/getPlanDesignRealtime`, method: "GET", params });

// 获取加工方方案设计
export const GetMachinRealtime = (params: any = {}): object => fetch({ url: `/supplier/planDesign/getMachinRealtime`, method: "GET", params });

// 获取试模方方案设计
export const GetInjectionRealtime = (params: any = {}): object => fetch({ url: `/supplier/planDesign/getInjectionRealtime`, method: "GET", params });

// 获取热流道方方案设计
export const GetHotRunnerRealtime = (params: any = {}): object => fetch({ url: `/supplier/planDesign/getHotRunnerRealtime`, method: "GET", params });

// 获取图片列表
export const GetApprovalFilePath = (data: any = {}): object => fetch({ url: `/supplier/planDesign/getApprovalFilePath`, data });


// 3D图纸主数据
// 上传3D图纸方案或者上传含热流道3D图纸方案
export const CommitThreeFaceDesign = (data: any = {}, params: any = {}): object => fetch({ url: `/supplier/planDesign/threeFaceDesign/commit`, data, params });

// 上传热流道图纸方案
export const CommitHotRunner = (data: any = {}, params: any = {}): object => fetch({ url: `/supplier/planDesign/hotRunner/commit`, data, params });

// 验收3D图纸方案
export const ApprovalThreeFaceDesign = (data: any = {}): object => fetch({ url: `/supplier/planDesign/threeFaceDesign/approval`, data });

// 验收热流道图纸方案
export const ApprovalHotRunner = (data: any = {}): object => fetch({ url: `/supplier/planDesign/hotRunner/approval`, data });


// BOM表主数据
// 获取BOM表详情
export const GetBOMInfo = (params: any = {}): object => fetch({ url: `/supplier/planDesign/bom/list`, method: "GET", params });

// 导入BOM表
export const ImportBom = (data: any = {}): object => fetch({ url: `/supplier/planDesign/importBom`, data });

// 批量提交BOM零件图纸
export const ImportBomImage = (data: any = {}): object => fetch({ url: `/supplier/planDesign/bomDesign/commit`, data });

// 提交BOM表
export const SaveBomList = (params: any = {}): object => fetch({ url: `/supplier/planDesign/bom/saveList`, method: "GET", params });

// 验收BOM表
export const ApprovalBom = (data: any = {}): object => fetch({ url: `/supplier/planDesign/approvalBom`, data });

// 验收BOM零件图纸
export const ApprovalBomImage = (data: any = {}): object => fetch({ url: `/supplier/planDesign/bomDesign/approval`, data });




