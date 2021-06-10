declare module "element-china-area-data";
declare module "vue-contextmenujs";
declare module "vue-drag-resize";
declare module "vue-photo-preview";
declare module "animate.css";

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
// 联系方式
interface ContactTypes {
  phoneNo: string;
  type: string;
  userName: string;
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


// 方案设计版本
interface DesignVersionTypes {
  isShow: boolean;
  list: Array<{
    allApprovalInfoList: Array<
      {
        approvalTime: string;
        cause: string;
        filePath: string;
        opinion: number;
        opinionDesc: string;
        type: number;
        version: number;
      }
    >;
    filePath: string;
    version: number;
  }>;
}


// DFM报告查看驳回原因
interface ReasonContentTypes {
  isShow: boolean;
  title?: string;
  content: string;
  fileList: Array<{
    fileId: string;
    fileName: string;
    filePath: string;
  }>;
}

// 输入弹框原因
interface ConfirmModelTypes {
  isShow: boolean;
  confirm: number;
  title?: string;
  content: string;
  fileList: Array<{
    fileId: string;
    fileName: string;
    filePath: string;
  }>;
  isShowUpdate3D: boolean;
  isUpdate3D?: boolean;
  approvalType: number;
  opinion: number;
  role: number;
  mouldBomListIds: string[];
}


// 导航步骤
interface HpStepTypes {
  text: string;
  path: string;
  sequenceNumber: number | string;
  status: number;
}