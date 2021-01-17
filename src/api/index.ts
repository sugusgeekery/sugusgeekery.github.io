import fetch from "@/axios";

// 获取oss的TST授权信息
// export const GetOssfsToken = (data: object = {}): object => fetch({ url: "/sz/api/common/common/getOssfsTokenFileExt", data });

// 获取验证码
export const GetVerificationCode = (params: object = {}): object => fetch({ url: "/supplier/oauth/sendCode", method: "GET", params });

// 验证码登录
export const VerificationCodeLogin = (data: object = {}): object => fetch({ url: "/supplier/oauth/loginByCode", data });

// 微信扫码登录
export const WechatLogin = (data: object = {}): object => fetch({ url: "/supplier/oauth/wxLogin", data });

// 注册
export const Register = (data: object = {}): object => fetch({ url: "/supplier/oauth/register", data });


// 获取我的信息
export const GetMyInfo = (data: object = {}): object => fetch({ url: "/sz/api/parents/parents/V2/getMyInfo", data });

// 获取成长报告
export const GetLearningGrowthReport = (data: object = {}): object => fetch({ url: "/sz/api/parents/parents/V2/learningGrowthReportV2", data });

// 获取提分训练（家长端）
export const GetTrainRecommendQuestionList = (data: object = {}): object => fetch({ url: "/sz/api/parents/parents/V2/trainRecommendQuestionListV3", data });
// 获取提分训练（教师端）
export const GetTrainRecommendQuestionListTeacher = (data: object = {}): object => fetch({ url: "/sz/api/teacher/organization/V2/trainRecommendQuestionListV2", data });

// 获取每周同步训练（家长端）
export const GetWeeklySynchronousTrainQuestionList = (data: object = {}): object => fetch({ url: "/sz/api/parents/parents/V2/weeklySynchronousTrainQuestionList", data });
// 获取每周同步训练（教师端）
export const GetWeeklySynchronousTrainQuestionListTeacher = (data: object = {}): object => fetch({ url: "/sz/api/teacher/library/V2/weeklySynchronousTrainQuestionList", data });

// 获取定制冲刺（家长端）
export const GetCustomizedSprintPaper = (data: object = {}): object => fetch({ url: "/sz/api/parents/parents/V2/getCustomizedSprintPaper", data });
// 获取定制冲刺（教师端）
export const GetCustomizedSprintPaperTeacher = (data: object = {}): object => fetch({ url: "/sz/api/teacher/library/V2/getCustomizedSprintPaper", data });

// 获取错题本
export const GetWrongBookQuestionList = (data: object = {}): object => fetch({ url: "/sz/api/parents/parents/V2/wrongBookQuestionListV6", data });

// 获取推荐的题
export const GetWrongAndRecommendQuestionList = (data: object = {}): object => fetch({ url: "/sz/api/parents/parents/V2/wrongAndRecommendQuestionListV3", data });

