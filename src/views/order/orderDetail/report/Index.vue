<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("order/report");

import { NavigationList } from "@/store/modules/order/modules/report/state";
import { ActionTypes } from "@/store/modules/order/modules/report/actions";

@Component({
  name: "ReportView",
  components: {}
})
export default class ReportView extends Vue {
  @State("mouldNo")
  public mouldNo!: string;
  @State("navigationIndex")
  public navigationIndex!: number;
  @State("navigationList")
  public navigationList!: Array<NavigationList>;

  @Action(ActionTypes.UpdateNavigationIndex)
  public updateNavigationIndex!: Function;
}
</script>

<style lang="stylus" scoped>
@import '../../../../stylus/index.styl';
</style>
