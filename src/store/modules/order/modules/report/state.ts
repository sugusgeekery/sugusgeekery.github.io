
export interface State {
  initOption: any | InitOption;
  timestamp: number;
  reportList: any | Array<ReportList>;
};

export interface InitOption {};
export interface ReportList {};

const state: State = {
  initOption: {},
  timestamp: 0,
  reportList: [
    {
      "customerApprovalInfo": {
        "approvalContent": "XXX有问题",
        "approvalStatus": 1,
        "approvalStatusDesc": "1"
      },
      "describe": "3结构分布: 模具排布3结构分布: 模具排布",
      "fileList": [],
      "injectionApprovalInfo": {
        "approvalContent": "XXX有问题",
        "approvalStatus": 1,
        "approvalStatusDesc": "1"
      },
      "machiningApprovalInfo": {
        "approvalContent": "XXX有问题",
        "approvalStatus": 1,
        "approvalStatusDesc": "1"
      },
      "reportTitle": "3结构分布: 模具排布",
      "reportTitleId": 3,
      "state": 3
    }
  ]
};

export default state;