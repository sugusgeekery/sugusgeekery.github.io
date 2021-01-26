<template>
  <div id="Register" class="context">
    <img class="background" src="../../assets/images/login_bg.png" alt="" />
    <div class="content">
      <div class="model">
        <div class="model-navs">
          <div class="model-nav" v-for="(a, b) in registerNavList" :key="b">
            <div
              class="model-nav-text"
              :class="{
                'model-nav-text-grey': registerNavIndex < b,
                'model-nav-text-black': registerNavIndex > b,
                'model-nav-text-blue': registerNavIndex === b
              }"
            >
              {{ b + 1 }}{{ a.text }}
            </div>
            <div
              class="model-nav-line"
              v-if="b < registerNavList.length - 1"
            ></div>
          </div>
        </div>
        <div class="model-section" v-if="registerNavIndex === 0">
          <iframe
            class="model-iframe"
            :src="iframeSrc"
            frameborder="0"
            allowTransparency="true"
            scrolling="no"
          ></iframe>
        </div>
        <div class="model-section" v-if="registerNavIndex === 1">
          <div class="model-form">
            <div class="model-form-item">
              <img
                class="model-form-image"
                src="../../assets/images/company.png"
                alt=""
              />
              <input
                class="model-form-input"
                type="text"
                placeholder="请输入公司名称"
                v-model="companyName"
                @change="validateCtl('companyName')"
              />
            </div>
            <div class="model-form-item">
              <img
                class="model-form-image"
                src="../../assets/images/user.png"
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
                src="../../assets/images/phone.png"
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
                src="../../assets/images/verification.png"
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
            <div class="model-form-context">
              <div
                class="model-form-context-label"
                :class="{ 'model-form-context-label-active': isCheckProtocol }"
                @click="updateIsCheckProtocol(!isCheckProtocol)"
              ></div>
              <div class="model-form-context-text">
                已阅读并遵守 平台用户服务协议
              </div>
            </div>
            <div class="model-form-buttons">
              <div class="model-form-button" @click="registerCtl">注册</div>
            </div>
          </div>
        </div>
        <div class="model-section" v-if="registerNavIndex === 2">
          <div class="model-tip">
            <div class="model-tip-circle"></div>
            <div class="model-tip-black">注册成功</div>
            <div class="model-tip-gray">{{ tipNumber }}S之后开始跳转</div>
            <div class="model-tip-blue" @click="toHome()">无跳转点击此处</div>
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

import { RegisterNav } from "@/store/state";
import { RootActionTypes } from "@/store/actions";
import { RootMutationTypes } from "@/store/mutations";

@Component({
  name: "Register",
  components: {}
})
export default class Register extends Vue {
  public companyName?: string = "";
  public userName?: string = "";
  public phone?: string = "";
  public code?: string = "";
  public iframeSrc?: string = "";
  public tipNumber?: number = 3;

  @State("verificationCodeNumber")
  public verificationCodeNumber!: number;
  @State("registerNavIndex")
  public registerNavIndex!: number;
  @State("registerNavList")
  public registerNavList!: Array<RegisterNav>;
  @State("isCheckProtocol")
  public isCheckProtocol!: boolean;
  @State("isShowProtocol")
  public isShowProtocol!: boolean;

  @Action(RootActionTypes.GetVerificationCode)
  public getVerificationCode!: Function;
  @Action(RootActionTypes.Register)
  public register!: Function;
  @Action(RootActionTypes.WechatLogin)
  public wechatLogin!: Function;

  @Mutation(RootMutationTypes.UpdateIsCheckProtocol)
  public updateIsCheckProtocol!: Function;
  @Mutation(RootMutationTypes.UpdateRegisterNavIndex)
  public updateRegisterNavIndex!: Function;

  @Watch("$route")
  public WatchRoute() {
    this.login();
  }
  @Watch("registerNavIndex")
  public WatchRegisterNavIndex() {
    if (this.registerNavIndex === 2) {
      const numberInterval = setInterval(() => {
        if (this.tipNumber) {
          this.tipNumber--;
        } else {
          clearInterval(numberInterval);
          router.push("/home");
        }
      }, 1000);
    }
  }

  public created() {
    this.init();
  }

  public init() {
    this.iframeSrc = getWxLoginCodeUrl({
      appid: WX_APPID,
      redirectUri: encodeURIComponent(WX_REDIRECT_URL + "/#/user/register")
    });
    this.login();
  }
  public login() {
    // 微信扫码登录所需code码
    const jsCode = getUrlParas("code");
    if (jsCode) {
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
    this.getVerificationCode({ phone, type: 1 });
  }
  public registerCtl() {
    const { companyName = "", userName = "", phone = "", code = "" } = this;
    if (!companyName) {
      this.$message.error("请输入公司名称");
      return;
    }
    if (!userName) {
      this.$message.error("请输入名字");
      return;
    }
    if (!phone) {
      this.$message.error("请输入手机号码");
      return;
    }
    if (!code) {
      this.$message.error("请输入验证码");
      return;
    }
    this.register({ companyName, userName, phone, code });
  }
  public toHome() {
    router.push("/home");
  }
}
</script>

<style lang="stylus" scoped>
@import "../../stylus/index.styl";
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
      min-width 1125px
      min-height 671px
      background $color-bg-white
      box-shadow 0px 6px 12px 0px rgba($color-bs-blue, 0.15);
      border-radius 10px 10px 4px 4px;
      &-navs
        display flex
        justify-content center
        align-items center
        padding 80px 20px 20px 20px
      &-nav
        display flex
        justify-content center
        align-items center
        cursor pointer
        &-text
          font-size 28px
          font-weight bold
          &-blue
            color $color-text-blue
          &-black
            color $color-text-black
          &-grey
            color $color-text-grey
        &-line
          width 87px
          height 2px
          background $color-bg-black
          margin 0 46px
      &-section
        display flex
        justify-content center
        align-items center
      &-iframe
        width 100%
        padding 20px
        height 440px
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
          margin 0 0 30px  0
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
      &-tip
        text-align center
        &-circle
          border-radius 100px
          width 100px
          height 100px
          margin 100px auto 20px auto
          background $color-bg-green
          position relative
          &:before
            content ""
            position absolute
            width 55%
            height 6%
            right 10%
            bottom 43%
            background $color-bg-white
            transform rotate(-55deg)
            border-radius 0 100px 100px 0
          &:after
            content ""
            position absolute
            width 6%
            height 34%
            right 60%
            bottom 18%
            background $color-bg-white
            transform rotate(-50deg)
            border-radius 100px 100px 0 0
        &-blue
          color $color-text-blue
          text-decoration underline
          font-size 16px
          margin 14px auto
          cursor pointer
        &-gray
          color $color-text-gray
          font-size 16px
          margin 14px auto
        &-black
          color $color-text-black
          font-size 20px
          margin 10px auto 50px auto
</style>
