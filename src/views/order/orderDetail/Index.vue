<template>
  <div class="context">
    <div class="context-title">
      订单中心
      <span v-if="orderObject.orderNo">/{{ orderObject.orderNo }}</span>
    </div>
    <div class="context-body">
      <div class="list">
        <div class="list-header">
          <div class="nav-items">
            <HpSteps :list="navigationList" @updateList="updateList" ></HpSteps>
          </div>
          <div class="nav-buttons">
            <div class="nav-button">平台标准</div>
            <div class="nav-button" @click="exportDfm()">下载报告</div>
          </div>
        </div>
        <div class="list-body">
          <div class="list-buttons">
            <div class="list-button" v-if="!isShowOrderInfo" @click="isShowOrderInfo = !isShowOrderInfo">
              <span>订</span>
              <span>单</span>
              <span>信</span>
              <span>息</span>
            </div>
            <div class="list-button" v-else @click="isShowOrderInfo = !isShowOrderInfo">
              <span>返</span>
              <span>回</span>
              <span>流</span>
              <span>程</span>
            </div>
          </div>
          <OrderInformation v-if="isShowOrderInfo"></OrderInformation>
          <router-view v-else />
        </div>
      </div>
      <div> 
        <Countdown :data="countdown"></Countdown>
        <Contact :data="contact"></Contact>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

import { } from "@/store/modules/order/state";
import { GetterTypes } from "@/store/modules/order/getters";
import { ActionTypes } from "@/store/modules/order/actions";

import Countdown from "@/components/templates/Countdown.vue";
import Contact from "@/components/templates/Contact.vue";
import HpSteps from "@/components/navigation/HpSteps.vue";
import OrderInformation from "./components/OrderInformation.vue";

export default defineComponent({
  name: "OrderDetailView",
  components: {
    Countdown,
    Contact,
    HpSteps,
    OrderInformation
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const navigationIndex: number | any = computed(() => store.state.order.navigationIndex);
    const navigationList: Array<HpStepTypes> | any = computed(() => store.state.order.navigationList);
    const countdown: CountdownTypes | any = computed(() => store.state.order.countdown);
    const contact: Array<ContactTypes> | any = computed(() => store.state.order.contact);
    const orderObject: any = computed(() => {
      return store.state.order.order.list[store.state.order.order.index] || {};
    });

    // console.log(store.getters)
    // const orderObject: object | any = computed(() => store.getters.order[GetterTypes.OrderObject]);
    // console.log(orderObject)

    const updateNavigationIndex: Function = (params: any) => store.dispatch(`order/${ActionTypes.UpdateNavigationIndex}`, params);
    const getCountdown: Function = (params: any) => store.dispatch(`order/${ActionTypes.GetCountdown}`, params);
    const getContact: Function = (params: any) => store.dispatch(`order/${ActionTypes.GetContact}`, params);
    const exportDfm: Function = (params: any) => store.dispatch(`order/${ActionTypes.ExportDfm}`, params);

    const isShowOrderInfo: Ref<boolean> = ref(false);

    const updateList = (params: { item: HpStepTypes; index: number; list: Array<HpStepTypes>; }) => {
      const { index } = params || {};
      updateNavigationIndex(index);
    }

    onMounted(() => {
      getCountdown();
      getContact();
    })
    onUnmounted(() => {
      getCountdown(false);
    })

    return {
      navigationIndex,
      navigationList,
      countdown,
      contact,
      orderObject,
      updateNavigationIndex,
      getCountdown,
      getContact,
      exportDfm,
      isShowOrderInfo,
      updateList,
    };
  }
});
</script>

<style lang="scss" scoped>
.context {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  &-title {
    width: 100%;
    font-size: 16px;
    color: $color-text-black;
    padding: 20px;
    background: $color-bg-white;
  }
  &-body {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px 20px 20px 40px;
    .tip {
      background: $color-bg-white;
      border-radius: 8px;
      overflow: auto;
      margin: 0 20px;
      padding: 20px;
      min-width: 300px;
      &-title {
        font-size: 16px;
        color: $color-text-black;
        margin: 10px 20px;
      }
      &-text {
        font-size: 14px;
        color: $color-text-gray;
        margin: 10px 20px;
      }
    }
    .list {
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      background: $color-bg-white;
      border-radius: 8px;
      &-header {
        width: 100%;
        background: $color-bg-white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid 1px $color-bd;
        .nav-items {
          flex: 1;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .nav-item {
          position: relative;
          padding: 0 16px;
          cursor: pointer;
          &:nth-of-type(1) {
            padding-left: 0;
          }
          &:after {
            content: "";
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            width: 1px;
            height: 10px;
            background: $color-bg-gray;
            border-radius: 10px;
          }
          &-text {
            color: $color-text-gray;
            border-bottom: solid 2px transparent;
            font-size: 16px;
            padding: 10px;
            &-active {
              color: $color-text-blue;
              border-bottom: solid 2px $color-bd-blue;
            }
          }
        }
        .nav-buttons {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .nav-button {
          margin: 0 5px;
          padding: 4px;
          border-radius: 4px;
          border: solid 1px $color-bd-blue;
          font-size: 12px;
          color: $color-text-blue;
          cursor: pointer;
        }
      }
      &-footer {
        width: 100%;
        background: $color-bg-white;
        margin: auto;
        padding: 5px;
        text-align: center;
      }
      &-body {
        width: 100%;
        flex: 1;
        position: relative;
      }
      &-buttons {
        position: absolute;
        left: 0;
        top: 0;
        transform: translateX(-100%);
      }
      &-button {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        background: white;
        padding: 7px 8px;
        border-radius: 4px;
        border: solid 1px #3A78F4;
        color: #3A78F4;
        font-size: 12px;
        line-height: 16px;
        cursor: pointer;
        margin-top: 8px;
        &:nth-of-type(1) {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
