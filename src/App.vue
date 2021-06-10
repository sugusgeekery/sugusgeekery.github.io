<template>
  <router-view></router-view>
  <AsideNotification></AsideNotification>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from "vuex"
import {
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
} from "@/utils/storage";
import { isEmptyObj } from "@/utils/util";

import AsideNotification from "../src/components/templates/AsideNotification.vue";

export default defineComponent({
  name: 'App',
  components: {
    AsideNotification
  },
  setup() {
    const store = useStore();
    onMounted(() => {

      // 在页面加载时读取sessionStorage里的状态信息
      const storeCache = getSessionStorage("storeCache");
      if (storeCache && !isEmptyObj(storeCache)) {
        store.replaceState(Object.assign({}, store.state, storeCache));
        removeSessionStorage("storeCache");
      }

      // 在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        setSessionStorage("storeCache", store.state);
      });
    })
    return {

    }
  }
})
</script>

<style lang="scss">
.body {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: auto;
  .container {
    position: relative;
    width: 100%;
    flex: 1;
    min-width: $width-min;
    overflow: auto;
    .wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: auto;
      .aside {
        position: relative;
        height: 100%;
        overflow: auto;
        margin: auto;
        background: transparent;
      }
      .section {
        position: relative;
        flex: 1;
        height: 100%;
        overflow: auto;
        background: transparent;
        .context {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
        }
      }
    }
  }
}       
</style>
