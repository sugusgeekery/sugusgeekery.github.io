
export interface State {
  initOption: any | InitOption;
  mould: any | Array<Mould>;
};

export interface InitOption {};
export interface Mould {};

const state: State = {
  initOption: {},
  mould: {}
};

export default state;