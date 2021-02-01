import { GetterTree } from "vuex";
import { RootState } from "@/store/state";
import { State } from "./state";

export enum GetterTypes {
  OrderObject = "OrderObject",
};

const getters: GetterTree<State, RootState> = {
  [GetterTypes.OrderObject](state: State) {
    const { order } = state;
    const { list = [], index = -1 } = order || {};
    const orderObject = list[index] || {};
    return orderObject;
  }
};
export default getters;