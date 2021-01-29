import { GetterTree } from "vuex";
import { RootState } from "@/store/state";
import { State } from "./state";

export enum GetterTypes {
  MouldNo = "MouldNo",
};

const getters: GetterTree<State, RootState> = {
  [GetterTypes.MouldNo](state: State) {
    const { order } = state;
    const { list = [], index = -1 } = order || {};
    const { mouldNo = "" } = list[index] || {};
    return mouldNo;
  }
};
export default getters;