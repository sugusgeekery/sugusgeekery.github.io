
export interface State {
  initOption: any | InitOption;
  mould: any | Mould;
  repairMouldIndex: number;
  repairMouldList: any | Array<RepairMould>;
};

export interface InitOption {};
export interface Mould {};
export interface RepairMould {};

const state: State = {
  initOption: {},
  mould: {},
  repairMouldIndex: -1,
  repairMouldList: [],
};

export default state;