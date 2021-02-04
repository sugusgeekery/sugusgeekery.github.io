<template>
  <div class="information">
    <div class="list">
      <div class="li li-bg">
        <div class="li-row">
          <div class="li-text">
            <span class="li-text-gray">模具寿命：</span>
            <span class="li-text-gray">{{ mould.lifetime }}</span>
          </div>
        </div>
        <div class="li-row">
          <div class="li-text">
            <span class="li-text-gray">精度标准：</span>
            <span class="li-text-gray">{{ mould.toleranceValue }}</span>
          </div>
        </div>
      </div>
      <div
        class="li"
        v-for="(a, b) in mould.mouldProductList"
        :key="b"
        v-show="mould.mouldProductList && mould.mouldProductList.length"
      >
        <div class="li-text">
          <span class="li-text-black">产品：</span>
          <span class="li-text-black">{{ a.productNo }}</span>
        </div>
        <div class="li-content">
          <div class="li-row">
            <div class="li-image">
              <img
                class="li-image-icon"
                :src="BASE_IMAGE_URL + a.productImage"
                alt=""
              />
            </div>
          </div>
          <div class="li-row">
            <div class="li-text">
              <span class="li-text-black">表面要求：</span>
              <span class="li-text-gray">{{ a.surfaceTreatment }}</span>
            </div>
            <div class="li-text">
              <span class="li-text-black">产品数量：</span>
              <span class="li-text-gray">{{ a.productNum }}</span>
            </div>
            <div class="li-text">
              <span class="li-text-black">重量(g)：</span>
              <span class="li-text-gray">{{ a.productWeight }}</span>
            </div>
          </div>
          <div class="li-row">
            <div class="li-text">
              <span class="li-text-black">材料及颜色：</span>
              <span class="li-text-blue"
                >{{ a.productMaterial.materialValue
                }}{{ a.productMaterial.materialColorValue }}</span
              >
            </div>
            <div class="li-text">
              <span class="li-text-black">二次工艺：</span>
              <span class="li-text-blue">{{
                a.productTechnologyList.technologySpecName
              }}</span>
            </div>
            <div class="li-text">
              <span class="li-text-black">尺寸(mm)：</span>
              <span class="li-text-gray li-text-border">{{
                a.productLength
              }}</span>
              <span class="li-text-gray li-text-border">{{
                a.productWidth
              }}</span>
              <span class="li-text-gray li-text-border">{{
                a.productHeight
              }}</span>
            </div>
          </div>
        </div>
        <div class="li-buttons">
          <div class="li-button li-button-blue">需要更新图纸</div>
          <div class="li-button li-button-blue">确认图纸</div>
          <div class="li-button li-button-red">驳回图纸</div>
        </div>
      </div>
    </div>
    <div class="filter-items">
      <div class="filter-item">
        <div class="filter-item-content">
          <!-- <el-select
            :value="order.projectList[order.projectIndex].text"
            @change="v => updateProjectIndex(Number(v))"
            placeholder="请选择项目类型"
          >
            <el-option
              :label="a.text"
              :value="String(b)"
              v-for="(a, b) in order.projectList"
              :key="b"
            ></el-option>
          </el-select> -->
        </div>
      </div>
      <div class="filter-item">
        <div class="filter-item-label">修模报价￥</div>
        <div class="filter-item-content">
          <input class="filter-item-input" type="text" />
          <!-- <el-input
            :value="order.mouldNo"
            @input="v => updateOrderNo(v)"
            placeholder="请搜索你想要的订单"
          ></el-input> -->
        </div>
      </div>
      <div class="filter-item">
        <div class="filter-item-label">修模交期</div>
        <div class="filter-item-content">
          <input class="filter-item-input" type="text" />
          <!-- <el-input
            :value="order.mouldNo"
            @input="v => updateOrderNo(v)"
            placeholder="请搜索你想要的订单"
          ></el-input> -->
        </div>
        <div class="filter-item-label">天</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("order/mould");

import { Mould } from "@/store/modules/order/modules/mould/state";
import { ActionTypes } from "@/store/modules/order/modules/mould/actions";

import { BASE_IMAGE_URL } from "@/config";

@Component({
  name: "MouldView",
  components: {}
})
export default class MouldView extends Vue {
  // 图片域名
  public BASE_IMAGE_URL = BASE_IMAGE_URL;

  @State("mould")
  public mould!: Mould;

  @Action(ActionTypes.GetMould)
  public getMould!: Function;

  public created() {
    this.getMould();
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../stylus/index.styl';

.information
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  overflow auto
  .list
    margin 40px
    border solid 1px $color-bd
    .li
      padding 20px 40px
      border-bottom solid 1px $color-bd
      &:nth-last-of-type(1),
      &:nth-of-type(1)
        border-bottom none
      &-bg
        background $color-bg
        display flex
        justify-content space-between
        align-items flex-start
      &-content
        margin 16px 0
        display flex
        justify-content space-between
        align-items flex-start
      &-row
        flex 1
      &-image
        width 100px
        height 100px
        &-icon
          width 100%
          height 100%
          object-fit contain
      &-text
        display flex
        justify-content flex-start
        align-items center
        font-size 14px
        margin-bottom 20px
        &:nth-last-of-type(1)
          margin-bottom 0px
        &-gray
          color $color-text-gray
        &-black
          color $color-text-black
        &-blue
          color $color-text-blue
          text-decoration underline
        &-border
          border solid 1px $color-bd
          border-radius 4px
          padding 4px 8px
          margin-right 4px
          &-blue
            border solid 1px $color-bd-blue
      &-buttons
        margin 16px 0
        display flex
        justify-content flex-end
        align-items center
      &-button
        border-radius 4px
        padding 5px 10px
        font-size 14px
        border solid 1px $color-bd-blue
        color $color-text-blue
        background $color-bg-white
        cursor pointer
        margin-left 20px
        &-blue
          border solid 1px $color-bd-blue
          color $color-text-blue
          background $color-bg-white
        &-red
          border solid 1px $color-bd-red
          color $color-text-red
          background $color-bg-white
  .filter-items
    display flex
    justify-content flex-start
    align-items center
    margin 30px
  .filter-item
    display flex
    justify-content flex-start
    align-items center
    margin-right 40px
    &-label
      font-size 14px
      color $color-text-gray
      margin-right 12px
    &-content
      display flex
      justify-content flex-start
      align-items center
    &-text
      font-size 14px
      color $color-text-gray
      margin-right 8px
    &-input
      max-width 100px
      min-height 40px
      border solid 1px $color-bd
      border-radius 4px
      outline none
      font-size 14px
      color $color-text-gray
      margin-right 8px
      padding 10px
</style>
