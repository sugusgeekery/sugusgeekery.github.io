<template>
  <div class="design" v-if="design.stepInfoList && design.stepInfoList.length">
    <input
      type="file"
      name="file"
      id="file"
      hidden="hidden"
      accept=".step, .stp, .stl, .prt, .pdf, image/*"
      @change="uploadFile"
    />
    <div class="design-title">
      <span class="design-title-text" @click="getDesignVersion()">查看版本信息</span>
    </div>
    <div
      class="design-item"
      v-for="(a, b) in design.stepInfoList"
      :key="'_方案设计步骤_' + b"
    >
      <div class="design-item-label">
        <div
          class="design-item-label-number"
          :class="{
            'design-item-label-number-gray': a.approveStatus === 0,
            'design-item-label-number-blue': a.approveStatus === 1,
            'design-item-label-number-white': a.approveStatus > 1
          }"
        >
          {{ b + 1 }}
        </div>
        <div
          class="design-item-label-line"
          v-if="b < design.stepInfoList.length - 1"
          :class="{
            'design-item-label-line-blue': a.approveStatus > 0,
            'design-item-label-line-gray': a.approveStatus === 0
          }"
        ></div>
      </div>
      <div class="design-item-content">
        <div class="design-item-content-text">
          <span
            class="design-item-content-text-blue design-item-content-text-pointer"
            v-if="Supplier.Dfm === initInfo.type"
            @click="b > 0 && a.approveStatus > 1 ? alertModel({ label: b + 1, isEdit: false }) : null"
          >
            {{ a.approveStatus === 2 || a.approveStatus === 3 ? "查看" : "" }}{{ a.stepName }}
          </span>
          <span
            class="design-item-content-text-blue design-item-content-text-pointer"
            v-if="Supplier.Design === initInfo.type"
            @click="b > 0 && a.canUse ? alertModel({ label: b + 1, isEdit: a.approveStatus < 3 }) : null"
          >
            {{ a.approveStatus !== 3 ? (b > 0 ? "导入" : "上传") : a.approveStatus === 3 ? "查看" : ""}}{{ a.stepName }}
          </span>
          <span
            class="design-item-content-text-blue design-item-content-text-pointer"
            v-if="Supplier.Machining === initInfo.type || Supplier.Injection === initInfo.type"
            @click="b > 0 && a.approveStatus > 0 ? alertModel({ label: b + 1, isEdit: a.approveStatus === 1 }) : null"
          >
            {{ a.approveStatus === 1 ? "验收" : a.approveStatus > 1 ? "查看" : "" }}{{ a.stepName }}
          </span>
          <span
            class="design-item-content-text-blue design-item-content-text-pointer"
            v-if="a.fileName"
          >
            {{ a.fileName || "" }}
            <!-- <el-image src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJUXwG4RBCSRnOIqibcJbv9JdwRM0yG1lkJ66SnlnKoEnpx7PT0kIyBculMTQ5RiaXWNThIxVVI52jg/132" :preview-src-list="['https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJUXwG4RBCSRnOIqibcJbv9JdwRM0yG1lkJ66SnlnKoEnpx7PT0kIyBculMTQ5RiaXWNThIxVVI52jg/132']"></el-image>
            <el-image :preview-src-list="[BASE_IMAGE_URL + a.filePath]"></el-image> -->
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
        >
          <span class="design-item-content-text-black" v-if="c.type == 1">
            加工方：
          </span>
          <span class="design-item-content-text-black" v-else-if="c.type == 2">
            试模方：
          </span>
          <span class="design-item-content-text-red" v-if="c.opinion === 0">
            驳回
          </span>
          <span
            class="design-item-content-text-blue design-item-content-text-pointer"
            v-if="c.opinion === 0"
            @click="alertMessage(c.cause)"
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
        <div class="design-item-content-button" v-if="Supplier.Design === initInfo.type && a.canUse && (a.approveStatus === 0 || a.approveStatus === 1 || a.approveStatus === 2) && a.isEdit && b === 0">
          
          <span class="design-item-content-button-text" @click="checkFile({ index: b, type: 1 })">
            上传
          </span>
          <span class="design-item-content-button-text design-item-content-button-text-blue" @click="importDesign()">
            确定
          </span>
          <el-image class="design-item-content-button-image" v-if="a.filePath" :src="a.filePath" :preview-src-list="[a.filePath]"></el-image>
        </div>

        <div class="design-item-content-button" v-if="(Supplier.Machining === initInfo.type || Supplier.Injection === initInfo.type) && a.approveStatus === 1 && b === 0 && a.isEdit">
          <span
            class="design-item-content-button-text"
            :class="{'design-item-content-button-text-blue': a.opinion === 1}"
            @click="updateStepInfo({ key: 'opinion', value: 1, index: b})"
            >通过</span
          >
          <span
            class="design-item-content-button-text"
            :class="{'design-item-content-button-text-blue': a.opinion === 0}"
            @click="updateStepInfo({ key: 'opinion', value: 0, index: b})"
            >驳回</span
          >
        </div>
        <div class="design-item-content-button" v-if="(Supplier.Machining === initInfo.type || Supplier.Injection === initInfo.type) && a.approveStatus === 1 && b === 0 && a.isEdit">
          <div class="swiper-container" v-show="isShowSwiper">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-show="a.fileList && a.fileList.length"
                v-for="(c, d) in a.fileList"
                :key="d"
              >
                <div class="swiper-slide-box">
                  <img
                    class="swiper-slide-image"
                    :src="c.filePath"
                    alt=""
                  />
                  <div
                    class="swiper-slide-delete"
                    @click="deleteFile({ index: b, key: d })"
                  >
                    X
                  </div>
                </div>
              </div>
              <div
                class="swiper-slide"
                @click="fileIndex = b"
              >
                <div class="swiper-slide-buttons">
                  <div class="swiper-slide-button" @click="checkFile({ index: b, type: 2 })">上传本地图片</div>
                  <div class="swiper-slide-button" @paste="handlePaste">ctrl+v粘贴图片</div>
                </div>
              </div>
            </div>
          </div>
          <div class="design-item-content-button-title">驳回原因描述</div>
          <div class="design-item-content-button-textarea">
            <textarea name="cause" id="cause" cols="30" rows="10" :value="a.cause" placeholder="请输入驳回原因" @change="updateStepInfo({ key: 'cause', value: $event.target.value, index: b})"></textarea>
            <span
              class="design-item-content-button-text design-item-content-button-text-blue"
              @click="approvalDesign()"
              >提交</span
            >
          </div>
        </div>
      </div>
    </div>
    <BOMTable></BOMTable>
    <BOMImageInfo></BOMImageInfo>
    <DesignVersion :data="designVersion" @updateData="updateDesignVersion"></DesignVersion>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("order/design");

import { Supplier } from "@/store/modules/order/state";
import { InitInfo, Design } from "@/store/modules/order/modules/design/state";
import { ActionTypes } from "@/store/modules/order/modules/design/actions";
import { MutationTypes } from "@/store/modules/order/modules/design/mutations";

import downloadByUrl from "@/utils/downloadByUrl";
import Upload from "@/api/upload";
import { Message, MessageBox } from "element-ui";

import { UploadForm } from "@/api";
import { BASE_IMAGE_URL } from "@/config";

import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";

import BOMTable from "./components/BOMTable.vue";
import BOMImageInfo from "./components/BOMImageInfo.vue";
import DesignVersion from "@/components/models/DesignVersion.vue";

@Component({
  name: "DesignView",
  components: {
    BOMTable,
    BOMImageInfo,
    DesignVersion
  }
})
export default class DesignView extends Vue {
   // 图片域名
  public BASE_IMAGE_URL = BASE_IMAGE_URL;
  // 供应商类型列表
  public Supplier = Supplier;

  @State("initInfo")
  public initInfo!: InitInfo;
  @State("design")
  public design!: any | Design;
  @State("designVersion")
  public designVersion!: DesignVersionTypes;
  

  @Action(ActionTypes.GetStepDetail)
  public getStepDetail!: Function;
  @Action(ActionTypes.GetBOMListCtl)
  public getBOMList!: Function;
  @Action(ActionTypes.ImportDesign)
  public importDesign!: Function;
  @Action(ActionTypes.GetBOMImageInfoCtl)
  public getBOMImageInfo!: Function;
  @Action(ActionTypes.ApprovalDesign)
  public approvalDesign!: Function;
  @Action(ActionTypes.GetDesignVersion)
  public getDesignVersion!: Function;

  @Mutation(MutationTypes.UpdateDesign)
  public updateDesign!: Function;
  @Mutation(MutationTypes.UpdateDesignVersion)
  public updateDesignVersion!: Function;

  public fileIndex = -1;
  public fileType = 0;
  public checkFile(params: { index: number; type: number; }) {
    const { index, type } = params;
    this.fileIndex = index;
    this.fileType = type;
    const dom: any = document.querySelector("#file");
    dom.click();
  }
  public async uploadFile(e: any) {
    const { design, fileType, fileIndex } = this;
    const { stepInfoList = [] } = design || {};
    const files = e.target.files;
    const fileList: any = await Upload({ files });
    for (const v of fileList) {
      const { id, fileName, filePath } = v;
      if (fileType === 1) {
        if (stepInfoList.length) {
          stepInfoList[fileIndex]["fileId"] = id;
          stepInfoList[fileIndex]["fileName"] = fileName;
          stepInfoList[fileIndex]["filePath"] = BASE_IMAGE_URL + filePath;
          this.updateDesign({ stepInfoList });
        }
      } else if (fileType === 2) {
        // const { fileList = [] } = stepInfoList[fileIndex] || {};
        // stepInfoList[fileIndex]["fileList"] = [...fileList, { fileId: id, fileName, filePath: BASE_IMAGE_URL + filePath }];
        stepInfoList[fileIndex]["fileList"] = [{ fileId: id, fileName, filePath: BASE_IMAGE_URL + filePath }];
        this.updateDesign({ stepInfoList });
      }
    }
    e.target.value = null;
  }
  public async handlePaste(event: any) {
    const { design, fileType, fileIndex } = this;
    const { stepInfoList = [] } = design || {};
    if (fileIndex === -1) {
      Message.error("请选择你需要粘贴的地方");
      return;
    }
    const items = (event.clipboardData || (window as any).clipboardData).items;
    //去除粘贴到div事件
    event.preventDefault();
    event.returnValue = false;
    let file = null
    if (!items || items.length === 0) {
      this.$message.error('当前不支持本地图片上传')
      return
    }
    // 搜索剪切板items
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.includes('image')) {
        file = items[i].getAsFile()
        break
      }
    }
    if (!file) {
      return
    }
    const fileList: any = await Upload({ files: [file]});
    for (const v of fileList) {
      const { id, fileName, filePath } = v;
      // const { fileList = [] } = stepInfoList[fileIndex] || {};
      // stepInfoList[fileIndex]["fileList"] = [...fileList, { fileId: id, fileName, filePath: BASE_IMAGE_URL + filePath }];
      stepInfoList[fileIndex]["fileList"] = [{ fileId: id, fileName, filePath: BASE_IMAGE_URL + filePath }];
      this.updateDesign({ stepInfoList });
    }
  }
  public deleteFile(params: { index: number; key: number; }) {
    const { design } = this;
    const { index, key } = params || {};
    const { stepInfoList = [] } = design || {};
    if (stepInfoList.length && stepInfoList[index]["fileList"].length) {
      stepInfoList[index]["fileList"].splice(key, 1);
    }
    this.updateDesign({ stepInfoList });
  }

  public updateStepInfo({ key, value, index }: { key: string; value: string | number; index: number } = { key: "", value: "", index: 0 }) {
    const { design } = this;
    const { stepInfoList = [] } = design || {};
    if (stepInfoList.length) {
      stepInfoList[index][key] = value;
    }
    this.updateDesign({ stepInfoList });
  }
  // public async uploadFile(e: any) {
  //   try {
  //     const file = e.target.files[0];
  //     const formData = new FormData();
  //     formData.append("files", file);
  //     const { success, message, data }: any = await UploadForm(formData);
  //     if (success) {
  //       const { pics = [] } = data || {};
  //       const { filePath = "", fileName, id } = pics[0];
  //       this.importDesign({ threeFacePlanFileId: id });
  //     } else {
  //       Message.error(message);
  //     }
  //     e.target.value = null;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  public async created() {
    await this.getStepDetail();
    this.initSwiper();
  }
  public mounted() {
    document.addEventListener("paste", this.handlePaste);
  }
  public downloadFile(url: string, name: string) {
    if (url) {
      downloadByUrl(url, name);
    }
  }
  public alertMessage(content: string) {
    console.log(content)
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


  public isShowSwiper: boolean = false;
  public swiper: any = null;
  public swiperOptions: any = {
    slidesPerView: 4,
    spaceBetween: 10,
    slidesPerGroup: 1,
    loop: false,
    loopFillGroupWithBlank: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  };
  public initSwiper() {
    this.swiper = new Swiper(".swiper-container", this.swiperOptions);
    this.isShowSwiper = true;
  }

  public swiperPrev(index: number) {
    this.swiper[index] && this.swiper[index].slidePrev();
  }
  public swiperNext(index: number) {
    this.swiper[index] && this.swiper[index].slideNext();
  }

  public onSwiper(swiper: any) {
    console.log(swiper);
  }
  public onSlideChange(swiper: any) {
    console.log(swiper);
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
  padding 40px
  overflow auto
  &-title
    display flex
    justify-content flex-start
    align-items flex-start
    margin 10px
    &-text
      font-size 14px
      padding 8px 16px
      border solid 1px $color-bd-blue
      background $color-bg-white
      color $color-text-blue
      border-radius 4px
      cursor pointer
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
        min-height 200px
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
        &-image
          width 60px
          margin-bottom -25px
          // margin-right 14px
        &-title
          margin 20px 0 10px 0
          font-size 14px
          color $color-text-gray
        &-textarea
          display flex 
          justify-content flex-start
          align-items flex-end
          textarea
            padding 6px 10px
            border-radius 4px
            border solid 1px $color-bd-gray
            font-size 14px
            color $color-text-black
            margin-right 14px
            height 80px
            min-width 400px
            outline none
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
        // &-swiper
        //   margin 16px 18px
        //   display flex
        //   justify-content space-between
        //   align-items center
        //   &-label
        //     width 9px
        //     height 17px
        //     object-fit contain
        .swiper-container
          width 100%
          height 100%
          margin 20px 0 10px 0
        .swiper-wrapper
          width 100%
          height 100%
          max-width 480px
        .swiper-slide
          /* Center slide text vertically */
          // display -webkit-box
          // display -ms-flexbox
          // display -webkit-flex
          // display flex
          // -webkit-box-pack center
          // -ms-flex-pack center
          // -webkit-justify-content center
          // justify-content center
          // -webkit-box-align center
          // -ms-flex-align center
          // -webkit-align-items center
          // align-items center

          position relative
          padding 11.2%
          background $color-bg-white
          border solid 1px $color-bd-gray
          &-box
            position absolute
            top 0
            left 0
            width 100%
            height 100%
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
          &-image
            width 100%
            object-fit contain
          &-delete
            display none
          &:hover
            .swiper-slide-delete
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
          &-buttons
            position absolute
            top 0
            left 0
            width 100%
            height 100%
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
          &-button
            color $color-text-blue
            font-size 12px
            padding 4px
            border solid 1px $color-bd-blue
        .swiper-button-prev,
        .swiper-button-next
          color $color-text-gray
</style>
