
export interface State {
  initOption: any | InitOption;
  stepList: any | Array<StepList>;
};

export interface InitOption {};
export interface StepList {};

const state: State = {
  initOption: {},
  stepList: [
    {
      "filePath": "abc.jpg",
      "isFinished": 1,
      "isNext": 1,
      "stepId": 1,
      "stepName": "EDM加工"
    }
  ]
};

export default state;