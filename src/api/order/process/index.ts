import fetch from "@/axios";

// 获取加工供应商下的加工流程步骤列表
export const GetMachiningStepList = (params: any = {}): object => {
  return fetch({ url: `/supplier/machinFlow/getStepList`, method: "GET", params });
};

// 获取注塑供应商下的加工流程步骤列表
export const GetInjectStepList = (params: any = {}): object => {
  return fetch({ url: `/supplier/machinFlow/getStepList`, method: "GET", params });
};

// 加工供应商下的完成加工流程单个步骤
export const FinishedMachiningStep = (data: any = {}): object => fetch({ url: `/supplier/machinFlow/finishedStep`, data });

// 注塑供应商下的完成注塑流程单个步骤
export const FinishedInjectStep = (data: any = {}): object => fetch({ url: `/supplier/machinFlow/finishedStep`, data });

// 加工供应商下的提交确认加工流程
export const ConfirmMachiningFinished = (data: any = {}): object => fetch({ url: `/supplier/machining/confirmFinished`, data });

// 注塑供应商下的提交确认注塑流程
export const ConfirmInjectFinished = (data: any = {}): object => fetch({ url: `/supplier/machining/confirmFinished`, data });

