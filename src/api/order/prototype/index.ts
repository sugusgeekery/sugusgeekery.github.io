

/*
 * @Author: your name
 * @Date: 2021-04-12 16:15:29
 * @LastEditTime: 2021-06-03 17:00:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supplier\src\api\order\prototype\index.ts
 */

import fetch from "@/axios";

// 获取加工供应商的样件验收信息
export const GetSampleAcceptanceInfo = (params: any = {}): object => fetch({ url: `/supplier/machining/getSampleAcceptanceInfo`, method: "GET", params });

// 提交加工供应商的样件验收信息
export const CommitSampleAcceptInfo = (data: object = {}): object => fetch({ url: "/supplier/machining/commitSampleAcceptInfo", data });

// 获取加工供应商的问题列表
export const GetQuestions = (params: any = {}): object => fetch({ url: `/supplier/machining/getQuestions`, method: "GET", params });

// 回答问题
export const AnswerQuestion = (data: any = {}): object => fetch({ url: `/supplier/machining/answerQuestion`, data });