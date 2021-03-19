<template>
  <div class="question">
    <div class="list" v-if="questionList && questionList.length">
      <div class="li" v-for="(a, b) in questionList" :key="b">
        <div class="li-title">{{ a.problemTitleId || "" }}{{ a.problemTitle || "" }}</div>
        <div class="li-row">
          <div class="li-flex">
            <div class="li-image">
              <img class="li-image-icon" v-for="(c, d) in a.fileList" :key="c.fileId + d" v-show="c.filePath" :src="BASE_IMAGE_URL + c.filePath" alt="" />
            </div>
          </div>
          <div class="li-flex">
            <div class="li-text">{{ a.problemDescription || "" }}</div>
            <div class="li-textarea" v-if="a.state === 0">
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="请输入问题分析与改善措施"
                :value="a.supplierAnswer"
                @change="updateQuestion({ value: $event.target.value, name: 'supplierAnswer', index: b })"
              ></textarea>
            </div>
            <div class="li-context" v-else>{{ a.supplierAnswer || "" }}</div>
            <div class="li-items">
              <div class="li-item" v-if="a.state === 0">
                <div class="li-item-text">是否需要修模：</div>
                <div class="li-item-select" @click="updateQuestion({ value: 0, name: 'isRepair', index: b })">
                  <div
                    class="li-item-select-label"
                    :class="{
                      'li-item-select-label-active': a.isRepair === 0
                    }"
                  ></div>
                  <div class="li-item-select-text">否</div>
                </div>
                <div class="li-item-select" @click="updateQuestion({ value: 1, name: 'isRepair', index: b })">
                  <div
                    class="li-item-select-label"
                    :class="{
                      'li-item-select-label-active': a.isRepair === 1
                    }"
                  ></div>
                  <div class="li-item-select-text">是</div>
                </div>
              </div>
              <div class="li-item" v-else>
                <div class="li-item-text">是否需要修模：</div>
                <div class="li-item-select">
                  <div class="li-item-select-text" v-if="a.isRepair">是</div>
                  <div class="li-item-select-text" v-else>否</div>
                </div>
              </div>
              <div class="li-item" v-if="a.state === 0">
                <div class="li-item-select-button li-item-select-button-blue" @click="answerQuestion({ index: b })">确认</div>
              </div>
              <div class="li-item" v-else-if="a.state === 1">
                <div class="li-item-image">
                  <img
                    class="li-item-image-icon"
                    src="../../../../assets/images/select_green.png"
                    alt=""
                  />
                </div>
                <div class="li-item-text li-item-text-p">已确认</div>
              </div>
              <div class="li-item" v-else-if="a.state === 2">
                <div class="li-item-image">
                  <img
                    class="li-item-image-icon"
                    src="../../../../assets/images/select_red.png"
                    alt=""
                  />
                </div>
                <div class="li-item-text li-item-text-p">已驳回</div>
                <div class="li-item-text li-item-text-p">
                  {{ a.reason || "" }}
                </div>
              </div>
              <div class="li-item" v-else-if="a.state === 3">
                <div class="li-item-text">待确认</div>
              </div>
            </div>
            <div class="li-buttons" v-if="a.state === 2">
              <div class="li-button li-button-blue" @click="updateQuestion({ index: b, value: 0, name: 'state' })">接受并修改</div>
              <div class="li-button" @click="showMessageBox(b)">不接受</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("order/question");

import { Supplier } from "@/store/modules/order/state";
import {
  InitInfo,
  QuestionList
} from "@/store/modules/order/modules/question/state";
import { ActionTypes } from "@/store/modules/order/modules/question/actions";
import { MutationTypes } from "@/store/modules/order/modules/question/mutations";

import { BASE_IMAGE_URL } from "@/config";
import { Message, MessageBox  } from "element-ui";

@Component({
  name: "QuestionView",
  components: {}
})
export default class QuestionView extends Vue {
  // 供应商类型列表
  public Supplier = Supplier;

  // 图片域名
  public BASE_IMAGE_URL = BASE_IMAGE_URL;

  @State("initInfo")
  public initInfo!: InitInfo;
  @State("questionList")
  public questionList!: any | Array<QuestionList>;

  @Action(ActionTypes.GetQuestionList)
  public getQuestionList!: Function;
  @Action(ActionTypes.AnswerQuestion)
  public answerQuestion!: Function;

  @Mutation(MutationTypes.UpdateQuestionList)
  public updateQuestionList!: Function;
  // @Action(ActionTypes.UploadForm)
  // public uploadForm!: Function;
  // @Action(ActionTypes.UpdateReportData)
  // public updateReportData!: Function;
  // @Action(ActionTypes.CommitReport)
  // public commitReport!: Function;
  // @Action(ActionTypes.ApprovalDfmReport)
  // public approvalDfmReport!: Function;
  // @Action(ActionTypes.DeleteReportFile)
  // public deleteReportFile!: Function;

  public created() {
    this.getQuestionList();
  }

  public updateQuestion(params: any) {
    const { questionList } = this;
    const { value, name, index } = params || {};
    questionList[index][name] = value;
    this.updateQuestionList(questionList);
  }

  public showMessageBox(b: number) {
    MessageBox({
      message: "",
      title: "温馨提示",
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      showClose: true,
      showInput: true,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      center: true,
      roundButton: false,
      showConfirmButton: true,
      showCancelButton: true
    })
      .then(({ action, value }: any) => {
        if (action === "confirm") {
          this.answerQuestion({ index: b, opinion: 0, replyContent: value })
        }
      })
      .catch(() => {});
  }
  // public mounted() {}

  // public index = -1;
  // public selectFile(b: number) {
  //   this.index = b;
  //   const dom: any = document.querySelector("#fileElement");
  //   dom.click();
  // }
  // public uploadFile(e: any) {
  //   const files = e.target.files;
  //   let len = files.length;
  //   while (len > 0) {
  //     this.uploadForm({ file: files[files.length - len], index: this.index });
  //     len--;
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
@import '../../../../stylus/index.styl';

.question
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  overflow auto
  .list
    padding 20px
    .li
      margin 20px
      padding 20px
      background $color-bg-blue-white
      border-radius 8px
      &-title
        color $color-text-black
        font-size 16px
      &-row
        display flex
        justify-content flex-start
        align-items flex-start
        margin-top 20px
      &-flex
        flex 1
      &-image
        border-radius 8px
        background $color-bg-white
        min-height 190px
        margin-right 20px
        display flex
        flex-wrap wrap
        justify-content flex-start
        align-items flex-start
        &-icon
          width 60px
          height 60px
          background $color-bg
          object-fit contain
          margin 10px
      &-text
        color $color-text-gray
        font-size 14px
      &-context
        color $color-text-black
        font-size 14px
        margin-top 20px
      &-textarea
        color $color-text-black
        font-size 14px
        margin-top 20px
        border-radius 8px
        background $color-bg-white
        padding 10px
        textarea
          width 100%
          height 60px
          outline none
          border none
      &-items
        margin-top 20px
        display flex
        justify-content space-between
        align-items center
      &-item
        display flex
        justify-content flex-start
        align-items center
        &-image
          width 20px
          height 20px
          margin-right 10px
          &-icon
            width 100%
            object-fit contain
        &-text
          color $color-text-black
          font-size 14px
          &-p
            padding-left 10px
        &-select
          margin-right 10px
          display flex
          justify-content flex-start
          align-items center
          cursor pointer
          &-label
            width 12px
            height 12px
            border-radius 100px
            border solid 1px $color-bd
            position relative
            margin-right 4px
            &-active
              border solid 1px $color-bd-blue
              &:after
                content ""
                position absolute
                top 50%
                left 50%
                width 6px
                height 6px
                transform translate(-50%, -50%)
                border-radius 100px
                background $color-bg-blue
          &-text
            font-size 14px
            color $color-text-gray
            margin-right 12px
          &-button
            border-radius 4px
            padding 5px 10px
            font-size 14px
            border solid 1px $color-bd-blue
            color $color-text-blue
            background $color-bg-white
            cursor pointer
            margin 0 20px
            &-blue
              border solid 1px $color-bd-blue
              color $color-text-white
              background $color-bg-blue
      &-buttons
        display flex
        justify-content flex-start
        align-items center
        margin-top 20px
      &-button
        border-radius 4px
        padding 5px 10px
        font-size 14px
        border solid 1px $color-bd-blue
        color $color-text-blue
        background $color-bg-white
        cursor pointer
        margin-right 20px
        &-blue
          border solid 1px $color-bd-blue
          color $color-text-white
          background $color-bg-blue
</style>
