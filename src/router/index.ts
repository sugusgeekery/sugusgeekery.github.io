import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";

const originalPush: any = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any): any {
  return originalPush.call(this, location).catch((err: any) => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
