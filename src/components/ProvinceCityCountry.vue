<template>
  <div class="single-select" :key="type">
    <div class="select">
      <div class="select-label">{{ label }}</div>
      <div class="select-items">
        <el-cascader
          :clearable="true"
          :filterable="true"
          placeholder="请选择省市区"
          :value="provinceCityCountry"
          :options="provinces"
          :props="{
            expandTrigger: 'click'
          }"
          @change="updateProvinceCityCountry"
        ></el-cascader>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

import { ElementUIProvinces, ElementUICasCader } from "@/utils/provinces";

@Component({
  name: "ProvinceCityCountry"
})
export default class ProvinceCityCountry extends Vue {
  @Prop(String) private type!: string;
  @Prop(String) private label!: string;
  @Prop(Array) private provinceCityCountry!: string[];

  public provinces: ElementUICasCader[] = ElementUIProvinces;

  @Emit("updateProvinceCityCountry")
  public updateProvinceCityCountry(e: string[]) {
    return e;
  }
}
</script>

<style scoped lang="stylus">
@import '../../style/index.styl'
.single-select
    width 100%
    background $color-bg-white
    padding 5px 0
    .select
        flexbox()
        &-label
            font-size $font-size-m
            color $color-text-gray
            padding 6px 0px 6px 0px
            margin 5px 10px 5px 20px
        &-items
            flex 1
            flexbox($wrap: wrap)
</style>
