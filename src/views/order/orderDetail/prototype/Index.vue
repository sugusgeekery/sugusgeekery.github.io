<template>
  <div class="prototype">
    <input
      type="file"
      name="prototypeSingleFile"
      id="prototypeSingleFile"
      hidden="hidden"
      accept="image/*"
      @change="uploadFile"
    />
    <div class="prototype-li">
      <div class="prototype-li-title">
        <span class="prototype-li-title-black">样件详情</span>
      </div>
      <div class="prototype-li-content prototype-li-content-gray">
        <div class="prototype-li-images">
          <div class="prototype-li-image" v-for="(a, b) in prototype.samplePostInfo.sampleFiles" :key="a.fileId + '_样件图片_' + b" v-show="prototype.samplePostInfo && prototype.samplePostInfo.sampleFiles && prototype.samplePostInfo.sampleFiles.length > 0">
            <img class="prototype-li-image-url" :src="BASE_IMAGE_URL + a.filePath" v-if="a.filePath" alt="">
            <div class="prototype-li-image-delete" v-if="(!prototype.postState || prototype.postState === 4)" @click="deleteFile(b)">+</div>
          </div>
          <div class="prototype-li-add" v-if="(!prototype.postState || prototype.postState === 4)" @click="selectFile(0, 1)">
            <span class="prototype-li-add-icon">+</span>
            <span class="prototype-li-add-text">上传图片</span>
          </div>
        </div>
        <div class="prototype-li-textarea" v-if="(!prototype.postState || prototype.postState === 4)">
          <textarea 
            class="prototype-li-textarea-input" 
            placeholder="请填写样件描述" 
            :value="prototype.samplePostInfo.sampleDesc" 
            @change="updatePrototypeData({
              name: 'sampleDesc',
              value: $event.target.value
            })"
          ></textarea>
        </div>
        <div class="prototype-li-textarea" v-else>
          <div class="prototype-li-textarea-text">{{ prototype.samplePostInfo.sampleDesc || "--" }}</div>
        </div>
      </div>
    </div>

    <div class="prototype-li">
      <div class="prototype-li-title">
        <span class="prototype-li-title-black">派送方式</span>
      </div>
      <div class="prototype-li-radios" v-if="(!prototype.postState || prototype.postState === 4)">
        <div class="prototype-li-radio" 
          v-for="(a, b) in postList" 
          :key="a.name + '_派送方式_' + b" 
          @click="updatePrototypeData({
            name: 'sendType',
            value: a.sendType
          })"
        >
          <div class="prototype-li-radio-label" :class="{'prototype-li-radio-label-active': a.sendType === prototype.samplePostInfo.sendType }"></div>
          <div class="prototype-li-radio-text">{{ a.name || "--" }}</div>
        </div>
      </div>
      <div class="prototype-li-radios" v-else>
        <div class="prototype-li-radio" v-for="(a, b) in postList" :key="a.name + '_派送方式_' + b" v-show="a.sendType === prototype.samplePostInfo.sendType">
          <img class="prototype-li-radio-icon" src="../../../../assets/images/select_green.png" alt="">
          <div class="prototype-li-radio-text">{{ a.name || "--" }}</div>
        </div>
      </div>

      <div class="prototype-li-row prototype-li-row-gray" v-if="(!prototype.postState || prototype.postState === 4) && prototype.samplePostInfo.sendType === 2 && prototype.platStablePostInfo">
        <div class="prototype-li-flex">
          <div class="prototype-li-flex-image">
            <img class="prototype-li-flex-image-icon" src="../../../../assets/images/address.png" alt="">
          </div>
        </div>
        <div class="prototype-li-flex">
          <div class="prototype-li-flex-content">
            <div class="prototype-li-flex-text">{{ prototype.platStablePostInfo.userName || "" }}</div>
            <div class="prototype-li-flex-text">{{ prototype.platStablePostInfo.phoneNo || "" }}</div>
          </div>
          <div class="prototype-li-flex-content">
            <div class="prototype-li-flex-text">{{ prototype.platStablePostInfo.address || "" }}</div>
            <div class="prototype-li-flex-button"
              @click="
                copy(
                  (prototype.platStablePostInfo.userName || '') +
                    (prototype.platStablePostInfo.phoneNo || '') +
                    (prototype.platStablePostInfo.address || '')
                )
              "
            >
              复制
            </div>
          </div>
        </div>
      </div>
      <div class="prototype-li-row prototype-li-row-end" v-if="(!prototype.postState || prototype.postState === 4) && prototype.samplePostInfo.sendType === 2 && prototype.samplePostInfo">
        <el-select class="prototype-li-flex-select" :value="companyReturnIndex" placeholder="请选择快递公司" @change="updateCompanyReturnIndex">
          <el-option
            v-for="(item, index) in companyReturnList"
            :key="item.id"
            :label="item.name"
            :value="index">
          </el-option>
        </el-select>
        <div class="prototype-li-flex-input">
          <input
            type="text"
            placeholder="请输入快递单号"
            :value="prototype.samplePostInfo.expressNum || ''"
            @change="
              updatePrototypeData({
                name: 'expressNum',
                value: $event.target.value
              })
            "
          />
        </div> 
        <div class="prototype-li-flex-text prototype-li-flex-text-gray">邮寄后请填写快递信息</div>
      </div>
      <div class="prototype-li-flex-buttons" v-if="(!prototype.postState || prototype.postState === 4)">
        <div class="prototype-li-flex-button prototype-li-flex-button-blue prototype-li-flex-button-large" @click="commitMailInfo()">
          提交
        </div>
      </div>

      <div class="prototype-li-row" v-if="!(!prototype.postState || prototype.postState === 4) && prototype.samplePostInfo.sendType === 2">
        <div class="prototype-li-flex">
          <div class="prototype-li-flex-image">
            <img class="prototype-li-flex-image-icon" src="../../../../assets/images/car.png" alt="">
          </div>
        </div>
        <div class="prototype-li-flex" v-if="prototype.samplePostInfo">
          <div class="prototype-li-flex-content">
            <div class="prototype-li-flex-text">快递公司：{{ prototype.samplePostInfo.expressName || "--" }}</div>
          </div>
          <div class="prototype-li-flex-content">
            <div class="prototype-li-flex-text">快递单号：{{ prototype.samplePostInfo.expressNum || "--" }}</div>
            <div class="prototype-li-flex-button"
              @click="copy(prototype.samplePostInfo.expressNum || '')"
            >
              复制
            </div>
          </div>
        </div>
      </div>
      <div class="prototype-li-row prototype-li-row-end" v-if="prototype.postState === 1">
        <div class="prototype-li-flex-text prototype-li-flex-text-gray">快递信息已提交，请等待平台验收</div>
      </div>
    </div>

    <div class="prototype-li prototype-li-border" v-if="prototype.platApproval || prototype.customerApproval">
      <div class="prototype-li-title">
        <span class="prototype-li-title-black">验收结果</span>
      </div>

      <div class="prototype-li-content prototype-li-content-gray" v-if="prototype.platApproval && (prototype.platApproval.opinion === 0 || prototype.platApproval.opinion === 1)">
        <div class="prototype-li-content-text">
          <div class="prototype-li-content-text-black">平台端：</div>
          <div class="prototype-li-content-text-red" v-if="prototype.platApproval.opinion === 0">驳回</div>
          <div class="prototype-li-content-text-blue" v-else-if="prototype.platApproval.opinion === 1">通过</div>
        </div>
      </div>
      <div class="prototype-li-content prototype-li-content-gray prototype-li-content-line" v-if="prototype.platApproval && prototype.platApproval.opinion === 0">
        <div class="prototype-li-content-text">
          <div class="prototype-li-content-text-black">驳回原因：</div>
          <div class="prototype-li-content-text-flex">
            <div class="prototype-li-content-text-images">
              <img class="prototype-li-content-text-image" v-for="(a, b) in prototype.platApproval.approvalFiles" :key="a.fileId + '_平台驳回说明_' + b" :src="BASE_IMAGE_URL + a.filePath" v-show="a.filePath" alt="">
            </div>
            <div class="prototype-li-content-text-black">{{ prototype.platApproval.cause || "--" }}</div>
          </div>
        </div>
      </div>

      <div class="prototype-li-content prototype-li-content-gray" v-if="prototype.customerApproval && (prototype.customerApproval.opinion === 0 || prototype.customerApproval.opinion === 1)">
        <div class="prototype-li-content-text">
          <div class="prototype-li-content-text-black">客户端：</div>
          <div class="prototype-li-content-text-red" v-if="prototype.customerApproval.opinion === 0">驳回</div>
          <div class="prototype-li-content-text-blue" v-else-if="prototype.customerApproval.opinion === 1">通过</div>
        </div>
      </div>
      <div class="prototype-li-content prototype-li-content-gray prototype-li-content-line" v-if="prototype.customerApproval && prototype.customerApproval.opinion === 0">
        <div class="prototype-li-content-text">
          <div class="prototype-li-content-text-black">驳回原因：</div>
          <div class="prototype-li-content-text-flex">
            <div class="prototype-li-content-text-images">
              <img class="prototype-li-content-text-image" v-for="(a, b) in prototype.customerApproval.approvalFiles" :key="a.fileId + '_平台驳回说明_' + b" :src="BASE_IMAGE_URL + a.filePath" v-show="a.filePath" alt="">
            </div>
            <div class="prototype-li-content-text-black">{{ prototype.customerApproval.cause || "--" }}</div>
          </div>
        </div>
      </div>
      
      <div class="prototype-li-content prototype-li-content-gray prototype-li-content-line" v-if="prototype.questionList && prototype.questionList.length > 0">
        <div class="list">
          <div class="li" v-for="(a, b) in prototype.questionList" :key="b">
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";

import { Supplier } from "@/store/modules/order/state";
import {
  InitInfo,
  Prototype,
  PostList,
  CompanyReturnList,
  QuestionList
} from "@/store/modules/order/modules/prototype/state";
import { ActionTypes } from "@/store/modules/order/modules/prototype/actions";
import { MutationTypes } from "@/store/modules/order/modules/prototype/mutations";

import { BASE_IMAGE_URL } from "@/config";
import Upload from "@/api/upload";

export default defineComponent({
  name: "PrototypeView",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();

    const initInfo: InitInfo | any = computed(() => store.state.order.prototype.initInfo);
    const prototype: Prototype | any = computed(() => store.state.order.prototype.prototype);
    const postIndex: number | any = computed(() => store.state.order.prototype.postIndex);
    const postList: Array<PostList> | any = computed(() => store.state.order.prototype.postList);
    const companyReturnIndex: number | any = computed(() => store.state.order.prototype.companyReturnIndex);
    const companyReturnList: Array<CompanyReturnList> | any = computed(() => store.state.order.prototype.companyReturnList);

    const getPrototype: Function = (params: any) => store.dispatch(`order/prototype/${ActionTypes.GetPrototype}`, params);
    const updatePrototypeData: Function = (params: any) => store.dispatch(`order/prototype/${ActionTypes.UpdatePrototypeData}`, params);
    const commitMailInfo: Function = (params: any) => store.dispatch(`order/prototype/${ActionTypes.CommitMailInfo}`, params);
    const deleteFile: Function = (params: any) => store.dispatch(`order/prototype/${ActionTypes.DeleteFile}`, params);
    const getQuestionList: Function = (params: any) => store.dispatch(`order/prototype/${ActionTypes.GetQuestionList}`, params);
    const answerQuestion: Function = (params: any) => store.dispatch(`order/prototype/${ActionTypes.AnswerQuestion}`, params);

    const updatePrototype: Function = (params: any) => store.commit(`order/prototype/${MutationTypes.UpdatePrototype}`, params);
    const updateCompanyReturnIndex: Function = (params: any) => store.commit(`order/prototype/${MutationTypes.UpdateCompanyReturnIndex}`, params);

    const copy = (value: string) => {
      const outInput = document.createElement("input");
      outInput.value = value;
      document.body.appendChild(outInput);
      outInput.select();
      document.execCommand("copy");
      outInput.style.display = "none";
    }

    const updateQuestion = (params: any) => {
      const { questionList } = prototype || {};
      const { value, name, index } = params || {};
      questionList[index][name] = value;
      updatePrototype(prototype);
    }

    const showMessageBox = (b: number) => {
      ElMessageBox({
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
            answerQuestion({ index: b, opinion: 0, replyContent: value })
          }
        })
        .catch(() => {});
    }

    const index: Ref<number> = ref(-1);
    const pasteType: Ref<number> = ref(0);

    const selectFile = (b: number, pt: number) => {
      index.value = b;
      pasteType.value = pt;
      const dom: any = document.querySelector("#prototypeSingleFile");
      dom.click();
    }
    const uploadFile = async (e: any) => {
      const files = e.target.files;
      const fileList: any = await Upload({ files });
      for (const v of fileList) {
        updateFile(v);
      }
      e.target.value = null;
    }
    const updateFile = (v: any) => {
      const { id, fileName, filePath } = v || {};
      const { samplePostInfo } = prototype || {};
      const { sampleFiles } = samplePostInfo || {};
      const sampleFilesTemp = sampleFiles || [];
      sampleFilesTemp.push({ fileId: id, fileName, filePath });
      updatePrototypeData({
        name: 'sampleFiles',
        value: sampleFilesTemp
      })
    }

    getPrototype();

    return {
      Supplier,
      BASE_IMAGE_URL,
      initInfo,
      prototype,
      postIndex,
      postList,
      companyReturnIndex,
      companyReturnList,
      getPrototype,
      updatePrototypeData,
      commitMailInfo,
      deleteFile,
      getQuestionList,
      answerQuestion,
      updatePrototype,
      updateCompanyReturnIndex,
      copy,
      updateQuestion,
      showMessageBox,
      index,
      pasteType,
      selectFile,
      uploadFile,
      updateFile,
    };
  }
});
</script>

<style lang="scss" scoped>
.prototype {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  &-li {
    margin: 40px;
    padding-left: 12px;
    &-border {
      padding-top: 15px;
      border-top: solid 1px #DCDCDC;
    }
    &-title {
      position: relative;
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: -12px;
        width: 4px;
        height: 17px;
        border-radius: 2px;
        background: #3A78F4;
        transform: translate(0, -50%);
      }
      &-black {
        font-size: 16px;
        color: #1B1B1B;
      }
      &-gray {
        font-size: 14px;
        color: #999999;
      }
      &-blue {
        font-size: 14px;
        color: #3A78F4;
      }
      &-red {
        font-size: 14px;
        color: #FF0707;
      }
      &-left {
        margin-left: 16px;
      }
    }
    &-content {
      margin-top: 14px;
      &-line {
        margin-top: 1px;
      }
      &-gray {
        padding: 20px;
        background: #F3F6FA;
      }
      &-text {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        &-black {
          font-size: 14px;
          color: #1B1B1B;
        }
        &-gray {
          font-size: 14px;
          color: #999999;
        }
        &-blue {
          font-size: 14px;
          color: #3A78F4;
        }
        &-red {
          font-size: 14px;
          color: #FF0707;
        }
        &-flex {
          flex: 1;
        }
        &-images {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: flex-start;
        }
        &-image {
          width: 100px;
          height: 80px;
          object-fit: contain;
          background: white;
          margin: 0 10px 10px 0;
        }
      }
    }
    &-images {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
    }
    &-image {
      width: 100px;
      height: 80px;
      margin: 0 14px 14px 0;
      background: white;
      position: relative;
      &-url {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &-delete {
        display: none;
      }
      &:hover &-delete {
        position: absolute;
        top: 0;
        right: 0;
        width: 15px;
        height: 15px;
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
      width: 100px;
      height: 80px;
      margin: 0 20px 20px 0;
      border: dashed 1px #D2D2D2;
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
      &-icon {
        color: #3A78F4;
        font-size: 28px;
      }
      &-text {
        color: #3A78F4;
        font-size: 16px;
      }
    }
    &-textarea {
      margin-top: 1px;
      &-input {
        width: 100%;
        min-height: 60px;
        border: none;
        background: transparent;
        outline: none;
        font-size: 14px;
        color: #1B1B1B;
      }
      &-text {
        font-size: 14px;
        color: #1B1B1B;
      }
    }
    &-radios {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 20px 0;
    }
    &-radio {
      margin-right: 40px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      &-label {
        width: 16px;
        height: 16px;
        border-radius: 100px;
        border: solid 1px #A0A0A0;
        position: relative;
        margin-right: 5px;
        &-active {
          border: solid 1px #3A78F4;
          &:after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 8px;
            height: 8px;
            transform: translate(-50%, -50%);
            border-radius: 100px;
            background: #3A78F4;
          }
        }
      }
      &-icon {
        width: 16px;
        height: 16px;
        margin-right: 5px;
        object-fit: contain;
      }
      &-text {
        font-size: 14px;
        color: #1B1B1B;
      }
    }
    &-row {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 20px 0;
      &-end {
        align-items: flex-end;
      }
      &-gray {
        margin: 0;
        padding: 20px;
        background: #F3F6FA;
      }
    }
    &-flex {
      &-image {
        height: 30px;
        margin-right: 20px;
        &-icon {
          height: 100%;
          object-fit: contain;
        }
      }
      &-content {
        margin-right: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      &-text {
        color: #1B1B1B;
        font-size: 14px;
        margin-right: 20px;
        &-gray {
          color: #999999;
          font-size: 14px;
        }
      }
      &-select {
        color: $color-text-black;
        font-size: 14px;
        border-radius: 4px;
        background: $color-bg-white;
        margin-right: 20px;
      }
      &-input {
        color: $color-text-black;
        font-size: 14px;
        border-radius: 4px;
        background: $color-bg-white;
        padding: 10px;
        margin-right: 20px;
        border: solid 1px #BFBFBF;
        input {
          outline: none;
          border: none;
          color: $color-text-black;
          font-size: 14px;
        }
      }
      &-buttons {
        margin: 20px 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      &-button {
        border-radius: 4px;
        padding: 4px 10px;
        font-size: 14px;
        border: solid 1px $color-bd-blue;
        color: $color-text-blue;
        background: $color-bg-white;
        cursor: pointer;
        margin-right: 20px;
        &-large {
          padding: 8px 20px;
        }
        &-blue {
          border: solid 1px $color-bd-blue;
          color: $color-text-white;
          background: $color-bg-blue;
        }
      }
    }
  }
  .list {
    .li {
      background: #F3F6FA;
      border-radius: 4px;
      &-title {
        color: $color-text-black;
        font-size: 16px;
      }
      &-row {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 20px;
      }
      &-flex {
        flex: 1;
      }
      &-image {
        border-radius: 4px;
        background: $color-bg-white;
        min-height: 190px;
        margin-right: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        &-icon {
          width: 60px;
          height: 60px;
          background: $color-bg;
          object-fit: contain;
          margin: 10px;
        }
      }
      &-text {
        color: $color-text-gray;
        font-size: 14px;
      }
      &-context {
        color: $color-text-black;
        font-size: 14px;
        margin-top: 20px;
      }
      &-textarea {
        color: $color-text-black;
        font-size: 14px;
        margin-top: 20px;
        border-radius: 8px;
        background: $color-bg-white;
        padding: 10px;
        textarea {
          width: 100%;
          height: 60px;
          outline: none;
          border: none;
        }
      }
      &-items {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      &-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &-image {
          width: 20px;
          height: 20px;
          margin-right: 10px;
          &-icon {
            width: 100%;
            object-fit: contain;
          }
        }
        &-text {
          color: $color-text-black;
          font-size: 14px;
          &-p {
            padding-left: 10px;
          }
        }
        &-select {
          margin-right: 10px;
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
      }
      &-buttons {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20px;
      }
      &-button {
        border-radius: 4px;
        padding: 5px 10px;
        font-size: 14px;
        border: solid 1px $color-bd-blue;
        color: $color-text-blue;
        background: $color-bg-white;
        cursor: pointer;
        margin-right: 20px;
        &-blue {
          border: solid 1px $color-bd-blue;
          color: $color-text-white;
          background: $color-bg-blue;
        }
      }
    }
  }
}
</style>
