
export interface State {
  initInfo: any | InitInfo;
  design: any | Design;
  BOMTable: any | BOMTable;
  BOMImageInfo: any | BOMImageInfo;
  designVersion: DesignVersionTypes;
};

export interface InitInfo {};
export interface Design {};
export interface BOMTable {};
export interface BOMImageInfo {};

const state: State = {
  initInfo: {},
  design: {
    stepInfoList: [],
    fileList: [],
  },
  BOMTable: {
    isShow: false,
    pageNum: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100, 200],
    total: 0,
    pages: 0,
    list: [],
    isEdit: false,
  },
  BOMImageInfo: {
    isShow: false,
    pageNum: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100, 200],
    total: 0,
    pages: 0,
    bomDesignFiles: [],
    list: [],
    isEdit: false,
  },
  designVersion: {
    isShow: false,
    list: [
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdfsf",
      //       "cause": "sdf",
      //       "filePath": "sdf",
      //       "opinion": 1,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "fffff",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdf",
      //       "cause": "",
      //       "filePath": "sf",
      //       "opinion": 0,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "sfdsf",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdfsf",
      //       "cause": "sdf",
      //       "filePath": "sdf",
      //       "opinion": 1,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "fffff",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdf",
      //       "cause": "",
      //       "filePath": "sf",
      //       "opinion": 0,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "sfdsf",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdfsf",
      //       "cause": "sdf",
      //       "filePath": "sdf",
      //       "opinion": 1,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "fffff",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdf",
      //       "cause": "",
      //       "filePath": "sf",
      //       "opinion": 0,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "sfdsf",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdf",
      //       "cause": "",
      //       "filePath": "sf",
      //       "opinion": 0,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "sfdsf",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdfsf",
      //       "cause": "sdf",
      //       "filePath": "sdf",
      //       "opinion": 1,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "fffff",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdf",
      //       "cause": "",
      //       "filePath": "sf",
      //       "opinion": 0,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "sfdsf",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdf",
      //       "cause": "",
      //       "filePath": "sf",
      //       "opinion": 0,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "sfdsf",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdfsf",
      //       "cause": "sdf",
      //       "filePath": "sdf",
      //       "opinion": 1,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "fffff",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdf",
      //       "cause": "",
      //       "filePath": "sf",
      //       "opinion": 0,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "sfdsf",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdf",
      //       "cause": "",
      //       "filePath": "sf",
      //       "opinion": 0,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "sfdsf",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdfsf",
      //       "cause": "sdf",
      //       "filePath": "sdf",
      //       "opinion": 1,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "fffff",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdf",
      //       "cause": "",
      //       "filePath": "sf",
      //       "opinion": 0,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "sfdsf",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdf",
      //       "cause": "",
      //       "filePath": "sf",
      //       "opinion": 0,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "sfdsf",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdfsf",
      //       "cause": "sdf",
      //       "filePath": "sdf",
      //       "opinion": 1,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "fffff",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdf",
      //       "cause": "",
      //       "filePath": "sf",
      //       "opinion": 0,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "sfdsf",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdf",
      //       "cause": "",
      //       "filePath": "sf",
      //       "opinion": 0,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "sfdsf",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdfsf",
      //       "cause": "sdf",
      //       "filePath": "sdf",
      //       "opinion": 1,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "fffff",
      //   "version": 1
      // },
      // {
      //   "allApprovalInfoList": [
      //     {
      //       "approvalTime": "sdf",
      //       "cause": "",
      //       "filePath": "sf",
      //       "opinion": 0,
      //       "opinionDesc": "sdf",
      //       "type": 1,
      //       "version": 1
      //     }
      //   ],
      //   "filePath": "sfdsf",
      //   "version": 1
      // },
    ]
  },
};

export default state;