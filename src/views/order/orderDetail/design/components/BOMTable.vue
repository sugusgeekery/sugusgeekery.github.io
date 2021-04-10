<template>
  <div class="model-container" v-dialogDrag v-show="BOMTable.isShow">
    <input
      type="file"
      name="fileBom"
      id="fileBom"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .step, .stp, .stl, .prt, .pdf"
      @change="uploadFiles"
    />
    <div class="model-wrapper">
      <div class="model-header">
        <div class="model-title">
          <div class="model-title-text" v-if="Supplier.Design === initInfo.type">
            导入BOM表
          </div>
          <div class="model-title-text" v-else-if="Supplier.Dfm === initInfo.type || Supplier.Injection === initInfo.type">
            查看BOM表
          </div>
          <div class="model-title-text" v-else-if="Supplier.Machining === initInfo.type">
            验收BOM表
          </div>
        </div>
        <div
          class="model-cancel"
          @click="updateBOMTable({ isShow: false })"
        ></div>
      </div>
      <div class="model-body">
        <div class="model-row">
          <div class="model-flex" v-if="(Supplier.Design === initInfo.type) && BOMTable.isEdit">
            <div class="model-button" @click="checkFile()">导入BOM表</div>
          </div>
          <div class="model-flex" v-else></div>
          <div class="model-flex" v-if="design.stepInfoList[1].filePath">
            <div class="model-text model-text-blue" v-if="design.stepInfoList[1].fileName">{{ design.stepInfoList[1].fileName }}</div>
            <div class="model-text model-text-hover" @click="downloadFile(design.stepInfoList[1].filePath, design.stepInfoList[1].fileName)">下载</div>
          </div>
        </div>
        <div class="model-table">
          <div class="model-table-box">
            <table>
              <tr>
                <th>序号</th>
                <th>零件名称</th>
                <th>零件编号</th>
                <th>类型</th>
                <th>参考规格</th>
                <th>热处理</th>
                <th>材质</th>
                <th>重量</th>
                <th>订料规格</th>
                <th>数量</th>
              </tr>
              <tr v-for="(a, b) in BOMTable.list" :key="'_BOM表_' + b">
                <td>{{ b + 1 }}</td>
                <td>{{ a.partName }}</td>
                <td>{{ a.partCode }}</td>
                <td>{{ a.type }}</td>
                <td>{{ a.referenceStandard }}</td>
                <td>{{ a.heatTreatment }}</td>
                <td>{{ a.material }}</td>
                <td>{{ a.weight }}</td>
                <td>{{ a.orderingStandard }}</td>
                <td>{{ a.num }}</td>
              </tr>
            </table>
          </div>
          <div class="model-table-footer">
            <el-pagination
              @size-change="updatePageSize"
              @current-change="updatePageNum"
              :current-page="BOMTable.pageNo"
              :page-sizes="BOMTable.pageSizes"
              :page-size="BOMTable.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="BOMTable.total"
            >
            </el-pagination>
          </div>
        </div>
        <div class="model-buttons" v-if="(Supplier.Machining === initInfo.type) && BOMTable.isEdit">
          <div
            class="model-button model-button-blue"
            @click="approvalBom({ cause: '', opinion: 1, role: Supplier.Machining === initInfo.type ? 1 : 0 })"
          >
            通过
          </div>
          <div
            class="model-button"
            @click="approvalBom({ cause: '', opinion: 0, role: Supplier.Machining === initInfo.type ? 1 : 0 })"
          >
            驳回
          </div>
        </div>
        <div class="model-buttons" v-else>
          <div class="model-button model-button-blue" @click="updateBOMTable({ isShow: false })">确定</div>
        </div>
      </div>
    </div>
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

import { Message, MessageBox } from "element-ui";

import Upload from "@/api/upload";

@Component({
  name: "BOMTable",
  components: {}
})
export default class BOMTable extends Vue {
  // 供应商类型列表
  public Supplier = Supplier;

  @State("initInfo")
  public initInfo!: any | InitInfo;
  @State("design")
  public design!: Design;
  @State("BOMTable")
  public BOMTable!: any;

  @Action(ActionTypes.UpdateBOMPageNum)
  public updatePageNum!: Function;
  @Action(ActionTypes.UpdateBOMPageSize)
  public updatePageSize!: Function;
  @Action(ActionTypes.ImportBom)
  public importBom!: Function;
  @Action(ActionTypes.ApprovalBom)
  public approvalBom!: Function;

  @Mutation(MutationTypes.UpdateBOMTable)
  public updateBOMTable!: Function;

  public downloadFile(url: string, name: string) {
    if (url) {
      downloadByUrl(url, name);
    }
  }

  public checkFile() {
    const dom: any = document.getElementById("fileBom");
    dom.click();
  }
  public async uploadFiles(e: any) {
    try {
      const { files } = e.target;
      const fileList: any = await Upload({ files });
      for (const v of fileList) {
        const { id, fileName, filePath } = v;
        this.importBom(id);
      }
      e.target.value = null;
    } catch (e) {
      throw new Error(e);
    }
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
    &-black
      color $color-text-black
    &-blue
      color $color-text-blue
    &-hover
      cursor pointer
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
