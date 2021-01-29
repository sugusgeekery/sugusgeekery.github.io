
export interface State {
  initOption: any | InitOption;
  design: Design;
  BOMTable: any;
  BOMImageInfo: any;
};

export interface InitOption {};
export interface Design {};

const state: State = {
  initOption: {},
  design: {},
  BOMTable: {
    showType: 0,
    isShow: false,
    list: []
  },
  BOMImageInfo: {
    showType: 0,
    isShow: false,
    list: []
  },
};

export default state;