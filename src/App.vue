<template>
  <router-view id="App" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getSessionStorage, setSessionStorage } from "@/utils/storage";
import { isEmptyObj } from "@/utils/util";

@Component({
  name: "App",
  components: {}
})
export default class App extends Vue {
  public created() {
    // 在页面加载时读取sessionStorage里的状态信息
    const accessToken = getSessionStorage("accessToken") || "";
    if (accessToken) {
      const store = getSessionStorage("store");
      if (store && !isEmptyObj(store)) {
        this.$store.replaceState(Object.assign({}, this.$store.state, store));
        setSessionStorage("accessToken", "");
      }
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      setSessionStorage(
        "accessToken",
        this.$store.state.logInfo.accessToken || ""
      );
      setSessionStorage("store", this.$store.state);
    });

    // (function(doc, win) {
    //   const docEl = doc.documentElement;
    //   const resizeEvt =
    //     "orientationchange" in window ? "orientationchange" : "resize";
    //   const minWidth = 768;
    //   const maxWidth = 1920;
    //   const recalc = function() {
    //     const clientWidth = docEl.clientWidth;
    //     const width =
    //       clientWidth < minWidth
    //         ? minWidth
    //         : clientWidth > maxWidth
    //         ? maxWidth
    //         : clientWidth;
    //     const fontSize = (width / 10).toFixed();
    //     docEl.style.fontSize = fontSize + "px";
    //   };
    //   // 重置HTML根字体大小
    //   win.addEventListener(resizeEvt, recalc, false);
    //   doc.addEventListener("DOMContentLoaded", recalc, false);

    //   // 阻止多手势操作
    //   doc.addEventListener(
    //     "touchstart",
    //     function(event) {
    //       if (event.touches.length > 1) {
    //         event.preventDefault();
    //       }
    //     },
    //     false
    //   );

    //   // 阻止双击操作
    //   let lastTouchEnd = 0;
    //   doc.addEventListener(
    //     "touchend",
    //     function(event) {
    //       const now = new Date().getTime();
    //       if (now - lastTouchEnd <= 300) {
    //         event.preventDefault();
    //       }
    //       lastTouchEnd = now;
    //     },
    //     false
    //   );

    //   // 阻止多手指手势操作
    //   doc.addEventListener(
    //     "gesturestart",
    //     function(event) {
    //       event.preventDefault();
    //     },
    //     false
    //   );
    // })(document, window);
  }
}
</script>

<style lang="stylus">
@import './stylus/index.styl';
.body
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  display flex
  flex-direction column
  justify-content flex-start
  align-items flex-start
  .container
    position relative
    width 100%
    flex 1
    min-width $width-min
    .wrapper
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      display flex
      justify-content space-between
      align-items center
      overflow auto
      .aside
        position relative
        flex 1
        height 100%
        overflow auto
        margin auto
        background transparent
      .section
        position relative
        flex 9
        height 100%
        overflow auto
        background transparent
        .context
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          overflow auto
</style>
