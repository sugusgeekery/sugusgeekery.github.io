<template>
  <div class="nodata nodata-container">
    <div class="nodata-wrapper">
      <img class="nodata-icon" :src="icon || defalutIcon" alt="" />
      <div class="nodata-text">{{ defalutText || text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "nodata"
})
export default class Nodata extends Vue {
  public defalutIcon = require("../assets/nodata.png");
  public defalutText = "暂无数据";
  @Prop(String) private icon?: string;
  @Prop(String) private text?: string;
}
</script>

<style lang="stylus" scoped>
@import '../style/index.styl';
.nodata
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
