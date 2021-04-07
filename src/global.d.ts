declare module "element-china-area-data";
declare module "vue-contextmenujs";

// 排模方案数据
interface ArrangementSchemeTypes {
  // 自定义
  isShow: boolean;
  mouldLabeImages: string[];
  // 接口文档
  isMatchedMould: number;
  matchedPlan: {
    attachment: Array<
      {
        fileName: string;
        filePath: string;
      }
    >,
    attachmentAddress: string;
    cylinderNum: number;
    gateItems: Array<
      {
        gateSort: number;
        productIds: string;
      }
    >,
    gateType: string;
    hotRunnerHeight: string;
    hotRunnerNum: number;
    hotRunnerType: string;
    id: number;
    isHardnessMould: number;
    isMouldTemperature: number;
    isSimpleMould: number;
    looseCoreNum: number;
    moldingCycle: number;
    mouldCoreCncHeight: string;
    mouldCoreHeight: string;
    mouldCoreLength: string;
    mouldCoreWidth: string;
    mouldDelivery: number;
    mouldLabeImage: string;
    mouldType: string;
    orderMouldId: number;
    predictGateWeight: string;
    supplierName: string;
  },
  moldingMaterialType: number;
}

// 模具材料和颜色
interface MaterialAndColorTypes {
  isShow: boolean;
  additiveType: string;
  additiveValue: string;
  brandNumber: string;
  colorType: number;
  colorValue: string;
  materialName: string;
  purpose: string;
  specialType: string;
}

// 模具二次工艺
interface TechnologyTypes {
  isShow: boolean;
  list: Array<{
    colorType: string;
    colorValue: string;
    componentNum: number;
    isCustomerSupport: number;
    subsidiaryFileUrl: string;
    technologyName:string;
    technologySpecName: string;
    technologyValue: string;
    type: number;
  }>;
}

// 倒计时
interface CountdownTypes {
  finishTime?: string;
  remainSeconds: number;
  startTime?: string;
  state?: number;
  isTimeout: boolean;
  hour: number;
  minute: number;
  second: number;
  setTimeInterval?: number;
}

// 产品详情
interface ProductInfoTypes {
  isShow: boolean;
  id: number;
  productImage: string;
  productHeight: string;
  productLength: string;
  productNo: string;
  productNum: number;
  productWeight: string;
  productWidth: string;
  surfaceTreatment: string;
  fileUrl: string;
}