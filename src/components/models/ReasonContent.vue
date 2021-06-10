<template>
  <div class="model-container" v-dialogDrag v-show="data.isShow">
    <div class="model-wrapper">
      <div class="model-header">
        <div class="model-title">
          <div class="model-title-text">
            {{ data.title || "" }}
          </div>
        </div>
        <div
          class="model-cancel"
          @click="updateData({ isShow: false })"
        ></div>
      </div>
      <div class="model-body">
        <div class="model-content" v-if="data.content">{{ data.content }}</div>
        <div class="model-list">
          <div class="model-li" v-for="(a, b) in data.fileList" :key="b">
            <img class="model-li-image" :src="a.filePath" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "ReasonContentComponent",
  components: {},
  props: {
    data: {
      type: Object,
      defalut: {}
    }
  },
  setup(props, context) {
    const { data } = toRefs(props);
    const updateData = (params: ReasonContentTypes) => {
      context.emit("updateData", { ...data, ...params });
    };
    return {
      data,
      updateData
    }
  }
});
</script>

<style lang="scss" scoped>
.model {
  &-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color-bg-black, 0.3);
    z-index: 999;
  }
  &-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 90%;
    max-height: 90%;
    min-width: 30%;
    min-height: 30%;
    background: $color-bg-white;
  }
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 15px 20px;
    background: $color-bg;
  }
  &-title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    &-text {
      font-size: 16px;
      color: $color-text-black;
      margin-right: 20px;
    }
  }
  &-cancel {
    width: 12px;
    height: 12px;
    position: relative;
    cursor: pointer;
    &:before {
      content: "";
      position: absolute;
      width: 141%;
      height: 100%;
      border-top: solid 1px $color-bd-black;
      transform-origin: 0 0;
      transform: rotate(45deg);
      z-index: 1;
    }
    &:after {
      content: "";
      position: absolute;
      width: 141%;
      height: 100%;
      border-bottom: solid 1px $color-bd-black;
      transform-origin: 0 100%;
      transform: rotate(-45deg);
    }
  }
  &-body {
    width: 100%;
    flex: 1;
    border-top: solid 1px $color-bd;
    position: relative;
    overflow: auto;
    padding: 12px;
  }
  &-list {
    margin: 12px;
  }
  &-li {
    margin-top: 12px;
    width: 100%;
    &-image {
      width: auto;
      object-fit: contain;
    }
  }
  &-content,
  &-text {
    margin: 12px;
    font-size: 16px;
    color: $color-text-black;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-black {
      color: $color-text-black;
    }
    &-blue {
      color: $color-text-blue;
    }
  }
}
</style>
