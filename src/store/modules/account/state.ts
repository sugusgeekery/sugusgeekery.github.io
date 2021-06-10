
export interface State {
  initInfo: any | InitInfo;
  provinceCityDistrict: Array<ProvinceCityDistrict>;
  userInfo: UserInfo;
  companyInfo: CompanyInfo;
  userQualify: UserQualify;
  companyQualify: CompanyQualify;
};

// 省份
export interface ProvinceCityDistrict {
  label: string;
  value: string;
  children?: Array<ProvinceCityDistrict>;
}

export interface InitInfo {}
export interface UserInfo {
  email: string;
	headImgUrl: string;
	phoneNo: string;
	sex: number;
  sexList?: string[];
	telephoneNo: string;
	userName: string;
}
export interface CompanyInfo {
  address: string;
  cityId: number;
  cityName: string;
  companyName: string;
  companyPhoneNo: string;
  description: string;
  districtId: number;
  districtName:string;
  officialWebsite: string;
  provinceId: number;
  provinceName: string;
  publishTime: string;
  staffSize: number;
  staffsizeList: Array<StaffsizeList>;
}
export interface StaffsizeList {
  value: number;
  label: string;
}
export interface UserQualify {
  idcardBackImgId: number;
  idcardBackImgUrl: string;
  idcardFrontImgId: number;
  idcardFrontImgUrl: string;
  labelList: Array<LabelList>;
  state: number;
  stateDesc: string;
}
export interface CompanyQualify {
  businessLicenseImgId: number;
  businessLicenseImgUrl: string;
  creditCode: string;
  label?: string;
  labelList?: Array<LabelList>;
  operIdcardBackendId: number;
  operIdcardBackendUrl: string;
  operIdcardFrontId: number;
  operIdcardFrontUrl: string;
  operIdcardNo: string;
  operName: string;
  operPhoneNo: string;
  state: number;
  stateDesc: string;
}
export interface LabelList {
  id: string;
  code: string;
  isSelected: number;
  name: string;
}

const state: State = {
  initInfo: {
    loginInfo: {},
    accountInfo: {},
    type: 0,
    typeStr: "",
    typeList: [
      {
        text: "公司",
        type: 1,
        isSelected: false,
      },
      {
        text: "个人",
        type: 2,
        isSelected: false,
      },
    ]
  },
  provinceCityDistrict: [],
  userInfo: {
    sexList: ["无","男", "女"],
    sex: 0,
    email: "",
    headImgUrl: "",
    phoneNo: "",
    telephoneNo: "",
    userName: ""
  },
  companyInfo: {
    address: "",
    cityId: 0,
    cityName: "",
    companyName: "",
    companyPhoneNo: "",
    description: "",
    districtId: 0,
    districtName: "",
    officialWebsite: "",
    provinceId: 0,
    provinceName: "",
    publishTime: "",
    staffSize: 0,
    staffsizeList: [
      {
        value: 1,
        label: "1-50人",
      },
      {
        value: 2,
        label: "51-100人",
      },
      {
        value: 3,
        label: "101-200人",
      },
      {
        value: 4,
        label: "201-500人",
      },
      {
        value: 5,
        label: "501-1000人",
      },
      {
        value: 6,
        label: "1001及以上",
      },
    ]
  },
  userQualify: {
    idcardBackImgId: 0,
    idcardBackImgUrl: "",
    idcardFrontImgId: 0,
    idcardFrontImgUrl: "",
    labelList: [],
    state: 0,
    stateDesc: ""
  },
  companyQualify: {
    businessLicenseImgId: 0,
    businessLicenseImgUrl: "",
    creditCode: "",
    labelList: [],
    operIdcardBackendId: 0,
    operIdcardBackendUrl: "",
    operIdcardFrontId: 0,
    operIdcardFrontUrl: "",
    operIdcardNo: "",
    operName: "",
    operPhoneNo: "",
    state: 0,
    stateDesc: ""
  }
};

export default state;