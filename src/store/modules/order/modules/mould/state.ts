
export interface State {
  initInfo: any | InitInfo;
  mould: any | Mould;
  repairMouldIndex: number;
  repairMouldList: any | Array<RepairMould>;
};

export interface InitInfo {};
export interface Mould {};
export interface RepairMould {};

const state: State = {
  initInfo: {},
  mould: {},
  repairMouldIndex: -1,
  repairMouldList: [],
};

export default state;