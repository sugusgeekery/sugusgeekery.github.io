<template>
  <div class="model-container" :data="biddingDetail.isShow" v-show="biddingDetail.isShow">
    <div class="model-wrapper">
      <div class="model-header">
        <div class="model-title">
          <div class="model-title-text">
            模具{{ biddingDetail.realMouldNo || "" }}
          </div>
          <div class="model-title-button">DFM</div>
        </div>
        <div
          class="model-cancel"
          @click="updateBiddingDetail({ isShow: false })"
        ></div>
      </div>
      <div class="model-body">
        <div class="model-flex">
          <div class="model-flex-title">模具信息</div>
          <div class="model-flex-row">
            <div class="model-flex-arrow" @click="updateProductInfoIndex(2)">
              <img
                class="model-flex-arrow-icon"
                src="../../../assets/images/arrow_left.png"
                alt=""
              />
            </div>
            <div
              class="model-flex-content"
              v-for="(a, b) in biddingDetail.productInfos"
              :key="'_产品列表_' + b"
              v-show="b === biddingDetail.productInfoIndex"
            >
              <div class="model-flex-context">
                <div class="model-flex-text">
                  <span>模具寿命：</span>
                  <span>{{ biddingDetail.lifetime || "" }}</span>
                </div>
                <div class="model-flex-text">
                  <span class="model-flex-text-black">产品：</span>
                  <span>{{ a.productNo || "" }}</span>
                </div>
                <div class="model-flex-image">
                  <img src="" alt="" />
                </div>
              </div>
              <div class="model-flex-context">
                <div class="model-flex-text">
                  <span>精度标准：</span>
                  <span>{{ biddingDetail.toleranceValue || "" }}</span>
                </div>
                <div class="model-flex-text">
                  <span>表面要求：</span>
                  <span>
                    {{ a.surfaceTreatment || "" }}
                  </span>
                </div>
                <div class="model-flex-text">
                  <span>产品数量：</span>
                  <span>
                    {{ a.productNum || "" }}
                  </span>
                </div>
                <div class="model-flex-text">
                  <span>重量(g)：</span>
                  <span>
                    {{ a.productWeight || "" }}
                  </span>
                </div>
                <div class="model-flex-text">
                  <span>尺寸(mm)：</span>
                  <span>
                    {{ a.productLength || "" }}
                    *{{ a.productWidth || "" }} *{{ a.productHeight || "" }}
                  </span>
                </div>
                <div class="model-flex-text">
                  <span>材料及颜色：</span>
                  <span
                    class="model-flex-text-blue"
                    @click="getBiddingMaterial()"
                  >
                    点击查看
                  </span>
                </div>
                <div class="model-flex-text">
                  <span>二次工艺：</span>
                  <span
                    class="model-flex-text-blue"
                    @click="getBiddingTechnology()"
                  >
                    点击查看
                  </span>
                </div>
              </div>
            </div>
            <div class="model-flex-arrow" @click="updateProductInfoIndex(2)">
              <img
                class="model-flex-arrow-icon"
                src="../../../assets/images/arrow_right.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="model-flex">
          <div class="model-flex-title">派单信息</div>
          <div class="model-flex-row">
            <div class="model-flex-content">
              <div class="model-flex-context">
                <div class="model-flex-text">
                  <span>建议价格</span>
                </div>
                <div class="model-flex-text">
                  <span>建议交期</span>
                </div>
                <div class="model-flex-text">
                  <span>准时率（≥）</span>
                </div>
                <div class="model-flex-text">
                  <span>失误率（≤）</span>
                </div>
                <div class="model-flex-text">
                  <span>派单期限</span>
                </div>
                <div class="model-flex-text">
                  <span>交付地址</span>
                </div>
              </div>
              <div class="model-flex-context">
                <div class="model-flex-text">
                  <span>
                    ￥{{ biddingDetail.biddingHeadInfo.amount || 0 }}
                  </span>
                </div>
                <div class="model-flex-text">
                  <span>
                    {{ biddingDetail.biddingHeadInfo.workPeriod || "" }}
                    {{ biddingDetail.biddingHeadInfo.unitDesc || "" }}
                  </span>
                </div>
                <div class="model-flex-text">
                  <span>
                    {{ biddingDetail.biddingHeadInfo.accuracy || 0 }}
                  </span>
                </div>
                <div class="model-flex-text">
                  <span>
                    {{ biddingDetail.biddingHeadInfo.anerror || 0 }}
                  </span>
                </div>
                <div class="model-flex-text">
                  <span>
                    {{ biddingDetail.biddingHeadInfo.termTime || "" }}
                  </span>
                </div>
                <div class="model-flex-text">
                  <span>
                    {{ biddingDetail.biddingHeadInfo.address || "" }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="model-flex">
          <div
            class="model-flex-title"
            v-if="
              biddingDetail.biddingIndex === 2 ||
                biddingDetail.biddingIndex === 3
            "
          >
            中标信息
          </div>
          <div
            class="model-flex-row"
            v-if="
              biddingDetail.biddingIndex === 2 ||
                biddingDetail.biddingIndex === 3
            "
          >
            <div class="model-flex-content">
              <div class="model-flex-context">
                <div class="model-flex-text">
                  <span>中标价格</span>
                </div>
                <div class="model-flex-text">
                  <span>中标交期</span>
                </div>
              </div>
              <div class="model-flex-context">
                <div class="model-flex-text">
                  <span>￥</span>
                  <span>
                    {{ biddingDetail.selectedUserBiddingInfo.amount || 0 }}
                  </span>
                </div>
                <div class="model-flex-text">
                  <span>
                    {{ biddingDetail.selectedUserBiddingInfo.workPeriod || 0 }}
                  </span>
                  <span>小时</span>
                </div>
              </div>
            </div>
          </div>
          <div class="model-flex-title">
            竞价信息
          </div>
          <div class="model-flex-row">
            <div class="model-flex-content">
              <div class="model-flex-context">
                <div class="model-flex-text">
                  <span>竞标价格</span>
                </div>
                <div class="model-flex-text">
                  <span>竞标交期</span>
                </div>
                <div
                  class="model-flex-button model-flex-button-blue"
                  @click="updateMouldBidding()"
                  v-if="
                    biddingDetail.biddingIndex === 0 ||
                      biddingDetail.biddingIndex === 1
                  "
                >
                  {{ biddingDetail.biddingState === 1 ? "编辑" : "竞价" }}
                </div>
              </div>
              <div class="model-flex-context">
                <div class="model-flex-text">
                  <span>￥</span>
                  <input
                    class="model-flex-input"
                    type="text"
                    placeholder="请输入竞标价格"
                    :value="biddingDetail.joinBiddingInfo.amount || 0"
                    @change="
                      e =>
                        updateBiddingDetail({
                          joinBiddingInfo: {
                            ...biddingDetail.joinBiddingInfo,
                            amount: Number(e.target.value)
                          }
                        })
                    "
                    v-if="
                      biddingDetail.biddingIndex === 0 ||
                        biddingDetail.biddingIndex === 1
                    "
                  />
                  <span v-else>{{
                    biddingDetail.joinBiddingInfo.amount || 0
                  }}</span>
                </div>
                <div class="model-flex-text">
                  <input
                    class="model-flex-input"
                    type="text"
                    placeholder="请输入竞标交期"
                    :value="biddingDetail.joinBiddingInfo.workPeriod || 0"
                    @change="
                      e =>
                        updateBiddingDetail({
                          joinBiddingInfo: {
                            ...biddingDetail.joinBiddingInfo,
                            workPeriod: Number(e.target.value)
                          }
                        })
                    "
                    v-if="
                      biddingDetail.biddingIndex === 0 ||
                        biddingDetail.biddingIndex === 1
                    "
                  />
                  <span v-else>
                    {{ biddingDetail.joinBiddingInfo.workPeriod || 0 }}
                  </span>
                  <span>小时</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BiddingMaterialModel></BiddingMaterialModel>
    <BiddingTechnologyModel></BiddingTechnologyModel>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("bidding");

import { BiddingDetail } from "@/store/modules/bidding/state";
import { ActionTypes } from "@/store/modules/bidding/actions";
import { MutationTypes } from "@/store/modules/bidding/mutations";

import BiddingMaterialModel from "./BiddingMaterialModel.vue";
import BiddingTechnologyModel from "./BiddingTechnologyModel.vue";

@Component({
  name: "BiddingDetailModel",
  components: {
    BiddingMaterialModel,
    BiddingTechnologyModel
  }
})
export default class BiddingDetailModel extends Vue {
  @State("biddingDetail")
  public biddingDetail!: any | BiddingDetail;

  @Action(ActionTypes.UpdateProductInfoIndex)
  public updateProductInfoIndex!: Function;
  @Action(ActionTypes.GetBiddingTechnology)
  public getBiddingTechnology!: Function;
  @Action(ActionTypes.GetBiddingMaterial)
  public getBiddingMaterial!: Function;
  @Action(ActionTypes.UpdateMouldBidding)
  public updateMouldBidding!: Function;

  @Mutation(MutationTypes.UpdateBiddingDetail)
  public updateBiddingDetail!: Function;
}
</script>

<style lang="stylus" scoped>
@import '../../../stylus/index.styl';
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
  &-title
    display flex
    justify-content flex-start
    align-items center
    &-text
      font-size 16px
      color $color-text-black
      margin-right 20px
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
    display flex
    justify-content space-between
    align-items flex-start
  &-flex
    padding 20px
    min-height 350px
    border-right solid 1px $color-bd
    &:nth-last-of-type(1)
      border-right none
    &-title
      font-size 16px
      color $color-text-black
    &-row
      height 100%
      display flex
      justify-content space-between
      align-items center
    &-arrow
      width 20px
      height 20px
      margin-right 20px
      cursor pointer
      &-icon
        width 100%
        height 100%
        object-fit cover
    &-content
      display flex
      justify-content flex-start
      align-items flex-start
      margin 10px 0
    &-context
      margin 0 20px 0 0
      &:nth-last-of-type(1)
        margin 0
    &-image
      width 110px
      height 110px
      img
        width 100%
        height 100%
        object-fit contain
    &-text
      line-height 36px
      font-size 14px
      color $color-text-gray
      display flex
      justify-content flex-start
      align-items center
      &-black
        color $color-text-black
      &-blue
        color $color-text-blue
        cursor pointer
    &-input
      max-width 80px
      min-height 30px
      border solid 1px $color-bd
      border-radius 4px
      outline none
      font-size 14px
      color $color-text-gray
      margin 0 8px
      padding 4px
    &-button
      margin-top 50px
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
