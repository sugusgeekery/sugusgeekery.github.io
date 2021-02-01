<template>
  <div class="downtime">
    <div class="downtime-title">交付倒计时</div>
    <div class="downtime-content">
      <span class="downtime-content-label downtime-content-red">已超时</span>
      <span class="downtime-content-large downtime-content-red">15</span>
      <span class="downtime-content-red">时</span>
      <span class="downtime-content-large downtime-content-red">15</span>
      <span class="downtime-content-red">分</span>
      <span class="downtime-content-large downtime-content-red">15</span>
      <span class="downtime-content-red">秒</span>
    </div>
    <div class="downtime-text">
      <span class="downtime-text-gray">启动时间</span>
      <span class="downtime-text-black">2021-01-29 - 2021-02-15</span>
    </div>
    <div class="downtime-text">
      <span class="downtime-text-gray">交付时间</span>
      <span class="downtime-text-black">--</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("order");

@Component({
  name: "DownTimeTemplate",
  components: {}
})
export default class DownTimeTemplate extends Vue {}
</script>

<style lang="stylus" scoped>
@import '../../../stylus/index.styl';
.downtime
  background $color-bg-white
  border-radius 8px
  overflow auto
  margin 0 0 0 20px
  padding 20px
  min-width 340px
  &-title
    font-size 16px
    color $color-text-black
    margin 10px 0
  &-content
    font-size 16px
    color $color-text-black
    margin 30px 0 40px 0
    &-label
      margin-right 18px
    &-red
      color $color-text-red
    &-yellow
      color $color-text-yellow
    &-large
      font-size 44px
      margin-right 5px
  &-text
    font-size 14px
    color $color-text-gray
    margin 10px 0
    &-gray
      color $color-text-gray
      margin-right 18px
    &-black
      color $color-text-black
</style>
