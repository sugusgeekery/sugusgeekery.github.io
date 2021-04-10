<template>
  <div class="model-container" v-dialogDrag v-show="BOMImageInfo.isShow">
    <div class="model-wrapper">
      <div class="model-header">
        <div class="model-title">
          <div class="model-title-text" v-if="Supplier.Dfm === initInfo.type">
            查看BOM表对应零件的2D、3D图纸
          </div>
          <div class="model-title-text" v-else-if="Supplier.Design === initInfo.type">
            导入BOM表对应零件的2D、3D图纸
          </div>
          <div class="model-title-text" v-else-if="Supplier.Machining === initInfo.type || Supplier.Injection === initInfo.type">
            验收BOM表对应零件的2D、3D图纸
          </div>
        </div>
        <div
          class="model-cancel"
          @click="updateBOMImageInfo({ isShow: false })"
        ></div>
      </div>
      <div class="model-body">
        <div class="model-row" v-if="(Supplier.Design === initInfo.type) && BOMImageInfo.isEdit">
          <div class="model-flex">
            <input
              type="file"
              name="bomimagefile"
              id="bomimagefile"
              hidden="hidden"
              multiple="multiple"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .step, .stp, .stl, .prt, .pdf"
              @change="uploadFile"
            />
            <input
              type="file"
              name="bomimagelifile"
              id="bomimagelifile"
              hidden="hidden"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .step, .stp, .stl, .prt, .pdf"
              @change="uploadFile"
            />
            <div class="model-button" @click="checkFile()">
              批量导入零件图纸
            </div>
            <div class="model-text">
              *使用批量导入零件图纸，需要将零件图纸以零件编号加“-2D或-3D”命名。
            </div>
          </div>
        </div>
        <div class="model-table">
          <div class="model-table-box">
            <table>
              <tr>
                <th
                  v-if="Supplier.Machining === initInfo.type || Supplier.Injection === initInfo.type"
                  @click="checkBOMImageAll()"
                >
                  <img
                    class="model-icon"
                    v-if="BOMImageInfo.isAllSelected"
                    src="../../../../../assets/images/selected.png"
                    alt=""
                  />
                  <img
                    class="model-icon"
                    v-else
                    src="../../../../../assets/images/select.png"
                    alt=""
                  />
                  <span>全选</span>
                </th>
                <th>序号</th>
                <th>零件名称</th>
                <th>零件编号</th>
                <th>2D图纸</th>
                <th>3D图纸</th>
                <th>验收结果</th>
              </tr>
              <tr
                v-for="(a, b) in BOMImageInfo.list"
                :key="'_BOM表零件图纸_' + b"
              >
                <td v-if="Supplier.Machining === initInfo.type || Supplier.Injection === initInfo.type" @click="checkBOMImage(b)">
                  <img
                    class="model-icon"
                    v-if="a.isSelected"
                    src="../../../../../assets/images/selected.png"
                    alt=""
                  />
                  <img
                    class="model-icon"
                    v-else
                    src="../../../../../assets/images/select.png"
                    alt=""
                  />
                </td>
                <td>{{ a.serialNo }}</td>
                <td>{{ a.partName }}</td>
                <td>{{ a.partCode }}</td>
                <td>
                  <span class="model-text model-text-blue" v-if="a.twoFaceFileName">{{ a.twoFaceFileName }}</span>
                  <span
                    class="model-text model-text-gray model-text-arrow"
                    @click="checkLiFile(a.twoFaceFileId, a.twoFaceFileName)"
                    v-if="Supplier.Design === initInfo.type && a.state === 3 && BOMImageInfo.isEdit"
                  >
                    更新
                    <span class="model-text-tip"></span>
                  </span>
                  <span
                    class="model-text model-text-gray model-text-arrow"
                    @click="a.state !== 2 ? checkLiFile(a.twoFaceFileId, a.twoFaceFileName) : null"
                    v-else-if="Supplier.Design === initInfo.type"
                  >
                    更新
                  </span>
                  <span
                    class="model-text model-text-gray"
                    v-if="a.twoFaceFileUrl"
                    @click="downloadFile(a.twoFaceFileUrl, a.twoFaceFileName)"
                    >下载</span
                  >
                </td>
                <td>
                  <span class="model-text model-text-blue" v-if="a.threeFaceFileName">{{ a.threeFaceFileName }}</span>
                  <span
                    class="model-text model-text-gray model-text-arrow"
                    v-if="Supplier.Design === initInfo.type && a.state === 3 && BOMImageInfo.isEdit"
                    @click="checkLiFile(a.threeFaceFileId, a.threeFaceFileName)"
                  >
                    更新
                    <span class="model-text-tip"></span>
                  </span>
                  <span
                    class="model-text model-text-gray model-text-arrow"
                    @click="a.state !== 2 ? checkLiFile(a.threeFaceFileId, a.threeFaceFileName) : null"
                    v-else-if="Supplier.Design === initInfo.type"
                  >
                    更新
                  </span>
                  <span
                    class="model-text model-text-gray"
                    v-if="a.threeFaceFileUrl"
                    @click="downloadFile(a.threeFaceFileUrl, a.threeFaceFileName)"
                    >下载</span
                  >
                </td>
                <td>
                  <span
                    class="model-text model-text-blue"
                    v-if="a.state === 2"
                    >通过</span
                  >
                  <span
                    class="model-text model-text-red"
                    v-if="a.state === 3"
                    >驳回</span
                  >
                  <span
                    class="model-text model-text-blue"
                    v-if="a.state === 3"
                    @click="alertMessage(a.cause)"
                    >查看详情</span
                  >
                </td>
              </tr>
            </table>
          </div>
          <div class="model-table-footer">
            <el-pagination
              @size-change="updatePageSize"
              @current-change="updatePageNum"
              :current-page="BOMImageInfo.pageNo"
              :page-sizes="BOMImageInfo.pageSizes"
              :page-size="BOMImageInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="BOMImageInfo.total"
            >
            </el-pagination>
          </div>
        </div>
        <div class="model-buttons" v-if="(Supplier.Machining === initInfo.type || Supplier.Injection === initInfo.type) && BOMImageInfo.isEdit">
          <div
            class="model-button model-button-blue"
            @click="approvalBomImage({ cause: '', opinion: 1, role: Supplier.Machining === initInfo.type ? 1 : Supplier.Injection === initInfo.type ? 2 : 0 })"
          >
            通过
          </div>
          <div class="model-button" @click="approvalBomImage({ cause: '', opinion: 0, role: Supplier.Machining === initInfo.type ? 1 : Supplier.Injection === initInfo.type ? 2 : 0 })">
            驳回
          </div>
        </div>
        <!-- <div class="model-buttons" v-else>
          <div class="model-button model-button-blue" @click="updateBOMImageInfo({ isShow: false })">确定</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("order/design");

import { Supplier } from "@/store/modules/order/state";
import { InitInfo } from "@/store/modules/order/modules/design/state";
import { ActionTypes } from "@/store/modules/order/modules/design/actions";
import { MutationTypes } from "@/store/modules/order/modules/design/mutations";

import downloadByUrl from "@/utils/downloadByUrl";
import { Message, MessageBox } from "element-ui";

import { UploadForm } from "@/api";

@Component({
  name: "BOMImageInfo",
  components: {}
})
export default class BOMImageInfo extends Vue {
  // 供应商类型列表
  public Supplier = Supplier;

  @State("initInfo")
  public initInfo!: any | InitInfo;
  @State("BOMImageInfo")
  public BOMImageInfo!: any;

  @Action(ActionTypes.UpdateBOMImagePageNum)
  public updatePageNum!: Function;
  @Action(ActionTypes.UpdateBOMImagePageSize)
  public updatePageSize!: Function;
  @Action(ActionTypes.CheckBOMImage)
  public checkBOMImage!: Function;
  @Action(ActionTypes.CheckBOMImageAll)
  public checkBOMImageAll!: Function;
  @Action(ActionTypes.ImportBomImage)
  public importBomImage!: Function;
  @Action(ActionTypes.ApprovalBomImage)
  public approvalBomImage!: Function;

  @Mutation(MutationTypes.UpdateBOMImageInfo)
  public updateBOMImageInfo!: Function;

  public downloadFile(url: string, name: string) {
    if (url) {
      downloadByUrl(url, name);
    }
  }

  public checkFile() {
    const dom: any = document.querySelector("#bomimagefile");
    dom.click();
  }
  public fileLen = 0;
  public files = [];
  public fileNum = 0;
  public fileList: Array<{ fileName: string; fileId: string; }> = [];
  public uploadFile(e: any) {
    if (e.target.files.length) {
      this.fileLen = e.target.files.length;
      this.files = e.target.files;
      this.fileNum = 0;
      this.fileList = [];
      this.uploadFileFn(() => {
        e.target.value = null;
      });
    }
  }
  public async uploadFileFn(fn: Function) {
    try {
      const formData = new FormData();
      formData.append("files", this.files[this.fileNum]);
      const { success, message, data }: any = await UploadForm(formData);
      if (success) {
        const { pics = [] } = data || {};
        const { filePath = "", fileName = "", id = "" } = pics[0];
        this.fileList.push(id);
        if (this.fileNum === this.fileLen - 1) {
          this.importBomImage({ bomDesignFiles: this.fileList });
          if (fn) {
            fn();
          }
        } else {
          this.fileNum++;
          this.uploadFileFn(fn);
        }
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  public infoId = "";
  public checkLiFile(infoId: string) {
    this.infoId = infoId;
    const dom: any = document.querySelector("#bomimagelifile");
    dom.click();
  }
  // public uploadLiFile(e: any) {
  //   const { infoId } = this;
  //   const file = e.target.files[0];
  //   // this.updateSpareImage({ file, infoId });
  //   this.infoId = "";
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
  //         this.approvalBomImage({ cause: value, opinion: 0, role: Supplier.Machining === initInfo.type ? 1 : Supplier.Injection === initInfo.type ? 2 : 0 });
  //       }
  //     })
  //     .catch(() => {});
  // }

  public alertMessage(content: string) {
    MessageBox.alert(
      content || "",
      "驳回原因"
    );
  }
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
    // display flex
    // justify-content center
    // align-items center
  &-wrapper
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
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
    padding 20px
    display flex
    flex-direction column
    justify-content flex-start
    align-items flex-start
  &-row
    width 100%
    margin 16px 0
    display flex
    justify-content space-between
    align-items center
  &-flex
    display flex
    justify-content flex-start
    align-items center
  &-text
    margin-left 14px
    font-size 14px
    color $color-text-gray
    position relative
    &-black
      color $color-text-black
    &-blue
      color $color-text-blue
      cursor pointer
    &-red
      color $color-text-red
    &-gray
      color $color-text-gray
      cursor pointer
    &-arrow
      padding-right 14px
      border-right solid 1px $color-bd
    &-tip
      position absolute
      top 0
      right 14px
      width 6px
      height 6px
      border-radius 10px
      background $color-bg-red
  &-buttons
    width 100%
    display flex
    justify-content center
    align-items center
    margin 30px 0
  &-button
    border-radius 4px
    padding 9px 18px
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
  &-icon
    width 14px
    margin-right 10px
  // &-table
  //   width 100%
  //   flex 1
  //   position relative
  //   &-box
  //     position absolute
  //     top 0
  //     left 0
  //     width 100%
  //     height 100%
  //     overflow auto
  //     table
  //       width 100%
  //       border solid 1px $color-bd-gray
  //       th
  //         font-size 14px
  //         font-weight 400
  //         color $color-text-gray
  //         padding 10px
  //         background $color-bg-gray-white
  //         text-align center
  //       td
  //         font-size 14px
  //         color $color-text-black
  //         padding 10px
  //         border-right solid 1px $color-bd-gray
  //         text-align center
  &-table
    width 100%
    flex 1
    // position relative
    display flex
    flex-direction column
    justify-content flex-start
    align-items flex-start
    &-box
      flex 1
      // position absolute
      // top 0
      // left 0
      width 100%
      // height 100%
      overflow auto
      
      table
        width 100%
        border solid 1px $color-bd-gray
        th
          font-size 14px
          font-weight 400
          color $color-text-gray
          padding 10px
          background $color-bg-gray-white
          text-align center
        td
          font-size 14px
          color $color-text-black
          padding 10px
          border-right solid 1px $color-bd-gray
          text-align center
    &-footer
      width 100%
      background $color-bg-white
      margin auto
      padding 5px
      text-align center
</style>
