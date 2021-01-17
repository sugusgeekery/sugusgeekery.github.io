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
  
];
