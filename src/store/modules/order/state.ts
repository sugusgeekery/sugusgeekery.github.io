export interface State {
  advantage: Advantage;
  order: Order;
  navigationIndex: number;
  navigationList: Array<NavigationList>;
};

export interface Advantage {
  accuracy: number;
  anerror: number;
}
export interface Order {
  pageNum: number;
  pageSize: number;
  pageSizes: number[];
  total: number;
  orderNo: string;
  projectIndex: number;
  projectList: Array<ProjectList>;
  statusIndex: number;
  statusList: Array<StatusList>;
  index: number;
  list: Array<OrderList>;
}
export interface OrderList {
  amount: string;
  completeTime: string;
  createTime: string;
  id: number;
  mouldNo: string;
  orderNo: string;
  remainTime: number;
  status: string;
  statusDesc: string;
  type: string;
  typeDesc: string;
  unit: string;
  unitDesc: string;
  workPeriod: string;
}
export interface ProjectList {
  text: string;
  type: string;
}
export interface StatusList {
  text: string;
  status: string;
}
export interface NavigationList {
  text: string;
  path: string;
};


// 供应商对应的类型值
export enum Supplier {
  // 加工供应商
  Machining = "machining",
  // DFM供应商
  Dfm = "DFM",
  // 注塑供应商
  Injection = "Injection"
};

const state: State = {
  advantage: {
    accuracy: 0,
    anerror: 0
  },
  order: {
    pageNum: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100],
    total: 0,
    orderNo: "",
    projectIndex: 0,
    projectList: [
      {
        text: "项目类型",
        type: "",
      },
      {
        text: "DFM",
        type: "DFM",
      },
      {
        text: "加工",
        type: "加工",
      },
      {
        text: "注塑",
        type: "注塑",
      },
    ],
    statusIndex: 0,
    statusList: [
      {
        text: "全部状态",
        status: "",
      },
      {
        text: "待开始",
        status: "待开始",
      },
      {
        text: "进行中",
        status: "进行中",
      },
      {
        text: "已完成",
        status: "已完成",
      },
    ],
    index: -1,
    list: [
      // {
      //   "amount": "",
      //   "completeTime": "",
      //   "createTime": "",
      //   "id": 0,
      //   "mouldNo": "",
      //   "orderNo": "",
      //   "remainTime": 0,
      //   "status": "",
      //   "statusDesc": "",
      //   "type": "",
      //   "typeDesc": "",
      //   "unit": "",
      //   "unitDesc": "",
      //   "workPeriod": ""
      // }
    ]
  },
  navigationIndex: 1,
  navigationList: [
    // {
    //   text: "DFM报告",
    //   path: "/order/report",
    // },
    // {
    //   text: "方案设计",
    //   path: "/order/design",
    // },
    // {
    //   text: "模具信息",
    //   path: "/order/information",
    // },
  ],
  downtime: {

  }
};

export default state;