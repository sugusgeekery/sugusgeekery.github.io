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
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";

import router from "@/router";
import { getWxLoginCodeUrl, getUrlParas } from "@/utils/util";
import { WX_APPID, WX_REDIRECT_URL } from "@/config";

import { LoginNav } from "@/store/state";
import { RootActionTypes } from "@/store/actions";
import { RootMutationTypes } from "@/store/mutations";

@Component({
  name: "LoginView",
  components: {}
})
export default class LoginView extends Vue {
  public phone?: string = "";
  public code?: string = "";
  public iframeSrc?: string = "";

  @State("verificationCodeNumber")
  public verificationCodeNumber!: number;
  @State("loginNavIndex")
  public loginNavIndex!: number;
  @State("loginNavList")
  public loginNavList!: Array<LoginNav>;

  @Action(RootActionTypes.GetVerificationCode)
  public getVerificationCode!: Function;
  @Action(RootActionTypes.VerificationCodelogin)
  public verificationCodelogin!: Function;
  @Action(RootActionTypes.WechatLogin)
  public wechatLogin!: Function;
  @Action(RootActionTypes.PhoneLogin)
  public phoneLogin!: Function;

  @Mutation(RootMutationTypes.UpdateLoginNavIndex)
  public updateLoginNavIndex!: Function;
  @Mutation(RootMutationTypes.UpdateVerificationCodeNumber)
  public updateVerificationCodeNumber!: Function;

  @Watch("$route")
  public WatchRoute() {
    this.login();
  }

  public created() {
    this.init();
  }

  public init() {
    this.iframeSrc = getWxLoginCodeUrl({
      appid: WX_APPID,
      redirectUri: encodeURIComponent(WX_REDIRECT_URL + "/#/login")
    });
    this.updateVerificationCodeNumber(0);
    this.login();
  }
  public login() {
    // 微信扫码登录所需code码
    const jsCode = getUrlParas("code");
    const phoneNo = getUrlParas("phoneNo");
    if (phoneNo) {
      this.phoneLogin({ phoneNo });
    } else if (jsCode) {
      this.wechatLogin({ jsCode });
    }
  }
  public validateCtl(text: string) {
    if (text == "phone") {
      const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      const val = this[text] || "";
      if (val != "") {
        if (!reg.test(val)) {
          this.$message.error("手机号码格式不对");
          this[text] = "";
        }
      }
    } else if (text == "code") {
      const reg = /^[\d]{6}$/;
      const val = this[text] || "";
      if (val != "") {
        if (!reg.test(val)) {
          this.$message.error("验证码格式不对");
          this[text] = "";
        }
      }
    }
  }
  public sendVerifyCode() {
    const { phone = "" } = this;
    if (!phone) {
      this.$message.error("请输入手机号码");
      return;
    }
    this.getVerificationCode({ phone, type: 0 });
  }
  public verificationLoginCtl() {
    const { phone = "", code = "" } = this;
    if (!phone) {
      this.$message.error("请输入手机号码");
      return;
    }
    if (!code) {
      this.$message.error("请输入验证码");
      return;
    }
    this.verificationCodelogin({ phone, code });
  }
  public toRegister() {
    router.push("/register");
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../stylus/index.styl";
  .background
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    object-fit cover
  .content
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    overflow auto
    display flex
    justify-content center
    align-items center
    .model
      min-width 440px
      background $color-bg-white
      box-shadow 0px 6px 12px 0px rgba($color-bs-blue, 0.15);
      border-radius 10px 10px 4px 4px;
      &-navs
        display flex
        justify-content flex-start
        align-items center
        border-bottom solid 1px $color-bd
      &-nav
        flex 1
        padding 24px
        border-right solid 1px $color-bd
        font-size 20px
        font-weight bold
        color $color-text-gray
        text-align center
        cursor pointer
        &:nth-last-of-type(1)
          border-right none
        &-active
          border-bottom solid 3px $color-bd-blue
          color $color-text-blue
      &-iframe
        width 100%
        padding 20px
        height 440px
      &-form
        padding 34px
        display flex
        flex-direction column
        justify-content flex-start
        align-items flex-end
        &-item
          width 100%
          display flex
          justify-content flex-start
          align-items center
          margin 30px 0
          padding 8px 0
          border-bottom solid 1px $color-bd
        &-image
          margin 0 6px
          width 24px
          height 24px
          object-fit contain
        &-input
          flex 1
          border none
          outline none
          font-size 16px
          color $color-text-black
        &-text-button
          padding 10px 14px
          margin-left 10px
          border solid 1px $color-bd
          color $color-text-grey
          border-radius 4px
          cursor pointer
          font-size 14px
          &-active
            border solid 1px $color-bd-blue
            color $color-text-blue
        &-buttons
          width 100%
          display flex
          justify-content space-between
          align-items center
          margin 30px 0
        &-button
          flex 1
          font-size 26px
          border-radius 4px
          padding 12px
          background $color-bg-blue
          color $color-text-white
          text-align center
          cursor pointer
      &-text
        color $color-text-blue
        font-size 18px
        text-align center
        cursor pointer
        padding 0 34px 34px 34px
</style>
