<template>
  <div id="Login" class="context">
    <img class="background" src="../../../assets/images/login_bg.jpg" alt="" />
    <div class="content">
      <div class="model">
        <div class="model-navs">
          <div
            class="model-nav"
            :class="{ 'model-nav-active': loginNavIndex === b }"
            v-for="(a, b) in loginNavList"
            :key="b"
            @click="updateLoginNavIndex(b)"
          >
            {{ a.text }}
          </div>
        </div>
        <div class="model-section" v-if="loginNavIndex === 0">
          <iframe
            class="model-iframe"
            :src="iframeSrc"
            frameborder="0"
            allowTransparency="true"
            scrolling="no"
          ></iframe>

          <div class="model-text" @click="toRegister()">免费注册</div>
        </div>
        <div class="model-section" v-if="loginNavIndex === 1">
          <div class="model-form">
            <div class="model-form-item">
              <img
                class="model-form-image"
                src="../../../assets/images/phone.png"
                alt=""
              />
              <input
                class="model-form-input"
                type="text"
                placeholder="请输入手机号"
                v-model="phone"
                @change="validateCtl('phone')"
                @keyup.enter="verificationLoginCtl"
              />
            </div>
            <div class="model-form-item">
              <img
                class="model-form-image"
                src="../../../assets/images/verification.png"
                alt=""
              />
              <input
                class="model-form-input"
                type="text"
                placeholder="手机验证码"
                v-model="code"
                @change="validateCtl('code')"
                @keyup.enter="verificationLoginCtl"
              />
              <div
                class="model-form-text-button model-form-text-button-active"
                v-if="verificationCodeNumber > 0"
              >
                还剩{{ verificationCodeNumber }}秒
              </div>
              <div
                class="model-form-text-button"
                :class="{ 'model-form-text-button-active': phone }"
                v-else
                @click="sendVerifyCode"
              >
                发送验证码
              </div>
            </div>
            <div class="model-form-buttons">
              <div class="model-form-button" @click="verificationLoginCtl" @keyup.enter="verificationLoginCtl">
                登录
              </div>
            </div>
          </div>
          <div class="model-text" @click="toRegister()">免费注册</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

import { getWxLoginCodeUrl, getUrlParas } from "@/utils/util";
import { WX_APPID, WX_REDIRECT_URL } from "@/config";

import { LoginNav } from "@/store/state";
import { RootActionTypes } from "@/store/actions";
import { RootMutationTypes } from "@/store/mutations";

export default defineComponent({
  name: "LoginView",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();

    const verificationCodeNumber = computed(() => store.state.verificationCodeNumber);
    const loginNavIndex = computed(() => store.state.loginNavIndex);
    const loginNavList = computed(() => store.state.loginNavList);

    const getVerificationCode: Function = (params: any) => store.dispatch(RootActionTypes.GetVerificationCode, params);
    const verificationCodelogin: Function = (params: any) => store.dispatch(RootActionTypes.VerificationCodelogin, params);
    const wechatLogin: Function = (params: any) => store.dispatch(RootActionTypes.WechatLogin, params);
    const phoneLogin: Function = (params: any) => store.dispatch(RootActionTypes.PhoneLogin, params);

    const updateLoginNavIndex: Function = (params: any) => store.commit(RootMutationTypes.UpdateLoginNavIndex, params);
    const updateVerificationCodeNumber: Function = (params: any) => store.commit(RootMutationTypes.UpdateVerificationCodeNumber, params);

    const phone: Ref<string> = ref("");
    const code: Ref<string> = ref("");
    const iframeSrc: Ref<string> = ref("");

    // 发送验证码
    const sendVerifyCode = () => {
      if (!phone) {
        ElMessage.error("请输入手机号码");
        return;
      }
      getVerificationCode({ phone, type: 0 });
    };
    // 验证输入的手机号码和验证码
    const validateCtl = (text: string) => {
      if (text == "phone") {
        const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        const val = phone.value || "";
        if (val != "") {
          if (!reg.test(val)) {
            ElMessage.error("手机号码格式不对");
            phone.value = "";
          }
        }
      } else if (text == "code") {
        const reg = /^[\d]{6}$/;
        const val = code.value || "";
        if (val != "") {
          if (!reg.test(val)) {
            ElMessage.error("验证码格式不对");
            code.value = "";
          }
        }
      }
    };
    // 微信二维码登录或者手机号直接登录
    const login = () => {
      // 微信扫码登录所需code码
      const jsCode = getUrlParas("code");
      // 直接用手机号登录
      const phoneNo = getUrlParas("phone");
      if (phoneNo) {
        phoneLogin({ phoneNo });
      } else if (jsCode) {
        wechatLogin({ jsCode });
      }
    };
    // 验证码登录
    const verificationLoginCtl = () => {
      if (!phone) {
        ElMessage.error("请输入手机号码");
        return;
      }
      if (!code) {
        ElMessage.error("请输入验证码");
        return;
      }
      verificationCodelogin({ phone, code });
    };
    // 去注册
    const toRegister = () => {
      router.push("/register");
    };
    // 监听路由是否变化
    const { currentRoute } = router;
    watch(() => currentRoute.value.fullPath, () => {
      login();
    });

    iframeSrc.value = getWxLoginCodeUrl({
      appid: WX_APPID,
      redirectUri: encodeURIComponent(WX_REDIRECT_URL + "/#/login")
    });
    updateVerificationCodeNumber(0);
    login();

    return {
      verificationCodeNumber,
      loginNavIndex,
      loginNavList,
      updateLoginNavIndex,
      phone,
      code,
      iframeSrc,
      sendVerifyCode,
      validateCtl,
      verificationLoginCtl,
      toRegister,
    };
  }
});
</script>

<style lang="scss" scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .model {
    min-width: 440px;
    background: $color-bg-white;
    box-shadow: 0px 6px 12px 0px rgba($color-bs-blue, 0.15);
    border-radius: 10px 10px 4px 4px;
    &-navs {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: solid 1px $color-bd;
    }
    &-nav {
      flex: 1;
      padding: 24px;
      border-right: solid 1px $color-bd;
      font-size: 20px;
      font-weight: bold;
      color: $color-text-gray;
      text-align: center;
      cursor: pointer;
      &:nth-last-of-type(1) {
        border-right: none;
      }
      &-active {
        border-bottom: solid 3px $color-bd-blue;
        color: $color-text-blue;
      }
    }
    &-iframe {
      width: 100%;
      padding: 20px;
      height: 440px;
    }
    &-text {
      color: $color-text-blue;
      font-size: 18px;
      text-align: center;
      cursor: pointer;
      padding: 0 34px 34px 34px;
    }
    &-form {
      padding: 34px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-end;
      &-item {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 30px 0;
        padding: 8px 0;
        border-bottom: solid 1px $color-bd;
      }
      &-image {
        margin: 0 6px;
        width: 24px;
        height: 24px;
        object-fit: contain;
      }
      &-input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 16px;
        color: $color-text-black;
      }
      &-text-button {
        padding: 10px 14px;
        margin-left: 10px;
        border: solid 1px $color-bd;
        color: $color-text-grey;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        &-active {
          border: solid 1px $color-bd-blue;
          color: $color-text-blue;
        }
      }
      &-buttons {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 30px 0;
      }
        
      &-button {
        flex: 1;
        font-size: 26px;
        border-radius: 4px;
        padding: 12px;
        background: $color-bg-blue;
        color: $color-text-white;
        text-align: center;
        cursor: pointer;
      }
    }
  }
} 
</style>
