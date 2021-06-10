import { GetterTree } from "vuex";
import { RootState } from "@/store/state";
import { State } from "./state";

export enum GetterTypes {
  BOMObject = "BOMObject",
  ReasonObject = "ReasonObject",
};

const getters: GetterTree<State, RootState> = {
  [GetterTypes.BOMObject](state: State) {
    const { BOMInfo } = state;
    const { navList = [], navIndex = 0 } = BOMInfo || {};
    return navList[navIndex] || {};
  },
  [GetterTypes.ReasonObject](state: State) {
    const { BOMInfo } = state;
    const { reasonList = [], reasonIndex = 0 } = BOMInfo || {};
    return reasonList[reasonIndex] || {};
  },
};

export default getters;