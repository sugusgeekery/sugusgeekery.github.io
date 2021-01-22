<template>
  <div class="model-container">
    <div class="model-wrapper">
      <div class="model-cancel"></div>
      <div class="model-title"></div>
      <div class="model-body"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("bidding");

import { BiddingList } from "@/store/modules/bidding/state";
import { ActionTypes } from "@/store/modules/bidding/actions";

import { ElementUIProvinces, ElementUICasCader } from "@/utils/provinces";

@Component({
  name: "BiddingHome",
  components: {}
})
export default class BiddingHome extends Vue {
  @State("biddingIndex")
  public biddingIndex!: number;
  @State("biddingList")
  public biddingList!: Array<BiddingList>;

  public provinces: ElementUICasCader[] = ElementUIProvinces;

  @Action(ActionTypes.UpdateBiddingIndex)
  public updateBiddingIndex!: Function;
  @Action(ActionTypes.UpdatePageNum)
  public updatePageNum!: Function;
  @Action(ActionTypes.UpdatePageSize)
  public updatePageSize!: Function;
  @Action(ActionTypes.UpdateMinPrice)
  public updateMinPrice!: Function;
  @Action(ActionTypes.UpdateMaxPrice)
  public updateMaxPrice!: Function;
  @Action(ActionTypes.UpdatePayDate)
  public updatePayDate!: Function;
  @Action(ActionTypes.UpdateProvinceCityCountry)
  public updateProvinceCityCountry!: Function;
  @Action(ActionTypes.JoinBidding)
  public joinBidding!: Function;
  @Action(ActionTypes.GetBiddingDetail)
  public getBiddingDetail!: Function;
}
</script>

<style lang="stylus" scoped>
@import '../../stylus/index.styl';
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
    flex-direction column
    justify-content flex-start
    align-items flex-start
    padding 20px
    .list
      width 100%
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
        .nav-items
          display flex
          justify-content flex-start
          align-items center
          border-bottom solid 1px $color-bd
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
            padding 5px
            &-active
              color $color-text-blue
              border-bottom solid 2px $color-bd-blue
        .filter-items
          display flex
          justify-content flex-start
          align-items center
          margin 20px auto
        .filter-item
          display flex
          justify-content flex-start
          align-items center
          margin-right 40px
          &-label
            font-size 14px
            color $color-text-gray
            margin-right 12px
          &-content
            display flex
            justify-content flex-start
            align-items center
          &-text
            font-size 14px
            color $color-text-gray
            margin-right 8px
          &-input
            max-width 100px
            min-height 40px
            border solid 1px $color-bd
            border-radius 4px
            outline none
            font-size 14px
            color $color-text-gray
            margin-right 8px
            padding 10px
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
        .cells
          position absolute
          top 0
          left 0
          width 100%
          overflow auto
          display flex
          flex-wrap wrap
          justify-content flex-start
          align-items flex-start
          padding 0 20px
        .cell
          background $color-bg-white
          width 100%
          display flex
          justify-content flex-start
          align-items center
          &-gray
            background $color-bg
          &-text
            flex 1
            text-align center
            padding 10px
            font-size 14px
            color $color-text-black
            &-blue
              color $color-text-blue
              cursor pointer
        .items
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          overflow auto
          display flex
          flex-wrap wrap
          justify-content flex-start
          align-items flex-start
          padding 0 12px
        .item
          margin 1%
          min-width 23%
          border-radius 4px
          border solid 1px $color-bd
          background $color-bg
          padding 10px
          &-rows
            padding 10px
            border-bottom solid 1px $color-bd
            &:nth-last-of-type(1)
              border-bottom none
          &-row
            width 100%
            display flex
            justify-content space-between
            align-items center
            margin-top 4px
            &:nth-of-type(1)
              margin-top 0
          &-flex
            display flex
            justify-content flex-start
            align-items center
          &-icon
            width 20px
            object-fit contain
            margin-right 8px
          &-text
            font-size 14px
            color $color-text-black
            &-small
              font-size 12px
              color $color-text-gray
            &-red
              color $color-text-red
          &-button
            padding 9px 16px
            border-radius 4px
            font-size 14px
            color $color-text-blue
            background rgba($color-bg-blue, .3)
            &-blue
              color $color-text-white
              background rgba($color-bg-blue, 1)
              cursor pointer
</style>
