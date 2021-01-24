<template>
  <div class="model-container" v-show="biddingMaterial.isShow">
    <div class="model-wrapper">
      <div class="model-header">
        <div class="model-title">
          <div class="model-title-text">
            材料及颜色
          </div>
        </div>
        <div
          class="model-cancel"
          @click="updateBiddingMaterial({ isShow: false })"
        ></div>
      </div>
      <div class="model-body">
        <div class="model-flex">
          <div class="model-flex-text">
            <span>材材：</span>
            <span>
              {{ biddingMaterial.materialName || "" }}
            </span>
          </div>
          <div class="model-flex-text">
            <span>添加剂类型:</span>
            <span>
              {{ biddingMaterial.additiveType || "" }}
            </span>
          </div>
          <div class="model-flex-text">
            <span>添加剂数值：</span>
            <span>
              {{ biddingMaterial.additiveValue || "" }}
            </span>
          </div>
          <div class="model-flex-text">
            <span>潘通色号:</span>
            <span>
              {{ biddingMaterial.colorValue || "" }}
              {{ biddingMaterial.colorType || "" }}
            </span>
          </div>
          <div class="model-flex-text">
            <span>材料特殊要求：</span>
            <span>
              {{ biddingMaterial.specialType || "" }}
            </span>
          </div>
          <div class="model-flex-text">
            <span>对应牌号：</span>
            <span>
              {{ biddingMaterial.brandNumber || "" }}
            </span>
          </div>
          <div class="model-flex-text">
            <span>用途：</span>
            <span>
              {{ biddingMaterial.purpose || "" }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("bidding");

import { BiddingMaterial } from "@/store/modules/bidding/state";
import { ActionTypes } from "@/store/modules/bidding/actions";
import { MutationTypes } from "@/store/modules/bidding/mutations";

import downloadByUrl from "@/utils/downloadByUrl";

@Component({
  name: "BiddingMaterialModel",
  components: {}
})
export default class BiddingMaterialModel extends Vue {
  @State("biddingMaterial")
  public biddingMaterial!: any | BiddingMaterial;

  @Mutation(MutationTypes.UpdateBiddingMaterial)
  public updateBiddingMaterial!: Function;

  public downloadFile(url: string, name: string) {
    if (url) {
      downloadByUrl(url, name);
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../stylus/index.styl';
.model
  &-container
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background rgba($color-bg-black, 0.3)
    z-index 999
    display flex
    justify-content center
    align-items center
  &-wrapper
    background $color-bg-white
  &-header
    display flex
    justify-content space-between
    align-items center
    padding 20px 20px 15px 20px
    background $color-bg
  &-title
    display flex
    justify-content center
    align-items center
    flex 1
    &-text
      font-size 16px
      color $color-text-black
      margin-right 20px
  &-cancel
    width 12px
    height 12px
    position relative
    cursor pointer
    &:before
      content ""
      position absolute
      width 141%
      height 100%
      border-top solid 1px $color-bd-black
      transform-origin 0 0
      transform rotate(45deg)
      z-index 1
    &:after
      content ""
      position absolute
      width 141%
      height 100%
      border-bottom solid 1px $color-bd-black
      transform-origin 0 100%
      transform rotate(-45deg)
  &-body
    border-top solid 1px $color-bd
  &-flex
    padding 12px
    min-width 270px
    &-text
      margin 12px
      font-size 14px
      color $color-text-gray
      display flex
      justify-content flex-start
      align-items center
      &-black
        color $color-text-black
      &-blue
        color $color-text-blue
</style>
