<template>
  <div class="body">
    <div class="header" @click="$router.push('/')">
      <img class="header-image" src="../../assets/images/logo.png" alt="" />
      <div class="header-text">好品数字 合作伙伴</div>
    </div>
    <div class="container">
      <div class="wrapper">
        <div class="section">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation } from "vuex-class";

@Component({
  name: "LoginoutView",
  components: {}
})
export default class LoginoutView extends Vue {}
</script>

<style lang="stylus" scoped>
@import "../../stylus/index.styl";
  .header
    min-width $width-min
    width 100%
    display flex
    justify-content center
    align-items flex-end
    background $color-bg-white
    padding 25px
    box-shadow 0px 6px 10px 0px rgba($color-bs-black, 0.15);
    z-index 1
    &-image
      width 205px
      object-fit contain
    &-text
      margin-left 40px
      color $color-text-black
      font-size 24px
      font-weight bold
</style>
