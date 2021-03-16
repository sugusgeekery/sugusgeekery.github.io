
export interface State {
  initOption: any | InitOption;
  machinStepList: any | Array<MachinStepList>;
  assembleStepList: any | Array<AssembleStepList>;
  injectionStepList: any | Array<InjectionStepList>;
};

export interface InitOption {};
export interface MachinStepList {};
export interface AssembleStepList {};
export interface InjectionStepList {};

const state: State = {
  initOption: {},
  machinStepList: [],
  assembleStepList: [],
  injectionStepList: [],
};

export default state;