<template>
  <div class="process">
    <input
      type="file"
      name="file"
      hidden="hidden"
      id="file"
      accept="image/*"
      @change="uploadFile"
    />
    <div class="items" v-if="initInfo.type === Supplier.Machining && machinStepList && machinStepList.length">
      <div class="items-text">加工</div>
      <div class="item" v-for="(a, b) in machinStepList" :key="b">
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
            v-if="b < machinStepList.length - 1"
          ></div>
        </div>
        <div class="item-content">
          <div
            class="item-content-text"
            v-if="initInfo.type === Supplier.Injection"
          >
            20201112
          </div>
          <div class="item-content-title">{{ a.stepName }}</div>
        </div>
        <div class="item-buttons" v-if="a.isNext === 1">
          <div class="item-button item-button-blue" @click="selectFile({ type: 1, index: b })">
            上传照片
          </div>
          <div class="item-button" @click="finishedStep({ type: 1, index: b })">完成</div>
        </div>
        <div class="item-images" v-if="a.fileInfos && a.fileInfos.length">
          <div
            class="item-image"
            v-for="(c, d) in a.fileInfos"
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
              @click="deleteStepFile({ type: 1, index: b, key: d })"
            >
              X
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="items" v-if="initInfo.type === Supplier.Machining && assembleStepList && assembleStepList.length">
      <div class="items-text">装配</div>
      <div class="item" v-for="(a, b) in assembleStepList" :key="b">
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
            v-if="b < assembleStepList.length - 1"
          ></div>
        </div>
        <div class="item-content">
          <div
            class="item-content-text"
            v-if="initInfo.type === Supplier.Injection"
          >
            20201112
          </div>
          <div class="item-content-title">{{ a.stepName }}</div>
        </div>
        <div class="item-buttons" v-if="a.isNext === 1">
          <div class="item-button item-button-blue" @click="selectFile({ type: 2, index: b })">
            上传照片
          </div>
          <div class="item-button" @click="finishedStep({ type: 2, index: b })">完成</div>
        </div>
        <div class="item-images" v-if="a.fileInfos && a.fileInfos.length">
          <div
            class="item-image"
            v-for="(c, d) in a.fileInfos"
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
              @click="deleteStepFile({ type: 2, index: b, key: d })"
            >
              X
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="items" v-if="initInfo.type === Supplier.Injection && injectionStepList && injectionStepList.length">
      <div class="items-text">试模</div>
      <div class="item" v-for="(a, b) in injectionStepList" :key="b">
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
            v-if="b < injectionStepList.length - 1"
          ></div>
        </div>
        <div class="item-content">
          <!-- <div
            class="item-content-text"
            v-if="initInfo.type === Supplier.Injection"
          >
            20201112
          </div> -->
          <div class="item-content-title">{{ a.stepName }}</div>
        </div>
        <div class="item-buttons" v-if="a.isNext === 1">
          <div class="item-button item-button-blue" @click="selectFile({ type: 3, index: b })">
            上传照片
          </div>
          <div class="item-button" @click="finishedStep({ type: 3, index: b })">完成</div>
        </div>
        <div class="item-images" v-if="a.fileInfos && a.fileInfos.length">
          <div
            class="item-image"
            v-for="(c, d) in a.fileInfos"
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
              @click="deleteStepFile({ type: 3, index: b, key: d })"
            >
              X
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- <div class="text-black" v-if="initInfo.type === Supplier.Machining">
      完成所有加工环节后点击此按钮
    </div>
    <div class="text-black" v-else-if="initInfo.type === Supplier.Injection">
      完成所有试模环节工作后点击此按钮
    </div>
    <div class="buttons">
      <div
        class="button"
        v-if="initInfo.type === Supplier.Machining"
        @click="commitStep()"
      >
        完成加工阶段
      </div>
      <div
        class="button"
        v-else-if="initInfo.type === Supplier.Injection"
        @click="commitStep()"
      >
        完成试模阶段
      </div>
    </div>
    <div class="text-gray" v-if="initInfo.type === Supplier.Machining">
      提示：需要协助试模方完成样件试模，并将样件回给平台
    </div>
    <div class="text-gray" v-else-if="initInfo.type === Supplier.Injection">
      提示：如果是试模，需要将样件给到加工方，寄回给平台
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("order/process");

import { Supplier } from "@/store/modules/order/state";
import {
  InitInfo,
  MachinStepList,
  AssembleStepList,
  InjectionStepList,
} from "@/store/modules/order/modules/process/state";
import { ActionTypes } from "@/store/modules/order/modules/process/actions";
import { MutationTypes } from "@/store/modules/order/modules/process/mutations";

import { BASE_IMAGE_URL } from "@/config";
import { Message, MessageBox } from "element-ui";

import { UploadForm } from "@/api";

@Component({
  name: "ProcessView",
  components: {}
})
export default class ProcessView extends Vue {
  // 供应商类型列表
  public Supplier = Supplier;

  // 图片域名
  public BASE_IMAGE_URL = BASE_IMAGE_URL;

  @State("initInfo")
  public initInfo!: any | InitInfo;
  @State("machinStepList")
  public machinStepList!: any | Array<MachinStepList>;
  @State("assembleStepList")
  public assembleStepList!: any | Array<AssembleStepList>;
  @State("injectionStepList")
  public injectionStepList!: any | Array<InjectionStepList>;

  @Action(ActionTypes.FinishedStep)
  public finishedStep!: Function;
  @Action(ActionTypes.DeleteStepFile)
  public deleteStepFile!: Function;

  @Mutation(MutationTypes.UpdateMachinStepList)
  public updateMachinStepList!: Function;
  @Mutation(MutationTypes.UpdateAssembleStepList)
  public updateAssembleStepList!: Function;
  @Mutation(MutationTypes.UpdateInjectionStepList)
  public updateInjectionStepList!: Function;


  @Action(ActionTypes.GetMachinSteps)
  public getMachinSteps!: Function;
  @Action(ActionTypes.GetAssembleSteps)
  public getAssembleSteps!: Function;
  @Action(ActionTypes.GetInjectionSteps)
  public getInjectionSteps!: Function;
  // @Action(ActionTypes.UploadForm)
  // public uploadForm!: Function;
  
  // @Action(ActionTypes.CommitStep)
  // public commitStep!: Function;
  



  public created() {
    // this.GetStepList();
    const { type = "" } = this.initInfo || {};
    switch(type) {
      case Supplier.Dfm:
        break;
      case Supplier.Design:
        break;
      case Supplier.Machining:
        this.getMachinSteps();
        this.getAssembleSteps();
        break;
      case Supplier.Injection:
        this.getInjectionSteps();
        break;
    }
  }
  public mounted() {}

  public type = -1;
  public index = -1;
  public selectFile({ type = 0, index = 0 }: { type: number, index: number}) {
    this.type = type;
    this.index = index;
    const dom: any = document.querySelector("#file");
    dom.click();
  }
  // public uploadFile(e: any) {
  //   const files = e.target.files;
  //   let len = files.length;
  //   while (len > 0) {
  //     this.uploadForm({ file: files[files.length - len], index: this.index });
  //     len--;
  //   }
  // }

  public async uploadFile(e: any) {
    try {
      const { type, index, machinStepList, assembleStepList, injectionStepList } = this;
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("files", file);
      const { success, message, data }: any = await UploadForm(formData);
      if (success) {
        const { pics = [] } = data || {};
        const { filePath = "", fileName, id } = pics[0];
        if (type === 1) {
          machinStepList[index].fileInfos = [...(machinStepList[index].fileInfos || []), { filePath, fileName, fileId: id }];
          this.updateMachinStepList(machinStepList);
        } else if (type === 2) {
          assembleStepList[index].fileInfos = [...(assembleStepList[index].fileInfos || []), { filePath, fileName, fileId: id }];
          this.updateAssembleStepList(assembleStepList);
        } else if (type === 3) {
          injectionStepList[index].fileInfos = [...(injectionStepList[index].fileInfos || []), { filePath, fileName, fileId: id }];
          this.updateInjectionStepList(injectionStepList);
        }
      } else {
        Message.error(message);
      }
      e.target.value = null;
    } catch (e) {
      throw new Error(e);
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
    padding 40px 60px
    &-text
      color $color-text-gray
      margin 0 0 20px -30px
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
        flex 1
        display flex
        flex-wrap wrap
        justify-content flex-start
        align-items center
      &-image
        width 50px
        height 50px
        margin 0 10px 10px 0
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
