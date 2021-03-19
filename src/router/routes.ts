export default [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/loginout",
    name: "LoginoutView",
    meta: {
      title: "好品供应商",
    },
    component: () => import(/* webpackChunkName: "LoginoutView" */ "@/views/loginout/Index.vue"),
    children: [
      {
        path: "/login",
        name: "LoginView",
        meta: {
          title: "登录",
        },
        component: () => import(/* webpackChunkName: "LoginView" */ "@/views/loginout/login/Index.vue")
      },
      {
        path: "/register",
        name: "RegisterView",
        meta: {
          title: "注册",
        },
        component: () => import(/* webpackChunkName: "RegisterView" */ "@/views/loginout/register/Index.vue")
      },
    ]
  },
  {
    path: "/account",
    name: "AccountView",
    meta: {
      title: "账号管理",
    },
    component: () => import(/* webpackChunkName: "AccountView" */ "@/views/account/Index.vue"),
    children: [
      {
        path: "information",
        name: "InformationView",
        meta: {
          title: "资料信息",
        },
        component: () => import(/* webpackChunkName: "InformationView" */ "@/views/account/information/Index.vue")
      },
      {
        path: "application",
        name: "ApplicationView",
        meta: {
          title: "资质申请",
        },
        component: () => import(/* webpackChunkName: "ApplicationView" */ "@/views/account/application/Index.vue")
      },
      {
        path: "management",
        name: "ManagementView",
        meta: {
          title: "子账号管理",
        },
        component: () => import(/* webpackChunkName: "ManagementView" */ "@/views/account/management/Index.vue")
      },
    ]
  },
  {
    path: "/bidding",
    name: "BiddingView",
    meta: {
      title: "竞价",
    },
    component: () => import(/* webpackChunkName: "BiddingView" */ "@/views/bidding/Index.vue"),
  },
  {
    path: "/home",
    name: "HomeView",
    meta: {
      title: "首页",
    },
    component: () => import(/* webpackChunkName: "HomeView" */ "@/views/home/Index.vue"),
  },
  {
    path: "/order",
    name: "OrderView",
    meta: {
      title: "好品供应商",
    },
    component: () => import(/* webpackChunkName: "OrderView" */ "@/views/order/Index.vue"),
    children: [
      {
        path: "/orderHome",
        name: "OrderHomeView",
        meta: {
          title: "订单中心",
        },
        component: () => import(/* webpackChunkName: "OrderHomeView" */ "@/views/order/orderHome/Index.vue")
      },
      {
        path: "/orderDetail",
        name: "OrderDetailView",
        meta: {
          title: "订单详情",
        },
        component: () => import(/* webpackChunkName: "OrderDetailView" */ "@/views/order/orderDetail/Index.vue"),
        children: [
          {
            path: "/order/report",
            name: "ReportView",
            meta: {
              title: "DFM报告",
            },
            component: () => import(/* webpackChunkName: "ReportView" */ "@/views/order/orderDetail/report/Index.vue")
          },
          {
            path: "/order/design",
            name: "DesignView",
            meta: {
              title: "方案设计&验收",
            },
            component: () => import(/* webpackChunkName: "DesignView" */ "@/views/order/orderDetail/design/Index.vue")
          },
          {
            path: "/order/process",
            name: "ProcessView",
            meta: {
              title: "加工&装配&注塑流程",
            },
            component: () => import(/* webpackChunkName: "ProcessView" */ "@/views/order/orderDetail/process/Index.vue")
          },
          {
            path: "/order/prototype",
            name: "PrototypeView",
            meta: {
              title: "样件发送&验收",
            },
            component: () => import(/* webpackChunkName: "PrototypeView" */ "@/views/order/orderDetail/prototype/Index.vue")
          },
          {
            path: "/order/question",
            name: "QuestionView",
            meta: {
              title: "问题回复",
            },
            component: () => import(/* webpackChunkName: "QuestionView" */ "@/views/order/orderDetail/question/Index.vue")
          },
          {
            path: "/order/mould",
            name: "MouldView",
            meta: {
              title: "模具",
            },
            component: () => import(/* webpackChunkName: "MouldView" */ "@/views/order/orderDetail/mould/Index.vue")
          },
        ]
      },
    ]
  },
];
