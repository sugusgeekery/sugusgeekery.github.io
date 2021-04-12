import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

import report from "./modules/report";
import design from "./modules/design";
import process from "./modules/process";
import prototype from "./modules/prototype";
import question from "./modules/question";
import mould from "./modules/mould";

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    report,
    design,
    process,
    prototype,
    question,
    mould,
  }
}