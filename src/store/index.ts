import { createStore  } from "vuex";

import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

import account from "./modules/account";
import home from "./modules/home";
import bidding from "./modules/bidding";
import order from "./modules/order";

const store = createStore({
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
});

export default store;
