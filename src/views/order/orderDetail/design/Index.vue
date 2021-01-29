<template>
  <div class="design">
    <div
      class="design-item"
      v-for="(a, b) in design.stepList"
      :key="'_方案设计步骤_' + b"
    >
      <div class="design-item-label">
        <div
          class="design-item-label-number"
          :class="{
            'design-item-label-number-gray': design.step < a.label,
            'design-item-label-number-blue': design.step === a.label,
            'design-item-label-number-white': design.step > a.label
          }"
        >
          {{ a.label }}
        </div>
        <div
          class="design-item-label-line"
          v-if="b < design.stepList.length - 1"
          :class="{
            'design-item-label-line-blue': design.step >= a.label,
            'design-item-label-line-gray': design.step < a.label
          }"
        ></div>
      </div>
      <div class="design-item-content" v-if="design.step > a.label">
        <div class="design-item-content-text">
          <span
            class="design-item-content-text-blue design-item-content-text-pointer"
            v-if="a.isLink"
            @click="alertModel(a.label)"
          >
            {{ a.text }}
          </span>
          <span class="design-item-content-text-black" v-else>
            {{ a.text }}
          </span>
          <span
            class="design-item-content-text-blue design-item-content-text-pointer"
          >
            {{ a.fileName || "" }}
          </span>
          <span
            class="design-item-content-text-gray design-item-content-text-pointer"
            @click="downloadFile(a.filePath, a.fileName)"
          >
            下载
          </span>
          <span class="design-item-content-text-gray">
            {{ a.fileTime || "" }}
          </span>
        </div>
        <div
          class="design-item-content-text"
          v-for="(c, d) in a.map"
          :key="'_方案设计步骤详情对应处理方_' + d"
        >
          <span class="design-item-content-text-black" v-if="c.role === 0">
            加工方：
          </span>
          <span class="design-item-content-text-black" v-else-if="c.role === 1">
            注塑方：
          </span>
          <span class="design-item-content-text-red" v-if="c.status === 0">
            驳回
          </span>
          <span
            class="design-item-content-text-blue design-item-content-text-pointer"
            v-if="c.status === 0"
            @click="alertMessage(a.describe)"
          >
            查看详情
          </span>
          <span
            class="design-item-content-text-green"
            v-else-if="c.status === 1"
          >
            验收通过
          </span>
          <span class="design-item-content-text-gray">{{
            c.datetime || ""
          }}</span>
        </div>
      </div>
      <div class="design-item-content" v-else>
        <div class="design-item-content-text">
          <span
            class="design-item-content-text-blue design-item-content-text-pointer"
            v-if="a.isLink"
          >
            {{ a.text }}
          </span>
          <span class="design-item-content-text-black" v-else>
            {{ a.text }}
          </span>
        </div>
        <div class="design-item-content-button" v-if="b === 0">
          <span class="design-item-content-button-text">点击上传</span>
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

import { Design } from "@/store/modules/order/modules/design/state";
import { ActionTypes } from "@/store/modules/order/modules/design/actions";

import downloadByUrl from "@/utils/downloadByUrl";
import { MessageBox } from "element-ui";

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
  @State("design")
  public design!: Design;

  @Action(ActionTypes.GetStep)
  public getStep!: Function;
  @Action(ActionTypes.GetBOMList)
  public getBOMList!: Function;
  @Action(ActionTypes.GetBOMImageInfo)
  public getBOMImageInfo!: Function;

  public created() {
    this.getStep();
    // this.getBOMImageInfo();
  }
  public downloadFile(url: string, name: string) {
    if (url) {
      downloadByUrl(url, name);
    }
  }
  public alertMessage(content: string) {
    MessageBox.alert(
      content || "的时间里发酵按时发链接爱上了发生的激发了圣诞节福利",
      "驳回原因"
    );
  }
  public alertModel(label: number) {
    if (label === 2) {
      this.getBOMList();
    } else if (label === 3) {
      this.getBOMImageInfo();
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
          font-size 16px
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
</style>
