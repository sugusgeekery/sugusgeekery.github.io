<template>
  <div class="header-container">
    <div class="header-wrapper">
      <div class="header-logo">
        <img class="header-logo-image" :src="logoicon" alt="" />
        <div class="header-logo-text">好品数字 合作伙伴</div>
      </div>
      <div class="header-icon">
        <img
          class="header-icon-image"
          :src="accountInfo.headImgUrl ? accountInfo.headImgUrl : headicon"
          alt=""
        />
        <div class="header-icon-message">{{ accountInfo.userName || "" }}</div>
        <div
          class="header-icon-button header-icon-button-active"
          v-if="accountInfo.certificateState === 1"
        >
          已认证
        </div>
        <div
          class="header-icon-button header-icon-button-active"
          v-else-if="accountInfo.certificateState === 2"
        >
          申请认证
        </div>
        <div class="header-icon-button" v-else>未认证</div>
        <div class="header-icon-link" @click="logout()">退出</div>
        <!-- <div class="header-icon-link">个人中心</div> -->
        <!-- <div class="header-icon-message">消息</div>
        <div class="header-icon-tip">5</div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

import { AccountInfo } from "@/store/state";
import { RootActionTypes } from "@/store/actions";

import { BASE_IMAGE_URL } from "@/config";

export default defineComponent({
  name: "Header",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();

    const accountInfo = computed(() => store.state.accountInfo);

    const logout: Function = (params: any) => store.dispatch(RootActionTypes.Logout, params);

    const headicon = () => import("@/assets/images/headicon.png");
    const logoicon = () => import("@/assets/images/logo.png");

    return {
      accountInfo,
      logout,
      BASE_IMAGE_URL,
      headicon,
      logoicon,
    }
  }
});
</script>

<style lang="scss" scoped>
.header {
  &-container {
    width: 100%;
    min-width: $width-min;
    background: $color-bg-white;
    padding: 25px 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    box-shadow: 0px 6px 10px 0px rgba($color-bs-black, 0.15);
    z-index: 9;
  }
  &-left {
    flex: 1;
  }
  &-right {
    flex: 2;
  }
  &-wrapper {
    flex: 7;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 20px;
  }
  &-logo {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    &-image {
      width: 205px;
      object-fit: contain;
    }
    &-text {
      padding-left: 13px;
      color: $color-text-black;
      font-size: 24px;
      font-weight: bold;
    }
  }
  &-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    &-image {
      width: 46px;
      height: 46px;
      border-right: 100px;
      border-radius: 100px;
      overflow: hidden;
      object-fit: cover;
    }
    &-link {
      padding: 0 8px;
      color: $color-text-blue;
      font-size: 16px;
      cursor: pointer;
    }
    &-button {
      padding: 2px 8px;
      line-height: 24px;
      color: $color-text-white;
      font-size: 12px;
      border-radius: 100px;
      background: $color-bg-gray;
      &-active {
        color: $color-text-white;
        background: $color-bg-blue;
      }
    }
    &-message {
      padding: 0 8px;
      color: $color-text-gray;
      font-size: 14px;
    }
    &-tip {
      color: $color-text-white;
      background: $color-bg-red;
      width: 20px;
      height: 20px;
      border-radius: 100px;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
    }
  }
}
</style>
