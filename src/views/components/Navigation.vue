<template>
  <div class="navigation-list">
    <div
      class="navigation-li"
      v-for="(a, b) in navigationList"
      :key="'头部导航_' + b"
    >
      <div
        class="navigation-li-content"
        @click="updateNavigationIndex({ navigationIndex: b })"
      >
        <img class="navigation-li-content-icon" :src="a.icon" alt="" />
        <div
          class="navigation-li-content-text"
          :class="{
            'navigation-li-content-text-active':
              b == navigationIndex && a.itemList.length === 0
          }"
        >
          {{ a.text }}
        </div>
      </div>
      <div class="navigation-li-cells">
        <div
          class="navigation-li-cell"
          v-for="(c, d) of a.itemList"
          :key="'头部二级导航_' + d"
        >
          <div
            class="navigation-li-cell-content"
            @click="updateNavigationIndex({ navigationIndex: b, itemIndex: d })"
          >
            <div class="navigation-li-cell-content-icon"></div>
            <div
              class="navigation-li-cell-content-text"
              :class="{
                'navigation-li-cell-content-text-active':
                  b == navigationIndex && d == a.itemIndex
              }"
            >
              {{ c.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

import { Navigation } from "@/store/state";
import { RootActionTypes } from "@/store/actions";

export default defineComponent({
  name: "NavigationComponent",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();

    const navigationIndex = computed(() => store.state.navigationIndex);
    const navigationList = computed(() => store.state.navigationList);

    const updateNavigationIndex: Function = (params: any) => store.dispatch(RootActionTypes.UpdateNavigationIndex, params);
    
    return {
      navigationIndex,
      navigationList,
      updateNavigationIndex,
    }
  }
});
</script>

<style lang="scss" scoped>
.navigation {
  &-list {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: $color-bg-gray;
    padding: 25px;
    box-shadow: 0px 6px 10px 0px rgba($color-bs-black, 0.15);
    z-index: 9;
  }
  &-li {
    margin: 25px auto;
    &-content {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &-icon {
        width: 26px;
        height: 26px;
        margin-right: 10px;
      }
      &-text {
        flex: 1;
        font-size: 16px;
        color: $color-text-white;
        transition: color .3s;
        &:hover,
        &-active {
          color: $color-text-cyan;
        }
      }
    }
    &-cell {
      margin: 5px auto;
      &-content {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &-icon {
          width: 26px;
          height: 26px;
          margin-right: 10px;
        }
        &-text {
          flex: 1;
          font-size: 14px;
          color: $color-text-white;
          transition: color .3s;
          &:hover,
          &-active {
            color: $color-text-cyan;
          }  
        }
      }
    }
  }
}
</style>
