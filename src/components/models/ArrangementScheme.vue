<template>
  <div class="model-container" v-dialogDrag v-show="data.isShow">
    <div class="model-wrapper">
      <div class="model-header">
        <div class="model-title">
          <div class="model-title-text">排模方案</div>
        </div>
        <div
          class="model-cancel"
          @click="updateData({ isShow: false })"
        ></div>
      </div>
      <div class="model-body" v-if="data.matchedPlan">
        <div class="model-label">排模方案</div>
        <div class="model-text">排模产品拼图：</div>
        <div class="model-images" v-if="data.mouldLabeImages && data.mouldLabeImages.length">
          <el-image class="model-image" v-show="a" :src="a" v-for="(a, b) in data.mouldLabeImages" :key="b" :preview-src-list="data.mouldLabeImages"></el-image>
        </div>
        <div class="model-row">
          <div class="model-flex">
            <div class="model-flex-label">模具类型：</div>
            <div class="model-flex-input">{{ data.matchedPlan.mouldType || "" }}</div>
          </div>
          <div class="model-flex">
            <div class="model-flex-label">是否加硬模具：</div>
            <div class="model-flex-input" v-if="data.matchedPlan.isHardnessMould === 1">是</div>
            <div class="model-flex-input" v-else-if="data.matchedPlan.isHardnessMould === 0">否</div>
          </div>
        </div>
        <div class="model-row">
          <div class="model-flex">
            <div class="model-flex-label">水口类型：</div>
            <div class="model-flex-input">{{ data.matchedPlan.gateType || "" }}</div>
          </div>
          <div class="model-flex">
            <div class="model-flex-label">预估水口重量（g）：</div>
            <div class="model-flex-input">{{ data.matchedPlan.predictGateWeight || "" }}</div>
          </div>
        </div>
        <div class="model-row">
          <div class="model-flex">
            <div class="model-flex-label">热嘴数量：</div>
            <div class="model-flex-input">{{ data.matchedPlan.hotRunnerNum || "" }}</div>
          </div>
        </div>
        <div class="model-text">转水口：</div>
        <div class="model-row" v-show="data.matchedPlan.gateItems.length" v-for="(a, b) in data.matchedPlan.gateItems" :key="b">
          <div class="model-flex">
            <div class="model-flex-label">转水口{{ a.gateSort || "" }}：</div>
            <div class="model-flex-input">{{ a.productIds || "" }}</div>
            <!-- <div class="model-flex-label">{{ a.productIds || "" }}</div> -->
          </div>
        </div>
        <div class="model-line"></div>
        <div class="model-row">
          <div class="model-flex">
            <div class="model-flex-label">热流道类型：</div>
            <div class="model-flex-input">{{ data.matchedPlan.hotRunnerType || "" }}</div>
          </div>
          <div class="model-flex">
            <div class="model-flex-label">是否有模温机：</div>
            <div class="model-flex-input" v-if="data.matchedPlan.isMouldTemperature === 1">是</div>
            <div class="model-flex-input" v-else-if="data.matchedPlan.isMouldTemperature === 0">否</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "ArrangementScheme",
  components: {}
})
export default class ArrangementScheme extends Vue {
  @Prop(Object) 
  private readonly data!: ArrangementSchemeTypes;

  @Emit("updateData") 
  private updateData(params: ArrangementSchemeTypes) {
    return { ...this.data, ...params };
  };
}
</script>

<style lang="stylus" scoped>
@import '../../stylus/index.styl';
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
    max-width 90%
    max-height 90%
    min-width 50%
    min-height 50%
    background $color-bg-white
    display flex
    flex-direction column
    justify-content flex-start
    align-items flex-start
  &-header
    width 100%
    display flex
    justify-content space-between
    align-items center
    padding 20px 20px 15px 20px
    background $color-bg
  &-title
    display flex
    justify-content center
    align-items center
    flex 1
    &-text
      font-size 16px
      color $color-text-black
      margin-right 20px
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
    width 100%
    flex 1
    padding 20px 40px
    display flex
    flex-direction column
    justify-content flex-start
    align-items flex-start
  &-label
    border-left 2px solid $color-text-blue
    padding 0 0 0 10px
    margin 16px 0
    color $color-text-black
    font-size 18px
  &-text
    margin 16px 0
    color $color-text-black
    font-size 16px
  &-line
    margin 16px 0
    height 1px
    width 100%
    background $color-bd-grey
  &-images
    display flex
    flex-wrap wrap
    justify-content flex-start
    align-items center
  &-image
    width 80px
    height 80px
    object-fit contain
    margin 16px
  &-row
    width 100%
    margin 16px 0
    display flex
    justify-content flex-start
    align-items center
  &-flex
    flex 1
    display flex
    justify-content flex-start
    align-items center
    &-label
      font-size 14px
      color $color-text-gray
    &-input
      min-width 120px
      min-height 26px
      font-size 12px
      color $color-text-gray
      border solid 1px $color-bd-grey
      border-radius 3px
      padding 6px 12px
</style>
