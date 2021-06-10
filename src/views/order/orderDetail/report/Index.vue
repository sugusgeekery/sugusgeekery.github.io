<template>
  <div class="report" v-if="reportList.length">
    <input
      type="file"
      name="file"
      id="file"
      hidden="hidden"
      accept="image/*"
      @change="uploadFile"
    />
    <div class="items">
      <div
        class="item"
        :class="{ 
          'item-green': a.state === 2,
          'item-gray': a.required,
        }"
        v-for="(a, b) in reportList"
        :key="b"
      >
        <div class="item-title">
          <div class="item-title-text">
            {{ a.reportTitle }}
          </div>
          <div class="item-title-select" v-if="!a.state && initInfo.type === Supplier.Dfm">
            <el-checkbox 
              class="item-title-select-box" 
              v-model="a.required" 
              @change="v => updateReportData({ index: b, name: 'required', value: v })"
            ></el-checkbox>
            <span class="item-title-select-span">标记为非必填项</span>
          </div>
          <img class="item-title-icon" src="../../../../assets/images/select_green.png" alt="" v-if="a.state === 2" />
          <div
            class="item-title-button"
            v-else-if="a.state === 3 && initInfo.type === Supplier.Dfm"
            @click="
              updateReportData({
                index: b,
                name: 'state',
                value: 0
              })
            "
          >
            修改
          </div>
        </div>
        <div class="item-row">
          <div 
            class="item-flex swiper-container" 
            :class="{'swiper-container-active': index === b}"
            @click="(!a.state && initInfo.type === Supplier.Dfm) ? (index = b, pasteType = 1) : null;"
          >
            <div class="swiper-wrapper" v-if="a.fileList && a.fileList.length">
              <div
                class="swiper-slide"
                :class="{'swiper-slide-large': a.fileList.length < 3 }"
                v-for="(c, d) in a.fileList"
                :key="d"
              >
                <el-image 
                  class="swiper-slide-image"
                  :src="BASE_IMAGE_URL + c.filePath"
                  :preview-src-list="getUrls(a.fileList)"
                ></el-image>
                <div
                  class="swiper-slide-delete"
                  v-if="!a.state && initInfo.type === Supplier.Dfm"
                  @click="deleteReportFile({ index: b, key: d })"
                >
                  +
                </div>
              </div>
              <div
                class="swiper-slide"
                v-if="!a.state && initInfo.type === Supplier.Dfm"
                @click="index = b"
              >
                <div class="swiper-slide-add" @click="selectFile(b, 1)">+</div>
              </div>
            </div>
            <div class="swiper-tip" v-else-if="!a.state && initInfo.type === Supplier.Dfm">
              <div class="swiper-tip-text" @click="selectFile(b, 1)">点击或ctrl+v粘贴上传图片</div>
            </div>
            <div class="swiper-tip" v-else-if="a.required">
              <div class="swiper-tip-text swiper-tip-text-gray">该项已标记为非必填项</div>
            </div>
          </div>
          <div 
            class="item-flex"
            @click="(!a.state && initInfo.type === Supplier.Dfm) ? (index = b, pasteType = 2) : null;"
          >
            <div class="item-content">
              <div
                class="item-content-textarea"
                v-if="!a.state && initInfo.type === Supplier.Dfm "
              >
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
              <div class="item-content-text item-content-line" v-else-if="a.describe">{{ a.describe }}</div>
              <div class="item-content-text item-content-text-gray item-content-line" v-else-if="a.required">该项已标记为非必填项</div>
            </div>
            <div
              class="item-cells"
              v-if="a.state && (initInfo.type === Supplier.Dfm || initInfo.type === Supplier.Design)"
            >
              <div class="item-cell" v-if="a.machiningApprovalInfo">
                <div class="item-cell-text item-cell-text-black">加工方：</div>
                <div
                  class="item-cell-text item-cell-text-red"
                  v-if="a.machiningApprovalInfo.approvalStatus === 0"
                >
                  已驳回
                </div>
                <div
                  class="item-cell-text"
                  v-if="a.machiningApprovalInfo.approvalStatus === 0"
                  @click="getReasonContent(a.machiningApprovalInfo)"
                >
                  <img class="item-cell-img" src="../../../../assets/images/enlarge.png" />
                  <span class="item-cell-text-blue">查看原因</span>
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
              <div class="item-cell" v-if="a.injectionApprovalInfo">
                <div class="item-cell-text item-cell-text-black">试模方：</div>
                <div
                  class="item-cell-text item-cell-text-red"
                  v-if="a.injectionApprovalInfo.approvalStatus === 0"
                >
                  已驳回
                </div>
                <div
                  class="item-cell-text"
                  v-if="a.injectionApprovalInfo.approvalStatus === 0"
                  @click="getReasonContent(a.injectionApprovalInfo)"
                >
                  <img class="item-cell-img" src="../../../../assets/images/enlarge.png" />
                  <span class="item-cell-text-blue">查看原因</span>
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
              <div class="item-cell" v-if="a.customerApprovalInfo">
                <div class="item-cell-text item-cell-text-black">客户方：</div>
                <div
                  class="item-cell-text item-cell-text-red"
                  v-if="a.customerApprovalInfo.approvalStatus === 0"
                >
                  已驳回
                </div>
                <div
                  class="item-cell-text"
                  v-if="a.customerApprovalInfo.approvalStatus === 0"
                  @click="getReasonContent(a.customerApprovalInfo)"
                >
                  <img class="item-cell-img" src="../../../../assets/images/enlarge.png" />
                  <span class="item-cell-text-blue">查看原因</span>
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
              class="item-cells"
              v-if="a.state && initInfo.type === Supplier.Machining"
            >
              <div class="item-cell" v-if="a.injectionApprovalInfo">
                <div class="item-cell-text item-cell-text-black">试模方：</div>
                <div
                  class="item-cell-text item-cell-text-red"
                  v-if="a.injectionApprovalInfo.approvalStatus === 0"
                >
                  已驳回
                </div>
                <div
                  class="item-cell-text"
                  v-if="a.injectionApprovalInfo.approvalStatus === 0"
                  @click="getReasonContent(a.injectionApprovalInfo)"
                >
                  <img class="item-cell-img" src="../../../../assets/images/enlarge.png" />
                  <span class="item-cell-text-blue">查看原因</span>
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
              <div class="item-cell" v-if="a.customerApprovalInfo">
                <div class="item-cell-text item-cell-text-black">客户方：</div>
                <div
                  class="item-cell-text item-cell-text-red"
                  v-if="a.customerApprovalInfo.approvalStatus === 0"
                >
                  已驳回
                </div>
                <div
                  class="item-cell-text"
                  v-if="a.customerApprovalInfo.approvalStatus === 0"
                  @click="getReasonContent(a.customerApprovalInfo)"
                >
                  <img class="item-cell-img" src="../../../../assets/images/enlarge.png" />
                  <span class="item-cell-text-blue">查看原因</span>
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

              <div class="item-cell" v-if="a.machiningApprovalInfo">
                <div class="item-cell-text item-cell-text-black">加工方：</div>
                <div
                  class="item-cell-text item-cell-text-red"
                  v-if="a.machiningApprovalInfo.approvalStatus === 0"
                >
                  已驳回
                </div>
                <div
                  class="item-cell-text"
                  v-if="a.machiningApprovalInfo.approvalStatus === 0"
                  @click="getReasonContent(a.machiningApprovalInfo)"
                >
                  <img class="item-cell-img" src="../../../../assets/images/enlarge.png" />
                  <span class="item-cell-text-blue">查看原因</span>
                </div>
                <div
                  class="item-cell-text item-cell-text-blue"
                  v-else-if="a.machiningApprovalInfo.approvalStatus === 1"
                >
                  通过
                </div>
              </div>
              <div
                class="item-cell"
                v-if="a.machiningApprovalInfo && a.machiningApprovalInfo.approvalStatus === 2"
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
                  <div
                    class="item-cell-li-label"
                    :class="{
                      'item-cell-li-label-active':
                        a.machiningApprovalInfo.opinion === 1
                    }"
                  ></div>
                  <div class="item-cell-li-text">
                    确认
                  </div>
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
                  <div
                    class="item-cell-li-label"
                    :class="{
                      'item-cell-li-label-active':
                        a.machiningApprovalInfo.opinion === 0
                    }"
                  ></div>
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
                class="form-container"
                v-if="a.machiningApprovalInfo && a.machiningApprovalInfo.approvalStatus === 2 && a.machiningApprovalInfo.opinion === 0"
              >
                <div class="form-wrapper">
                  <div class="form-content">
                    <div class="form-textarea">
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
                    <div class="form-list">
                      <div class="form-li" v-for="(c, d) in a.machiningApprovalInfo.approvalFiles" :key="d">
                        <div class="form-li-text">{{ c.fileName }}</div>
                        <div class="form-li-del" @click="deleteReportApprovalFile({ index: b, text: 'machiningApprovalInfo', name: 'approvalFiles', key: d })">+</div> 
                      </div>
                    </div>
                  </div>
                  <div class="form-add" @click="selectFile(b, 2)">
                    <img class="form-add-img" src="../../../../assets/images/pictrue_add.png" alt="">
                  </div>
                </div>
              </div>
            </div>

            <div
              class="item-cells"
              v-if="a.state && initInfo.type === Supplier.Injection"
            >
              <div class="item-cell" v-if="a.machiningApprovalInfo">
                <div class="item-cell-text item-cell-text-black">加工方：</div>
                <div
                  class="item-cell-text item-cell-text-red"
                  v-if="a.machiningApprovalInfo.approvalStatus === 0"
                >
                  已驳回
                </div>
                <div
                  class="item-cell-text"
                  v-if="a.machiningApprovalInfo.approvalStatus === 0"
                  @click="getReasonContent(a.machiningApprovalInfo)"
                >
                  <img class="item-cell-img" src="../../../../assets/images/enlarge.png" />
                  <span class="item-cell-text-blue">查看原因</span>
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
              <div class="item-cell" v-if="a.customerApprovalInfo">
                <div class="item-cell-text item-cell-text-black">客户方：</div>
                <div
                  class="item-cell-text item-cell-text-red"
                  v-if="a.customerApprovalInfo.approvalStatus === 0"
                >
                  已驳回
                </div>
                <div
                  class="item-cell-text"
                  v-if="a.customerApprovalInfo.approvalStatus === 0"
                  @click="getReasonContent(a.customerApprovalInfo)"
                >
                  <img class="item-cell-img" src="../../../../assets/images/enlarge.png" />
                  <span class="item-cell-text-blue">查看原因</span>
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
              <div class="item-cell" v-if="a.injectionApprovalInfo">
                <div class="item-cell-text item-cell-text-black">试模方：</div>
                <div
                  class="item-cell-text item-cell-text-red"
                  v-if="a.injectionApprovalInfo.approvalStatus === 0"
                >
                  已驳回
                </div>
                <div
                  class="item-cell-text"
                  v-if="a.injectionApprovalInfo.approvalStatus === 0"
                  @click="getReasonContent(a.injectionApprovalInfo)"
                >
                  <img class="item-cell-img" src="../../../../assets/images/enlarge.png" />
                  <span class="item-cell-text-blue">查看原因</span>
                </div>
                <div
                  class="item-cell-text item-cell-text-blue"
                  v-else-if="a.injectionApprovalInfo.approvalStatus === 1"
                >
                  通过
                </div>
              </div>
              <div
                class="item-cell"
                v-if="a.injectionApprovalInfo && a.injectionApprovalInfo.approvalStatus === 2"
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
                  <div
                    class="item-cell-li-label"
                    :class="{
                      'item-cell-li-label-active':
                        a.injectionApprovalInfo.opinion === 1
                    }"
                  ></div>
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
                  <div
                    class="item-cell-li-label"
                    :class="{
                      'item-cell-li-label-active':
                        a.injectionApprovalInfo.opinion === 0
                    }"
                  ></div>
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
                class="form-container"
                v-if="a.injectionApprovalInfo && a.injectionApprovalInfo.approvalStatus === 2 && a.injectionApprovalInfo.opinion === 0"
              >
                <div class="form-wrapper">
                  <div class="form-content">
                    <div class="form-textarea">
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
                    <div class="form-list">
                      <div class="form-li" v-for="(c, d) in a.injectionApprovalInfo.approvalFiles" :key="d">
                        <div class="form-li-text">{{ c.fileName }}</div>
                        <div class="form-li-del" @click="deleteReportApprovalFile({ index: b, text: 'injectionApprovalInfo', name: 'approvalFiles', key: d })">+</div> 
                      </div>
                    </div>
                  </div>
                  <div class="form-add" @click="selectFile(b, 2)">
                    <img class="form-add-img" src="../../../../assets/images/pictrue_add.png" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div> 
    </div>
    <div class="footer-buttons" v-if="initInfo.type === Supplier.Dfm">
      <div class="footer-button" @click="commitReport({ type: 1 })">暂存</div>
      <div class="footer-button footer-button-blue" @click="commitReport({ type: 2 })">提交</div>
    </div>
    <ReasonContent :data="reasonContent" @updateData="updateReasonContent"></ReasonContent>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

import { Supplier } from "@/store/modules/order/state";
import {
  InitInfo,
  ReportList
} from "@/store/modules/order/modules/report/state";
import { ActionTypes } from "@/store/modules/order/modules/report/actions";
import { MutationTypes } from "@/store/modules/order/modules/report/mutations";

import { BASE_IMAGE_URL } from "@/config";
import Upload from "@/api/upload";

import ReasonContent from "@/components/models/ReasonContent.vue";

export default defineComponent({
  name: "ReportView",
  components: {
    ReasonContent
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const initInfo: InitInfo | any = computed(() => store.state.order.report.initInfo);
    const reportList: Array<ReportList> | any = computed(() => store.state.order.report.reportList);
    const reasonContent: ReasonContentTypes | any = computed(() => store.state.order.report.reasonContent);

    const getDfmReportList: Function = (params: any) => store.dispatch(`order/report/${ActionTypes.GetDfmReportList}`, params);
    const updateReportData: Function = (params: any) => store.dispatch(`order/report/${ActionTypes.UpdateReportData}`, params);
    const commitReport: Function = (params: any) => store.dispatch(`order/report/${ActionTypes.CommitReport}`, params);
    const approvalDfmReport: Function = (params: any) => store.dispatch(`order/report/${ActionTypes.ApprovalDfmReport}`, params);
    const deleteReportFile: Function = (params: any) => store.dispatch(`order/report/${ActionTypes.DeleteReportFile}`, params);
    const deleteReportApprovalFile: Function = (params: any) => store.dispatch(`order/report/${ActionTypes.DeleteReportApprovalFile}`, params);
    const getReasonContent: Function = (params: any) => store.dispatch(`order/report/${ActionTypes.GetReasonContent}`, params);

    const updateReportList: Function = (params: any) => store.commit(`order/report/${MutationTypes.UpdateReportList}`, params);
    const updateReasonContent: Function = (params: any) => store.commit(`order/report/${MutationTypes.UpdateReasonContent}`, params);

    const index: Ref<number> = ref(-1);
    const pasteType: Ref<number> = ref(0);

    const selectFile = (b: number, pt: number) => {
      index.value = b;
      pasteType.value = pt;
      const dom: any = document.querySelector("#file");
      dom.click();
    }
    const uploadFile = async (e: any) => {
      const files = e.target.files;
      const fileList: any = await Upload({ files });
      for (const v of fileList) {
        updateReport(v);
      }
      e.target.value = null;
    }
    const handlePaste = async (e: any) => {
      const { clipboardData } = e || window;
      const { items } = clipboardData || {};
      if (!(items && items.length)) {
          return ;
      }
      if (index.value === -1) {
        ElMessage.error("请选择你需要粘贴的地方");
        return;
      }

      // 更新报告图片
      const uploadFile = async (file: any) => {
        const fileList: any = await Upload({ files: [file]});
        for (const v of fileList) {
          updateReport(v);
        }
      };
      // 更新报告内容
      const updataReport = (value: string) => {
        if (pasteType.value === 1) {
          updateReportData({
            index,
            name: 'describe',
            value
          })
        } else {
          switch(initInfo.type) {
            case Supplier.Dfm:
              break;
            case Supplier.Machining: {
              const machiningApprovalInfo = reportList[index.value] || {};
              machiningApprovalInfo.approvalContent = value;
              updateReportData({
                index,
                name: 'machiningApprovalInfo',
                value: machiningApprovalInfo
              })
              break;
            }
            case Supplier.Injection: {
              const injectionApprovalInfo = reportList[index.value] || {};
              injectionApprovalInfo.approvalContent = value;
              updateReportData({
                index,
                name: 'injectionApprovalInfo',
                value: injectionApprovalInfo
              })
              break;
            }
          }
        }
      };

      for (let i = 0, len = items.length; i < len; i++) {
        const { type } = items[i];
        if (type.includes("image")) {
          const file = items[i].getAsFile();
          if (file) {
            uploadFile(file);
          }
          break;
        } else {
          items[i].getAsString((str: string) => {
            if (str) {
              updataReport(str);
            }
          });
          break;
        }
      }
    }

    const getUrls = (e: any) => {
      const arr = [];
      if (e && e.length) {
        for (const v of e) {
          const { filePath = "" } = v;
          if (filePath) {
            arr.push(BASE_IMAGE_URL + filePath);
          }
        }
      }
      return arr;
    }

    const updateReport = (file: any) => {
      const { filePath, fileName, id } = file || {};
      const newFile = { filePath, fileName, fileId: id };
      if (pasteType.value === 1) {
        const { fileList = [] } = reportList[index.value] || {};
        reportList[index.value].fileList = [...(fileList || []), newFile];
        updateReportList(reportList);
      } else if (pasteType.value === 2) {
        switch(initInfo.type) {
          case Supplier.Dfm:
            break;
          case Supplier.Machining: {
            const { approvalFiles = [] } = reportList[index.value].machiningApprovalInfo || {};
            reportList[index.value].machiningApprovalInfo.approvalFiles = [...(approvalFiles || []), newFile];
            break;
          }
          case Supplier.Injection: {
            const { approvalFiles = [] } = reportList[index.value].injectionApprovalInfo || {};
            reportList[index.value].injectionApprovalInfo.approvalFiles = [...(approvalFiles || []), newFile];
            break;
          }
        }
        updateReportList(reportList);
      }
    }
    
    onMounted(async () => {
      await getDfmReportList();
      document.addEventListener("paste", handlePaste);
    });
    onUnmounted(() => {
      document.removeEventListener("paste", handlePaste);
    })

    return {
      Supplier,
      BASE_IMAGE_URL,
      initInfo,
      reportList,
      reasonContent,
      getDfmReportList,
      updateReportData,
      commitReport,
      approvalDfmReport,
      deleteReportFile,
      deleteReportApprovalFile,
      getReasonContent,
      updateReportList,
      updateReasonContent,
      index,
      pasteType,
      selectFile,
      uploadFile,
      handlePaste,
      getUrls,
      updateReport,
    };
  }
});
</script>

<style lang="scss" scoped>
.swiper {
  &-container {
    position: relative;
    background: white;
    min-height: 200px;
    border-radius: 4px;
    border: solid 1px transparent;
    &-active {
      border: solid 1px $color-bd-grey;
    }
  }
  &-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 12px;
  }
  &-slide {
    margin: 10px;
    background: #F1F1F1;
    position: relative;
    border: solid 1px $color-bd-grey;
    width: 65px;
    height: 65px;
    &-small {
      width: 65px;
      height: 65px;
    }
    &-large {
      width: 150px;
      height: 150px;
    }
    &-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &-delete {
      display: none;
    }
    &:hover {
      border: solid 1px $color-bd-blue;
      .swiper-slide-delete {
        position: absolute;
        top: 0;
        right: 0;
        width: 14px;
        height: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        background: #86ABF6;
        color: #FFFFFF;
        cursor: pointer;
        transform: translate(50%, -50%) rotate(45deg);
      }
    }
    &-add {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $color-text-grey;
      font-size: 36px;
      cursor: pointer;
    }
  }
  &-tip {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &-text {
      color: $color-text-blue;
      font-size: 16px;
      padding: 5px;
      cursor: pointer;
      &-gray {
        color: $color-text-gray;
        font-size: 14px;
      }
    }
  }
}

.form {
  &-container {
    position: relative;
    background: white;
    border-radius: 4px;
    border: solid 1px transparent;
    &-active {
      border: solid 1px $color-bd-grey;
    }
  }
  &-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 12px;
  }
  &-content {
    flex: 1;
  }
  &-add {
    margin-left: 10px;
    &-img {
      width: 48px;
      height: 48px;
      object-fit: contain;
    }
  }
  &-textarea {
    font-size: 14px;
    color: $color-text-gray;
    background: $color-bg-white;
    border: solid 1px $color-bd-grey;
    border-radius: 4px;
    padding: 8px;
    textarea {
      font-size: 14px;
      width: 100%;
      max-height: 28px;
      border: none;
      outline: none;
      background: transparent;
    }
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
  &-li {
    margin: 5px;
    background: #F1F1F1;
    position: relative;
    border: solid 1px $color-bd-grey;
    padding: 5px 8px;
    &-text {
      color: $color-text-blue;
      font-size: 12px;
    }
    &-image {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &-del {
      display: none;
    }
    &:hover {
      border: solid 1px $color-bd-blue;
      .form-li-del {
        position: absolute;
        top: 0;
        right: 0;
        width: 14px;
        height: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        background: #86ABF6;
        color: #FFFFFF;
        cursor: pointer;
        transform: translate(50%, -50%) rotate(45deg);
      }
    }
  }
}

.report {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .items {
    width: 100%;
    flex: 1;
    overflow: auto;
  }
  .item {
    margin: 20px auto;
    border-radius: 8px;
    background: $color-bg-blue-white;
    padding: 1px 10px;
    &-green {
      background: $color-bg-green-white;
    }
    &-gray {
      background: #F2F2F2;
    }
    &-blue {
      background: $color-bg-blue-white;
    }
    &-white {
      background: $color-bg-white;
    }
    &-yellow {
      background: $color-bg-yellow;
    }
    &-title {
      margin: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-text {
        font-size: 16px;
        color: $color-text-black;
        flex: 1;
      }
      &-select {
        .is-focus,
        .is-hover {
          .el-checkbox__inner,
          .el-checkbox__inner:hover {
            border-color: gray;
          }
        }
        .is-checked {
          .el-checkbox__inner {
            background: gray;
          }
        }
        &-span {
          margin-left: 8px;
          font-size: 12px;
          color: $color-text-grayer;
        }
      }
      &-button {
        border-radius: 4px;
        padding: 5px 10px;
        font-size: 14px;
        border: solid 1px $color-bd-blue;
        color: $color-text-blue;
        background: transparent;
        cursor: pointer;
        &-blue {
          border: solid 1px $color-bd-blue;
          color: $color-text-white;
          background: $color-bg-blue;
        }
      }
      &-icon {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }
    }
    &-row {
      margin: 18px 9px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }
    &-flex {
      flex: 1;
      margin: 0 9px;
    }
    &-content {
      &-line {
        align-items: center;
        border-bottom: solid 1px $color-bd;
        padding-bottom: 16px;
      }
      &-text {
        font-size: 16px;
        color: $color-text-black;
        &-gray {
          font-size: 14px;
          color: $color-text-gray;
        }
      }
      &-textarea {
        font-size: 14px;
        color: $color-text-gray;
        background: $color-bg-white;
        border-radius: 4px;
        padding: 8px;
        textarea {
          width: 100%;
          max-height: 66px;
          border: none;
          outline: none;
          background: transparent;
        }
      }
    }
    &-cell {
      margin: 16px 0;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      &-text {
        font-size: 14px;
        margin-right: 10px;
        &-black {
          color: $color-text-black;
        }
        &-gray {
          color: $color-text-gray;
        }
        &-red {
          color: $color-text-red;
        }
        &-blue {
          color: $color-text-blue;
        }
      }
      &-img {
        width: 13px;
        height: 13px;
        object-fit: contain;
        cursor: pointer;
      }
      &-li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        &-label {
          width: 12px;
          height: 12px;
          border-radius: 100px;
          border: solid 1px $color-bd;
          position: relative;
          margin-right: 4px;
          &-active {
            border: solid 1px $color-bd-blue;
            &:after {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              width: 6px;
              height: 6px;
              transform: translate(-50%, -50%);
              border-radius: 100px;
              background: $color-bg-blue;
            }
          }
        }
        &-text {
          font-size: 14px;
          color: $color-text-gray;
          margin-right: 12px;
        }
        &-button {
          border-radius: 4px;
          padding: 5px 10px;
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
      }
      &-textarea {
        margin: 16px 18px;
        font-size: 14px;
        color: $color-text-gray;
        background: $color-bg-white;
        border-radius: 4px;
        padding: 8px;
        textarea {
          width: 100%;
          max-height: 66px;
          border: none;
          outline: none;
          background: transparent;
        }
      }
    }
    &-buttons {
      margin: 16px 18px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-button {
      border-radius: 4px;
      padding: 5px 10px;
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
  }
  .footer {
    &-buttons {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    &-button {
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 14px;
      border: solid 1px $color-bd-blue;
      color: $color-text-blue;
      background: $color-bg-white;
      cursor: pointer;
      margin: 25px 0px 25px 18px;
      min-width: 80px;
      text-align: center;
      &-blue {
        border: solid 1px $color-bd-blue;
        color: $color-text-white;
        background: $color-bg-blue;
      }
    }
  }
}
</style>
