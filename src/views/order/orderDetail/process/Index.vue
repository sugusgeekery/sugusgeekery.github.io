<template>
  <div class="process">
    <input
      type="file"
      name=""
      multiple="multiple"
      hidden="hidden"
      id="fileElement"
      @change="uploadFile"
    />
    <div class="items">
      <div class="item" v-for="(a, b) in stepList" :key="b">
        <div class="item-label">
          <div
            class="item-label-top"
            :class="{ 'item-label-top-blue': a.isFinished || a.isNext === 1 }"
          ></div>
          <div
            class="item-label-circle"
            :class="{
              'item-label-circle-blue': a.isFinished || a.isNext === 1
            }"
          ></div>
          <div
            class="item-label-bottom"
            :class="{ 'item-label-bottom-blue': a.isFinished }"
            v-if="b < stepList.length - 1"
          ></div>
        </div>
        <div class="item-content">
          <div
            class="item-content-text"
            v-if="initOption.type === Supplier.Injection"
          >
            20201112
          </div>
          <div class="item-content-title">{{ a.stepName }}</div>
        </div>
        <div class="item-buttons" v-if="a.isNext === 1">
          <div class="item-button item-button-blue" @click="selectFile(b)">
            上传照片
          </div>
          <div class="item-button" @click="finishStep(b)">完成</div>
        </div>
        <div class="item-images" v-if="a.fileList && a.fileList.length">
          <div
            class="item-image"
            v-for="(c, d) in a.fileList"
            :key="d"
            v-show="c.filePath"
          >
            <img
              class="item-image-icon"
              :src="BASE_IMAGE_URL + c.filePath"
              alt=""
            />
            <div
              class="item-image-delete"
              v-if="a.isNext === 1"
              @click="deleteStepFile({ index: b, key: d })"
            >
              X
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-black" v-if="initOption.type === Supplier.Machining">
      完成所有加工环节后点击此按钮
    </div>
    <div class="text-black" v-else-if="initOption.type === Supplier.Injection">
      完成所有注塑环节工作后点击此按钮
    </div>
    <div class="buttons">
      <div
        class="button"
        v-if="initOption.type === Supplier.Machining"
        @click="commitStep()"
      >
        完成加工阶段
      </div>
      <div
        class="button"
        v-else-if="initOption.type === Supplier.Injection"
        @click="commitStep()"
      >
        完成注塑阶段
      </div>
    </div>
    <div class="text-gray" v-if="initOption.type === Supplier.Machining">
      提示：需要协助注塑方完成样件注塑，并将样件回给平台
    </div>
    <div class="text-gray" v-else-if="initOption.type === Supplier.Injection">
      提示：如果是试模，需要将样件给到加工方，寄回给平台
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("order/process");

import { Supplier } from "@/store/modules/order/state";
import {
  InitOption,
  StepList
} from "@/store/modules/order/modules/process/state";
import { ActionTypes } from "@/store/modules/order/modules/process/actions";

import { BASE_IMAGE_URL } from "@/config";

@Component({
  name: "ProcessView",
  components: {}
})
export default class ProcessView extends Vue {
  // 供应商类型列表
  public Supplier = Supplier;

  // 图片域名
  public BASE_IMAGE_URL = BASE_IMAGE_URL;

  @State("initOption")
  public initOption!: InitOption;
  @State("stepList")
  public stepList!: Array<StepList>;

  @Action(ActionTypes.GetStepList)
  public GetStepList!: Function;
  @Action(ActionTypes.UploadForm)
  public uploadForm!: Function;
  @Action(ActionTypes.FinishStep)
  public finishStep!: Function;
  @Action(ActionTypes.CommitStep)
  public commitStep!: Function;
  @Action(ActionTypes.DeleteStepFile)
  public deleteStepFile!: Function;

  public created() {
    this.GetStepList();
  }
  public mounted() {}

  public index = -1;
  public selectFile(b: number) {
    this.index = b;
    const dom: any = document.querySelector("#fileElement");
    dom.click();
  }
  public uploadFile(e: any) {
    const files = e.target.files;
    let len = files.length;
    while (len > 0) {
      this.uploadForm({ file: files[files.length - len], index: this.index });
      len--;
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../stylus/index.styl';

.process
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  overflow auto
  .text-black
    font-size 16px
    color $color-text-black
    margin 20px 40px
  .text-gray
    font-size 14px
    color $color-text-gray
    margin 20px 40px
  .buttons
    display flex
    justify-content flex-start
    align-items center
    margin 40px
  .button
    border-radius 4px
    padding 10px 20px
    font-size 14px
    border solid 1px $color-bd-blue
    color $color-text-blue
    background $color-bg-white
    cursor pointer
    margin 0 10px 0 0
    min-width 80px
    text-align center
    &-blue
      border solid 1px $color-bd-blue
      color $color-text-white
      background $color-bg-blue
  .items
    padding 40px
    .item
      display flex
      justify-content flex-start
      align-items center
      position relative
      min-height 80px
      &-label
        margin-right 30px
        &-top
          position absolute
          top 0
          left 0
          width 2px
          height 50%
          background $color-bd
          &-blue
            background $color-bd-blue
        &-bottom
          position absolute
          bottom 0
          left 0
          width 2px
          height 50%
          background $color-bd
          &-blue
            background $color-bd-blue
        &-circle
          position absolute
          top 50%
          left 0
          width 10px
          height 10px
          border-radius 100px
          transform translate(-40%, -50%)
          background $color-bd
          z-index 9
          &-blue
            background $color-bd-blue
      &-content
        margin-right 30px
        &-text
          font-size 12px
          color $color-text-gray
          margin-bottom 6px
        &-title
          font-size 14px
          color $color-text-black
      &-buttons
        display flex
        justify-content flex-start
        align-items center
        margin-right 20px
      &-button
        border-radius 4px
        padding 5px 10px
        font-size 14px
        border solid 1px $color-bd-blue
        color $color-text-blue
        background $color-bg-white
        cursor pointer
        margin 0 10px
        min-width 80px
        text-align center
        &-blue
          border solid 1px $color-bd-blue
          color $color-text-white
          background $color-bg-blue
      &-images
        display flex
        justify-content flex-start
        align-items center
      &-image
        width 50px
        height 50px
        margin-right 10px
        position relative
        background $color-bg-blue-white
        border-radius 4px
        &-icon
          width 100%
          height 100%
          object-fit contain
        &-delete
          display none
        &:hover
          .item-image-delete
            position absolute
            top 0
            right 0
            width 30%
            height 30%
            display flex
            justify-content center
            align-items center
            border-radius 100px
            background $color-bg-blue-white
            color $color-text-red
            cursor pointer
</style>
