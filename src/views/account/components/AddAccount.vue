<template>
  <div class="model-container" v-dialogDrag>
    <div class="model-wrapper">
      <div class="model-header">
        <div class="model-title">
          <div class="model-title-text">
            新增账号
          </div>
        </div>
        <div class="model-cancel"></div>
      </div>
      <div class="model-body">
        <div class="model-form">
          <div class="model-form-item">
            <img
              class="model-form-image"
              src="../../../assets/images/user.png"
              alt=""
            />
            <input
              class="model-form-input"
              type="text"
              placeholder="请输入名字"
              v-model="userName"
              @change="validateCtl('userName')"
            />
          </div>
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
            <div
              class="model-form-button model-form-button-blue"
              @click="verificationLoginCtl"
            >
              确定
            </div>
            <div class="model-form-button" @click="verificationLoginCtl">
              取消
            </div>
          </div>
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
      redirectUri: encodeURIComponent(WX_REDIRECT_URL + "/#/user/login")
    });
    this.updateVerificationCodeNumber(0);
    this.login();
  }
  public login() {
    // 微信扫码登录所需code码
    const jsCode = getUrlParas("code");
    console.log(jsCode);
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
}
</script>

<style lang="stylus" scoped>
@import "../../../stylus/index.styl";
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
    background $color-bg-white
    border-radius 8px
  &-header
    display flex
    justify-content space-between
    align-items center
    padding 20px 20px 15px 20px
  &-title
    display flex
    justify-content flex-start
    align-items center
    &-text
      font-size 16px
      color $color-text-black
      margin-right 20px
    &-button
      padding 9px 16px
      border-radius 4px
      font-size 14px
      color $color-text-blue
      background rgba($color-bg-blue, .3)
      &-blue
        color $color-text-white
        background rgba($color-bg-blue, 1)
        cursor pointer
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
    border-top solid 1px $color-bd
    display flex
    justify-content space-between
    align-items flex-start
  &-form
    min-width 380px
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
      margin 0 0 20px  0
      padding 12px 17px
      border solid 1px $color-bd-blue
      border-radius 4px
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
      margin-left 10px
      color $color-text-grey
      border-radius 4px
      cursor pointer
      font-size 14px
      &-active
        color $color-text-blue
    &-context
      width 100%
      display flex
      justify-content flex-start
      align-items center
      margin 2px 0
      &-label
        width 16px
        height 16px
        border solid 1px $color-bd
        background $color-bg-white
        margin-right 6px
        cursor pointer
        &-active
          border solid 1px $color-bd-blue
          background $color-bg-blue
          position relative
          &:before
            content ""
            position absolute
            width 12px
            height 2px
            right -1px
            bottom 6px
            background $color-bg-white
            transform rotate(-55deg)
          &:after
            content ""
            position absolute
            width 2px
            height 7px
            right 9px
            bottom 1px
            background $color-bg-white
            transform rotate(-55deg)
      &-text
        font-size 16px
        color $color-text-blue
        cursor pointer
    &-buttons
      width 100%
      display flex
      justify-content center
      align-items center
      margin 10px 0
    &-button
      font-size 16px
      border-radius 4px
      margin 0 10px
      padding 8px 16px
      background $color-bg-white
      color $color-text-blue
      border solid 1px $color-bd-blue
      text-align center
      cursor pointer
      &-blue
        background $color-bg-blue
        color $color-text-white
        border solid 1px $color-bd-blue
</style>
