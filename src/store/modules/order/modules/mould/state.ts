
export interface State {
  initInfo: any | InitInfo;
  mould: any | Mould;
  repairMouldIndex: number;
  repairMouldList: any | Array<RepairMould>;
  arrangementScheme: any | ArrangementSchemeTypes;
};

export interface InitInfo {};
export interface Mould {};
export interface RepairMould {};
// export interface ClampingPlan {};

const state: State = {
  initInfo: {},
  mould: {},
  repairMouldIndex: -1,
  repairMouldList: [],
  arrangementScheme: {
    isShow: false,
    mouldLabeImages: [],

    "isMatchedMould": 0,
    "matchedPlan": {
      "attachment": [
        // {
        //   "fileName": "",
        //   "filePath": ""
        // }
      ],
      "attachmentAddress": "",
      "cylinderNum": 0,
      "gateItems": [
        // {
        //   "gateSort": 0,
        //   "productIds": ""
        // }
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