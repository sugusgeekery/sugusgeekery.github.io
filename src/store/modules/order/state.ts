export interface State {
  order: Order;
};

export interface Order {
  pageNum: number;
  pageSize: number;
  pageSizes: number[];
  total: number;
  mouldNo: string;
  projectIndex: number;
  projectList: Array<ProjectList>;
  statusIndex: number;
  statusList: Array<StatusList>;
  list: Array<OrderList>;
}
export interface OrderList {
  createTime: string;
  id: number;
  mouldNo: string;
  status: string;
  statusDesc: string;
  termTime: string;
  type: string;
  typeDesc: string;
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
  order: {
    pageNum: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100],
    total: 0,
    mouldNo: "",
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
        "createTime": "",
        "id": 0,
        "mouldNo": "",
        "status": "",
        "statusDesc": "",
        "termTime": "",
        "type": "",
        "typeDesc": ""
      }
    ]
  }
};

export default state;