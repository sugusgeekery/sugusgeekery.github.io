import fetch from "@/axios";

// 获取DFM方方案设计
export const GetDfmRealtime = (params: any = {}): object => fetch({ url: `/supplier/planDesign/getDfmRealtime`, method: "GET", params });

// 获取加工方方案设计
export const GetMachinRealtime = (params: any = {}): object => fetch({ url: `/supplier/planDesign/getMachinRealtime`, method: "GET", params });

// 获取试模方方案设计
export const GetInjectionRealtime = (params: any = {}): object => fetch({ url: `/supplier/planDesign/getInjectionRealtime`, method: "GET", params });

// 上传3D图纸方案
export const ImportDesign = (data: any = {}, params: any = {}): object => fetch({ url: `/supplier/planDesign/threeFaceDesign/commit`, data, params });

// 验收3D图纸方案
export const ApprovalDesign = (data: any = {}): object => fetch({ url: `/supplier/planDesign/threeFaceDesign/approval`, data });

// 获取BOM表
export const GetBOMList = (params: any = {}): object => fetch({ url: `/supplier/planDesign/bomList`, method: "GET", params });

// 获取BOM表零件图纸
export const GetBOMImageInfo = (params: any = {}): object => fetch({ url: `/supplier/planDesign/bomDesign/list`, method: "GET", params });

// 导入BOM文件
export const ImportBom = (data: any = {}): object => fetch({ url: `/supplier/planDesign/importBom`, data });

// 验收BOM文件 
export const ApprovalBom = (data: any = {}): object => fetch({ url: `/supplier/planDesign/approvalBom`, data });

// 批量提交BOM零件图纸
export const ImportBomImage = (data: any = {}): object => fetch({ url: `/supplier/planDesign/bomDesign/commit`, data });

// 验收BOM零件图纸
export const ApprovalBomImage = (data: any = {}): object => fetch({ url: `/supplier/planDesign/bomDesign/approval`, data });

// 获取方案设计记录
export const GetDesignVersion = (params: any = {}): object => fetch({ url: `/supplier/planDesign/getVersionList`, method: "GET", params });


