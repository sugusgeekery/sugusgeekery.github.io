export interface State {
  biddingIndex: number;
  biddingList: Array<BiddingList>;
  biddingDetail: any | BiddingDetail;
  biddingTechnology: any | BiddingTechnology;
  biddingMaterial: any | BiddingMaterial;
};

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
  address: string;
  amount: number;
  id: number;
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
  amount: number;
  biddingStatus: string;
  biddingStatusDesc: string;
  biddingTime: string;
  id: number;
  mouldNo: string;
  type: string;
  typeDesc: string;
  unit: string;
  workPeriod: number;
}

export interface BiddingDetail {}
export interface BiddingTechnology {}
export interface BiddingMaterial {}

const state: State = {
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
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        },
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
        {
          "address": "",
          "amount": 0,
          "id": 0,
          "isUserBid": 0,
          "joinSupplierCount": 0,
          "mouldNo": "",
          "termTime": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "unitDesc": "",
          "workPeriod": 0
        }
      ]
    },
    {
      text: "我的中标",
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
        {
          "amount": 0,
          "biddingStatus": "",
          "biddingStatusDesc": "",
          "biddingTime": "",
          "id": 0,
          "mouldNo": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "workPeriod": 0
        }
      ]
    },
    {
      text: "竞价历史",
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
        {
          "amount": 0,
          "biddingStatus": "",
          "biddingStatusDesc": "",
          "biddingTime": "",
          "id": 0,
          "mouldNo": "",
          "type": "",
          "typeDesc": "",
          "unit": "",
          "workPeriod": 0
        }
      ]
    },
  ],
  biddingDetail: {
    isShow: false,
    headId: 0,
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
  biddingTechnology: {
    isShow: false,
    headId: 0,
    "colorType": "",
		"colorValue": "",
		"componentNum": 0,
		"isCustomerSupport": 0,
		"subsidiaryFileUrl": "",
		"technologyName": "",
		"technologySpecName": "",
		"technologyValue": "",
		"type": 0
  },
  biddingMaterial: {
    isShow: false,
    headId: 0,
    "additiveType": "",
    "additiveValue": "",
    "brandNumber": "",
    "colorType": 0,
    "colorValue": "",
    "materialName": "",
    "purpose": "",
    "specialType": ""
  }
};

export default state;