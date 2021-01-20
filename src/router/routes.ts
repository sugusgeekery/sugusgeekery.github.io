export default [
  {
    path: "/",
    redirect: "/user/login"
  },
  {
    path: "/user",
    name: "User",
    component: () => import(/* webpackChunkName: "User" */ "@/views/user/Index.vue"),
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import(/* webpackChunkName: "Login" */ "@/views/user/Login.vue")
      },
      {
        path: "register",
        name: "Register",
        component: () => import(/* webpackChunkName: "Register" */ "@/views/user/Register.vue")
      },
    ]
  },
  {
    path: "/account",
    name: "Account",
    component: () => import(/* webpackChunkName: "Account" */ "@/views/account/Index.vue"),
  },
  {
    path: "/bidding",
    name: "Bidding",
    component: () => import(/* webpackChunkName: "Bidding" */ "@/views/bidding/Index.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/home/Index.vue"),
  },
  {
    path: "/order",
    name: "Order",
    component: () => import(/* webpackChunkName: "Order" */ "@/views/order/Index.vue"),
  },
];
