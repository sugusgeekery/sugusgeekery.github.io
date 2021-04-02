export interface State {
  initInfo: any | InitInfo;
  biddingIndex: number;
  biddingList: Array<BiddingList>;
  biddingDetail: any | BiddingDetailTypes;
  materialAndColor: MaterialAndColorTypes;
  technology: TechnologyTypes;
  arrangementScheme: ArrangementSchemeTypes;
};

// 初始化参数
export interface InitInfo {};
// 竞价导航
export interface BiddingList {
  text: string;
  type: number;
  pageNum: number;
  pageSize: number;
  pageSizes: number[];
  total: number;
  minPrice?: string | number;
  maxPrice?: string | number;
  payDate?: string;
  provinceCityCountry?: string[];
  list: Array<BiddingObject | BiddingObjectMyself>;
}
export interface BiddingObject {
  biddingHeadId?: string;
  address: string;
  amount: number;
  id: string;
  isUserBid: number;
  joinSupplierCount: number;
  mouldNo: string;
  termTime: string;
  type: string;
  typeDesc: string;
  unit: string;
  unitDesc: string;
  workPeriod: number;
}
export interface BiddingObjectMyself {
  biddingHeadId?: string;
  amount: number;
  biddingStatus: string;
  biddingStatusDesc: string;
  biddingTime: string;
  id: string;
  mouldNo: string;
  type: string;
  typeDesc: string;
  unit: string;
  workPeriod: number;
}

export interface BiddingDetailTypes {}

const state: State = {
  initInfo: {},
  biddingIndex: 0,
  biddingList: [
    {
      text: "竞价单",
      type: 0,
      pageNum: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],
      total: 0,
      minPrice: "",
      maxPrice: "",
      payDate: "",
      provinceCityCountry: [],
      list: [
        // {
        //   "address": "",
        //   "amount": 0,
        //   "id": 0,
        //   "isUserBid": 0,
        //   "joinSupplierCount": 0,
        //   "mouldNo": "",
        //   "termTime": "",
        //   "type": "",
        //   "typeDesc": "",
        //   "unit": "",
        //   "unitDesc": "",
        //   "workPeriod": 0
        // },
      ]
    },
    {
      text: "竞价中",
      type: 1,
      pageNum: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],
      total: 0,
      minPrice: "",
      maxPrice: "",
      payDate: "",
      provinceCityCountry: [],
      list: [
        // {
        //   "address": "",
        //   "amount": 0,
        //   "id": 0,
        //   "isUserBid": 0,
        //   "joinSupplierCount": 0,
        //   "mouldNo": "",
        //   "termTime": "",
        //   "type": "",
        //   "typeDesc": "",
        //   "unit": "",
        //   "unitDesc": "",
        //   "workPeriod": 0
        // }
      ]
    },
    {
      text: "我的中标",
      type: 1,
      pageNum: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],
      total: 0,
      minPrice: "",
      maxPrice: "",
      payDate: "",
      provinceCityCountry: [],
      list: [
        // {
        //   "amount": 0,
        //   "biddingStatus": "",
        //   "biddingStatusDesc": "",
        //   "biddingTime": "",
        //   "id": 0,
        //   "mouldNo": "",
        //   "type": "",
        //   "typeDesc": "",
        //   "unit": "",
        //   "workPeriod": 0
        // }
      ]
    },
    {
      text: "竞价历史",
      type: 0,
      pageNum: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],
      total: 0,
      minPrice: "",
      maxPrice: "",
      payDate: "",
      provinceCityCountry: [],
      list: [
        // {
        //   "amount": 0,
        //   "biddingStatus": "",
        //   "biddingStatusDesc": "",
        //   "biddingTime": "",
        //   "id": 0,
        //   "mouldNo": "",
        //   "type": "",
        //   "typeDesc": "",
        //   "unit": "",
        //   "workPeriod": 0
        // }
      ]
    },
  ],
  biddingDetail: {
    isShow: false,
    isEdit: false,
    headId: 0,
    biddingIndex: 0,
    "biddingHeadInfo": {
      "accuracy": 0,
      "address": "",
      "amount": "",
      "anerror": 0,
      "termTime": "",
      "unit": "",
      "unitDesc": "",
      "workPeriod": ""
    },
    "biddingState": 0,
    "joinBiddingInfo": {
      "amount": 0,
      "supplierBiddingId": 0,
      "workPeriod": 0
    },
    "lifetime": "",
    productInfoIndex: -1,
    "productInfos": [
      {
        "id": 0,
        "productHeight": "",
        "productLength": "",
        "productNo": "",
        "productNum": 0,
        "productWeight": "",
        "productWidth": "",
        "surfaceTreatment": ""
      }
    ],
    "realMouldNo": "",
    "selectedUserBiddingInfo": {
      "amount": 0,
      "supplierBiddingId": 0,
      "workPeriod": 0
    },
    "status": "",
    "toleranceValue": "",
    "type": "",
    "typeDesc": ""
  },
  technology: {
    isShow: false,
    list: [
      // {
      //   "colorType": "",
      //   "colorValue": "",
      //   "componentNum": 0,
      //   "isCustomerSupport": 0,
      //   "subsidiaryFileUrl": "",
      //   "technologyName": "",
      //   "technologySpecName": "",
      //   "technologyValue": "",
      //   "type": 0
      // },
      // {
      //   "colorType": "",
      //   "colorValue": "",
      //   "componentNum": 0,
      //   "isCustomerSupport": 0,
      //   "subsidiaryFileUrl": "",
      //   "technologyName": "",
      //   "technologySpecName": "",
      //   "technologyValue": "",
      //   "type": 1
      // },
      // {
      //   "colorType": "",
      //   "colorValue": "",
      //   "componentNum": 0,
      //   "isCustomerSupport": 0,
      //   "subsidiaryFileUrl": "",
      //   "technologyName": "",
      //   "technologySpecName": "",
      //   "technologyValue": "",
      //   "type": 2
      // },
      // {
      //   "colorType": "",
      //   "colorValue": "",
      //   "componentNum": 0,
      //   "isCustomerSupport": 0,
      //   "subsidiaryFileUrl": "",
      //   "technologyName": "",
      //   "technologySpecName": "",
      //   "technologyValue": "",
      //   "type": 1
      // },
    ]
  },
  materialAndColor: {
    isShow: false,
    "additiveType": "",
    "additiveValue": "",
    "brandNumber": "",
    "colorType": 0,
    "colorValue": "",
    "materialName": "",
    "purpose": "",
    "specialType": ""
  },
  arrangementScheme: {
    isShow: false,
    mouldLabeImages: [],

    "isMatchedMould": 0,
    "matchedPlan": {
      "attachment": [
        {
          "fileName": "",
          "filePath": ""
        }
      ],
      "attachmentAddress": "",
      "cylinderNum": 0,
      "gateItems": [
        {
          "gateSort": 0,
          "productIds": ""
        }
      ],
      "gateType": "",
      "hotRunnerHeight": "",
      "hotRunnerNum": 0,
      "hotRunnerType": "",
      "id": 0,
      "isHardnessMould": 0,
      "isMouldTemperature": 0,
      "isSimpleMould": 0,
      "looseCoreNum": 0,
      "moldingCycle": 0,
      "mouldCoreCncHeight": "",
      "mouldCoreHeight": "",
      "mouldCoreLength": "",
      "mouldCoreWidth": "",
      "mouldDelivery": 0,
      "mouldLabeImage": "",
      "mouldType": "",
      "orderMouldId": 0,
      "predictGateWeight": "",
      "supplierName": ""
    },
    "moldingMaterialType": 0
  },
};

export default state;