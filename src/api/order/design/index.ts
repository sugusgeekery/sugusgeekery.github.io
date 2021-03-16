import fetch from "@/axios";

// 查看当前进行到哪一步
// export const GetStep = (params: any = {}): object => fetch({ url: `/supplier/conceptualDesign/getStep`, method: "GET", params });

// 获取步骤详情
// export const GetStepDetail = (params: any = {}): object => fetch({ url: `/supplier/conceptualDesign/listByMouldNo`, method: "GET", params });

// 获取DFM方方案设计
export const GetDfmRealtime = (params: any = {}): object => fetch({ url: `/supplier/planDesign/getDfmRealtime`, method: "GET", params });

// 获取加工方方案设计
export const GetMachinRealtime = (params: any = {}): object => fetch({ url: `/supplier/planDesign/getMachinRealtime`, method: "GET", params });

// 获取注塑方方案设计
export const GetInjectionRealtime = (params: any = {}): object => fetch({ url: `/supplier/planDesign/getInjectionRealtime`, method: "GET", params });

// 上传3D图纸方案
export const ImportProgramme = (data: any = {}, params: any = {}): object => fetch({ url: `/supplier/planDesign/threeFaceDesign/commit`, data, params });

// 获取BOM表
export const GetBOMList = (params: any = {}): object => fetch({ url: `/supplier/conceptualDesign/listBom`, method: "GET", params });

// 获取BOM表零件图纸
export const GetBOMImageInfo = (params: any = {}): object => fetch({ url: `/supplier/conceptualDesign/listImageInfo`, method: "GET", params });

// 上传BOM文件
export const ImportBom = (data: any = {}, params: any = {}): object => fetch({ url: `/supplier/conceptualDesign/importBom`, headers: { "Content-Type": "multipart/form-data;" }, data, params });

// 上传BOM零件图纸
export const ImportSpareImage = (data: any = {}, params: any = {}): object => fetch({ url: `/supplier/conceptualDesign/importSpareImage`, headers: { "Content-Type": "multipart/form-data;" }, data, params });

// 上传更新BOM零件图纸的 2D 3D
export const UpdateSpareImage = (data: any = {}, params: any = {}): object => fetch({ url: `/supplier/conceptualDesign/updateImage`, headers: { "Content-Type": "multipart/form-data;" }, data, params });

// 验收通过或者驳回
export const CheckProgramme = (data: any = {}, params: any = {}): object => fetch({ url: `/supplier/conceptualDesign/checkProgramme`, data, params });

// 验收2D3D图纸
export const CheckImage = (data: any = {}, params: any = {}): object => fetch({ url: `/supplier/conceptualDesign/checkImage`, data, params });


