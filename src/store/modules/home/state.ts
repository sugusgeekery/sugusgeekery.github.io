export interface State {
  orderMessageList: Array<OrderMessage>;
  jobList: Array<Job>;
  userMessageList: Array<UserMessage>;
};

// 订单消息
export interface OrderMessage {
  text: string;
  count: number;
}
// 待办任务
export interface Job {
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
  jobList: [
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
  ],
  userMessageList: [
    {
      "id": 12,
      "orderNo": "7687634534543435",
      "time": "2021-02-11",
      "img": "",
      name: "enen",
      "msg": "www.baidu.com"
    },
    {
      "id": 12,
      "orderNo": "7687634534543435",
      "time": "2021-02-11",
      "img": "",
      name: "enen",
      "msg": "www.baidu.com"
    },
    {
      "id": 12,
      "orderNo": "7687634534543435",
      "time": "2021-02-11",
      "img": "",
      name: "enen",
      "msg": "www.baidu.com"
    },
    {
      "id": 12,
      "orderNo": "7687634534543435",
      "time": "2021-02-11",
      "img": "",
      name: "enen",
      "msg": "www.baidu.com"
    },
  ]
};

export default state;