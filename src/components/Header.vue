<template>
  <div class="header-container">
    <div class="header-left"></div>
    <div class="header-wrapper">
      <div class="header-logo">
        <img class="header-logo-image" src="../assets/images/logo.png" alt="" />
        <div class="header-logo-text">好品数字 合作伙伴</div>
      </div>
      <div class="header-icon">
        <img
          class="header-icon-image"
          :src="accountInfo.headImgUrl ? accountInfo.headImgUrl : headIcon"
          alt=""
        />
        <div class="header-icon-message">{{ accountInfo.userName || "" }}</div>
        <div
          class="header-icon-button header-icon-button-active"
          v-if="accountInfo.certificateState"
        >
          已认证
        </div>
        <div class="header-icon-button" v-else>未认证</div>
        <div class="header-icon-link">个人中心</div>
        <!-- <div class="header-icon-message">消息</div>
        <div class="header-icon-tip">5</div> -->
      </div>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { State, Getter, Action, Mutation } from "vuex-class";

import { AccountInfo } from "@/store/state";
import { RootActionTypes } from "@/store/actions";

import { BASE_IMAGE_URL } from "@/config";

@Component({
  name: "Header",
  components: {}
})
export default class Header extends Vue {
  public BASE_IMAGE_URL = BASE_IMAGE_URL;
  public headIcon = require("../assets/images/headicon.png");
  // public logoutIcon = require("../../assets/images/out.png");
  // public logoIcon = require("../../assets/images/logo.png");

  // @Prop(Number) private navIndex!: number;
  // @Prop(Array) private navList!: Array<Nav>;
  // @Prop(Boolean) private isCloseLogo!: boolean;

  @State("accountInfo") public accountInfo!: AccountInfo;

  // @Emit("updateNavIndex")
  // public updateNavIndex(navIndex: number) {
  //   return navIndex;
  // }

  // @Action(RootActionTypes.Logout) public logout!: Function;
}
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';
.header
  min-width $width-min
  &-container
    width 100%
    background $color-bg-white
    padding 25px 0
    display flex
    justify-content flex-start
    align-items flex-start
    box-shadow 0px 6px 10px 0px rgba($color-bs-black, 0.15);
    z-index 9
  &-left
    flex 1
  &-right
    flex 2
  &-wrapper
    flex 7
    display flex
    justify-content space-between
    align-items flex-start
  &-logo
    display flex
    justify-content center
    align-items flex-end
    &-image
      width 205px
      object-fit contain
    &-text
      padding-left 13px
      color $color-text-black
      font-size 24px
      font-weight bold
  &-icon
    display flex
    justify-content center
    align-items center
    z-index 1
    &-image
      width 46px
      height 46px
      border-right 100px
      border-radius 100px
      overflow hidden
      object-fit cover
    &-link
      padding 0 8px
      color $color-text-blue
      font-size 16px
      cursor pointer
    &-button
      padding 2px 8px
      line-height 24px
      color $color-text-white
      font-size 12px
      border-radius 100px
      background $color-bg-gray
      &-active
        color $color-text-white
        background $color-bg-blue
    &-message
      padding 0 8px
      color $color-text-gray
      font-size 14px
    &-tip
      color $color-text-white
      background $color-bg-red
      width 20px
      height 20px
      border-radius 100px
      font-size 12px
      line-height 20px
      text-align center
</style>
