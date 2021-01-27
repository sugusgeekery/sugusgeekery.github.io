export interface State {
  advantage: Advantage;
  order: Order;
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
        status: "全部状态",
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
    list: [
      {
        "amount": "",
        "completeTime": "",
        "createTime": "",
        "id": 0,
        "mouldNo": "",
        "orderNo": "",
        "remainTime": 0,
        "status": "",
        "statusDesc": "",
        "type": "",
        "typeDesc": "",
        "unit": "",
        "unitDesc": "",
        "workPeriod": ""
      }
    ]
  }
};

export default state;