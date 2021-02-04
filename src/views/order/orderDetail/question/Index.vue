<template>
  <div class="question">
    <div class="list">
      <div class="li" v-for="(a, b) in questionList" :key="b">
        <div class="li-title">{{ a.title || "" }}</div>
        <div class="li-row">
          <div class="li-flex">
            <div class="li-image">
              <img class="li-image-icon" src="" alt="" />
            </div>
          </div>
          <div class="li-flex">
            <div class="li-text">{{ a.description || "" }}</div>
            <div class="li-context">{{ a.description || "" }}</div>
            <div class="li-textarea">
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                :value="a.description"
              ></textarea>
            </div>
            <div class="li-items">
              <div class="li-item">
                <div class="li-item-text">是否需要修模：</div>
                <div class="li-item-select">
                  <div
                    class="li-item-select-label"
                    :class="{
                      'li-item-select-label-active': a.needAdjust === 0
                    }"
                  ></div>
                  <div class="li-item-select-text">否</div>
                </div>
                <div class="li-item-select">
                  <div
                    class="li-item-select-label"
                    :class="{
                      'li-item-select-label-active': a.needAdjust === 1
                    }"
                  ></div>
                  <div class="li-item-select-text">是</div>
                </div>
              </div>
              <div class="li-item" v-if="a.state === 0">
                <div class="li-item-text">待确认</div>
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
                  {{ a.replyContent || "" }}
                </div>
              </div>
            </div>
            <div class="li-buttons">
              <div class="li-button li-button-blue">接受并修改</div>
              <div class="li-button">不接受</div>
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
  InitOption,
  QuestionList
} from "@/store/modules/order/modules/question/state";
import { ActionTypes } from "@/store/modules/order/modules/question/actions";

import { BASE_IMAGE_URL } from "@/config";

@Component({
  name: "QuestionView",
  components: {}
})
export default class QuestionView extends Vue {
  // 供应商类型列表
  public Supplier = Supplier;

  // 图片域名
  public BASE_IMAGE_URL = BASE_IMAGE_URL;

  @State("initOption")
  public initOption!: InitOption;
  @State("questionList")
  public questionList!: Array<QuestionList>;

  @Action(ActionTypes.GetQuestionList)
  public getQuestionList!: Function;
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
        &-icon
          width 100%
          object-fit contain
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
