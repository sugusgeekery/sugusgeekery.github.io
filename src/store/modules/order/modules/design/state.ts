
export interface State {
  initInfo: any | InitInfo;
  design: any | Design;
  BOMTable: any | BOMTable;
  BOMImageInfo: any | BOMImageInfo;
  BOMInfo: any | BOMInfo;
  designVersion: DesignVersionTypes;
  reasonContent: ReasonContentTypes;
  confirmModel: ConfirmModelTypes;
};

export interface InitInfo {};
export interface Design {};
export interface BOMTable {};
export interface BOMImageInfo {};
export interface BOMInfo {};

const state: State = {
  initInfo: {},
  design: {
    designList: [
      // {
      //   title: "导入3D图纸",
      //   ext: "(.stp)文件",

      //   approveStatus: 1,
      //   canUse: 0,
      //   fileId: 0,
      //   fileName: "",
      //   filePath: "",
      //   hotRunner: 1,
      //   isFinished: 0,
      //   mouldProduceId: 0,
      //   mpssId: 0,
      //   stepId: 1,
      //   stepName: "",
      //   update3D: 1,
      //   updateTime: "",

      //   fileList: [],
      //   uploadType: 1,
      //   versionInfoIndex: 2,
      //   versionInfoList: [
      //     {
      //       allApprovalInfoList: [
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "",
      //           opinion: null,
      //           editType: 0,
      //           opinionDesc: "",
      //           type: 1,
      //           version: 0
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "",
      //           opinion: null,
      //           editType: 0,
      //           opinionDesc: "",
      //           type: 2,
      //           version: 0
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "驳回原因",
      //           opinion: 0,
      //           editType: 0,
      //           opinionDesc: "",
      //           type: 1,
      //           version: 0
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "通过原因",
      //           opinion: 1,
      //           editType: 0,
      //           opinionDesc: "",
      //           type: 2,
      //           version: 0
      //         },
      //       ],
      //       fileName: "文件名1",
      //       filePath: "",
      //       updateTime: "20210215 20:56",
      //       version: 0,
      //       approveStatus: 1,
      //     },
      //     {
      //       allApprovalInfoList: [
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "",
      //           opinion: null,
      //           editType: 0,
      //           opinionDesc: "",
      //           type: 1,
      //           version: 0
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "",
      //           opinion: null,
      //           editType: 0,
      //           opinionDesc: "",
      //           type: 2,
      //           version: 0
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "驳回原因",
      //           opinion: 0,
      //           editType: 0,
      //           opinionDesc: "",
      //           type: 1,
      //           version: 0
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "通过原因",
      //           opinion: 1,
      //           editType: 0,
      //           opinionDesc: "",
      //           type: 2,
      //           version: 0
      //         },
      //       ],
      //       fileName: "文件名字2",
      //       filePath: "",
      //       updateTime: "23121548 56:12",
      //       version: 0,
      //       approveStatus: 1,
      //     },
      //     {
      //       allApprovalInfoList: [
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "",
      //           opinion: null,
      //           editType: 1,
      //           opinionDesc: "",
      //           type: 1,
      //           version: 0,
      //           reasonFiles: [],
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "",
      //           opinion: null,
      //           editType: 1,
      //           opinionDesc: "",
      //           type: 2,
      //           version: 0,
      //           reasonFiles: [],
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "驳回原因",
      //           opinion: 0,
      //           editType: 0,
      //           opinionDesc: "",
      //           type: 1,
      //           version: 0,
      //           reasonFiles: [],
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "通过原因",
      //           opinion: 1,
      //           editType: 0,
      //           opinionDesc: "",
      //           type: 2,
      //           version: 0,
      //           reasonFiles: [],
      //         },
      //       ],
      //       fileName: "文件明见3",
      //       filePath: "",
      //       updateTime: "26548856 55:11",
      //       version: 0,
      //       approveStatus: 1,
      //     }
      //   ],

      //   hotRunnerFileList: [],
      //   uploadHotrunnerType: 1,
      //   hotRunnerInfoIndex: 0,
      //   hotRunnerInfoList: [
      //     {
      //       allApprovalInfoList: [
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "",
      //           opinion: 0,
      //           opinionDesc: "",
      //           type: 0,
      //           version: 0,
      //           reasonFiles: [],
      //         }
      //       ],
      //       approvalFileId: "",
      //       cause: "",
      //       fileId: 0,
      //       fileName: "",
      //       filePath: "",
      //       opinion: 0,
      //       updateTime: "",
      //       version: 0,
      //       approveStatus: 1,
      //     }
      //   ],

      //   hotRunner3dFileList: [],
      //   uploadHotrunner3dType: 1,
      //   hotRunnerVersionInfoIndex: 0,
      //   hotRunnerVersionInfoList: [
      //     {
      //       allApprovalInfoList: [
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "",
      //           opinion: 0,
      //           opinionDesc: "",
      //           type: 0,
      //           version: 0,
      //           reasonFiles: [],
      //         }
      //       ],
      //       approvalFileId: "",
      //       cause: "",
      //       fileId: 0,
      //       fileName: "",
      //       filePath: "",
      //       opinion: 0,
      //       updateTime: "",
      //       version: 0,
      //       approveStatus: 1,
      //     }
      //   ],
      // },
      // {
      //   title: "导入BOM表",
      //   ext: "(.xls)文件",

      //   approveStatus: 0,
      //   canUse: 0,
      //   fileId: 0,
      //   fileName: "",
      //   filePath: "",
      //   hotRunner: 0,
      //   isFinished: 0,
      //   mouldProduceId: 0,
      //   mpssId: 0,
      //   stepId: 2,
      //   stepName: "",
      //   update3D: 0,
      //   updateTime: "",

      //   fileObject: {
      //     fileId: "",
      //     fileName: "",
      //     filePath: ""
      //   },
      //   uploadType: 1,
      //   versionInfoIndex: 2,
      //   versionInfoList: [
      //     {
      //       allApprovalInfoList: [
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "",
      //           opinion: null,
      //           opinionDesc: "",
      //           type: 1,
      //           version: 0
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "",
      //           opinion: null,
      //           opinionDesc: "",
      //           type: 2,
      //           version: 0
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "驳回原因",
      //           opinion: 0,
      //           opinionDesc: "",
      //           type: 1,
      //           version: 0
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "通过原因",
      //           opinion: 1,
      //           opinionDesc: "",
      //           type: 2,
      //           version: 0
      //         },
      //       ],
      //       fileName: "文件名1",
      //       filePath: "",
      //       updateTime: "20210215 20:56",
      //       version: 0
      //     },
      //     {
      //       allApprovalInfoList: [
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "",
      //           opinion: null,
      //           opinionDesc: "",
      //           type: 1,
      //           version: 0
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "",
      //           opinion: null,
      //           opinionDesc: "",
      //           type: 2,
      //           version: 0
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "驳回原因",
      //           opinion: 0,
      //           opinionDesc: "",
      //           type: 1,
      //           version: 0
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "通过原因",
      //           opinion: 1,
      //           opinionDesc: "",
      //           type: 2,
      //           version: 0
      //         },
      //       ],
      //       fileName: "文件名字2",
      //       filePath: "",
      //       updateTime: "23121548 56:12",
      //       version: 0
      //     },
      //     {
      //       allApprovalInfoList: [
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "",
      //           opinion: null,
      //           opinionDesc: "",
      //           type: 1,
      //           version: 0
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "",
      //           opinion: null,
      //           opinionDesc: "",
      //           type: 2,
      //           version: 0
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "驳回原因",
      //           opinion: 0,
      //           opinionDesc: "",
      //           type: 1,
      //           version: 0
      //         },
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "通过原因",
      //           opinion: 1,
      //           opinionDesc: "",
      //           type: 2,
      //           version: 0
      //         },
      //       ],
      //       fileName: "文件明见3",
      //       filePath: "",
      //       updateTime: "26548856 55:11",
      //       version: 0
      //     }
      //   ],

      //   uploadHotrunnerType: 1,
      //   hotRunnerInfoIndex: 0,
      //   hotRunnerInfoList: [
      //     {
      //       approvalFileId: "",
      //       cause: "",
      //       fileId: 0,
      //       fileName: "",
      //       filePath: "",
      //       opinion: 0,
      //       updateTime: "",
      //       version: 0
      //     }
      //   ],

      //   uploadHotrunner3dType: 1,
      //   hotRunnerVersionInfoIndex: 0,
      //   hotRunnerVersionInfoList: [
      //     {
      //       allApprovalInfoList: [
      //         {
      //           approvalIds: "",
      //           approvalTime: "",
      //           cause: "",
      //           opinion: 0,
      //           opinionDesc: "",
      //           type: 0,
      //           version: 0
      //         }
      //       ],
      //       fileName: "",
      //       filePath: "",
      //       updateTime: "",
      //       version: 0
      //     }
      //   ],
      // }
    ],
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
  BOMInfo: {
    isShow: false,
    editType: 0,
    
    bomDesignFiles: [],
    reasonIndex: 0,
    reasonList: [
      // {
      //   text: "加工方",
      //   content: " ",
      //   fileList: [
      //     {
      //       filePath: ""
      //     },
      //     {
      //       filePath: ""
      //     },
      //   ]
      // },
      // {
      //   text: "注塑方",
      //   content: "",
      //   fileList: []
      // },
    ],
    navIndex: 0,
    navList: [
      {
        text: "模胚",
        bomType: 1,
        bomName: "模胚-BOM模板.xls",
        bomPath: "/bom/模胚-BOM模板.xls",
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100, 200],
        total: 0,
        pages: 0,
        list: [
          // {
          //   "approvalInjectionId": 0,
          //   "approvalMachiningId": 0,
          //   "heatTreatment": "",
          //   "id": 0,
          //   "injectionCause": "",
          //   "injectionPicture": "",
          //   "injectionState": 0,
          //   "machiningCause": "",
          //   "machiningPicture": "",
          //   "machiningState": 0,
          //   "material": "",
          //   "num": 0,
          //   "orderingStandard": "",
          //   "partCode": "",
          //   "partName": "",
          //   "referenceStandard": "",
          //   "remark": "",
          //   "serialNo": 0,
          //   "threeFaceFileId": 0,
          //   "threeFaceFileName": "",
          //   "threeFaceFileUrl": "",
          //   "twoFaceFileId": 0,
          //   "twoFaceFileName": "",
          //   "twoFaceFileUrl": "",
          //   "type": "",
          //   "weight": ""
          // },
          // {
          //   "approvalInjectionId": 0,
          //   "approvalMachiningId": 0,
          //   "heatTreatment": "",
          //   "id": 0,
          //   "injectionCause": "",
          //   "injectionPicture": "",
          //   "injectionState": 0,
          //   "machiningCause": "",
          //   "machiningPicture": "",
          //   "machiningState": 0,
          //   "material": "",
          //   "num": 0,
          //   "orderingStandard": "",
          //   "partCode": "",
          //   "partName": "",
          //   "referenceStandard": "",
          //   "remark": "",
          //   "serialNo": 0,
          //   "threeFaceFileId": 0,
          //   "threeFaceFileName": "",
          //   "threeFaceFileUrl": "",
          //   "twoFaceFileId": 0,
          //   "twoFaceFileName": "",
          //   "twoFaceFileUrl": "",
          //   "type": "",
          //   "weight": ""
          // },
          // {
          //   "approvalInjectionId": 0,
          //   "approvalMachiningId": 0,
          //   "heatTreatment": "",
          //   "id": 0,
          //   "injectionCause": "",
          //   "injectionPicture": "",
          //   "injectionState": 0,
          //   "machiningCause": "",
          //   "machiningPicture": "",
          //   "machiningState": 0,
          //   "material": "",
          //   "num": 0,
          //   "orderingStandard": "",
          //   "partCode": "",
          //   "partName": "",
          //   "referenceStandard": "",
          //   "remark": "",
          //   "serialNo": 0,
          //   "threeFaceFileId": 0,
          //   "threeFaceFileName": "",
          //   "threeFaceFileUrl": "",
          //   "twoFaceFileId": 0,
          //   "twoFaceFileName": "",
          //   "twoFaceFileUrl": "",
          //   "type": "",
          //   "weight": ""
          // },
          // {
          //   "approvalInjectionId": 0,
          //   "approvalMachiningId": 0,
          //   "heatTreatment": "",
          //   "id": 0,
          //   "injectionCause": "",
          //   "injectionPicture": "",
          //   "injectionState": 0,
          //   "machiningCause": "",
          //   "machiningPicture": "",
          //   "machiningState": 0,
          //   "material": "",
          //   "num": 0,
          //   "orderingStandard": "",
          //   "partCode": "",
          //   "partName": "",
          //   "referenceStandard": "",
          //   "remark": "",
          //   "serialNo": 0,
          //   "threeFaceFileId": 0,
          //   "threeFaceFileName": "",
          //   "threeFaceFileUrl": "",
          //   "twoFaceFileId": 0,
          //   "twoFaceFileName": "",
          //   "twoFaceFileUrl": "",
          //   "type": "",
          //   "weight": ""
          // },
          // {
          //   "approvalInjectionId": 0,
          //   "approvalMachiningId": 0,
          //   "heatTreatment": "",
          //   "id": 0,
          //   "injectionCause": "",
          //   "injectionPicture": "",
          //   "injectionState": 0,
          //   "machiningCause": "",
          //   "machiningPicture": "",
          //   "machiningState": 0,
          //   "material": "",
          //   "num": 0,
          //   "orderingStandard": "",
          //   "partCode": "",
          //   "partName": "",
          //   "referenceStandard": "",
          //   "remark": "",
          //   "serialNo": 0,
          //   "threeFaceFileId": 0,
          //   "threeFaceFileName": "",
          //   "threeFaceFileUrl": "",
          //   "twoFaceFileId": 0,
          //   "twoFaceFileName": "",
          //   "twoFaceFileUrl": "",
          //   "type": "",
          //   "weight": ""
          // },
          // {
          //   "approvalInjectionId": 0,
          //   "approvalMachiningId": 0,
          //   "heatTreatment": "",
          //   "id": 0,
          //   "injectionCause": "",
          //   "injectionPicture": "",
          //   "injectionState": 0,
          //   "machiningCause": "",
          //   "machiningPicture": "",
          //   "machiningState": 0,
          //   "material": "",
          //   "num": 0,
          //   "orderingStandard": "",
          //   "partCode": "",
          //   "partName": "",
          //   "referenceStandard": "",
          //   "remark": "",
          //   "serialNo": 0,
          //   "threeFaceFileId": 0,
          //   "threeFaceFileName": "",
          //   "threeFaceFileUrl": "",
          //   "twoFaceFileId": 0,
          //   "twoFaceFileName": "",
          //   "twoFaceFileUrl": "",
          //   "type": "",
          //   "weight": ""
          // },
          // {
          //   "approvalInjectionId": 0,
          //   "approvalMachiningId": 0,
          //   "heatTreatment": "",
          //   "id": 0,
          //   "injectionCause": "",
          //   "injectionPicture": "",
          //   "injectionState": 0,
          //   "machiningCause": "",
          //   "machiningPicture": "",
          //   "machiningState": 0,
          //   "material": "",
          //   "num": 0,
          //   "orderingStandard": "",
          //   "partCode": "",
          //   "partName": "",
          //   "referenceStandard": "",
          //   "remark": "",
          //   "serialNo": 0,
          //   "threeFaceFileId": 0,
          //   "threeFaceFileName": "",
          //   "threeFaceFileUrl": "",
          //   "twoFaceFileId": 0,
          //   "twoFaceFileName": "",
          //   "twoFaceFileUrl": "",
          //   "type": "",
          //   "weight": ""
          // },
          // {
          //   "approvalInjectionId": 0,
          //   "approvalMachiningId": 0,
          //   "heatTreatment": "",
          //   "id": 0,
          //   "injectionCause": "",
          //   "injectionPicture": "",
          //   "injectionState": 0,
          //   "machiningCause": "",
          //   "machiningPicture": "",
          //   "machiningState": 0,
          //   "material": "",
          //   "num": 0,
          //   "orderingStandard": "",
          //   "partCode": "",
          //   "partName": "",
          //   "referenceStandard": "",
          //   "remark": "",
          //   "serialNo": 0,
          //   "threeFaceFileId": 0,
          //   "threeFaceFileName": "",
          //   "threeFaceFileUrl": "",
          //   "twoFaceFileId": 0,
          //   "twoFaceFileName": "",
          //   "twoFaceFileUrl": "",
          //   "type": "",
          //   "weight": ""
          // },
          // {
          //   "approvalInjectionId": 0,
          //   "approvalMachiningId": 0,
          //   "heatTreatment": "",
          //   "id": 0,
          //   "injectionCause": "",
          //   "injectionPicture": "",
          //   "injectionState": 0,
          //   "machiningCause": "",
          //   "machiningPicture": "",
          //   "machiningState": 0,
          //   "material": "",
          //   "num": 0,
          //   "orderingStandard": "",
          //   "partCode": "",
          //   "partName": "",
          //   "referenceStandard": "",
          //   "remark": "",
          //   "serialNo": 0,
          //   "threeFaceFileId": 0,
          //   "threeFaceFileName": "",
          //   "threeFaceFileUrl": "",
          //   "twoFaceFileId": 0,
          //   "twoFaceFileName": "",
          //   "twoFaceFileUrl": "",
          //   "type": "",
          //   "weight": ""
          // },
          // {
          //   "approvalInjectionId": 0,
          //   "approvalMachiningId": 0,
          //   "heatTreatment": "",
          //   "id": 0,
          //   "injectionCause": "",
          //   "injectionPicture": "",
          //   "injectionState": 0,
          //   "machiningCause": "",
          //   "machiningPicture": "",
          //   "machiningState": 0,
          //   "material": "",
          //   "num": 0,
          //   "orderingStandard": "",
          //   "partCode": "",
          //   "partName": "",
          //   "referenceStandard": "",
          //   "remark": "",
          //   "serialNo": 0,
          //   "threeFaceFileId": 0,
          //   "threeFaceFileName": "",
          //   "threeFaceFileUrl": "",
          //   "twoFaceFileId": 0,
          //   "twoFaceFileName": "",
          //   "twoFaceFileUrl": "",
          //   "type": "",
          //   "weight": ""
          // },
          // {
          //   "approvalInjectionId": 0,
          //   "approvalMachiningId": 0,
          //   "heatTreatment": "",
          //   "id": 0,
          //   "injectionCause": "",
          //   "injectionPicture": "",
          //   "injectionState": 0,
          //   "machiningCause": "",
          //   "machiningPicture": "",
          //   "machiningState": 0,
          //   "material": "",
          //   "num": 0,
          //   "orderingStandard": "",
          //   "partCode": "",
          //   "partName": "",
          //   "referenceStandard": "",
          //   "remark": "",
          //   "serialNo": 0,
          //   "threeFaceFileId": 0,
          //   "threeFaceFileName": "",
          //   "threeFaceFileUrl": "",
          //   "twoFaceFileId": 0,
          //   "twoFaceFileName": "",
          //   "twoFaceFileUrl": "",
          //   "type": "",
          //   "weight": ""
          // },
          // {
          //   "approvalInjectionId": 0,
          //   "approvalMachiningId": 0,
          //   "heatTreatment": "",
          //   "id": 0,
          //   "injectionCause": "",
          //   "injectionPicture": "",
          //   "injectionState": 0,
          //   "machiningCause": "",
          //   "machiningPicture": "",
          //   "machiningState": 0,
          //   "material": "",
          //   "num": 0,
          //   "orderingStandard": "",
          //   "partCode": "",
          //   "partName": "",
          //   "referenceStandard": "",
          //   "remark": "",
          //   "serialNo": 0,
          //   "threeFaceFileId": 0,
          //   "threeFaceFileName": "",
          //   "threeFaceFileUrl": "",
          //   "twoFaceFileId": 0,
          //   "twoFaceFileName": "",
          //   "twoFaceFileUrl": "",
          //   "type": "",
          //   "weight": ""
          // },
          // {
          //   "approvalInjectionId": 0,
          //   "approvalMachiningId": 0,
          //   "heatTreatment": "",
          //   "id": 0,
          //   "injectionCause": "",
          //   "injectionPicture": "",
          //   "injectionState": 0,
          //   "machiningCause": "",
          //   "machiningPicture": "",
          //   "machiningState": 0,
          //   "material": "",
          //   "num": 0,
          //   "orderingStandard": "",
          //   "partCode": "",
          //   "partName": "",
          //   "referenceStandard": "",
          //   "remark": "",
          //   "serialNo": 0,
          //   "threeFaceFileId": 0,
          //   "threeFaceFileName": "",
          //   "threeFaceFileUrl": "",
          //   "twoFaceFileId": 0,
          //   "twoFaceFileName": "",
          //   "twoFaceFileUrl": "",
          //   "type": "",
          //   "weight": ""
          // },
          // {
          //   "approvalInjectionId": 0,
          //   "approvalMachiningId": 0,
          //   "heatTreatment": "",
          //   "id": 0,
          //   "injectionCause": "",
          //   "injectionPicture": "",
          //   "injectionState": 0,
          //   "machiningCause": "",
          //   "machiningPicture": "",
          //   "machiningState": 0,
          //   "material": "",
          //   "num": 0,
          //   "orderingStandard": "",
          //   "partCode": "",
          //   "partName": "",
          //   "referenceStandard": "",
          //   "remark": "",
          //   "serialNo": 0,
          //   "threeFaceFileId": 0,
          //   "threeFaceFileName": "",
          //   "threeFaceFileUrl": "",
          //   "twoFaceFileId": 0,
          //   "twoFaceFileName": "",
          //   "twoFaceFileUrl": "",
          //   "type": "",
          //   "weight": ""
          // },
        ],
      },
      {
        text: "模仁",
        bomType: 2,
        bomName: "模仁-BOM模板.xls",
        bomPath: "/bom/模仁-BOM模板.xls",
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100, 200],
        total: 0,
        pages: 0,
        list: [],
      },
      {
        text: "标准件",
        bomType: 3,
        bomName: "标准件-BOM模板.xls",
        bomPath: "/bom/标准件-BOM模板.xls",
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100, 200],
        total: 0,
        pages: 0,
        list: [],
      },
      {
        text: "散件",
        bomType: 4,
        bomName: "散件-BOM模板.xls",
        bomPath: "/bom/散件-BOM模板.xls",
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100, 200],
        total: 0,
        pages: 0,
        list: [],
      },
    ],
  },
  reasonContent: {
    isShow: false,
    title: "",
    content: "",
    fileList: []
  },
  confirmModel: {
    isShow: false,
    confirm: -1,
    title: "",
    content: "",
    fileList: [],
    isShowUpdate3D: false,
    isUpdate3D: false,
    approvalType: 0, 
    opinion: -1, 
    role: 0,
    mouldBomListIds: []
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