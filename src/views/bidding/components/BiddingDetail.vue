<template>
  <div class="model-container" v-dialogDrag :data="biddingDetail.isShow" v-show="biddingDetail.isShow">
    <div class="model-wrapper">
      <div class="model-header">
        <div class="model-title">
          <div class="model-title-button">{{ biddingDetail.typeDesc }}</div>
          <div class="model-title-text">
            <span class="model-title-text-black">模具{{ biddingDetail.realMouldNo || "--" }}</span>
          </div>
          <div class="model-title-text">
            <span class="model-title-text-red">{{ biddingDetail.companyNum || "--" }}</span>
            <span class="model-title-text-gray">家公司正在参与竞价</span>
          </div>
        </div>
        <div class="model-cancel" @click="updateBiddingDetail({ isShow: false })"></div>
      </div>
      <div class="model-body">
        <div class="model-flex">
          <div class="model-flex-list">
            <div>
              <div class="model-flex-li">
                <span class="model-flex-li-label">模具寿命：</span>
                <span class="model-flex-li-text">{{ biddingDetail.lifetime || "--" }}万啤</span>
              </div>
            </div>
            <div>
              <div class="model-flex-li">
                <span class="model-flex-li-label">精度标准：</span>
                <span class="model-flex-li-text">{{ biddingDetail.toleranceValue || "--" }}</span>
              </div>
            </div>
          </div>
          <div class="model-flex-cells" v-if="biddingDetail.productInfos && biddingDetail.productInfos.length">
            <div
              class="model-flex-cell"
              v-for="(a, b) in biddingDetail.productInfos"
              :key="'_产品列表_' + b"
            >
              <div class="model-flex-cell-title">
                <span class="model-flex-cell-title-blue">产品：{{ a.productNo || "--" }}</span>
              </div>
              <div class="model-flex-cell-row">
                <div class="model-flex-cell-left">
                  <div class="model-flex-cell-image" @click="getProductInfo(b)" @contextmenu.prevent="onContextmenu($event, b)">
                    <img v-if="a.productImageFull" :src="a.productImageFull" alt="" />
                  </div>
                </div>
                <div class="model-flex-cell-right">
                  <div class="model-flex-cell-text">
                    <span>表面要求：</span>
                    <span>
                      {{ a.surfaceTreatment || "--" }}
                    </span>
                  </div>
                  <div class="model-flex-cell-text">
                    <span>产品穴数：</span>
                    <span>
                      {{ a.productNum || "--" }}
                    </span>
                  </div>
                  <div class="model-flex-cell-text">
                    <span>重量(g)：</span>
                    <span>
                      {{ a.productWeight || "--" }}
                    </span>
                  </div>
                  <div class="model-flex-cell-text">
                    <span>尺寸(mm)：</span>
                    <span>
                      {{ a.productLength || "--" }}
                      *{{ a.productWidth || "--" }} 
                      *{{ a.productHeight || "--" }}
                    </span>
                  </div>
                  <div class="model-flex-cell-text">
                    <span>材料及颜色：</span>
                    <span class="model-flex-cell-text-blue" @click="getMaterialAndColor(b)">
                      点击查看
                    </span>
                  </div>
                  <div class="model-flex-cell-text">
                    <span>二次工艺：</span>
                    <span class="model-flex-cell-text-blue" @click="getTechnology(b)">
                      点击查看
                    </span>
                  </div>
                  <div class="model-flex-cell-text">
                    <span>排模方案：</span>
                    <span class="model-flex-cell-text-blue" @click="getArrangementScheme(b)">
                      点击查看
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="model-flex" v-if="biddingDetail.biddingHeadInfo">
          <div class="model-flex-title">派单信息</div>
          <div class="model-flex-items">
            <div class="model-flex-item">
              <div class="model-flex-item-label">建议价格</div>
              <div class="model-flex-item-text">￥{{ biddingDetail.biddingHeadInfo.amount || "--" }}</div>
            </div>
            <div class="model-flex-item">
              <div class="model-flex-item-label">建议交期</div>
              <div class="model-flex-item-text">
                {{ biddingDetail.biddingHeadInfo.workPeriod || "--" }}
                {{ biddingDetail.biddingHeadInfo.unitDesc || "小时" }}
              </div>
            </div>
            <div class="model-flex-item">
              <div class="model-flex-item-label">准时率（≥）</div>
              <div class="model-flex-item-text">{{ biddingDetail.biddingHeadInfo.accuracy || "--" }}%</div>
            </div>
            <div class="model-flex-item">
              <div class="model-flex-item-label">失误率（≤）</div>
              <div class="model-flex-item-text">{{ biddingDetail.biddingHeadInfo.anerror || "--" }}%</div>
            </div>
            <div class="model-flex-item">
              <div class="model-flex-item-label">派单期限</div>
              <div class="model-flex-item-text">{{ biddingDetail.biddingHeadInfo.termTime || "--" }}</div>
            </div>
            <div class="model-flex-item">
              <div class="model-flex-item-label">交付地址</div>
              <div class="model-flex-item-text">{{ biddingDetail.biddingHeadInfo.address || "--" }}</div>
            </div>
          </div>
        </div>
        <div class="model-flex">
          <div class="model-flex-title" v-if="biddingDetail.biddingIndex">
            <span>我的竞价信息</span>
            <span class="model-flex-title-button model-flex-title-button-red" v-if="biddingDetail.getBiddingStatus">已中标</span>
            <span class="model-flex-title-button model-flex-title-button-gray" v-else>未中标</span>
          </div>
          <div class="model-flex-title" v-else>
            <span>竞价信息</span>
          </div>
          <div class="model-flex-items">
            <div class="model-flex-item" v-if="biddingDetail.joinBiddingInfo">
              <div class="model-flex-item-label">竞标价格</div>
              <div 
                class="model-flex-item-input"
                v-if="
                  biddingDetail.biddingIndex === 0 ||
                    biddingDetail.biddingIndex === 1
                "
              >
                <span>￥</span>
                <div 
                  class="model-flex-item-input-box" 
                  
                >
                  <input
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
                  />
                </div>
              </div>
              <div 
                class="model-flex-item-text"
                v-else
              >
                <span>￥</span>
                <span>
                  {{ biddingDetail.joinBiddingInfo.amount || 0 }}
                </span>
              </div>
            </div>
            <div class="model-flex-item">
              <div class="model-flex-item-label">竞标交期</div>
              <div 
                class="model-flex-item-input"
                v-if="
                  biddingDetail.biddingIndex === 0 ||
                    biddingDetail.biddingIndex === 1
                "
              >
                <div class="model-flex-item-input-box">
                  <input
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
                  />
                </div>
                <span>{{ biddingDetail.joinBiddingInfo.unitDesc || "小时" }}</span>
              </div>
              <div class="model-flex-item-text" v-else>
                <span>
                  {{ biddingDetail.joinBiddingInfo.workPeriod || "--" }}
                </span>
                <span>{{ biddingDetail.joinBiddingInfo.unitDesc || "小时" }}</span>
              </div>
            </div>
            <div class="model-flex-item">
              <div class="model-flex-buttons">
                <div
                  class="model-flex-button model-flex-button-blue"
                  @click="joinBidding()"
                  v-if="
                    biddingDetail.biddingIndex === 0 ||
                      biddingDetail.biddingIndex === 1
                  "
                >
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
          </div>
          <div
            class="model-flex-title"
            v-if="!biddingDetail.getBiddingStatus && biddingDetail.selectedUserBiddingInfo && (biddingDetail.biddingIndex === 2 || biddingDetail.biddingIndex === 3)"
          >
            中标信息
          </div>
          <div 
            class="model-flex-items"
            v-if="!biddingDetail.getBiddingStatus && biddingDetail.selectedUserBiddingInfo && (biddingDetail.biddingIndex === 2 || biddingDetail.biddingIndex === 3)"
          >
            <div class="model-flex-item">
              <div class="model-flex-item-label">中标价格</div>
              <div class="model-flex-item-text" >
                ￥{{ biddingDetail.selectedUserBiddingInfo.amount || "--" }}
              </div>
            </div>
            <div class="model-flex-item">
              <div class="model-flex-item-label">中标交期</div>
              <div class="model-flex-item-text">
                {{ biddingDetail.selectedUserBiddingInfo.workPeriod || "--" }}
                {{ biddingDetail.selectedUserBiddingInfo.unitDesc || "小时" }}
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

  // public updateProductInfoIndex(params: { type: number; index: number; }) {
  //   const { biddingDetail } = this;
  //   const { type, index } = params || {};
  //   const { productInfoIndex = -1, productInfos = [] } = biddingDetail || {};
  //   if (productInfoIndex < 0) {
  //     return;
  //   }
  //   if (type === 1) {
  //     if (productInfoIndex < productInfos.length - 1) {
  //       this.updateBiddingDetail({ productInfoIndex: productInfoIndex + 1 });
  //     }
  //   } else if (type === 2) {
  //     if (productInfoIndex > 0) {
  //       this.updateBiddingDetail({ productInfoIndex: productInfoIndex - 1 });
  //     }
  //   } else if (type === 3) {
  //     this.updateBiddingDetail({ productInfoIndex: index });
  //   }
  // }

  public onContextmenu(event: any, productInfoIndex = -1) {
    const { biddingDetail } = this;
    const { productInfos = [], biddingIndex } = biddingDetail || {};
    if (biddingIndex < 2) {
      return;
    }
    const { fileUrlFull, productImageFull } = productInfos[productInfoIndex] || {};
    // @ts-ignore
    this.$contextmenu({
      items: [
        { 
          label: "下载", 
          icon: "el-icon-download",
          onClick: () => {
            if (fileUrlFull) {
              downloadFile(fileUrlFull, fileUrlFull);
            } else {
              downloadFile(productImageFull, productImageFull);
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
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 80%
    height 70%
    background $color-bg-white
    display flex
    flex-direction column
    justify-content flex-start
    align-items flex-start
  &-header
    width 100%
    display flex
    justify-content space-between
    align-items center
    padding 20px 20px 15px 20px
  &-title
    display flex
    justify-content flex-start
    align-items center
    &-text
      margin-left 20px
      display flex
      justify-content flex-start
      align-items center
      &-black
        font-size 16px
        color $color-text-black
      &-red
        font-size 18px
        color $color-text-red
      &-gray
        font-size 14px
        color $color-text-gray
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
    flex 1
    width 100%
    border-top solid 1px $color-bd
    display flex
    justify-content flex-start
    align-items flex-start
    overflow auto
  &-flex
    border-right solid 1px $color-bd
    flex 1
    height 100%
    display flex
    flex-direction column
    justify-content flex-start
    align-items flex-start
    &:nth-last-of-type(1)
      border-right none
    &-title
      font-size 16px
      color $color-text-black
      font-weight bold
      margin 16px 24px
      &-button
        margin-left 5px
        padding 4px 8px
        border-radius 4px
        font-size 12px
        color $color-text-blue
        background rgba($color-bg-blue, .3)
        &-blue
          color $color-text-white
          background rgba($color-bg-blue, 1)
          cursor pointer
        &-red
          color $color-text-white
          background rgba($color-bg-red, 1)
          cursor pointer
        &-gray
          color $color-text-white
          background rgba(#BFBFBF, 1)
          cursor pointer
    &-list
      width 100%
      display flex
      justify-content flex-start
      align-items flex-start
      background #F2F2F2
    &-li
      display flex
      justify-content flex-start
      align-items center
      margin 16px 12px
      &-label
        min-width 80px
        text-align right
        font-size 14px
        color: black
      &-text
        text-align left
        font-size 14px
        color black
        &-red
          font-size 16px
          color red
    &-cells
      width 100%
      flex 1
      overflow auto
      padding 0 24px
    &-cell
      padding 6px 0
      border-bottom solid 1px #EEEEEE
      &:nth-last-of-type(1) 
        border-bottom solid 1px transparent
      &-title
        padding 12px 0
        font-size 16px
        font-weight bold
        &-blue
          color $color-text-blue
      &-row
        display flex
        justify-content flex-start
        align-items flex-start
      &-left
        margin-right 24px
      &-right
        flex 1
      &-image
        width 120px
        height 120px
        background #F2F2F2
        margin 0 0 10px 0
        img
          width 100%
          height 100%
          object-fit contain
      &-text
        margin 0 0 10px 0
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
    &-items
      width 100%
      overflow auto
      padding 0 24px
    &-item
      padding 10px 0
      display flex
      justify-content flex-start
      align-items center
      &-label
        min-width 100px
        font-size 14px
        color $color-text-black
      &-text
        flex 1
        font-size 14px
        color $color-text-black
        &-red
          font-size 16px
          color $color-text-red
      &-input
        max-width 150px
        min-width 100px
        display flex
        justify-content flex-start
        align-items center
        border-radius 4px
        border solid 1px $color-bd
        padding 8px
        cursor pointer
        &:hover
          border solid 1px $color-bd-blue
        &-box
          flex 1
          margin 0 8px
          input
            width 100%
            outline none
            border none
            font-size 14px
            color $color-text-gray
        

    &-row
      display flex
      justify-content space-between
      align-items center
      overflow auto
      margin 16px 24px
    // &-input
    //   max-width 100px
    //   min-height 30px
    //   border solid 1px $color-bd
    //   border-radius 4px
    //   outline none
    //   font-size 14px
    //   color $color-text-gray
    //   margin 0 8px
    //   padding 4px 8px
    &-buttons
      margin-top 40px
      width 100%
      display flex
      justify-content flex-start
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
