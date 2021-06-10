<template>
  <div class="information">
    <div class="show-image" v-if="isShowImage">
      <img src="../../../../assets/images/GB-T14486-2008.png" class="li-text-icon" alt="" @click="showImage(false)">
    </div>
    <div
      class="list"
      v-if="mould.mouldProductList && mould.mouldProductList.length"
    >
      <div class="li li-bg">
        <div class="li-row">
          <div class="li-text">
            <span class="li-text-gray">模具寿命：</span>
            <span class="li-text-gray">{{ mould.lifetime }}（万啤）</span>
          </div>
        </div>
        <div class="li-row">
          <div class="li-text">
            <span class="li-text-gray">精度标准</span>
            <img src="../../../../assets/images/tip_4.png" class="li-text-icon" alt="" @click="showImage(true)">
            <!-- <el-image 
              class="li-text-icon"
              :src="require('../../../../assets/images/tip_4.png')" 
              :preview-src-list="[require('../../../../assets/images/GB-T14486-2008.png')]">
            </el-image> -->
            <span class="li-text-gray">：</span>
            <span class="li-text-gray">{{ mould.toleranceValue }}</span>
          </div>
        </div>
        <div class="li-row">
          <div class="li-text">
            <span class="li-text-button" @click="getArrangementScheme()">排模方案</span>
          </div>
        </div>
      </div>
      <div
        class="li"
        v-for="(a, b) in mould.mouldProductList"
        :key="b"
      >
        <div class="li-text">
          <span class="li-text-black">产品：</span>
          <span class="li-text-black">{{ a.realProductNo }}</span>
          <!-- <span class="li-text-tips" v-if="a.isUpdateImage !== 2">
            <img src="../../../../assets/images/tip_3.png" class="li-text-icon" alt="">
            <span class="li-text-tip">需要更新图纸</span>
          </span> -->
        </div>
        <div class="li-content">
          <div class="li-row">
            <div class="li-image">
              <img
                class="li-image-icon"
                :src="BASE_IMAGE_URL + a.productImage"
                alt=""
              />
            </div>
            <div class="li-text">
              <span class="li-text-blue li-text-pointer" @click="downloadFile(a.fileUrl, a.productName + '.' + (a.fileUrl.split('.')[1]))">下载</span>
            </div>
          </div>
          <div class="li-row">
            <div class="li-text">
              <span class="li-text-black">表面要求：</span>
              <span class="li-text-gray">{{ a.surfaceTreatment }}</span>
            </div>
            <div class="li-text">
              <span class="li-text-black">产品数量：</span>
              <span class="li-text-gray">{{ a.productNum }}</span>
            </div>
            <div class="li-text">
              <span class="li-text-black">重量(g)：</span>
              <span class="li-text-gray">{{ a.productWeight }}</span>
            </div>
          </div>
          <div class="li-row">
            <div class="li-text">
              <span class="li-text-black">材料及颜色：</span>
              <span class="li-text-blue"
                >{{ a.productMaterial.materialSpecParentName
                }}{{ a.productMaterial.materialColorValue }}</span
              >
            </div>
            <div class="li-text">
              <span class="li-text-black">二次工艺：</span>
              <span class="li-text-blue">{{
                a.productTechnologyList.technologySpecName
              }}</span>
            </div>
            <div class="li-text">
              <span class="li-text-black">尺寸(mm)：</span>
              <span class="li-text-gray li-text-border">{{
                a.productLength
              }}</span>
              <span class="li-text-gray li-text-border">{{
                a.productWidth
              }}</span>
              <span class="li-text-gray li-text-border">{{
                a.productHeight
              }}</span>
            </div>
          </div>
        </div>
        <div class="li-buttons" v-if="Supplier.Dfm === orderObject.type">
          <div class="li-button li-button-blue" v-if="a.isUpdateImage !== 2" @click="needChangeDrawing({ index: b })">需要更新图纸</div>
          <div class="li-button li-button-blue" v-if="a.isUpdateImage === 2" @click="dfmApprovalDrawing({ opinion: 1, index: b })">确认图纸</div>
          <div class="li-button li-button-red" v-if="a.isUpdateImage === 2" @click="dfmApprovalDrawing({ opinion: 1, index: b })">驳回图纸</div>
        </div>
      </div>
    </div>
    <ArrangementScheme :data="arrangementScheme" @updateData="updateArrangementScheme"></ArrangementScheme>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

import { Supplier } from "@/store/modules/order/state";
import { Mould } from "@/store/modules/order/state";
import { GetterTypes } from "@/store/modules/order/getters";
import { ActionTypes } from "@/store/modules/order/actions";
import { MutationTypes } from "@/store/modules/order/mutations";

import { BASE_IMAGE_URL } from "@/config";
import downloadByUrl from "@/utils/downloadByUrl";

import ArrangementScheme from "@/components/models/ArrangementScheme.vue";

export default defineComponent({
  name: "OrderInformationComponent",
  components: {
    ArrangementScheme
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const mould: Mould | any = computed(() => store.state.order.mould);
    const arrangementScheme: ArrangementSchemeTypes | any = computed(() => store.state.order.arrangementScheme);

    const orderObject: object | any = computed(() => store.getters.order[GetterTypes.OrderObject]);

    const getMould: Function = (params: any) => store.dispatch(`order/${ActionTypes.GetMould}`, params);
    const dfmApprovalDrawing: Function = (params: any) => store.dispatch(`order/${ActionTypes.DfmApprovalDrawing}`, params);
    const getArrangementScheme: Function = (params: any) => store.dispatch(`order/${ActionTypes.GetArrangementScheme}`, params);

    const updateArrangementScheme: Function = (params: any) => store.commit(`order/${MutationTypes.UpdateArrangementScheme}`, params);

    const isShowImage: Ref<boolean> = ref(false);
    const biu: Ref<string> = ref(BASE_IMAGE_URL);

    const showImage = (isShowImage: boolean) => {
      isShowImage = isShowImage;
    }

    const downloadFile = (url: string, name: string) => {
      if (url) {
        downloadByUrl(BASE_IMAGE_URL + url, name);
      }
    }

    getMould();

    return {
      mould,
      arrangementScheme,
      orderObject,
      getMould,
      dfmApprovalDrawing,
      getArrangementScheme,
      updateArrangementScheme,
      isShowImage,
      BASE_IMAGE_URL: biu,
      Supplier,
      showImage,
      downloadFile
    };
  }
});
</script>

<style lang="scss" scoped>
.information {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  .show-image {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    justify-content: center ;
    align-items: center;
    z-index: 999;
    background: rgba($color-bg-black, .3);
    img {
      object-fit: contain;
    }
  }
  .list {
    margin: 36px;
    border: solid 1px $color-bd;
    .li {
      padding: 20px 40px;
      border-bottom: solid 1px $color-bd;
      &:nth-last-of-type(1),
      &:nth-of-type(1) {
        border-bottom: none;
      }
      &-bg {
        background: $color-bg;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      &-content {
        margin: 16px 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      &-row {
        flex: 1;
      }
      &-image {
        width: 100px;
        height: 100px;
        &-icon {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      &-text {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
        margin-bottom: 20px;
        position: relative;
        &:nth-last-of-type(1) {
          margin-bottom: 0px;
        }
        &-tips {
          position: relative;
          width: 120px;
        }
        &-tip {
          position: absolute;
          top: -100%;
          right: 0;
          border: solid 1px $color-bd-blue;
          padding: 6px 10px 4px 10px;
          border-radius: 3px;
          color: $color-text-gray;
          font-size: 12px;
          &:before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translate(-100%, -50%);
            border-left: solid 4px transparent;
            border-bottom: solid 4px $color-bd-blue;
            border-top: solid 4px transparent;
            border-right: solid 4px $color-bd-blue;
          }
          &:after {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translate(-100%, -50%);
            border-left: solid 3px transparent;
            border-bottom: solid 3px white;
            border-top: solid 3px transparent;
            border-right: solid 3px white;
          }
        }
        &-icon {
          margin-left: 5px;
          width: 13px;
          object-fit: contain;
        }
        &-pointer {
          cursor: pointer;
        }
        &-gray {
          color: $color-text-gray;
        }
        &-black {
          color: $color-text-black;
        }
        &-blue {
          color: $color-text-blue;
          text-decoration: underline;
        }
        &-border {
          border: solid 1px $color-bd;
          border-radius: 4px;
          padding: 4px 8px;
          margin-right: 4px;
          &-blue {
            border: solid 1px $color-bd-blue;
          }
        }
        &-buttons {
          margin: 16px 0;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        &-button {
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 14px;
          border: solid 1px $color-bd-blue;
          color: $color-text-blue;
          background: $color-bg-white;
          cursor: pointer;
          margin-left: 20px;
          &-blue {
            border: solid 1px $color-bd-blue;
            color: $color-text-blue;
            background: $color-bg-white;
          }
          &-red {
            border: solid 1px $color-bd-red;
            color: $color-text-red;
            background: $color-bg-white;
          }
        }
      }
      &-buttons {
        margin: 16px 0;
        display: flex;
        justify-content: flex-end;
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
        margin-left: 20px;
        &-blue {
          border: solid 1px $color-bd-blue;
          color: $color-text-blue;
          background: $color-bg-white;
        }
        &-red {
          border: solid 1px $color-bd-red;
          color: $color-text-red;
          background: $color-bg-white;
        }
      }
    }
  }
  .filter-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px;
    &:nth-last-of-type(1) {
      margin-bottom: 100px;
    }
  }
  .filter-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-label {
      font-size: 14px;
      color: $color-text-gray;
      margin: 0 6px;
    }
    &-content {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 0 6px;
    }
    &-text {
      font-size: 14px;
      color: $color-text-gray;
      margin-right: 8px;
    }
    &-select {
      max-width: 160px;
    }
    &-input {
      max-width: 160px;
      border: solid 1px $color-bd-grey;
      border-radius: 5px;
      outline: none;
      font-size: 14px;
      color: $color-text-gray;
      margin-right: 8px;
      padding: 10px;
      transition: all .3s;
      &:hover {
        border: solid 1px $color-bd-grey-light;
      }
      &::placeholder {
        color: $color-text-grey;
      }
    }
    &-buttons {
      margin: 16px 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    &-button {
      border-radius: 4px;
      padding: 10px 18px;
      font-size: 14px;
      border: solid 1px $color-bd-blue;
      color: $color-text-blue;
      background: $color-bg-white;
      cursor: pointer;
      margin-left: 20px;
      &-blue {
        border: solid 1px $color-bd-blue;
        color: $color-text-white;
        background: $color-bg-blue;
      }
      &-red {
        border: solid 1px $color-bd-red;
        color: $color-text-red;
        background: $color-bg-white;
      }
    }
  }
}
</style>
