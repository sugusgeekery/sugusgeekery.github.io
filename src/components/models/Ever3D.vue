<template>
  <div class="model-container" v-show="data.isShow">
    <div class="model-wrapper">
      <div class="model-header">
        <div class="model-title">
          <div class="model-title-text">
            3D
          </div>
        </div>
        <div
          class="model-cancel"
          @click="updateData({ isShow: false })"
        ></div>
      </div>
      <div class="model-body">
        <div class="model-content" v-if="isShowImage">
          <img class="model-content-image" :src="data.productImage" alt="" v-if="data.productImage">
        </div>
        <div id="ever3D" class="model-content" v-else></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

import { EVER_CRAFT } from "@/config";

@Component({
  name: "Ever3D",
  components: {}
})
export default class Ever3D extends Vue {
  @Prop(Object) 
  private readonly data!: ProductInfoTypes;

  @Emit("updateData") 
  private updateData(params: ProductInfoTypes) {
    return { ...this.data, ...params };
  };

  public isShowImage = false;

  public created() {

  }
  public mounted() {
    const { productImage, fileUrl } = this.data || {};
    if (fileUrl) {
      const arr = fileUrl.split('.');
      const str = arr[arr.length - 1].toLocaleLowerCase();
      if (str === "stp" || str === "step") {
        this.showImage(false);
        this.startRender();
      } else {
        this.showImage(true);
      }
    } else {
      this.showImage(true);
    }
  }

  public showImage(isShow: boolean) {
    this.isShowImage = isShow;
  }

  public startRender() {
    // EverAPI 配置
    const config = {}

    // api 是否已经加载成够的标志位
    let apiLoaded = false

    // 新建 api 实例
    // 构造函数的前两个参数分别是 AppID 和 AppKey，这里的参数可用于本地 localhost:9000 调试
    // @ts-ignore
    const api: any = new EverAPI(EVER_CRAFT.AppID, EVER_CRAFT.AppKey, config);
    // api 加载成功后调用 loadApi 函数
    window.addEventListener('oneverapiloaded', () => {
      const { fileUrl } = this.data || {};
      // 此处放需要渲染的文件
      const files: any = [{ filename: fileUrl, url: fileUrl }];
      loadApi(files)
    })

    // 此函数中调用 api 的 render 方法，在网页中加载出 api 窗口
    function loadApi (files: any) {
      // 此方法的第一个参数为放置 dom 元素的 id，第二个参数为需要在 api 中显示的模型的数组
      api.render("ever3D", files)
      apiLoaded = true
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
    display flex
    justify-content center
    align-items center
  &-wrapper
    background $color-bg-white
  &-header
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
    border-top solid 1px $color-bd
    position relative
    width 800px
    height 600px
  &-content
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    &-image
      width 100%
      object-fit contain
</style>
