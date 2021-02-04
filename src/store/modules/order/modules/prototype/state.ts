
export interface State {
  initOption: any | InitOption;
  prototype: any | Prototype;
};

export interface InitOption {};
export interface Prototype {};

const state: State = {
  initOption: {},
  prototype: {}
};

export default state;