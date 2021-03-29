<template>
  <div class="model-container" v-show="clampingPlan.isShow">
    <div class="model-wrapper">
      <div class="model-header">
        <div class="model-title">
          <div class="model-title-text">合模方案</div>
        </div>
        <div
          class="model-cancel"
          @click="updateClampingPlan({ isShow: false })"
        ></div>
      </div>
      <div class="model-body" v-if="clampingPlan.matchedPlan">
        <div class="model-label">合模方案</div>
        <div class="model-text">合模产品拼图：</div>
        <div class="model-images" v-if="clampingPlan.mouldLabeImages.length">
          <el-image class="model-image" v-show="a"  :src="a" v-for="(a, b) in clampingPlan.mouldLabeImages" :key="b" :preview-src-list="clampingPlan.mouldLabeImages"></el-image>
        </div>
        <div class="model-row">
          <div class="model-flex">
            <div class="model-flex-label">模具类型：</div>
            <div class="model-flex-input">{{ clampingPlan.matchedPlan.mouldType || "" }}</div>
          </div>
          <div class="model-flex">
            <div class="model-flex-label">是否加硬模具：</div>
            <div class="model-flex-input" v-if="clampingPlan.matchedPlan.isHardnessMould === 1">是</div>
            <div class="model-flex-input" v-else-if="clampingPlan.matchedPlan.isHardnessMould === 0">否</div>
          </div>
        </div>
        <div class="model-row">
          <div class="model-flex">
            <div class="model-flex-label">水口类型：</div>
            <div class="model-flex-input">{{ clampingPlan.matchedPlan.gateType || "" }}</div>
          </div>
          <div class="model-flex">
            <div class="model-flex-label">预估水口重量（g）：</div>
            <div class="model-flex-input">{{ clampingPlan.matchedPlan.predictGateWeight || "" }}</div>
          </div>
        </div>
        <div class="model-text">转水口：</div>
        <div class="model-row" v-show="clampingPlan.matchedPlan.gateItems.length" v-for="(a, b) in clampingPlan.matchedPlan.gateItems" :key="b">
          <div class="model-flex">
            <div class="model-flex-label">转水口{{ a.gateSort || "" }}：</div>
            <div class="model-flex-input">{{ a.productIds || "" }}</div>
            <div class="model-flex-label">{{ a.productIds || "" }}</div>
          </div>
        </div>
        <div class="model-line"></div>
        <div class="model-row">
          <div class="model-flex">
            <div class="model-flex-label">热流道类型：</div>
            <div class="model-flex-input">{{ clampingPlan.matchedPlan.hotRunnerType || "" }}</div>
          </div>
          <div class="model-flex">
            <div class="model-flex-label">是否有模温机：</div>
            <div class="model-flex-input" v-if="clampingPlan.matchedPlan.isMouldTemperature === 1">是</div>
            <div class="model-flex-input" v-else-if="clampingPlan.matchedPlan.isMouldTemperature === 0">否</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("order/mould");

import { Supplier } from "@/store/modules/order/state";
import { InitInfo, Mould, ClampingPlan } from "@/store/modules/order/modules/mould/state";
import { GetterTypes } from "@/store/modules/order/modules/mould/getters";
import { ActionTypes } from "@/store/modules/order/modules/mould/actions";
import { MutationTypes } from "@/store/modules/order/modules/mould/mutations";

import downloadByUrl from "@/utils/downloadByUrl";

import { Message, MessageBox } from "element-ui";

import { UploadForm } from "@/api";
import { BASE_IMAGE_URL } from "@/config";

@Component({
  name: "ClampingPlanModel",
  components: {}
})
export default class ClampingPlanModel extends Vue {
  public readonly BASE_IMAGE_URL = BASE_IMAGE_URL
  // 供应商类型列表
  public Supplier = Supplier;

  @State("initInfo")
  public initInfo!: any | InitInfo;
  @State("mould")
  public mould!: Mould;
  @State("clampingPlan")
  public clampingPlan!: any | ClampingPlan;

  // @Action(ActionTypes.UpdateBOMPageNum)
  // public updatePageNum!: Function;
  // @Action(ActionTypes.UpdateBOMPageSize)
  // public updatePageSize!: Function;
  // @Action(ActionTypes.ImportBom)
  // public importBom!: Function;
  // @Action(ActionTypes.ApprovalBom)
  // public approvalBom!: Function;

  @Mutation(MutationTypes.UpdateClampingPlan)
  public updateClampingPlan!: Function;

  // public downloadFile(url: string, name: string) {
  //   if (url) {
  //     downloadByUrl(url, name);
  //   }
  // }

  // public checkFile() {
  //   const dom: any = document.querySelector("#file");
  //   dom.click();
  // }
  // public async uploadFile(e: any) {
  //   try {
  //     const file = e.target.files[0];
  //     const formData = new FormData();
  //     formData.append("files", file);
  //     const { success, message, data }: any = await UploadForm(formData);
  //     if (success) {
  //       const { pics = [] } = data || {};
  //       const { filePath = "", fileName, id } = pics[0];
  //       this.importBom(id);
  //     } else {
  //       Message.error(message);
  //     }
  //     e.target.value = null;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  // public showMessageBox() {
  //   const { Supplier, initInfo } = this;
  //   MessageBox({
  //     message: "",
  //     title: "温馨提示",
  //     confirmButtonText: "确定",
  //     cancelButtonText: "取消",
  //     showClose: true,
  //     showInput: true,
  //     closeOnClickModal: false,
  //     closeOnPressEscape: false,
  //     center: true,
  //     roundButton: false,
  //     showConfirmButton: true,
  //     showCancelButton: true
  //   })
  //     .then(({ action, value }: any) => {
  //       if (action === "confirm") {
  //         this.approvalBom({ cause: value, opinion: 0, role: Supplier.Machining === initInfo.type ? 1 : Supplier.Injection === initInfo.type ? 2 : 0 })
  //       }
  //     })
  //     .catch(() => {});
  // }
}
</script>

<style lang="stylus" scoped>
@import '../../../../../stylus/index.styl';
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
    max-width 90%
    max-height 90%
    min-width 80%
    min-height 80%
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
    width 100%
    flex 1
    padding 20px 40px
    display flex
    flex-direction column
    justify-content flex-start
    align-items flex-start
  &-label
    border-left 2px solid $color-text-blue
    padding 0 0 0 10px
    margin 16px 0
    color $color-text-black
    font-size 18px
  &-text
    margin 16px 0
    color $color-text-black
    font-size 16px
  &-line
    margin 16px 0
    height 1px
    width 100%
    background $color-bd-grey
  &-images
    display flex
    flex-wrap wrap
    justify-content flex-start
    align-items center
  &-image
    width 80px
    height 80px
    object-fit contain
    margin 16px
  &-row
    width 100%
    margin 16px 0
    display flex
    justify-content flex-start
    align-items center
  &-flex
    flex 1
    display flex
    justify-content flex-start
    align-items center
    &-label
      font-size 14px
      color $color-text-gray
    &-input
      min-width 120px
      min-height 26px
      font-size 12px
      color $color-text-gray
      border solid 1px $color-bd-grey
      border-radius 3px
      padding 6px 12px
</style>
