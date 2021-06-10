<template>
  <div class="selection-container" :key="type + '_' + label">
    <div class="selection-list">
      <div
        class="selection-li"
        :class="{ 'selection-li-active': a.isSelected }"
        v-for="(a, b) in list"
        :key="type + '_' + label + '_' + b"
        @click="updateIndex(b)"
      >
        {{ a[name || "text"] || "全部" }}
        <div class="selection-li-line" v-if="a.isSelected"></div>
        <div class="selection-li-line1" v-if="a.isSelected"></div>
        <div class="selection-li-line2" v-if="a.isSelected"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated, toRefs  } from "vue";

export default defineComponent({
  name: "SelectionMultiple",
  components: {},
  props: {
    type: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: []
    },
    name: {
      type: String,
      default: ""
    },
  },
  setup(props, context) {
    const { type, label, list, name } = toRefs(props);
    const updateIndex = (index: number) => {
      context.emit("updateindex", index);
    }
    return {
      type,
      label,
      list,
      name,
      updateIndex
    }
  }
});
</script>

<style lang="scss" scoped>
.selection-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.selection-li {
  min-width: 120px;
  margin: 5px;
  padding: 10px;
  border: 1px solid $color-bd-gray;
  border-radius: 2px;
  font-size: 18px;
  color: $color-text-gray;
  text-align: center;
  cursor: pointer;
  background: $color-bg-white;
  overflow: hidden;
}
.selection-li-active {
  border: 1px solid $color-bd-blue;
  color: $color-text-blue;
  position: relative;
}
.selection-li-line {
  position: absolute;
  width: 0;
  height: 0;
  right: 0;
  bottom: 0;
  border-top: solid 12px transparent;
  border-right: solid 12px $color-bd-blue;
  border-bottom: solid 12px $color-bd-blue;
  border-left: solid 12px transparent;
}
.selection-li-line1 {
  position: absolute;
  width: 10px;
  height: 2px;
  right: 1px;
  bottom: 7px;
  background: $color-bg-white;
  transform: rotate(-55deg);
}
.selection-li-line2 {
  position: absolute;
  width: 2px;
  height: 6px;
  right: 10px;
  bottom: 2px;
  background: $color-bg-white;
  transform: rotate(-65deg);
}
</style>
