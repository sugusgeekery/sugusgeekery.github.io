<template>
  <div class="design" v-if="design.stepInfoList && design.stepInfoList.length">
    <div
      class="design-item"
      v-for="(a, b) in design.stepInfoList"
      :key="'_方案设计步骤_' + b"
    >
      <div class="design-item-label">
        <div
          class="design-item-label-number"
          :class="{
            'design-item-label-number-gray': a.isFinished === null,
            'design-item-label-number-blue': a.isFinished === 0,
            'design-item-label-number-white': a.isFinished === 1
          }"
        >
          {{ b + 1 }}
        </div>
        <div
          class="design-item-label-line"
          v-if="b < design.stepInfoList.length - 1"
          :class="{
            'design-item-label-line-blue': a.isFinished === 0 || a.isFinished === 1,
            'design-item-label-line-gray': a.isFinished === null
          }"
        ></div>
      </div>
      <div class="design-item-content">
        <div class="design-item-content-text">
          <span
            class="design-item-content-text-blue design-item-content-text-pointer"
            v-if="Supplier.Dfm === initInfo.type"
            @click="a.isFinished === 0 || a.isFinished === 1 ? alertModel({ label: b + 1, isEdit: false }) : null"
          >
            {{ a.isFinished === 0 ? "查看" : a.isFinished === 1 ? "查看" : "" }}{{ a.stepName }}
          </span>
          <span
            class="design-item-content-text-blue design-item-content-text-pointer"
            v-if="Supplier.Design === initInfo.type"
            @click="a.isFinished === 0 || a.isFinished === 1 ? alertModel({ label: b + 1, isEdit: a.isFinished === 0 }) : null"
          >
            {{ a.isFinished === 0 ? (b > 0 ? "导入" : "上传") : a.isFinished === 1 ? "查看" : ""}}{{ a.stepName }}
          </span>
          <span
            class="design-item-content-text-blue design-item-content-text-pointer"
            v-if="Supplier.Machining === initInfo.type || Supplier.Injection === initInfo.type"
            @click="a.isFinished === 0 || a.isFinished === 1 ? alertModel({ label: b + 1, isEdit: a.isFinished === 0 }) : null"
          >
            {{ a.isFinished === 0 ? "验收" : a.isFinished === 1 ? "查看" : "" }}{{ a.stepName }}
          </span>
          <span
            class="design-item-content-text-blue design-item-content-text-pointer"
            v-if="a.fileName"
          >
            {{ a.fileName || "" }}
          </span>
          <span
            class="design-item-content-text-gray design-item-content-text-pointer"
            v-if="a.filePath"
            @click="downloadFile(a.filePath, a.fileName)"
          >
            下载
          </span>
          <span class="design-item-content-text-gray" v-if="a.fileTime">
            {{ a.fileTime || "" }}
          </span>
        </div>


        <div
          class="design-item-content-text"
          v-for="(c, d) in a.approvalInfoList"
          :key="'_方案设计步骤详情对应处理方_' + d"
          v-show="Supplier.Design === initInfo.type || Supplier.Dfm === initInfo.type"
        >
          <span class="design-item-content-text-black" v-if="c.type == 1">
            加工方：
          </span>
          <span class="design-item-content-text-black" v-else-if="c.type == 2">
            注塑方：
          </span>
          <span class="design-item-content-text-red" v-if="c.opinion === 0">
            驳回
          </span>
          <span
            class="design-item-content-text-blue design-item-content-text-pointer"
            v-if="c.opinion === 0"
            @click="alertMessage(a.cause)"
          >
            查看详情
          </span>
          <span
            class="design-item-content-text-green"
            v-else-if="c.opinion === 1"
          >
            验收通过
          </span>
          <span class="design-item-content-text-gray">{{
            c.approvalTime || ""
          }}</span>
        </div>
        <div class="design-item-content-button" v-if="Supplier.Design === initInfo.type && (a.approveStatus === 0 || a.approveStatus === 2) && b === 0">
          <input
            type="file"
            name="file"
            id="file"
            hidden="hidden"
            accept=".step, .stp, .stl"
            @change="uploadFile"
          />
          <span class="design-item-content-button-text" @click="checkFile()">
            点击上传
          </span>
        </div>


        <div class="design-item-content-button" v-if="(Supplier.Machining === initInfo.type || Supplier.Injection === initInfo.type) && a.isFinished === 0 && b === 0">
          <span
            class="design-item-content-button-text design-item-content-button-text-blue"
            @click="approvalDesign({ opinion: 1, role: Supplier.Machining === initInfo.type ? 1 : Supplier.Injection === initInfo.type ? 2 : 0 })"
            >通过</span
          >
          <span
            class="design-item-content-button-text"
            @click="approvalDesign({ opinion: 0, role: Supplier.Machining === initInfo.type ? 1 : Supplier.Injection === initInfo.type ? 2 : 0 })"
            >驳回</span
          >
        </div>
      </div>
    </div>
    <BOMTableModel></BOMTableModel>
    <BOMImageInfoModel></BOMImageInfoModel>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("order/design");

import { Supplier } from "@/store/modules/order/state";
import { InitInfo, Design } from "@/store/modules/order/modules/design/state";
import { ActionTypes } from "@/store/modules/order/modules/design/actions";

import downloadByUrl from "@/utils/downloadByUrl";
import { Message, MessageBox } from "element-ui";

import { UploadForm } from "@/api";

import BOMTableModel from "./models/BOMTableModel.vue";
import BOMImageInfoModel from "./models/BOMImageInfoModel.vue";

@Component({
  name: "DesignView",
  components: {
    BOMTableModel,
    BOMImageInfoModel
  }
})
export default class DesignView extends Vue {
  // 供应商类型列表
  public Supplier = Supplier;

  @State("initInfo")
  public initInfo!: InitInfo;
  @State("design")
  public design!: Design;

  @Action(ActionTypes.GetStepDetail)
  public getStepDetail!: Function;
  @Action(ActionTypes.GetBOMList)
  public getBOMList!: Function;
  @Action(ActionTypes.ImportDesign)
  public importDesign!: Function;
  @Action(ActionTypes.GetBOMImageInfo)
  public getBOMImageInfo!: Function;
  @Action(ActionTypes.ApprovalDesign)
  public approvalDesign!: Function;

  public checkFile() {
    const dom: any = document.querySelector("#file");
    dom.click();
    dom.value = "";
  }
  public async uploadFile(e: any) {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("files", file);
      const { success, message, data }: any = await UploadForm(formData);
      if (success) {
        const { pics = [] } = data || {};
        const { filePath = "", fileName, id } = pics[0];
        this.importDesign({ threeFacePlanFileId: id });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  public created() {
    this.getStepDetail();
  }
  public downloadFile(url: string, name: string) {
    if (url) {
      downloadByUrl(url, name);
    }
  }
  public alertMessage(content: string) {
    MessageBox.alert(
      content || "",
      "驳回原因"
    );
  }
  public alertModel(params: { label: number; isEdit: boolean;}) {
    const { label = 0, isEdit = false } = params;
    if (label === 2) {
      this.getBOMList(isEdit);
    } else if (label === 3) {
      this.getBOMImageInfo(isEdit);
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../stylus/index.styl';
.design
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  padding 80px
  overflow auto
  &-item
    margin 10px
    display flex
    justify-content flex-start
    align-items flex-start
    &-label
      display flex
      flex-direction column
      justify-content flex-start
      align-items center
      &-number
        margin 10px
        border-radius 100px
        width 42px
        height 42px
        line-height 42px
        text-align center
        font-size 20px
        border solid 1px $color-bd-gray
        background $color-bg-white
        color $color-text-gray
        &-gray
          border solid 1px $color-bd-gray
          background $color-bg-white
          color $color-text-gray
        &-blue
          border solid 1px $color-bd-blue
          background $color-bg-blue
          color $color-text-white
        &-white
          border solid 1px $color-bd-blue
          background $color-bg-white
          color $color-text-blue
      &-line
        border-radius 100px
        width 2px
        height 120px
        background $color-bg-gray
        &-gray
          background $color-bg-gray
        &-blue
          background $color-bg-blue
    &-content
      padding 10px
      &-text
        font-size 14px
        margin 15px 0
        &-pointer
          cursor pointer
        &-black
          color $color-text-black
          margin-right 20px
        &-blue
          color $color-text-blue
          margin-right 20px
        &-green
          color $color-text-green
          margin-right 20px
        &-red
          color $color-text-red
          margin-right 20px
        &-gray
          color $color-text-gray
          margin-right 20px
      &-button
        &-text
          padding 6px 10px
          border-radius 4px
          border solid 1px $color-bd-blue
          font-size 14px
          color $color-text-blue
          cursor pointer
          margin-right 14px
          &-blue
            border solid 1px $color-bd-blue
            color $color-text-white
            background $color-bg-blue
</style>
