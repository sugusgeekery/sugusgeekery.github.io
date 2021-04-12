
export interface State {
  initInfo: any | InitInfo;
  prototype: any | Prototype;
};

export interface InitInfo {};
export interface Prototype {};

const state: State = {
  initInfo: {},
  prototype: {}
};

export default state;