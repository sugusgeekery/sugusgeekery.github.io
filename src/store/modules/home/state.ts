export interface State {
  initInfo: any | InitInfo;
  orderMessageList: Array<OrderMessage>;
  job: Job;
  userMessageList: Array<UserMessage>;
};

// 初始化参数
export interface InitInfo {};
// 订单消息
export interface OrderMessage {
  text: string;
  count: number;
}
// 待办任务
export interface Job {
  pageNum: number;
  pageSize: number;
  pageSizes: number[];
  total: number;
  list: Array<JobList>;
}
// 待办任务列表
export interface JobList {
  taskName: string;
  id: number;
  orderNo: string;
  time: string;
  title: string;
  url: string;
}
// 个人消息
export interface UserMessage {

}

const state: State = {
  initInfo: {},
  orderMessageList: [
    {
      text: "新竞价单",
      count: 0,
    },
    {
      text: "未完成订单",
      count: 0,
    },
    {
      text: "待处理订单",
      count: 0,
    },
    {
      text: "新消息",
      count: 0,
    },
  ],
  job: {
    pageNum: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100],
    total: 0,
    list: [],
  },
  // jobList: [
    // {
    //   "id": 12,
    //   "orderNo": "7687634534543435",
    //   "time": "2021-02-11",
    //   "title": "需要确认图纸",
    //   "url": "www.baidu.com"
    // },
    // {
    //   "id": 12,
    //   "orderNo": "7687634534543435",
    //   "time": "2021-02-11",
    //   "title": "需要确认图纸",
    //   "url": "www.baidu.com"
    // },
    // {
    //   "id": 12,
    //   "orderNo": "7687634534543435",
    //   "time": "2021-02-11",
    //   "title": "需要确认图纸",
    //   "url": "www.baidu.com"
    // },
  // ],
  userMessageList: [
    // {
    //   "id": 12,
    //   "orderNo": "7687634534543435",
    //   "time": "2021-02-11",
    //   "img": "",
    //   name: "enen",
    //   "msg": "www.baidu.com"
    // },
    // {
    //   "id": 12,
    //   "orderNo": "7687634534543435",
    //   "time": "2021-02-11",
    //   "img": "",
    //   name: "enen",
    //   "msg": "www.baidu.com"
    // },
    // {
    //   "id": 12,
    //   "orderNo": "7687634534543435",
    //   "time": "2021-02-11",
    //   "img": "",
    //   name: "enen",
    //   "msg": "www.baidu.com"
    // },
    // {
    //   "id": 12,
    //   "orderNo": "7687634534543435",
    //   "time": "2021-02-11",
    //   "img": "",
    //   name: "enen",
    //   "msg": "www.baidu.com"
    // },
  ]
};

export default state;