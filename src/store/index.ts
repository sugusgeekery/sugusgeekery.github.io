import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import state, { RootState } from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

import account from "./modules/account";
import home from "./modules/home";
import bidding from "./modules/bidding";
import order from "./modules/order";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state,
  getters,
  actions,
  mutations,
  modules: {
    account,
    home,
    bidding,
    order,
  }
};
export default new Vuex.Store<RootState>(store);
