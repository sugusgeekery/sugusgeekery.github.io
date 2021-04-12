<template>
<div class="model-container" v-dialogDrag v-show="data.isShow">
    <div class="model-wrapper">
      <div class="model-header">
        <div class="model-title">
          <div class="model-title-text">方案设计版本记录</div>
        </div>
        <div
          class="model-cancel"
          @click="updateData({ isShow: false })"
        ></div>
      </div>
      <div class="model-body">
        <div class="model-items">
          <div
            class="model-item"
            v-for="(a, b) in data.list"
            :key="'_方案设计版本列表_' + b"
          >
            <div class="model-item-content">
              <div class="model-item-content-text">
                <span class="model-item-content-text-gray" v-if="a.version">
                  版本：{{ a.version || "" }}
                </span>
                <span
                  class="model-item-content-text-gray model-item-content-text-pointer"
                  v-if="a.filePath"
                  @click="downloadFile(a.filePath, a.filePath)"
                >
                  下载
                </span>
              </div>

              <div
                class="model-item-content-text"
                v-for="(c, d) in a.allApprovalInfoList"
                :key="'_方案设计版本列表详情对应处理方_' + d"
              >
                <span class="model-item-content-text-black" v-if="c.type == 1">
                  加工方：
                </span>
                <span class="model-item-content-text-black" v-else-if="c.type == 2">
                  试模方：
                </span>
                <span class="model-item-content-text-red" v-if="c.opinion === 0">
                  驳回
                </span>
                <span
                  class="model-item-content-text-blue model-item-content-text-pointer"
                  v-if="c.opinion === 0"
                >
                  驳回理由：{{ c.cause || "无" }}
                </span>
                <span
                  class="model-item-content-text-green"
                  v-else-if="c.opinion === 1"
                >
                  验收通过
                </span>
                <span class="model-item-content-text-gray">
                  时间：{{ c.approvalTime || "" }}
                </span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

import downloadByUrl from "@/utils/downloadByUrl";

@Component({
  name: "DesignVersion",
  components: {}
})
export default class DesignVersion extends Vue {
  @Prop(Object) 
  private readonly data!: DesignVersionTypes;

  @Emit("updateData") 
  public updateData(params: DesignVersionTypes) {
    return { ...this.data, ...params };
  };
  
  public downloadFile(url: string, name: string) {
    if (url) {
      downloadByUrl(url, name);
    }
  }
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
    padding 20px
    display flex
    flex-direction column
    justify-content flex-start
    align-items flex-start
    overflow auto
  &-item
    margin 10px
    display flex
    justify-content flex-start
    align-items flex-start
    &-content
      padding 10px
      &-text
        font-size 14px
        margin 15px 0
        &-black
          color $color-text-black
          margin-right 20px
        &-blue
          color $color-text-blue
          margin-right 20px
        &-green
          color $color-text-green
          margin-right 20px
        &-red
          color $color-text-red
          margin-right 20px
        &-gray
          color $color-text-gray
          margin-right 20px
        &-pointer
          cursor pointer
          color $color-text-blue
</style>
