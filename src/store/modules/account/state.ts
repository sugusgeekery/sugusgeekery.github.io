
export interface State {
  defInfo: any | DefInfo;
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

export interface DefInfo {}
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
export interface UserQualify {}
export interface CompanyQualify {}

const state: State = {
  defInfo: {
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
    email: "fww32@444.com",
    headImgUrl: "ff3.jpg",
    phoneNo: "13242558499",
    sex: 1,
    telephoneNo: "0755-669545",
    userName: "詹三"
  },
  companyInfo: {
    address: "前海壹号B栋",
    cityId: 6,
    cityName: "深圳市",
    companyName: "深圳怡宝科技公司",
    companyPhoneNo: "1336555666",
    description: "详细说明详细说明",
    districtId: 11,
    districtName: "南山区",
    officialWebsite: "www.baidu.com",
    provinceId: 4,
    provinceName: "广东",
    publishTime: "2021-01-10",
    staffSize: 50,
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
  userQualify: {},
  companyQualify: {}
};

export default state;