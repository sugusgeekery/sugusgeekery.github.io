<template>
  <div class="contact" v-if="data && data.length">
    <div class="contact-title">联系方式</div>
    <div class="contact-cells">
      <div class="contact-cell" v-for="(a, b) in data" :key="b">
        <span class="contact-button contact-button-blue" v-if="a.type === Supplier.Machining">加工方</span>
        <span class="contact-button contact-button-yellow" v-else-if="a.type === Supplier.Injection">注塑方</span>
        <span class="contact-text contact-text-black">
          {{ a.userName || "--" }}
        </span>
        <span class="contact-text contact-text-black">
          {{ a.phoneNo || "--" }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Supplier } from "@/store/modules/order/state";

@Component({
  name: "Contact",
  components: {}
})
export default class Contact extends Vue {
  @Prop(Array) 
  private readonly data!: Array<ContactTypes>;

  public Supplier = Supplier;
}
</script>

<style lang="stylus" scoped>
@import '../../stylus/index.styl';
.contact
  background $color-bg-white
  border-radius 8px
  overflow auto
  margin 20px 0 0 20px
  padding 20px
  min-width 380px
  &-title
    font-size 16px
    color $color-text-black
    margin 10px 20px
  &-content
    font-size 16px
    color $color-text-black
    margin 30px 20px
    &-label
      margin-right 18px
    &-red
      color $color-text-red
    &-yellow
      color $color-text-yellow
    &-large
      font-size 44px
      margin-right 5px
  &-cells
    margin 30px 20px
  &-cell
    margin 20px 0
  &-button
    font-size 12px
    padding 5px 10px
    margin-right 18px
    border-radius 2px
    &-gray
      color $color-text-gray
      background rgba($color-text-gray, .3)
    &-black
      color $color-text-black
      background rgba($color-text-black, .3)
    &-red
      color $color-text-red
      background rgba($color-text-red, .3)
    &-yellow
      color $color-text-yellow
      background rgba($color-text-yellow, .3)
    &-blue
      color $color-text-blue
      background rgba($color-text-blue, .3)
  &-text
    font-size 14px
    color $color-text-gray
    margin-right 18px
    &-gray
      color $color-text-gray
    &-black
      color $color-text-black
</style>
