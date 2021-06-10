
export interface State {
  initInfo: any | InitInfo;
  machinStepList: any | Array<MachinStepList>;
  assembleStepList: any | Array<AssembleStepList>;
  injectionStepList: any | Array<InjectionStepList>;
};

export interface InitInfo {};
export interface MachinStepList {};
export interface AssembleStepList {};
export interface InjectionStepList {};

const state: State = {
  initInfo: {},
  machinStepList: [],
  assembleStepList: [],
  injectionStepList: [],
};

export default state;