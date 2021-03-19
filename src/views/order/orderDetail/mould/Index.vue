<template>
  <div class="information">
    <div
      class="list"
      v-if="Supplier.Dfm === initInfo.type || Supplier.Design === initInfo.type"
    >
      <div class="li li-bg">
        <div class="li-row">
          <div class="li-text">
            <span class="li-text-gray">模具寿命：</span>
            <span class="li-text-gray">{{ mould.lifetime }}</span>
          </div>
        </div>
        <div class="li-row">
          <div class="li-text">
            <span class="li-text-gray">精度标准</span>
            <img src="../../../../assets/images/tip_4.png" class="li-text-icon" alt="">
            <span class="li-text-gray">：</span>
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
          <span class="li-text-tips" v-if="a.isUpdateImage === 1">
            <img src="../../../../assets/images/tip_3.png" class="li-text-icon" alt="">
            <span class="li-text-tip">需要更新图纸</span>
          </span>
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
        <div class="li-buttons" v-if="Supplier.Dfm === initInfo.type">
          <div class="li-button li-button-blue" v-if="a.isUpdateImage === 1" @click="needChangeDrawing({ index: b })">需要更新图纸</div>
          <div class="li-button li-button-blue" v-if="a.isUpdateImage === 2" @click="dfmApprovalDrawing({ opinion: 1, index: b })">确认图纸</div>
          <div class="li-button li-button-red" v-if="a.isUpdateImage === 2" @click="dfmApprovalDrawing({ opinion: 1, index: b })">驳回图纸</div>
        </div>
      </div>
    </div>

    <div
      class="list"
      v-if="Supplier.Machining === initInfo.type"
    >
      <div class="li li-bg">
        <div class="li-row">
          <div class="li-text">
            <span class="li-text-gray">模具寿命：</span>
            <span class="li-text-gray">{{ mould.lifetime || 0 }}（万次）</span>
          </div>
          <div class="li-text">
            <span class="li-text-gray">预估日产量：</span>
            <span class="li-text-gray">{{ mould.dayNumber || 0 }}</span>
          </div>
        </div>
        <div class="li-row">
          <div class="li-text">
            <span class="li-text-gray">最小批量：</span>
            <span class="li-text-gray">{{ mould.minNumber || 0 }}</span>
          </div>
          <div class="li-text">
            <span class="li-text-gray">装配精度（num）：</span>
            <span class="li-text-gray">{{ mould.toleranceValue }}</span>
          </div>
        </div>
        <div class="li-row">
          <div class="li-text">
            <span class="li-text-gray">开机费</span>
            <img src="../../../../assets/images/tip_4.png" class="li-text-icon" alt="">
            <span class="li-text-gray">：</span>
            <span class="li-text-gray">￥{{ mould.poweronCost || 0 }}</span>
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
          </div>
        </div>
      </div>
    </div>
    <div v-if="Supplier.Machining === initInfo.type">
      <div class="filter-items">
        <div class="filter-item">
          <div class="filter-item-content">
            <el-select
              class="filter-item-select"
              :value="'T' + repairMould.repairNum"
              @change="v => updateRepairMouldIndex(Number(v))"
              placeholder=""
            >
              <el-option
                :label="'T' + a.repairNum"
                :value="String(b)"
                v-for="(a, b) in repairMouldList"
                :key="b"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-label">修模报价￥</div>
          <div class="filter-item-content">
            <input
              class="filter-item-input"
              :value="repairMould.repairAmount"
              @change="v => changeInput({ key: 'repairAmount', value: v.target.value, validateType: 'validateNumber' })"
              placeholder="请输入数字"
            />
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-label">修模交期</div>
          <div class="filter-item-content">
            <input
              class="filter-item-input"
              :value="repairMould.repairDeliveryDays"
              @input="v => changeInput({ key: 'repairDeliveryDays', value: v.target.value, validateType: 'validateNumber' })"
              placeholder="请输入数字"
            />
          </div>
          <div class="filter-item-label">天</div>
        </div>
        <div class="filter-item" v-if="repairMould.approvalState === 0 || repairMould.approvalState === 3">
          <div class="filter-item-button filter-item-button-blue" @click="commitRepairMould()">确定</div>
        </div>
      </div>
      <div class="filter-items">
        <div class="filter-item">
          <div class="filter-item-label">设计交期</div>
          <div class="filter-item-content">
            <input
              class="filter-item-input"
              :value="repairMould.planDesignTime"
              @input="v => changeInput({ key: 'planDesignTime', value: v.target.value, validateType: 'validateNumber' })"
              placeholder="请输入数字"
            />
          </div>
          <div class="filter-item-label">小时</div>
        </div>
        <div class="filter-item">
          <div class="filter-item-label">加工交期</div>
          <div class="filter-item-content">
            <input
              class="filter-item-input"
              :value="repairMould.machinTime"
              @input="v => changeInput({ key: 'machinTime', value: v.target.value, validateType: 'validateNumber' })"
              placeholder="请输入数字"
            />
          </div>
          <div class="filter-item-label">小时</div>
        </div>
        <div class="filter-item">
          <div class="filter-item-label">注塑交期</div>
          <div class="filter-item-content">
            <input
              class="filter-item-input"
              :value="repairMould.injectionTime"
              @input="v => changeInput({ key: 'injectionTime', value: v.target.value, validateType: 'validateNumber' })"
              placeholder="请输入数字"
            />
          </div>
          <div class="filter-item-label">小时</div>
        </div>
      </div>
      <div class="filter-items">
        <div class="filter-item" v-if="repairMould.approvalState === 2">
          <div class="filter-item-text filter-item-text-red">提示：修模报价已被平台方驳回，请联系平台人员后重新填写修模报价。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("order/mould");

import { Supplier } from "@/store/modules/order/state";
import { InitInfo, Mould, RepairMould } from "@/store/modules/order/modules/mould/state";
import { GetterTypes } from "@/store/modules/order/modules/mould/getters";
import { ActionTypes } from "@/store/modules/order/modules/mould/actions";
import { MutationTypes } from "@/store/modules/order/modules/mould/mutations";

import { BASE_IMAGE_URL } from "@/config";
import { Message, MessageBox } from "element-ui";
import validate, {
  ValidateTypes,
  ValidateSuccessParams,
  ValidateFailedParams
} from "@/utils/validate";

@Component({
  name: "MouldView",
  components: {}
})
export default class MouldView extends Vue {
  // 图片域名
  public BASE_IMAGE_URL = BASE_IMAGE_URL;
  // 供应商类型列表
  public Supplier = Supplier;

  @State("initInfo")
  public initInfo!: any | InitInfo;

  @State("mould")
  public mould!: Mould;
  @State("repairMouldIndex")
  public repairMouldIndex!: number;
  @State("repairMouldList")
  public repairMouldList!: Array<RepairMould>;

  @Getter(GetterTypes.RepairMould)
  public repairMould!: RepairMould;

  @Action(ActionTypes.GetMould)
  public getMould!: Function;
  @Action(ActionTypes.GetAllRepair)
  public getAllRepair!: Function;
  @Action(ActionTypes.UpdateRepairMould)
  public updateRepairMould!: Function;
  @Action(ActionTypes.CommitRepairMould)
  public commitRepairMould!: Function;
  @Action(ActionTypes.NeedChangeDrawing)
  public needChangeDrawing!: Function;
  @Action(ActionTypes.DfmApprovalDrawing)
  public dfmApprovalDrawing!: Function;

  @Mutation(MutationTypes.UpdateRepairMouldIndex)
  public updateRepairMouldIndex!: Function;

  public created() {
    this.getMould();
    this.getAllRepair();
  }

  public changeInput(params: { key: string; value: string; validateType: string; }) {
    const { key, value, validateType } = params || {};
    if (validateType === "validateNumber") {
      validate[ValidateTypes.ValidateNumber]({
        value,
        success: ({ value }: ValidateSuccessParams) => {
          this.updateRepairMould({ key, value: Number(value) });
        },
        failed: ({ value, message }: ValidateFailedParams) => {
          if (value) {
            Message.error(message);
            this.updateRepairMould({ key, value: "" });
          }
        }
      });
    } else {
      this.updateRepairMould({ key, value });
    }
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
    margin 36px
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
        position relative
        &:nth-last-of-type(1)
          margin-bottom 0px
        &-tips
          position relative
          width 120px
        &-tip
          position absolute
          top -100%
          right 0
          border solid 1px $color-bd-blue
          padding 6px 10px 4px 10px
          border-radius 3px
          color $color-text-gray
          font-size 12px
          &:before
            content ""
            position absolute
            left 0
            top 50%
            transform translate(-100%, -50%)
            border-left solid 4px transparent
            border-bottom solid 4px $color-bd-blue
            border-top solid 4px transparent
            border-right solid 4px $color-bd-blue
          &:after
            content ""
            position absolute
            left 0
            top 50%
            transform translate(-100%, -50%)
            border-left solid 3px transparent
            border-bottom solid 3px white
            border-top solid 3px transparent
            border-right solid 3px white
        &-icon
          margin-left 5px
          width 13px
          object-fit contain
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
    justify-content space-between
    align-items center
    margin 30px
    &:nth-last-of-type(1)
      margin-bottom 100px
  .filter-item
    display flex
    justify-content flex-start
    align-items center
    &-label
      font-size 14px
      color $color-text-gray
      margin 0 6px
    &-content
      display flex
      justify-content flex-start
      align-items center
      margin 0 6px
    &-text
      font-size 14px
      color $color-text-gray
      margin-right 8px
    &-select
      max-width 160px
    &-input
      max-width 160px
      border solid 1px $color-bd-grey
      border-radius 5px
      outline none
      font-size 14px
      color $color-text-gray
      margin-right 8px
      padding 10px
      transition all .3s
      &:hover
        border solid 1px $color-bd-grey-light
      &::placeholder
        color $color-text-grey
    &-buttons
      margin 16px 0
      display flex
      justify-content flex-end
      align-items center
    &-button
      border-radius 4px
      padding 10px 18px
      font-size 14px
      border solid 1px $color-bd-blue
      color $color-text-blue
      background $color-bg-white
      cursor pointer
      margin-left 20px
      &-blue
        border solid 1px $color-bd-blue
        color $color-text-white
        background $color-bg-blue
      &-red
        border solid 1px $color-bd-red
        color $color-text-red
        background $color-bg-white
</style>
