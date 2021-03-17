import fetch from "@/axios";

// 获取加工供应商的问题列表
export const GetQuestions = (params: any = {}): object => fetch({ url: `/supplier/machining/getQuestions`, method: "GET", params });

// 回答问题
export const AnswerQuestion = (data: any = {}): object => fetch({ url: `/supplier/machining/answerQuestion`, data });


