
export interface State {
  initOption: any | InitOption;
  questionList: any | Array<QuestionList>;
};

export interface InitOption {};
export interface QuestionList {};

const state: State = {
  initOption: {},
  questionList: [
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