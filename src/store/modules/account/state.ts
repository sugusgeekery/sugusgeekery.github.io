export interface State {
  defInfo: any | DefInfo;
  userInfo: UserInfo;
  companyInfo: CompanyInfo;
  userQualify: UserQualify;
  companyQualify: CompanyQualify;
};

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
    staffSize: 50
  },
  userQualify: {},
  companyQualify: {}
};

export default state;