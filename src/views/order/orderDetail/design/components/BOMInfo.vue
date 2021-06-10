<template>
  <div class="model-container" v-dialogDrag v-show="BOMInfo.isShow">
    <input
      type="file"
      name="multiplefile"
      id="multiplefile"
      hidden="hidden"
      multiple="multiple"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .step, .stp, .stl, .prt, .pdf"
      @change="uploadFile"
    />
    <input
      type="file"
      name="singlefile"
      id="singlefile"
      hidden="hidden"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .step, .stp, .stl, .prt, .pdf"
      @change="uploadFile"
    />
    <div class="model-wrapper">
      <div class="model-header">
        <div class="model-title">
          <div class="model-title-text" v-if="Supplier.Design === initInfo.type && BOMInfo.editType === 1">
            导入/更新BOM表
          </div>
          <div class="model-title-text" v-else-if="(Supplier.Machining === initInfo.type || Supplier.Injection === initInfo.type) && BOMInfo.editType === 1">
            审核BOM表
          </div>
          <div class="model-title-text" v-else>
            查看BOM表
          </div>
        </div>
        <div
          class="model-cancel"
          @click="updateBOMInfo({ isShow: false })"
        ></div>
      </div>
      <div class="model-body">
        <div class="model-navs" v-if="BOMInfo.navList.length">
          <div class="model-nav" v-for="(a, b) in BOMInfo.navList" :key="b" @click="updateNavIndex(b)">
            <div class="model-nav-text" :class="{ 'model-nav-text-active': BOMInfo.navIndex === b }">{{ a.text }}</div>
          </div>
        </div>
        <div class="model-steps" v-if="Supplier.Design === initInfo.type && BOMInfo.editType === 1">
          <div class="model-step">
            <div class="model-step-label">1</div>
            <div class="model-step-content">
              <div class="model-step-title">
                <div class="model-step-title-text" @click="downloadFile(BASE_IMAGE_URL + BOMObject.bomPath, BOMObject.bomName)">下载模板</div> 
                <div class="model-step-title-line"></div>
              </div>
              <div class="model-step-text">
                <span>下载{{ BOMObject.text }}模板</span>
              </div>
            </div>
          </div>
          <div class="model-step">
            <div class="model-step-label">2</div>
            <div class="model-step-content">
              <div class="model-step-title">
                <div class="model-step-title-text" @click="checkfile({ checkType: 1, status: 1 })">导入BOM表</div> 
                <div class="model-step-title-line"></div>
              </div>
              <div class="model-step-text">
                <span>请按模板格式填写表格信息</span>
              </div>
            </div>
          </div>
          <div class="model-step">
            <div class="model-step-label">3</div>
            <div class="model-step-content">
              <div class="model-step-title">
                <div class="model-step-title-text" @click="checkfile({ checkType: 2, status: 2 })">批量导入零件图纸</div> 
                <div class="model-step-title-line"></div>
              </div>
              <div class="model-step-text">
                <span class="model-step-text-red">*</span>
                <span>使用批量导入零件图纸，需要将零件图纸以零件编号加“-2D或-3D”命名</span>
              </div>
            </div>
          </div>
        </div>
        <div class="model-table">
          <div class="model-table-box">
            <div class="model-table-header">
              <div class="model-table-header-item">序号</div>
              <div class="model-table-header-item">中文名称</div>
              <div class="model-table-header-item">零件编号</div>
              <div class="model-table-header-item model-table-header-item-x" v-if="BOMInfo.navIndex === 0">模胚规格</div>
              <div class="model-table-header-item model-table-header-item-x" v-if="BOMInfo.navIndex > 0">参考规格(mm)</div>
              <div class="model-table-header-item" v-if="BOMInfo.navIndex === 1 || BOMInfo.navIndex === 3">热处理</div>
              <div class="model-table-header-item">材质</div>
              <div class="model-table-header-item model-table-header-item-x">订料规格(mm)</div>
              <div class="model-table-header-item">数量</div>
              <div class="model-table-header-item model-table-header-item-x">备注</div>
              <div class="model-table-header-item model-table-header-item-x model-table-header-item-bl">2D图纸(.pdf)</div>
              <div class="model-table-header-item model-table-header-item-x">3D图纸(.stp)</div>
              <div class="model-table-header-item model-table-header-item-x model-table-header-item-bl">加工方审核</div>
              <div class="model-table-header-item model-table-header-item-x">注塑方审核</div>
            </div>
            <div class="model-table-cells" v-if="BOMObject.list && BOMObject.list.length">
              <div
                class="model-table-cell"
                v-for="(a, b) in BOMObject.list"
                :key="'_BOM_' + b"
              >
                <div class="model-table-cell-item">{{ a.serialNo || "--" }}</div>
                <div class="model-table-cell-item">{{ a.partName || "--" }}</div>
                <div class="model-table-cell-item">{{ a.partCode || "--" }}</div>
                <div class="model-table-cell-item model-table-cell-item-x" v-if="BOMInfo.navIndex === 0">{{ a.referenceStandard || "--" }}</div>
                <div class="model-table-cell-item model-table-cell-item-x" v-if="BOMInfo.navIndex > 0">{{ a.referenceStandard || "--" }}</div>
                <div class="model-table-cell-item" v-if="BOMInfo.navIndex === 1 || BOMInfo.navIndex === 3">{{ a.heatTreatment|| "--"  }}</div>
                <div class="model-table-cell-item">{{ a.material || "--" }}</div>
                <div class="model-table-cell-item model-table-cell-item-x">{{ a.orderingStandard || "--" }}</div>
                <div class="model-table-cell-item">{{ a.num || "--" }}</div>
                <div class="model-table-cell-item model-table-cell-item-x">{{ a.remark || "--" }}</div>
                <div class="model-table-cell-item model-table-cell-item-x model-table-cell-item-bl">
                  <span v-if="a.twoFaceFileId && a.twoFaceFileName && a.twoFaceFileUrl">
                    <span class="model-text model-text-blue">{{ a.twoFaceFileName || "--" }}</span>
                    <span class="model-text" v-if="Supplier.Design === initInfo.type">
                      <span v-if="a.machiningState === 1 && a.injectionState === 1">
                        <span class="model-text-gray model-text-arrow">更新</span>
                      </span>
                      <span v-else>
                        <span class="model-text-gray model-text-arrow" @click="checkfile({ checkType: 1, status: 3 })">更新</span>
                        <span class="model-text-tip"></span>
                      </span>
                    </span>
                    <span class="model-text model-text-gray" @click="downloadFile(a.twoFaceFileUrl, a.twoFaceFileName)">下载</span>
                  </span>
                  <span v-else>
                    <span class="model-text" v-if="Supplier.Design === initInfo.type" @click="checkfile({ checkType: 1, status: 3 })">
                      <img class="model-text-img" src="../../../../../assets/images/upload_blue.png" />
                      <span class="model-text-blue">上传图纸</span>
                    </span>
                    <span class="model-text model-text-gray" v-else>未上传图纸</span>
                  </span>
                </div>
                <div class="model-table-cell-item model-table-cell-item-x">
                  <span v-if="a.threeFaceFileId && a.threeFaceFileName && a.threeFaceFileUrl">
                    <span class="model-text model-text-blue">{{ a.threeFaceFileName || "--" }}</span>
                    <span class="model-text" v-if="Supplier.Design === initInfo.type">
                      <span v-if="a.machiningState === 1 && a.injectionState === 1">
                        <span class="model-text-gray model-text-arrow">更新</span>
                      </span>
                      <span v-else>
                        <span class="model-text-gray model-text-arrow" @click="checkfile({ checkType: 1, status: 4 })">更新</span>
                        <span class="model-text-tip"></span>
                      </span>
                    </span>
                    <span class="model-text model-text-gray" @click="downloadFile(a.threeFaceFileUrl, a.threeFaceFileName)">下载</span>
                  </span>
                  <span v-else>
                    <span class="model-text" v-if="Supplier.Design === initInfo.type" @click="checkfile({ checkType: 1, status: 4 })">
                      <img class="model-text-img" src="../../../../../assets/images/upload_blue.png" />
                      <span class="model-text-blue">上传图纸</span>
                    </span>
                    <span class="model-text model-text-gray" v-else>未上传图纸</span>
                  </span>
                </div>
                <div class="model-table-cell-item model-table-cell-item-x model-table-cell-item-bl">
                  <span v-if="a.machiningState === 1">
                    <span class="model-text model-text-blue">通过</span>
                    <img class="model-text-img" src="../../../../../assets/images/enlarge.png" />
                    <span class="model-text model-text-blue" @click="getReasonContent({ title: '通过原因', content: a.machiningCause, fileList: a.machiningPicture })">查看原因</span>
                  </span>
                  <span v-else-if="a.machiningState === 0">
                    <span class="model-text model-text-red">驳回</span>
                    <img class="model-text-img" src="../../../../../assets/images/enlarge.png" />
                    <span class="model-text model-text-blue" @click="getReasonContent({ content: a.machiningCause, fileList: a.machiningPicture })">查看原因</span>
                  </span>
                  <span v-else>
                    <span v-if="Supplier.Machining === initInfo.type">
                      <span class="model-text model-text-gray" @click="getConfirmModel({ approvalType: 2, id: a.id, opinion: 1, role: 1, isShowUpdate3D: false })">通过</span>
                      <span class="model-text model-text-gray" @click="getConfirmModel({ approvalType: 2, id: a.id, opinion: 0, role: 1, isShowUpdate3D: false })">驳回</span>
                    </span>
                    <span v-else>
                      <span class="model-text model-text-gray">待审核</span>
                    </span>
                  </span>
                </div>
                <div class="model-table-cell-item model-table-cell-item-x">
                  <span v-if="a.injectionState === 1">
                    <span class="model-text model-text-blue">通过</span>
                    <img class="model-text-img" src="../../../../../assets/images/enlarge.png" />
                    <span class="model-text model-text-blue" @click="getReasonContent({ title: '通过原因', content: a.injectionCause, fileList: a.injectionPicture })">查看原因</span>
                  </span>
                  <span v-else-if="a.injectionState === 0">
                    <span class="model-text model-text-red">驳回</span>
                    <img class="model-text-img" src="../../../../../assets/images/enlarge.png" />
                    <span class="model-text model-text-blue" @click="getReasonContent({ content: a.injectionCause, fileList: a.injectionPicture })">查看原因</span>
                  </span>
                  <span v-else>
                    <span v-if="Supplier.Injection === initInfo.type">
                      <span class="model-text model-text-gray" @click="getConfirmModel({ approvalType: 2, id: a.id, opinion: 1, role: 2, isShowUpdate3D: false })">通过</span>
                      <span class="model-text model-text-gray" @click="getConfirmModel({ approvalType: 2, id: a.id, opinion: 0, role: 2, isShowUpdate3D: false })">驳回</span>
                    </span>
                    <span v-else>
                      <span class="model-text model-text-gray">待审核</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="model-table-footer">
            <el-pagination
              @size-change="updateBOMInfoPageSize"
              @current-change="updateBOMInfoPageNum"
              :current-page="BOMObject.pageNo"
              :page-sizes="BOMObject.pageSizes"
              :page-size="BOMObject.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="BOMObject.total"
            >
            </el-pagination>
          </div>
        </div>
        <div class="model-item" v-if="BOMInfo.reasonList && BOMInfo.reasonList.length">
          <div class="model-item-navs">
            <div class="model-item-nav" :class="{'model-item-nav-active': b === BOMInfo.reasonIndex }" v-for="(a, b) in BOMInfo.reasonList" :key="b" @click="updateReasonIndex(b)">
              {{ a.text }}
            </div>
          </div>
          <div class="model-item-content">
            <div class="model-item-content-label">驳回原因：</div>
            <div class="model-item-content-text">{{ reasonObject.content || "--" }}</div>
          </div>
          <div class="model-item-images">
            <div class="model-item-image" v-for="(a, b) in reasonObject.fileList" :key="b">
              <!-- <img class="model-item-image-url" :src="a.filePath" alt="" /> -->
              <el-image 
                class="model-item-image-url"
                :src="a.filePath" 
                :preview-src-list="[a.filePath]">
              </el-image>
            </div>
          </div>
        </div>
        
        
      </div>
      <div class="model-footer">
        <div class="model-buttons" v-if="(Supplier.Machining === initInfo.type || Supplier.Injection === initInfo.type) && BOMInfo.editType === 1">
          <div 
            class="model-button" 
            @click="getConfirmModel({ approvalType: 1, opinion: 0, role: Supplier.Machining === initInfo.type ? 1 : Supplier.Injection === initInfo.type ? 2 : 0, isShowUpdate3D: true })"
          >
            驳回
          </div>
          <div
            class="model-button model-button-blue"
            @click="getConfirmModel({ approvalType: 1, opinion: 1, role: Supplier.Machining === initInfo.type ? 1 : Supplier.Injection === initInfo.type ? 2 : 0, isShowUpdate3D: true })"
          >
            审核通过
          </div>
        </div>
        <div class="model-buttons" v-else-if="Supplier.Design === initInfo.type && BOMInfo.editType === 1">
          <div class="model-button" @click="updateBOMInfo({ isShow: false })">暂存</div>
          <div class="model-button model-button-blue" @click="saveBomList()">提交</div>
        </div>
      </div>
    </div>
    <ReasonContent :data="reasonContent" @updateData="updateReasonContent"></ReasonContent>
    <ConfirmModel :data="confirmModel" @updateData="updateConfirmModel"></ConfirmModel>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, watch, onMounted, onUnmounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";

import { Supplier } from "@/store/modules/order/state";
import { InitInfo } from "@/store/modules/order/modules/design/state";
import { GetterTypes } from "@/store/modules/order/modules/design/getters";
import { ActionTypes } from "@/store/modules/order/modules/design/actions";
import { MutationTypes } from "@/store/modules/order/modules/design/mutations";

import downloadByUrl from "@/utils/downloadByUrl";
import { BASE_IMAGE_URL } from "@/config";

import Upload from "@/api/upload";

import ReasonContent from "@/components/models/ReasonContent.vue";
import ConfirmModel from "./ConfirmModel.vue";

type CheckFileParamsTypes = {
  checkType: number;
  status: number;
}

export default defineComponent({
  name: "BOMInfo",
  components: {
    ReasonContent,
    ConfirmModel
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const initInfo: InitInfo | any = computed(() => store.state.order.design.initInfo);
    const BOMInfo: any = computed(() => store.state.order.design.BOMInfo);
    const reasonContent: ReasonContentTypes | any = computed(() => store.state.order.design.reasonContent);
    const confirmModel: ConfirmModelTypes | any = computed(() => store.state.order.design.confirmModel);
    const BOMObject: any = computed(() => {
      return store.state.order.design.BOMInfo.navList[store.state.order.design.BOMInfo.navIndex] || {};
    });
    const reasonObject: any = computed(() => {
      return store.state.order.design.BOMInfo.reasonList[store.state.order.design.BOMInfo.reasonIndex] || {};
    });

    // const BOMObject: any = computed(() => store.getters.order.design[GetterTypes.BOMObject]);
    // const reasonObject: any = computed(() => store.getters.order.design[GetterTypes.ReasonObject]);

    const updateNavIndex: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.UpdateNavIndex}`, params);
    const updateBOMInfoPageSize: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.UpdateBOMInfoPageSize}`, params);
    const updateBOMInfoPageNum: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.UpdateBOMInfoPageNum}`, params);
    const importBom: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.ImportBom}`, params);
    const importBomImage: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.ImportBomImage}`, params);
    const getReasonContent: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.GetReasonContent}`, params);
    const saveBomList: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.SaveBomList}`, params);
    const getConfirmModel: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.GetConfirmModel}`, params);
    const updateReasonIndex: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.UpdateReasonIndex}`, params);
    const updateConfirmModel: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.UpdateConfirmModel}`, params);

    const updateBOMInfo: Function = (params: any) => store.commit(`order/design/${MutationTypes.UpdateBOMInfo}`, params);
    const updateReasonContent: Function = (params: any) => store.commit(`order/design/${MutationTypes.UpdateReasonContent}`, params);

    const downloadFile = (url: string, name: string) => {
      if (url) {
        downloadByUrl(url, name);
      }
    }
    
    const checkFileParams: CheckFileParamsTypes = reactive({
      checkType: 1,
      status: 0,
    })
    const checkfile = (cp: CheckFileParamsTypes) => {
      const { checkType, status } = cp;
      checkFileParams.checkType = checkType;
      checkFileParams.status = status;
      if (checkType === 1) {
        const dom: any = document.querySelector("#singlefile");
        dom.click();
      } else if (checkType === 2) {
        const dom: any = document.querySelector("#multiplefile");
        dom.click();
      }
    }
    const uploadFile = async (e: any) => {
      try {
        const files = e.target.files;
        const fileList: any = await Upload({ files });
        e.target.value = null;
        if (fileList && fileList.length) {
          updateFile(fileList);
        }
      } catch(e) {
        throw new Error(e);
      }
    }
    const updateFile = (fileList: any) => {
      const { status } = checkFileParams || {};
      const ids = fileList.map((v: any) => v.id);
      switch (status) {
        case 1:
          // 上传BOM表
          importBom(ids[0] || "");
          break;
        case 2:
          // 上传BOM零件图纸
          importBomImage(ids);
          break;
        case 3:
          // 更新2D图纸
          importBomImage(ids);
          break;
        case 4:
          // 更新3D图纸
          importBomImage(ids);
          break;
      }
    }

    return {
      BASE_IMAGE_URL,
      Supplier,
      initInfo,
      BOMInfo,
      reasonContent,
      confirmModel,
      BOMObject,
      reasonObject,
      updateNavIndex,
      updateBOMInfoPageSize,
      updateBOMInfoPageNum,
      importBom,
      importBomImage,
      getReasonContent,
      saveBomList,
      getConfirmModel,
      updateReasonIndex,
      updateConfirmModel,
      updateBOMInfo,
      updateReasonContent,
      downloadFile,
      checkfile,
      uploadFile,
      updateFile,
    };
  }
});
</script>

<style lang="scss" scoped>
.model {
  &-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color-bg-black, 0.3);
    z-index: 999;
  }
  &-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    background: $color-bg-white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  &-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 15px 20px;
    background: $color-bg;
  }
  &-cancel {
    width: 12px;
    height: 12px;
    position: relative;
    cursor: pointer;
    &:before {
      content: "";
      position: absolute;
      width: 141%;
      height: 100%;
      border-top: solid 1px $color-bd-black;
      transform-origin: 0 0;
      transform: rotate(45deg);
      z-index: 1;
    }
    &:after {
      content: "";
      position: absolute;
      width: 141%;
      height: 100%;
      border-bottom: solid 1px $color-bd-black;
      transform-origin: 0 100%;
      transform: rotate(-45deg);
    }
  }
  &-body {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: auto;
  }
  &-footer {
    width: 100%;
    box-shadow: 0px -3px 5px 0px rgba(0, 0, 0, 0.1);
  }
  &-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    &-text {
      font-size: 16px;
      font-weight: bold;
      color: $color-text-black;
      margin-right: 20px;
    }
  }
  &-text {
    margin-left: 10px;
    font-size: 14px;
    color: $color-text-gray;
    position: relative;
    &-black {
      color: $color-text-black;
    }
    &-blue {
      color: $color-text-blue;
      cursor: pointer;
    }
    &-red {
      color: $color-text-red;
    }
    &-gray {
      color: $color-text-gray;
      cursor: pointer;
    }
    &-arrow {
      padding-right: 14px;
      border-right: solid 1px $color-bd;
    }
    &-tip {
      position: absolute;
      top: 0;
      right: 14px;
      width: 6px;
      height: 6px;
      border-radius: 10px;
      background: $color-bg-red;
    }
    &-img {
      width: 13px;
      margin-left: 14px;
    }
  }
  &-buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
  }
  &-button {
    border-radius: 4px;
    padding: 9px 18px;
    font-size: 14px;
    border: solid 1px $color-bd-blue;
    color: $color-text-blue;
    background: $color-bg-white;
    cursor: pointer;
    margin: 0 20px;
    &-blue {
      border: solid 1px $color-bd-blue;
      color: $color-text-white;
      background: $color-bg-blue;
    }
  }
  &-navs {
    width: 100%;
    padding: 10px 20px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  &-nav {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding-right: 30px;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      right: 0%;
      width: 1px;
      height: 10px;
      background: #BFBFBF;
      transform: translate(-15px, -50%);
    }
    &:nth-last-of-type(1) {
      padding-right: 0px;
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        background: transparent;
        transform: translate(0%, 0%);
      }
    }
    &-text {
      padding: 7px 3px;
      border-bottom: solid 3px transparent;
      color: #0E0E0E;
      cursor: pointer;
      transition: all .3s;
      &-active {
        border-bottom: solid 3px #3A78F4;
        color: #3A78F4;
      }
    }
  }
  &-steps {
    width: 100%;
    padding: 10px 20px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  &-step {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    &-label {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #BFBFBF;
      font-size: 14px;
      font-weight: bold;
      color: white;
      text-align: center;
      line-height: 24px;
    }
    &-content {
      margin: 6px 6px 6px 13px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
    &-title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      &-text {
        color: #3A78F4;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        text-decoration: underline;
      }
      &-line {
        margin: 0 13px;
        height: 1px;
        flex: 1;
        background: #BFBFBF;
        min-width: 80px;
      }
    }
    &-text {
      color: #999999;
      font-size: 14px;
      margin-top: 12px;
      &-red {
        color: #FB1414;
      }
    }
    &:nth-last-of-type(1) {
      .model-step-title-line {
        display: none;
      }
    }
  }
  &-item {
    width: 100%;
    padding: 10px 20px;
    &-navs {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 8px 0;
    }
    &-nav {
      padding: 5px 10px;
      color: #666666;
      background: #FFFFFF;
      font-size: 14px;
      cursor: pointer;
      border-radius: 2px;
      &-active {
        color: #3A78F4;
        background: #E8F0FF;
      }
    }
    &-content {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin: 16px 0 8px 0;
      &-label {
        color: #1B1B1B;
        font-size: 14px;
      }
      &-text {
        flex: 1;
        color: #1B1B1B;
        font-size: 14px;
      }
    }
    &-images {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }
    &-image {
      width: 128px;
      height: 128px;
      background: #EEEEEE;
      margin: 8px 16px 16px 0;
      &-url {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  &-table {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: auto;
    padding: 10px 20px;
    &-box {
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      overflow: auto;
      border: solid 1px #808080;
    }
    &-header {
      min-width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      &-item {
        width: 60px;
        font-size: 14px;
        color: #0E0E0E;
        padding: 20px 2px;
        background: #EEEEEE;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        &-s {
          width: 80px;
        }
        &-m {
          width: 100px;
        }
        &-l {
          width: 140px;
        }
        &-x {
          width: 200px;
        }
        &-bl {
          border-left: solid 1px #CCCCCC;
        }
      }
    }
    &-cells {
      flex: 1;
      min-width: 100%;
      overflow: auto;
    }
    &-cell {
      border-bottom: solid 1px #F2F2F2;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      &-item {
        width: 60px;
        font-size: 14px;
        color: #0E0E0E;
        padding: 20px 2px;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        &-s {
          width: 80px;
        }
        &-m {
          width: 100px;
        }
        &-l {
          width: 140px;
        }
        &-x {
          width: 200px;
        }
        &-bl {
          border-left: solid 1px #CCCCCC;
        }
      }
    }
    &-footer {
      width: 100%;
      background: $color-bg-white;
      margin: auto;
      padding: 5px;
      text-align: center;
    }
  }
}
</style>
