<template>
  <div class="report" v-if="reportList.length">
    <input
      type="file"
      name=""
      multiple="multiple"
      hidden="hidden"
      id="fileElement"
      @change="uploadFile"
    />
    <div
      class="item"
      :class="{ 'item-green': a.state === 2, 'item-white': a.state === 3 }"
      v-for="(a, b) in reportList"
      :key="b"
    >
      <div class="item-title">
        <div class="item-title-text">
          {{ a.reportTitle
          }}{{
            (initOption.type === Supplier.Dfm) +
              "---" +
              initOption.type +
              "---" +
              Supplier.Dfm
          }}
        </div>
        <img class="item-title-icon" src="" alt="" v-if="a.state === 2" />
        <div class="item-title-button" v-else-if="a.state === 3">修改</div>
      </div>
      <div class="item-swiper">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-show="a.fileList && a.fileList.length"
              v-for="(c, d) in a.fileList"
              :key="d"
            >
              <img class="swiper-slide-image" :src="c" alt="" />
            </div>
            <div class="swiper-slide" v-if="!a.state" @click="selectFile()">
              <div class="swiper-slide-button">+图片</div>
            </div>
          </div>
          <div
            class="swiper-button-prev"
            v-if="a.fileList && a.fileList.length > 4"
          ></div>
          <div
            class="swiper-button-next"
            v-if="a.fileList && a.fileList.length > 4"
          ></div>
        </div>
      </div>
      <div class="item-content">
        <div class="item-content-textarea" v-if="!a.state">
          <textarea
            name=""
            id=""
            placeholder="请填写报告描述"
            :value="a.describe"
            cols="30"
            rows="10"
            @change="
              updateReportData({
                index: b,
                name: 'describe',
                value: $event.target.value
              })
            "
          ></textarea>
        </div>
        <div class="item-conent-text" v-else>{{ a.describe }}</div>
      </div>
      <div
        class="item-cells"
        v-if="a.state && initOption.type === Supplier.Dfm"
      >
        <div class="item-cell">
          <div class="item-cell-text item-cell-text-black">加工方：</div>
          <div
            class="item-cell-text item-cell-text-red"
            v-if="a.machiningApprovalInfo.approvalStatus === 0"
          >
            已驳回
          </div>
          <div
            class="item-cell-text item-cell-text-gray"
            v-if="a.machiningApprovalInfo.approvalStatus === 0"
          >
            {{ a.machiningApprovalInfo.approvalContent }}
          </div>
          <div
            class="item-cell-text item-cell-text-blue"
            v-else-if="a.machiningApprovalInfo.approvalStatus === 1"
          >
            通过
          </div>
          <div
            class="item-cell-text item-cell-text-black"
            v-else-if="a.machiningApprovalInfo.approvalStatus === 2"
          >
            待确认
          </div>
        </div>
        <div class="item-cell">
          <div class="item-cell-text item-cell-text-black">注塑方：</div>
          <div
            class="item-cell-text item-cell-text-red"
            v-if="a.injectionApprovalInfo.approvalStatus === 0"
          >
            已驳回
          </div>
          <div
            class="item-cell-text item-cell-text-gray"
            v-if="a.injectionApprovalInfo.approvalStatus === 0"
          >
            {{ a.injectionApprovalInfo.approvalContent }}
          </div>
          <div
            class="item-cell-text item-cell-text-blue"
            v-else-if="a.injectionApprovalInfo.approvalStatus === 1"
          >
            通过
          </div>
          <div
            class="item-cell-text item-cell-text-black"
            v-else-if="a.injectionApprovalInfo.approvalStatus === 2"
          >
            待确认
          </div>
        </div>
        <div class="item-cell">
          <div class="item-cell-text item-cell-text-black">客户方：</div>
          <div
            class="item-cell-text item-cell-text-red"
            v-if="a.customerApprovalInfo.approvalStatus === 0"
          >
            已驳回
          </div>
          <div
            class="item-cell-text item-cell-text-gray"
            v-if="a.customerApprovalInfo.approvalStatus === 0"
          >
            {{ a.customerApprovalInfo.approvalContent }}
          </div>
          <div
            class="item-cell-text item-cell-text-blue"
            v-else-if="a.customerApprovalInfo.approvalStatus === 1"
          >
            通过
          </div>
          <div
            class="item-cell-text item-cell-text-black"
            v-else-if="a.customerApprovalInfo.approvalStatus === 2"
          >
            待确认
          </div>
        </div>
      </div>
      <div
        class="item-buttons"
        v-if="!a.state && initOption.type === Supplier.Dfm"
      >
        <div
          class="item-button item-button-blue"
          @click="commitReport({ index: b })"
        >
          确定
        </div>
      </div>

      <div
        class="item-cells"
        v-if="a.state && initOption.type === Supplier.machining"
      >
        <div class="item-cell">
          <div class="item-cell-text item-cell-text-black">注塑方：</div>
          <div
            class="item-cell-text item-cell-text-red"
            v-if="a.injectionApprovalInfo.approvalStatus === 0"
          >
            已驳回
          </div>
          <div
            class="item-cell-text item-cell-text-gray"
            v-if="a.injectionApprovalInfo.approvalStatus === 0"
          >
            {{ a.injectionApprovalInfo.approvalContent }}
          </div>
          <div
            class="item-cell-text item-cell-text-blue"
            v-else-if="a.injectionApprovalInfo.approvalStatus === 1"
          >
            通过
          </div>
          <div
            class="item-cell-text item-cell-text-black"
            v-else-if="a.injectionApprovalInfo.approvalStatus === 2"
          >
            待确认
          </div>
        </div>
        <div class="item-cell">
          <div class="item-cell-text item-cell-text-black">客户方：</div>
          <div
            class="item-cell-text item-cell-text-red"
            v-if="a.customerApprovalInfo.approvalStatus === 0"
          >
            已驳回
          </div>
          <div
            class="item-cell-text item-cell-text-gray"
            v-if="a.customerApprovalInfo.approvalStatus === 0"
          >
            {{ a.customerApprovalInfo.approvalContent }}
          </div>
          <div
            class="item-cell-text item-cell-text-blue"
            v-else-if="a.customerApprovalInfo.approvalStatus === 1"
          >
            通过
          </div>
          <div
            class="item-cell-text item-cell-text-black"
            v-else-if="a.customerApprovalInfo.approvalStatus === 2"
          >
            待确认
          </div>
        </div>

        <div class="item-cell item-cell-line">
          <div class="item-cell-text item-cell-text-black">加工方：</div>
          <div
            class="item-cell-text item-cell-text-red"
            v-if="a.machiningApprovalInfo.approvalStatus === 0"
          >
            已驳回
          </div>
          <div
            class="item-cell-text item-cell-text-gray"
            v-if="a.machiningApprovalInfo.approvalStatus === 0"
          >
            {{ a.machiningApprovalInfo.approvalContent }}
          </div>
          <div
            class="item-cell-text item-cell-text-blue"
            v-else-if="a.machiningApprovalInfo.approvalStatus === 1"
          >
            通过
          </div>
        </div>
        <div
          class="item-cell item-cell-line"
          v-if="a.machiningApprovalInfo.approvalStatus === 2"
        >
          <div
            class="item-cell-li"
            @click="
              updateReportData({
                index: b,
                text: 'machiningApprovalInfo',
                name: 'opinion',
                value: 1
              })
            "
          >
            <div class="item-cell-li-label"></div>
            <div class="item-cell-li-text">确认</div>
          </div>
          <div
            class="item-cell-li"
            @click="
              updateReportData({
                index: b,
                text: 'machiningApprovalInfo',
                name: 'opinion',
                value: 0
              })
            "
          >
            <div class="item-cell-li-label item-cell-li-label-active"></div>
            <div class="item-cell-li-text">驳回</div>
          </div>
          <div class="item-cell-li">
            <div
              class="item-cell-li-button item-cell-li-button-blue"
              @click="approvalDfmReport({ index: b })"
            >
              确定
            </div>
          </div>
        </div>
        <div
          class="item-cell-textarea"
          v-if="a.machiningApprovalInfo.approvalStatus === 2"
        >
          <textarea
            name=""
            id=""
            :value="a.machiningApprovalInfo.approvalContent"
            placeholder="请填写驳回原因"
            cols="30"
            rows="10"
            @change="
              updateReportData({
                index: b,
                text: 'machiningApprovalInfo',
                name: 'approvalContent',
                value: $event.target.value
              })
            "
          ></textarea>
        </div>
      </div>

      <div
        class="item-cells"
        v-if="a.state && initOption.type === Supplier.Injection"
      >
        <div class="item-cell">
          <div class="item-cell-text item-cell-text-black">加工方：</div>
          <div
            class="item-cell-text item-cell-text-red"
            v-if="a.machiningApprovalInfo.approvalStatus === 0"
          >
            已驳回
          </div>
          <div
            class="item-cell-text item-cell-text-gray"
            v-if="a.machiningApprovalInfo.approvalStatus === 0"
          >
            {{ a.machiningApprovalInfo.approvalContent }}
          </div>
          <div
            class="item-cell-text item-cell-text-blue"
            v-else-if="a.machiningApprovalInfo.approvalStatus === 1"
          >
            通过
          </div>
          <div
            class="item-cell-text item-cell-text-black"
            v-else-if="a.machiningApprovalInfo.approvalStatus === 2"
          >
            待确认
          </div>
        </div>
        <div class="item-cell">
          <div class="item-cell-text item-cell-text-black">客户方：</div>
          <div
            class="item-cell-text item-cell-text-red"
            v-if="a.customerApprovalInfo.approvalStatus === 0"
          >
            已驳回
          </div>
          <div
            class="item-cell-text item-cell-text-gray"
            v-if="a.customerApprovalInfo.approvalStatus === 0"
          >
            {{ a.customerApprovalInfo.approvalContent }}
          </div>
          <div
            class="item-cell-text item-cell-text-blue"
            v-else-if="a.customerApprovalInfo.approvalStatus === 1"
          >
            通过
          </div>
          <div
            class="item-cell-text item-cell-text-black"
            v-else-if="a.customerApprovalInfo.approvalStatus === 2"
          >
            待确认
          </div>
        </div>
        <div class="item-cell item-cell-line">
          <div class="item-cell-text item-cell-text-black">注塑方：</div>
          <div
            class="item-cell-text item-cell-text-red"
            v-if="a.injectionApprovalInfo.approvalStatus === 0"
          >
            已驳回
          </div>
          <div
            class="item-cell-text item-cell-text-gray"
            v-if="a.injectionApprovalInfo.approvalStatus === 0"
          >
            {{ a.injectionApprovalInfo.approvalContent }}
          </div>
          <div
            class="item-cell-text item-cell-text-blue"
            v-else-if="a.injectionApprovalInfo.approvalStatus === 1"
          >
            通过
          </div>
        </div>
        <div
          class="item-cell item-cell-line"
          v-if="a.injectionApprovalInfo.approvalStatus === 2"
        >
          <div
            class="item-cell-li"
            @click="
              updateReportData({
                index: b,
                text: 'injectionApprovalInfo',
                name: 'opinion',
                value: 1
              })
            "
          >
            <div class="item-cell-li-label"></div>
            <div class="item-cell-li-text">确认</div>
          </div>
          <div
            class="item-cell-li"
            @click="
              updateReportData({
                index: b,
                text: 'injectionApprovalInfo',
                name: 'opinion',
                value: 0
              })
            "
          >
            <div class="item-cell-li-label item-cell-li-label-active"></div>
            <div class="item-cell-li-text">驳回</div>
          </div>
          <div class="item-cell-li">
            <div
              class="item-cell-li-button item-cell-li-button-blue"
              @click="approvalDfmReport({ index: b })"
            >
              确定
            </div>
          </div>
        </div>
        <div
          class="item-cell-textarea"
          v-if="a.injectionApprovalInfo.approvalStatus === 2"
        >
          <textarea
            name=""
            id=""
            :value="a.injectionApprovalInfo.approvalContent"
            placeholder="请填写驳回原因"
            cols="30"
            rows="10"
            @change="
              updateReportData({
                index: b,
                text: 'injectionApprovalInfo',
                name: 'approvalContent',
                value: $event.target.value
              })
            "
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("order/report");

import { Supplier } from "@/store/modules/order/state";
import {
  InitOption,
  ReportList
} from "@/store/modules/order/modules/report/state";
import { ActionTypes } from "@/store/modules/order/modules/report/actions";

// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";

// import "swiper/swiper.scss";
// import "swiper/components/navigation/navigation.scss";
// import "swiper/components/pagination/pagination.scss";
// import "swiper/components/scrollbar/scrollbar.scss";

// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  name: "ReportView",
  components: {}
})
export default class ReportView extends Vue {
  // 供应商类型列表
  public Supplier = Supplier;

  @State("initOption")
  public initOption!: InitOption;
  @State("reportList")
  public reportList!: Array<ReportList>;

  @Action(ActionTypes.GetDfmReportList)
  public getDfmReportList!: Function;
  @Action(ActionTypes.UploadForm)
  public uploadForm!: Function;
  @Action(ActionTypes.UpdateReportData)
  public updateReportData!: Function;
  @Action(ActionTypes.CommitReport)
  public commitReport!: Function;
  @Action(ActionTypes.ApprovalDfmReport)
  public approvalDfmReport!: Function;

  public created() {
    this.getDfmReportList();
  }
  public mounted() {
    this.initSwiper();
  }

  public selectFile() {
    const dom: any = document.querySelector("#fileElement");
    dom.click();
  }
  public uploadFile(e: any) {
    const files = e.target.files;
    this.uploadForm(files);
  }

  public initSwiper() {
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: 3,
      spaceBetween: 10,
      slidesPerGroup: 1,
      loop: false,
      loopFillGroupWithBlank: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
  }

  public onSwiper(swiper: any) {
    console.log(swiper);
  }
  public onSlideChange(swiper: any = "swiper--") {
    console.log(swiper);
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../stylus/index.styl';

.report
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  overflow auto
  padding 20px
  display flex
  flex-direction row
  flex-wrap wrap
  justify-content flex-start
  align-items flex-start
  .item
    margin 1%
    width 48%
    border-radius 8px
    background $color-bg-blue-white
    padding 1px
    &-green
      background $color-bg-green-white
    &-blue
      background $color-bg-blue-white
    &-white
      background $color-bg-white
    &-title
      margin 16px 18px
      display flex
      justify-content space-between
      align-items center
      &-text
        font-size 16px
        color $color-text-black
        flex 1
      &-button
        border-radius 4px
        padding 5px 10px
        font-size 14px
        border solid 1px $color-bd-blue
        color $color-text-blue
        background $color-bg-white
        cursor pointer
        &-blue
          border solid 1px $color-bd-blue
          color $color-text-white
          background $color-bg-blue
      &-icon
        width 24px
        height 24px
        object-fit contain
    &-swiper
      margin 16px 18px
      display flex
      justify-content space-between
      align-items center
      &-label
        width 9px
        height 17px
        object-fit contain
      .swiper-container
        flex 1
        width 100%
        height 100%
      .swiper-wrapper
        width 100%
        height 100%
      .swiper-slide
        text-align center
        font-size 18px
        background #fff
        height 100px

        /* Center slide text vertically */
        display -webkit-box
        display -ms-flexbox
        display -webkit-flex
        display flex
        -webkit-box-pack center
        -ms-flex-pack center
        -webkit-justify-content center
        justify-content center
        -webkit-box-align center
        -ms-flex-align center
        -webkit-align-items center
        align-items center
      .swiper-button-prev,
      .swiper-button-next
        color $color-text-gray
    &-content
      margin 16px 18px
      &-text
        font-size 14px
        color $color-text-gray
      &-textarea
        font-size 14px
        color $color-text-gray
        background $color-bg-white
        border-radius 8px
        padding 8px
        textarea
          width 100%
          height 60px
          border none
          outline none
          background transparent
    &-cell
      margin 16px 18px
      display flex
      justify-content flex-start
      align-items flex-start
      &-line
        align-items center
        border-top solid 1px $color-bd
        padding-top 16px
      &-text
        font-size 14px
        margin-right 10px
        &-black
          color $color-text-black
        &-gray
          color $color-text-gray
        &-red
          color $color-text-red
        &-blue
          color $color-text-blue
      &-li
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
      &-textarea
        margin 16px 18px
        font-size 14px
        color $color-text-gray
        background $color-bg-white
        border-radius 8px
        padding 8px
        textarea
          width 100%
          height 60px
          border none
          outline none
          background transparent
    &-buttons
      margin 16px 18px
      display flex
      justify-content center
      align-items center
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
</style>
