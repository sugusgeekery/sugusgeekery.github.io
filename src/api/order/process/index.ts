import fetch from "@/axios";

// 获取加工流程步骤列表
export const GetMachinSteps = (params: any = {}): object => {
  return fetch({ url: `/supplier/stepFlow/getMachinSteps`, method: "GET", params });
};

// 获取装配流程步骤列表
export const GetAssembleSteps = (params: any = {}): object => {
  return fetch({ url: `/supplier/stepFlow/getAssembleSteps`, method: "GET", params });
};

// 获取注塑流程步骤列表
export const GetInjectionSteps = (params: any = {}): object => {
  return fetch({ url: `/supplier/stepFlow/getInjectionSteps`, method: "GET", params });
};

// 完成加工、装配，注塑等流程单个步骤
export const FinishedStep = (data: any = {}): object => fetch({ url: `/supplier/stepFlow/finishedStep`, data });


