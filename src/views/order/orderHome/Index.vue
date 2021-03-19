<template>
  <div class="context">
    <div class="context-title">订单中心</div>
    <div class="context-body">
      <div class="list">
        <div class="list-header">
          <div class="filter-items">
            <div class="filter-item">
              <div class="filter-item-content">
                <el-select
                  :value="order.projectList[order.projectIndex] ? order.projectList[order.projectIndex].text : ''"
                  @change="v => updateProjectIndex(Number(v))"
                  placeholder="请选择项目类型"
                >
                  <el-option
                    :label="a.text"
                    :value="String(b)"
                    v-for="(a, b) in order.projectList"
                    :key="b"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="filter-item">
              <div class="filter-item-content">
                <el-select
                  :value="order.statusList[order.statusIndex] ? order.statusList[order.statusIndex].text : ''"
                  @change="v => updateStatusIndex(Number(v))"
                  placeholder="请选择状态"
                >
                  <el-option
                    :label="a.text"
                    :value="String(b)"
                    v-for="(a, b) in order.statusList"
                    :key="b"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="filter-item">
              <div class="filter-item-content">
                <el-input
                  :value="order.orderNo"
                  @input="v => updateOrderNo(v)"
                  placeholder="请搜索你想要的订单"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="list-body">
          <div class="cells">
            <div class="cell cell-gray">
              <div class="cell-text">订单编号</div>
              <div class="cell-text">模具编号</div>
              <div class="cell-text">项目内容</div>
              <div class="cell-text">状态</div>
              <div class="cell-text">模具进展</div>
              <div class="cell-text">交期</div>
              <div class="cell-text">交付倒计时</div>
              <div class="cell-text">订单金额</div>
              <div class="cell-text">操作</div>
            </div>
            <div
              class="cell"
              v-for="(a, b) in order.list"
              :key="a.id + '_订单_' + b"
            >
              <div class="cell-text">{{ a.orderNo || "" }}</div>
              <div class="cell-text">{{ a.mouldNo || "" }}</div>
              <div class="cell-text">{{ a.typeDesc || "" }}</div>
              <div class="cell-text">{{ a.statusDesc || "" }}</div>
              <div class="cell-text">{{ a.mouldNo || "" }}</div>
              <div class="cell-text">
                {{ a.workPeriod || "" }}{{ a.unit || "" }}
              </div>
              <div class="cell-text">{{ a.timeDownVO || "" }}</div>
              <div class="cell-text">{{ a.amount || "" }}</div>
              <div class="cell-buttons">
                <span
                  class="cell-button cell-button-blue"
                  @click="getOrderDetail(b)"
                  >详情</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="list-footer">
          <el-pagination
            @size-change="updatePageSize"
            @current-change="updatePageNum"
            :current-page="order.pageNo"
            :page-sizes="order.pageSizes"
            :page-size="order.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="order.total"
          >
          </el-pagination>
        </div>
      </div>
      <div class="tip">
        <div class="tip-title">我的竞价指标</div>
        <div class="tip-text">交期准时率:：{{ advantage.accuracy || 0 }}%</div>
        <div class="tip-text">交付失误率：{{ advantage.anerror || 0 }}%</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("order");

import { Advantage, Order } from "@/store/modules/order/state";
import { ActionTypes } from "@/store/modules/order/actions";

@Component({
  name: "OrderHomeView",
  components: {}
})
export default class OrderHomeView extends Vue {
  @State("advantage")
  public advantage!: Advantage;
  @State("order")
  public order!: Order;

  @Action(ActionTypes.GetMyBidAdvantage)
  public getMyBidAdvantage!: Function;
  @Action(ActionTypes.UpdatePageNum)
  public updatePageNum!: Function;
  @Action(ActionTypes.UpdatePageSize)
  public updatePageSize!: Function;
  @Action(ActionTypes.UpdateProjectIndex)
  public updateProjectIndex!: Function;
  @Action(ActionTypes.UpdateStatusIndex)
  public updateStatusIndex!: Function;
  @Action(ActionTypes.UpdateOrderNo)
  public updateOrderNo!: Function;
  @Action(ActionTypes.GetOrderDetail)
  public getOrderDetail!: Function;

  public created() {
    this.getMyBidAdvantage();
    this.updatePageNum(1);
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../stylus/index.styl';
.context
  display flex
  flex-direction column
  justify-content flex-start
  align-items flex-start
  overflow hidden
  &-title
    width 100%
    font-size 16px
    color $color-text-black
    padding 20px
    background $color-bg-white
  &-body
    width 100%
    flex 1
    display flex
    flex-direction row
    justify-content flex-start
    align-items flex-start
    padding 20px
    .tip
      background $color-bg-white
      border-radius 8px
      overflow auto
      margin 0 0 0 20px
      padding 20px
      min-width 300px
      &-title
        font-size 16px
        color $color-text-black
        margin 10px 20px
      &-text
        font-size 14px
        color $color-text-gray
        margin 10px 20px
    .list
      width 100%
      height 100%
      max-width 1200px
      flex 1
      display flex
      flex-direction column
      justify-content flex-start
      align-items flex-start
      background $color-bg-white
      border-radius 8px
      overflow hidden
      &-header
        width 100%
        background $color-bg-white
        padding 20px 20px 0px 20px
        .filter-items
          display flex
          justify-content flex-start
          align-items center
          margin 20px auto
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
      &-footer
        width 100%
        background $color-bg-white
        margin auto
        padding 5px
        text-align center
      &-body
        width 100%
        flex 1
        position relative
        overflow auto
        .cells
          position absolute
          top 0
          left 0
          width 100%
          display flex
          flex-wrap wrap
          justify-content flex-start
          align-items flex-start
          padding 0 20px
        .cell
          background $color-bg-white
          width 100%
          display flex
          justify-content center
          align-items center
          padding 20px 0
          border-bottom solid 1px $color-bd
          &-gray
            background $color-bg
            border-bottom none
          &-text
            flex 1
            text-align center
            font-size 14px
            color $color-text-black
            &-blue
              color $color-text-blue
              cursor pointer
          &-buttons
            flex 1
            text-align center
          &-button
            text-align center
            padding 9px 16px
            border-radius 4px
            font-size 14px
            color $color-text-blue
            background rgba($color-bg-blue, .3)
            &-blue
              color $color-text-white
              background rgba($color-bg-blue, 1)
              cursor pointer
</style>
