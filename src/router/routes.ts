export default [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/loginout",
    name: "LoginoutView",
    component: () => import(/* webpackChunkName: "LoginoutView" */ "@/views/loginout/Index.vue"),
    children: [
      {
        path: "/login",
        name: "LoginView",
        component: () => import(/* webpackChunkName: "LoginView" */ "@/views/loginout/login/Index.vue")
      },
      {
        path: "/register",
        name: "RegisterView",
        component: () => import(/* webpackChunkName: "RegisterView" */ "@/views/loginout/register/Index.vue")
      },
    ]
  },
  {
    path: "/account",
    name: "AccountView",
    component: () => import(/* webpackChunkName: "AccountView" */ "@/views/account/Index.vue"),
  },
  {
    path: "/bidding",
    name: "BiddingView",
    component: () => import(/* webpackChunkName: "BiddingView" */ "@/views/bidding/Index.vue"),
  },
  {
    path: "/home",
    name: "HomeView",
    component: () => import(/* webpackChunkName: "HomeView" */ "@/views/home/Index.vue"),
  },
  {
    path: "/order",
    name: "OrderView",
    component: () => import(/* webpackChunkName: "OrderView" */ "@/views/order/Index.vue"),
    children: [
      {
        path: "/orderHome",
        name: "OrderHomeView",
        component: () => import(/* webpackChunkName: "OrderHomeView" */ "@/views/order/orderHome/Index.vue")
      },
      {
        path: "/orderDetail",
        name: "OrderDetailView",
        component: () => import(/* webpackChunkName: "OrderDetailView" */ "@/views/order/orderDetail/Index.vue"),
        children: [
          {
            path: "/order/report",
            name: "ReportView",
            component: () => import(/* webpackChunkName: "ReportView" */ "@/views/order/orderDetail/report/Index.vue")
          },
          {
            path: "/order/design",
            name: "DesignView",
            component: () => import(/* webpackChunkName: "DesignView" */ "@/views/order/orderDetail/design/Index.vue")
          },
          {
            path: "/order/designAcceptance",
            name: "DesignAcceptanceView",
            component: () => import(/* webpackChunkName: "DesignAcceptanceView" */ "@/views/order/orderDetail/design/DesignAcceptance.vue")
          },
          {
            path: "/order/information",
            name: "InformationView",
            component: () => import(/* webpackChunkName: "InformationView" */ "@/views/order/orderDetail/information/Index.vue")
          },
        ]
      },
    ]
  },
];
