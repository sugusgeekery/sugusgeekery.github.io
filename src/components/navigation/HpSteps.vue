<template>
  <div class="hp-steps">
    <div class="hp-step" v-for="(a, b) in list" :key="b">
      <div class="hp-step-box" @click="updateList(a, b, list)">
        <div 
          class="hp-step-label" 
          :class="[
            a.status === 1 
              ? 'hp-step-label-navyblue' 
              : a.status === 2
                ? 'hp-step-label-lightblue' 
                : 'hp-step-label-gray' 
          ]"
        >{{ a.sequenceNumber || b + 1 }}</div>
        <div 
          class="hp-step-text"
          :class="[
            a.status === 1 
              ? 'hp-step-text-navyblue hp-step-text-line' 
              : 'hp-step-text-gray' 
          ]"
        >{{ a.text || "--" }}</div>
      </div>
      <div class="hp-step-line"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "HpSteps",
  components: {},
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  setup(props, context) {
    const { list } = toRefs(props);
    const updateList = (item: HpStepTypes, index: number, list: Array<HpStepTypes>) => {
      context.emit("updateList", { item, index, list })
    }
    return {
      list,
      updateList
    };
  }
});
</script>

<style scoped>
.hp-steps {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.hp-step {
  flex: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-end;
}
.hp-step-line {
  flex: 1;
  height: 1px;
  background: #BCBCBC;
  border-radius: 1px;
  margin: 14px 10px;
}
.hp-step:nth-last-of-type(1) .hp-step-line {
  flex: none;
}
.hp-step-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}
.hp-step-label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  font-size: 14px;
  border-radius: 50%;
}
.hp-step-label-gray {
  background: #F3F3F3;
  border: 1px solid #BFBFBF;
  color: #8D8D8D;
}
.hp-step-label-lightblue {
  background: #C4D8FF;
  border: 1px solid #3A78F4;
  color: #062054;
}
.hp-step-label-navyblue {
  background: #3A78F4;
  border: 1px solid #3A78F4;
  color: #FFFFFF;
}
.hp-step-text {
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 30px;
}
.hp-step-text-gray {
  color: #1B1B1B;
}
.hp-step-text-navyblue {
  color: #3A78F4;
}
.hp-step-text-line {
  border-bottom: 2px solid #3A78F4;
}
</style>