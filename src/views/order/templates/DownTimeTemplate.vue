<template>
  <div class="downtime">
    <div class="downtime-title">交付倒计时</div>
    <div class="downtime-content" v-if="remainTime.state === 1">
      <span class="downtime-content-label">已完成</span>
    </div>
    <div class="downtime-content" v-else>
      <span
        class="downtime-content-label downtime-content-red"
        v-if="remainTime.isTimeout || remainTime.state === 2"
      >
        <span v-if="remainTime.isTimeout">已超时</span>
        <span v-if="remainTime.state === 2">（已暂停）</span>
      </span>
      <span
        class="downtime-content-large"
        :class="{
          'downtime-content-red': remainTime.isTimeout,
          'downtime-content-yellow': !remainTime.isTimeout
        }"
        >{{ remainTime.hour }}</span
      >
      <span
        :class="{
          'downtime-content-red': remainTime.isTimeout,
          'downtime-content-yellow': !remainTime.isTimeout
        }"
        >时</span
      >
      <span
        class="downtime-content-large"
        :class="{
          'downtime-content-red': remainTime.isTimeout,
          'downtime-content-yellow': !remainTime.isTimeout
        }"
        >{{ remainTime.minute }}</span
      >
      <span
        :class="{
          'downtime-content-red': remainTime.isTimeout,
          'downtime-content-yellow': !remainTime.isTimeout
        }"
        >分</span
      >
      <span
        class="downtime-content-large"
        :class="{
          'downtime-content-red': remainTime.isTimeout,
          'downtime-content-yellow': !remainTime.isTimeout
        }"
        >{{ remainTime.second }}</span
      >
      <span
        :class="{
          'downtime-content-red': remainTime.isTimeout,
          'downtime-content-yellow': !remainTime.isTimeout
        }"
        >秒</span
      >
    </div>
    <div class="downtime-text">
      <span class="downtime-text-gray">启动时间</span>
      <span class="downtime-text-black">
        {{ remainTime.startTime || "--" }}
      </span>
    </div>
    <div class="downtime-text">
      <span class="downtime-text-gray">交付时间</span>
      <span class="downtime-text-black">
        {{ remainTime.finishTime || "--" }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("order");

import { RemainTime } from "@/store/modules/order/state";
import { ActionTypes } from "@/store/modules/order/actions";

@Component({
  name: "DownTimeTemplate",
  components: {}
})
export default class DownTimeTemplate extends Vue {
  // public isTimeout = false;
  // public hour = 0;
  // public minute = 0;
  // public second = 0;
  // public setTimeInterval = 0;

  @State("remainTime")
  public remainTime!: RemainTime;

  @Action(ActionTypes.GetRemainTime)
  public getRemainTime!: Function;

  public created() {
    this.getRemainTime();
    // const { remainSeconds, state } = await this.getRemainTime();
    // ((remainSeconds: number, state: number) => {
    //   const fn = (remainSeconds: number) => {
    //     this.isTimeout = remainSeconds < 0;
    //     const timeNumber = Math.abs(remainSeconds);
    //     this.hour = Math.floor(timeNumber / (60 * 60));
    //     this.minute = Math.floor((timeNumber % (60 * 60)) / 60);
    //     this.second = timeNumber % 60;
    //   };
    //   fn(remainSeconds);
    //   if (this.setTimeInterval) {
    //     clearInterval(this.setTimeInterval);
    //   }
    //   if (state === 0) {
    //     this.setTimeInterval = setInterval(() => {
    //       remainSeconds--;
    //       fn(remainSeconds);
    //     }, 1000);
    //   }
    // })(remainSeconds, state);
  }

  // public beforeDestroy() {
  //   if (this.setTimeInterval) {
  //     clearInterval(this.setTimeInterval);
  //   }
  // }
}
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
