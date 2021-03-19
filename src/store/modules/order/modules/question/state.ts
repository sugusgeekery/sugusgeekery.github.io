
export interface State {
  initInfo: any | InitInfo;
  questionList: any | Array<QuestionList>;
};

export interface InitInfo {};
export interface QuestionList {};

const state: State = {
  initInfo: {},
  questionList: [
    // {
    //   "filePath": "abc.jpg",
    //   "isFinished": 1,
    //   "isNext": 1,
    //   "stepId": 1,
    //   "stepName": "EDM加工"
    // }
  ]
};

export default state;