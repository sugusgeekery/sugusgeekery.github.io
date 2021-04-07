<template>
  <div class="model-container" :data="biddingDetail.isShow" v-show="biddingDetail.isShow">
    <div class="model-wrapper">
      <div class="model-header">
        <div class="model-title">
          <div class="model-title-text">
            模具{{ biddingDetail.realMouldNo || "" }}
          </div>
          <div class="model-title-button">{{ biddingDetail.typeDesc }}</div>
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
            <!-- <div class="model-flex-navigations">
              <div 
                class="model-flex-navigation" 
                :class="{'model-flex-navigation-active': b === biddingDetail.productInfoIndex}" 
                v-for="(a, b) in biddingDetail.productInfos.length" 
                :key="b" 
                @click="updateProductInfoIndex({ type: 3, index: b })"
              >
                {{ a }}
              </div>
            </div> -->
            <div class="model-flex-tips">{{ biddingDetail.productInfoIndex + 1 }}/{{ biddingDetail.productInfos.length }}</div>
            <div class="model-flex-arrow" @click="updateProductInfoIndex({ type: 2 })">
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
                <div class="model-flex-image" @click="getProductInfo()" @contextmenu.prevent="onContextmenu($event)">
                  <img v-if="a.productImage" :src="a.productImage" alt="" />
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
                    @click="getMaterialAndColor()"
                  >
                    点击查看
                  </span>
                </div>
                <div class="model-flex-text">
                  <span>二次工艺：</span>
                  <span
                    class="model-flex-text-blue"
                    @click="getTechnology()"
                  >
                    点击查看
                  </span>
                </div>
                <div class="model-flex-text">
                  <span>排模方案：</span>
                  <span
                    class="model-flex-text-blue"
                    @click="getArrangementScheme()"
                  >
                    点击查看
                  </span>
                </div>
              </div>
            </div>
            <div class="model-flex-arrow" @click="updateProductInfoIndex({ type: 1 })">
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
              <div class="model-flex-context" v-if="biddingDetail.selectedUserBiddingInfo">
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
              <div class="model-flex-context" v-if="biddingDetail.joinBiddingInfo">
                <div class="model-flex-text">
                  <span>竞标价格</span>
                </div>
                <div class="model-flex-text">
                  <span>竞标交期</span>
                </div>
                <div class="model-flex-buttons">
                  <div
                    class="model-flex-button model-flex-button-blue"
                    @click="joinBidding()"
                    v-if="
                      biddingDetail.biddingIndex === 0 ||
                        biddingDetail.biddingIndex === 1
                    "
                  >
                    <!-- {{ biddingDetail.isEdit ? "修改" : biddingDetail.biddingState === 1 ? "编辑" : "竞价" }} -->
                    {{ biddingDetail.biddingState !== 1 ? "竞价" : biddingDetail.isEdit ? "修改" :  "编辑" }}
                  </div>
                  <div
                    class="model-flex-button model-flex-button-blue"
                    @click="removeBidding()"
                    v-if="(biddingDetail.biddingIndex === 0 ||
                        biddingDetail.biddingIndex === 1) && biddingDetail.biddingState === 1"
                  >
                    取消竞价
                  </div>
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
                          isEdit: true,
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
                          isEdit: true,
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("bidding");

import { BiddingDetailTypes } from "@/store/modules/bidding/state";
import { ActionTypes } from "@/store/modules/bidding/actions";
import { MutationTypes } from "@/store/modules/bidding/mutations";

import downloadFile from "@/utils/downloadByUrl";

@Component({
  name: "BiddingDetail",
  components: {}
})
export default class BiddingDetail extends Vue {
  @State("biddingDetail")
  public biddingDetail!: any | BiddingDetailTypes;

  @Action(ActionTypes.GetTechnology)
  public getTechnology!: Function;
  @Action(ActionTypes.GetMaterialAndColor)
  public getMaterialAndColor!: Function;
  @Action(ActionTypes.GetArrangementScheme)
  public getArrangementScheme!: Function;
  @Action(ActionTypes.GetProductInfo)
  public getProductInfo!: Function;
  @Action(ActionTypes.JoinBidding)
  public joinBidding!: Function;
  @Action(ActionTypes.RemoveBidding)
  public removeBidding!: Function;

  @Mutation(MutationTypes.UpdateBiddingDetail)
  public updateBiddingDetail!: Function;

  public updateProductInfoIndex(params: { type: number; index: number; }) {
    const { biddingDetail } = this;
    const { type, index } = params || {};
    const { productInfoIndex = -1, productInfos = [] } = biddingDetail || {};
    if (productInfoIndex < 0) {
      return;
    }
    if (type === 1) {
      if (productInfoIndex < productInfos.length - 1) {
        this.updateBiddingDetail({ productInfoIndex: productInfoIndex + 1 });
      }
    } else if (type === 2) {
      if (productInfoIndex > 0) {
        this.updateBiddingDetail({ productInfoIndex: productInfoIndex - 1 });
      }
    } else if (type === 3) {
      this.updateBiddingDetail({ productInfoIndex: index });
    }
  }

  public onContextmenu(event: any) {
    const { biddingDetail } = this;
    const { productInfoIndex = -1, productInfos = [] } = biddingDetail || {};
    const { fileUrl, productImage } = productInfos[productInfoIndex] || {};
    // @ts-ignore
    this.$contextmenu({
      items: [
        { 
          label: "下载", 
          icon: "el-icon-download",
          onClick: () => {
            if (fileUrl) {
              downloadFile(fileUrl, fileUrl);
            } else {
              downloadFile(productImage, productImage);
            }
            
          }
        },
        // {
        //   label: "返回(B)",
        //   onClick: () => {
        //     this.message = "返回(B)";
        //     console.log("返回(B)");
        //   }
        // },
        // { label: "前进(F)", disabled: true },
        // { label: "重新加载(R)", divided: true, icon: "el-icon-refresh" },
        // { label: "另存为(A)..." },
        // { label: "打印(P)...", icon: "el-icon-printer" },
        // { label: "投射(C)...", divided: true },
        // {
        //   label: "使用网页翻译(T)",
        //   divided: true,
        //   minWidth: 0,
        //   children: [{ label: "翻译成简体中文" }, { label: "翻译成繁体中文" }]
        // },
        // {
        //   label: "截取网页(R)",
        //   minWidth: 0,
        //   children: [
        //     {
        //       label: "截取可视化区域",
        //       onClick: () => {
        //         this.message = "截取可视化区域";
        //         console.log("截取可视化区域");
        //       }
        //     },
        //     { label: "截取全屏" }
        //   ]
        // },
        // { label: "查看网页源代码(V)", icon: "el-icon-view" },
        // { label: "检查(N)" }
      ],
      event,
      //x: event.clientX,
      //y: event.clientY,
      customClass: "class-a",
      zIndex: 3,
      minWidth: 230
    });
  }
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
    min-width 230px
    padding 20px
    min-height 400px
    border-right solid 1px $color-bd
    position relative
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
    &-tips
      position absolute
      bottom 10px
      left 50%
      transform translateX(-50%)
      font-size 14px
      color $color-text-gray
      background $color-bg-white
    &-navigations
      position absolute
      bottom 10px
      left 50%
      transform translateX(-50%)
      display flex
      justify-content center
      align-items center
    &-navigation
      margin 10px
      border-radius 50%
      width 24px
      height 24px
      font-size 12px
      color $color-text-gray
      background $color-bg
      text-align center
      line-height 26px
      cursor pointer
      transition all .3s
      &:hover,
      &-active
        color $color-text-white
        background $color-bg-blue
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
    &-buttons
      margin-top 20px
      width 100%
      display flex
      justify-content space-between
      align-items center
    &-button
      margin-right 20px
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
