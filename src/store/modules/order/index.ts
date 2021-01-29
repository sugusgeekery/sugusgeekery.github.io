import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

import report from "./modules/report";
import design from "./modules/design";
import information from "./modules/information";

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    report,
    design,
    information,
  }
}