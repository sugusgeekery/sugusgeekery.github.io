
export interface State {
  initOption: any | InitOption;
  design: any | Design;
  BOMTable: any | BOMTable;
  BOMImageInfo: any | BOMImageInfo;
};

export interface InitOption {};
export interface Design {};
export interface BOMTable {};
export interface BOMImageInfo {};

const state: State = {
  initOption: {},
  design: {},
  BOMTable: {
    isShow: false,
    pageNum: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100, 200],
    total: 0,
    pages: 0,
    list: []
  },
  BOMImageInfo: {
    isShow: false,
    pageNum: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100, 200],
    total: 0,
    pages: 0,
    bomDesignFiles: [],
    list: []
  },
};

export default state;