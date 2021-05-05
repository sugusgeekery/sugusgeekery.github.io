<template>
  <div class="countdown">
    <div class="countdown-title">交付倒计时</div>
    <div class="countdown-content" v-if="data.state === 1">
      <span class="countdown-content-label">已完成</span>
    </div>
    <div class="countdown-content" v-else>
      <span
        class="countdown-content-label countdown-content-red"
        v-if="data.isTimeout || data.state === 2"
      >
        <span v-if="data.isTimeout">已超时</span>
        <span v-if="data.state === 2">（已暂停）</span>
      </span>
      <span
        class="countdown-content-large"
        :class="{
          'countdown-content-red': data.isTimeout,
          'countdown-content-yellow': !data.isTimeout
        }"
        >{{ data.hour }}</span
      >
      <span
        :class="{
          'countdown-content-red': data.isTimeout,
          'countdown-content-yellow': !data.isTimeout
        }"
        >时</span
      >
      <span
        class="countdown-content-large"
        :class="{
          'countdown-content-red': data.isTimeout,
          'countdown-content-yellow': !data.isTimeout
        }"
        >{{ data.minute }}</span
      >
      <span
        :class="{
          'countdown-content-red': data.isTimeout,
          'countdown-content-yellow': !data.isTimeout
        }"
        >分</span
      >
      <span
        class="countdown-content-large"
        :class="{
          'countdown-content-red': data.isTimeout,
          'countdown-content-yellow': !data.isTimeout
        }"
        >{{ data.second }}</span
      >
      <span
        :class="{
          'countdown-content-red': data.isTimeout,
          'countdown-content-yellow': !data.isTimeout
        }"
        >秒</span
      >
    </div>
    <div class="countdown-text">
      <span class="countdown-text-gray">启动时间</span>
      <span class="countdown-text-black">
        {{ data.startTime || "--" }}
      </span>
    </div>
    <div class="countdown-text">
      <span class="countdown-text-gray">交付时间</span>
      <span class="countdown-text-black">
        {{ data.finishTime || "--" }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "Countdown",
  components: {}
})
export default class Countdown extends Vue {
  @Prop(Object) 
  private readonly data!: CountdownTypes;
}
</script>

<style lang="stylus" scoped>
@import '../../stylus/index.styl';
.countdown
  background $color-bg-white
  border-radius 8px
  overflow auto
  margin 0 0 0 20px
  padding 20px
  min-width 380px
  &-title
    font-size 16px
    color $color-text-black
    margin 10px 20px
  &-content
    font-size 16px
    color $color-text-black
    margin 30px 20px
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
    margin 10px 20px
    &-gray
      color $color-text-gray
      margin-right 18px
    &-black
      color $color-text-black
</style>
