import { GetterTree } from "vuex";
import { RootState } from "@/store/state";
import { State } from "./state";

export enum GetterTypes {
  RepairMould = "RepairMould"
};

const getters: GetterTree<State, RootState> = {
  [GetterTypes.RepairMould](state: State) {
    const { repairMouldIndex = -1, repairMouldList = [] } = state;
    return repairMouldList[repairMouldIndex] || {};
  }
};

export default getters;