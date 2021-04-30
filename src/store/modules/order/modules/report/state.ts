
export interface State {
  initInfo: any | InitInfo;
  timestamp: number;
  reportList: any | Array<ReportList>;
  reasonContent: ReasonContentTypes;
};

export interface InitInfo {};
export interface ReportList {};

const state: State = {
  initInfo: {},
  timestamp: 0,
  reportList: [
    // {
    //   "customerApprovalInfo": {
    //     "approvalContent": "XXX有问题",
    //     "approvalStatus": 1,
    //     "approvalStatusDesc": "1"
    //   },
    //   "describe": "3结构分布: 模具排布3结构分布: 模具排布",
    //   "fileList": [],
    //   "injectionApprovalInfo": {
    //     "approvalContent": "XXX有问题",
    //     "approvalStatus": 1,
    //     "approvalStatusDesc": "1"
    //   },
    //   "machiningApprovalInfo": {
    //     "approvalContent": "XXX有问题",
    //     "approvalStatus": 1,
    //     "approvalStatusDesc": "1"
    //   },
    //   "reportTitle": "3结构分布: 模具排布",
    //   "reportTitleId": 3,
    //   "state": 3
    // }
  ],
  reasonContent: {
    isShow: false,
    title: "驳回原因",
    content: "",
    fileList: []
  }
};

export default state;