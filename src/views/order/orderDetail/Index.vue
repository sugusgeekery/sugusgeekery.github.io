<template>
  <div class="context">
    <div class="context-title">
      订单中心
      <span v-if="orderObject.orderNo">/{{ orderObject.orderNo }}</span>
    </div>
    <div class="context-body">
      <div class="list">
        <div class="list-header">
          <div class="nav-items">
            <div
              class="nav-item"
              v-for="(a, b) in navigationList"
              :key="a.text + '_DFM供应商导航_' + b"
            >
              <div
                class="nav-item-text"
                :class="{ 'nav-item-text-active': b === navigationIndex }"
                @click="updateNavigationIndex(b)"
              >
                {{ a.text }}
              </div>
            </div>
          </div>
          <div class="nav-buttons">
            <div class="nav-button">平台标准</div>
            <div class="nav-button">下载报告</div>
          </div>
        </div>
        <div class="list-body">
          <router-view />
        </div>
      </div>
      <DownTimeTemplate></DownTimeTemplate>
      <!-- <div class="tip">
        <div class="tip-title">我的竞价指标</div>
        <div class="tip-text">交期准时率:：%</div>
        <div class="tip-text">交付失误率：%</div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("order");

import { NavigationList } from "@/store/modules/order/state";
import { GetterTypes } from "@/store/modules/order/getters";
import { ActionTypes } from "@/store/modules/order/actions";

import DownTimeTemplate from "../templates/DownTimeTemplate.vue";

@Component({
  name: "OrderDetailView",
  components: {
    DownTimeTemplate
  }
})
export default class OrderDetailView extends Vue {
  @State("navigationIndex")
  public navigationIndex!: number;
  @State("navigationList")
  public navigationList!: Array<NavigationList>;

  @Getter(GetterTypes.OrderObject)
  public orderObject!: object;

  @Action(ActionTypes.UpdateNavigationIndex)
  public updateNavigationIndex!: Function;
}
</script>

<style lang="stylus" scoped>
@import '../../../stylus/index.styl';
.context
  display flex
  flex-direction column
  justify-content flex-start
  align-items flex-start
  overflow hidden
  &-title
    width 100%
    font-size 16px
    color $color-text-black
    padding 20px
    background $color-bg-white
  &-body
    width 100%
    flex 1
    display flex
    flex-direction row
    justify-content flex-start
    align-items flex-start
    padding 20px
    .tip
      background $color-bg-white
      border-radius 8px
      overflow auto
      margin 0 20px
      padding 20px
      min-width 300px
      &-title
        font-size 16px
        color $color-text-black
        margin 10px 20px
      &-text
        font-size 14px
        color $color-text-gray
        margin 10px 20px
    .list
      height 100%
      max-width 1200px
      flex 1
      display flex
      flex-direction column
      justify-content flex-start
      align-items flex-start
      background $color-bg-white
      border-radius 8px
      overflow hidden
      &-header
        width 100%
        background $color-bg-white
        padding 40px 20px 0px 20px
        display flex
        justify-content space-between
        align-items center
        border-bottom solid 1px $color-bd
        .nav-items
          display flex
          justify-content flex-start
          align-items center
        .nav-item
          position relative
          padding 0 16px
          cursor pointer
          &:nth-of-type(1)
            padding-left 0
          &:after
            content ""
            position absolute
            top 50%
            right 0
            transform translateY(-50%)
            width 1px
            height 10px
            background $color-bg-gray
            border-radius 10px
          &-text
            color $color-text-gray
            border-bottom solid 2px transparent
            font-size 16px
            padding 10px
            &-active
              color $color-text-blue
              border-bottom solid 2px $color-bd-blue
        .nav-buttons
          display flex
          justify-content flex-start
          align-items center
        .nav-button
          margin 0 5px
          padding 4px
          border-radius 4px
          border solid 1px $color-bd-blue
          font-size 12px
          color $color-text-blue
          cursor pointer
      &-footer
        width 100%
        background $color-bg-white
        margin auto
        padding 5px
        text-align center
      &-body
        width 100%
        flex 1
        position relative
</style>
