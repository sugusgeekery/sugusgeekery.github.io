<template>
  <div class="loading loading-container">
    <div class="loading-wrapper">
      <img class="loading-icon" :src="icon || defalutIcon" alt="" />
      <div class="loading-text" v-if="text">{{ text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "loading"
})
export default class Loading extends Vue {
  public defalutIcon = require("../assets/loading.gif");
  @Prop(String) private icon?: string;
  @Prop(String) private text?: string;
}
</script>

<style lang="stylus" scoped>
@import '../style/index.styl';
.loading
  &-container
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background $color-bg-white
  &-wrapper
    width 100%
    height 100%
    display flex
    flex-direction column
    justify-content center
    align-items center
  &-icon
    width px2rem(400px)
    object-fit cover
  &-text
    font-size px2rem(24px)
    color $color-text-grey
</style>
