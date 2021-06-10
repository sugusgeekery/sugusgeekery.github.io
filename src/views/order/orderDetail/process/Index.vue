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
  MachinStepList,
  AssembleStepList,
  InjectionStepList,
} from "@/store/modules/order/modules/process/state";
import { ActionTypes } from "@/store/modules/order/modules/process/actions";
import { MutationTypes } from "@/store/modules/order/modules/process/mutations";

import { BASE_IMAGE_URL } from "@/config";
import Upload from "@/api/upload";

export default defineComponent({
  name: "ProcessView",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();

    const initInfo: InitInfo | any = computed(() => store.state.order.process.initInfo);
    const machinStepList: Array<MachinStepList> | any = computed(() => store.state.order.process.machinStepList);
    const assembleStepList: Array<AssembleStepList> | any = computed(() => store.state.order.process.assembleStepList);
    const injectionStepList: Array<InjectionStepList> | any = computed(() => store.state.order.process.injectionStepList);

    const finishedStep: Function = (params: any) => store.dispatch(`order/process/${ActionTypes.FinishedStep}`, params);
    const deleteStepFile: Function = (params: any) => store.dispatch(`order/process/${ActionTypes.DeleteStepFile}`, params);
    const getMachinSteps: Function = (params: any) => store.dispatch(`order/process/${ActionTypes.GetMachinSteps}`, params);
    const getAssembleSteps: Function = (params: any) => store.dispatch(`order/process/${ActionTypes.GetAssembleSteps}`, params);
    const getInjectionSteps: Function = (params: any) => store.dispatch(`order/process/${ActionTypes.GetInjectionSteps}`, params);

    const updateMachinStepList: Function = (params: any) => store.commit(`order/process/${MutationTypes.UpdateMachinStepList}`, params);
    const updateAssembleStepList: Function = (params: any) => store.commit(`order/process/${MutationTypes.UpdateAssembleStepList}`, params);
    const updateInjectionStepList: Function = (params: any) => store.commit(`order/process/${MutationTypes.UpdateInjectionStepList}`, params);

    const pasteIndex: Ref<number> = ref(-1);
    const pasteType: Ref<number> = ref(-1);
    const selectFile = ({ type = 0, index = 0 }: { type: number, index: number}) => {
      pasteIndex.value = index;
      pasteType.value = type;
      const dom: any = document.querySelector("#file");
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
      if (pasteType.value === 1) {
        machinStepList[pasteIndex.value].fileInfos = [...(machinStepList[pasteIndex.value].fileInfos || []), { filePath, fileName, fileId: id }];
        updateMachinStepList(machinStepList);
      } else if (pasteType.value === 2) {
        assembleStepList[pasteIndex.value].fileInfos = [...(assembleStepList[pasteIndex.value].fileInfos || []), { filePath, fileName, fileId: id }];
        updateAssembleStepList(assembleStepList);
      } else if (pasteType.value === 3) {
        injectionStepList[pasteIndex.value].fileInfos = [...(injectionStepList[pasteIndex.value].fileInfos || []), { filePath, fileName, fileId: id }];
        updateInjectionStepList(injectionStepList);
      }
    }

    onMounted(() => {
      const { type = "" } = initInfo || {};
      switch(type) {
        case Supplier.Dfm:
          break;
        case Supplier.Design:
          break;
        case Supplier.Machining:
          getMachinSteps();
          getAssembleSteps();
          break;
        case Supplier.Injection:
          getInjectionSteps();
          break;
      }
    })

    return {
      Supplier,
      BASE_IMAGE_URL,
      initInfo,
      machinStepList,
      assembleStepList,
      injectionStepList,
      finishedStep,
      deleteStepFile,
      getMachinSteps,
      getAssembleSteps,
      getInjectionSteps,
      updateMachinStepList,
      updateAssembleStepList,
      updateInjectionStepList,
      pasteIndex,
      pasteType,
      selectFile,
      uploadFile,
      updateFile,
    }
  }
});
</script>

<style lang="scss" scoped>
.process {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  .text-black {
    font-size: 16px;
    color: $color-text-black;
    margin: 20px 40px;
  }
  .text-gray {
    font-size: 14px;
    color: $color-text-gray;
    margin: 20px 40px;
  }
  .buttons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 40px;
  }
  .button {
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 14px;
    border: solid 1px $color-bd-blue;
    color: $color-text-blue;
    background: $color-bg-white;
    cursor: pointer;
    margin: 0 10px 0 0;
    min-width: 80px;
    text-align: center;
    &-blue {
      border: solid 1px $color-bd-blue;
      color: $color-text-white;
      background: $color-bg-blue;
    }
  }
  .items {
    padding: 40px 60px;
    &-text {
      color: $color-text-gray;
      margin: 0 0 20px -30px;
    }
    .item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      min-height: 80px;
      &-label {
        margin-right: 30px;
        &-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          height: 50%;
          background: $color-bd;
          &-blue {
            background: $color-bd-blue;
          }
        }
        &-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 2px;
          height: 50%;
          background: $color-bd;
          &-blue {
            background: $color-bd-blue;
          }
        }
        &-circle {
          position: absolute;
          top: 50%;
          left: 0;
          width: 10px;
          height: 10px;
          border-radius: 100px;
          transform: translate(-40%, -50%);
          background :$color-bd;
          z-index: 9;
          &-blue {
            background: $color-bd-blue;
          }
        }
      }
      &-content {
        margin-right: 30px;
        &-text {
          font-size: 12px;
          color: $color-text-gray;
          margin-bottom: 6px;
        }
        &-title {
          font-size: 14px;
          color: $color-text-black;
        }
      }
      &-buttons {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 20px;
      }
      &-button {
        border-radius: 4px;
        padding: 5px 10px;
        font-size: 14px;
        border: solid 1px $color-bd-blue;
        color: $color-text-blue;
        background: $color-bg-white;
        cursor: pointer;
        margin: 0 10px;
        min-width: 80px;
        text-align: center;
        &-blue {
          border: solid 1px $color-bd-blue;
          color: $color-text-white;
          background: $color-bg-blue;
        }
      }
      &-images {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
      }
      &-image {
        width: 50px;
        height: 50px;
        margin: 0 10px 10px 0;
        position: relative;
        background: $color-bg-blue-white;
        border-radius: 4px;
        &-icon {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        &-delete {
          display: none;
        }
        &:hover {
          .item-image-delete {
            position: absolute;
            top: 0;
            right: 0;
            width: 30%;
            height: 30%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100px;
            background: $color-bg-blue-white;
            color: $color-text-red;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
