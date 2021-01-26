<template>
  <div class="model-container" v-show="biddingTechnology.isShow">
    <div class="model-wrapper">
      <div class="model-header">
        <div class="model-title">
          <div class="model-title-text">
            二次工艺
          </div>
        </div>
        <div
          class="model-cancel"
          @click="updateBiddingTechnology({ isShow: false })"
        ></div>
      </div>
      <div class="model-body">
        <div
          class="model-flex"
          v-for="(a, b) in biddingTechnology.list"
          :key="b"
        >
          <template v-if="a.type === 1">
            <div class="model-flex-text">
              <span class="model-flex-text-black">工艺{{ b + 1 }}：</span>
              <span>{{ a.technologyName || "" }}</span>
            </div>
            <div class="model-flex-text">
              <span>颜色：</span>
              <span>
                {{ a.colorType || "" }}
                {{ a.colorValue || "" }}
              </span>
            </div>
            <div class="model-flex-text">
              <span>{{ a.technologyName || "" }}附件：</span>
              <span
                class="model-flex-text-blue"
                @click="downloadFile(a.subsidiaryFileUrl, a.technologyName)"
              >
                {{ a.technologyName || "" }}附件.rar
              </span>
            </div>
          </template>
          <template v-if="a.type === 2">
            <div class="model-flex-text">
              <span>工艺{{ b + 1 }}：</span>
              <span>添加零件</span>
            </div>
            <div class="model-flex-text">
              <span>名称：</span>
              <span>
                {{ a.technologyName || "" }}
              </span>
            </div>
            <div class="model-flex-text">
              <span>是否客供：</span>
              <span>
                {{ a.isCustomerSupport === 1 ? "是" : "否" }}
              </span>
            </div>
            <div class="model-flex-text">
              <span>数量：</span>
              <span>
                {{ a.componentNum || 0 }}
              </span>
            </div>
            <div class="model-flex-text">
              <span>{{ a.technologyName || "" }}附件：</span>
              <span
                class="model-flex-text-blue"
                @click="downloadFile(a.subsidiaryFileUrl, a.technologyName)"
              >
                {{ a.technologyName || "" }}附件.rar
              </span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("bidding");

import { BiddingTechnology } from "@/store/modules/bidding/state";
import { ActionTypes } from "@/store/modules/bidding/actions";
import { MutationTypes } from "@/store/modules/bidding/mutations";

import downloadByUrl from "@/utils/downloadByUrl";

@Component({
  name: "BiddingTechnologyModel",
  components: {}
})
export default class BiddingTechnologyModel extends Vue {
  @State("biddingTechnology")
  public biddingTechnology!: any | BiddingTechnology;

  @Mutation(MutationTypes.UpdateBiddingTechnology)
  public updateBiddingTechnology!: Function;

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
    margin 20px
    display flex
    justify-content flex-start
    align-items center
    &-text
      margin-right 20px
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
