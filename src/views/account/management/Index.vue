<template>
  <div class="context">
    <div class="context-title">子账号管理</div>
    <div class="context-body">
      <div class="list">
        <div class="list-header">
          <div class="list-header-text">xx有限公司</div>
          <div class="list-header-row">
            <div class="list-header-input">
              <input type="text" placeholder="搜索手机号码" value="" />
              <div class="list-header-input-button">
                <img src="../../../assets/images/search.png" alt="" />
              </div>
            </div>
            <div class="list-header-button">+账号</div>
          </div>
        </div>
        <div class="cells cells-static">
          <div class="cell cell-gray">
            <div class="cell-text">id</div>
            <div class="cell-text">手机号码</div>
            <div class="cell-text">名字</div>
            <div class="cell-text">角色</div>
            <div class="cell-text">注册时间</div>
            <div class="cell-text">操作</div>
          </div>
        </div>
        <div class="list-body">
          <div class="cells">
            <div class="cell" v-for="(a, b) in list" :key="a.id + '_订单_' + b">
              <div class="cell-text">{{ a.orderNo || "" }}</div>
              <div class="cell-text">{{ a.mouldNo || "" }}</div>
              <div class="cell-text">{{ a.typeDesc || "" }}</div>
              <div class="cell-text">{{ a.statusDesc || "" }}</div>
              <div class="cell-text">{{ a.mouldNo || "" }}</div>
              <div class="cell-text">
                <span class="cell-text-blue">编辑</span>
                <span class="cell-text-blue">取消管理员</span>
                <span class="cell-text-red">删除</span>
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
        <div class="tip-text">交期准时率:：90%</div>
        <div class="tip-text">交付失误率：10%</div>
      </div>
    </div>
    <!-- <AddAccountModel></AddAccountModel> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { namespace } from "vuex-class";
// const { State, Getter, Action, Mutation } = namespace("account");

// import {} from "@/store/modules/account/state";
// import { ActionTypes } from "@/store/modules/account/actions";

import AddAccountModel from "../models/AddAccountModel.vue";

@Component({
  name: "ManagementView",
  components: {
    AddAccountModel
  }
})
export default class ManagementView extends Vue {
  public order = {
    pageNo: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 50, 100],
    total: 100
  };
  public list = [
    {
      amount: "",
      completeTime: "",
      createTime: "",
      id: 0,
      mouldNo: "",
      orderNo: "",
      remainTime: 0,
      status: "",
      statusDesc: "",
      type: "",
      typeDesc: "",
      unit: "",
      unitDesc: "",
      workPeriod: ""
    },
    {
      amount: "",
      completeTime: "",
      createTime: "",
      id: 0,
      mouldNo: "",
      orderNo: "",
      remainTime: 0,
      status: "",
      statusDesc: "",
      type: "",
      typeDesc: "",
      unit: "",
      unitDesc: "",
      workPeriod: ""
    },
    {
      amount: "",
      completeTime: "",
      createTime: "",
      id: 0,
      mouldNo: "",
      orderNo: "",
      remainTime: 0,
      status: "",
      statusDesc: "",
      type: "",
      typeDesc: "",
      unit: "",
      unitDesc: "",
      workPeriod: ""
    },
    {
      amount: "",
      completeTime: "",
      createTime: "",
      id: 0,
      mouldNo: "",
      orderNo: "",
      remainTime: 0,
      status: "",
      statusDesc: "",
      type: "",
      typeDesc: "",
      unit: "",
      unitDesc: "",
      workPeriod: ""
    },
    {
      amount: "",
      completeTime: "",
      createTime: "",
      id: 0,
      mouldNo: "",
      orderNo: "",
      remainTime: 0,
      status: "",
      statusDesc: "",
      type: "",
      typeDesc: "",
      unit: "",
      unitDesc: "",
      workPeriod: ""
    },
    {
      amount: "",
      completeTime: "",
      createTime: "",
      id: 0,
      mouldNo: "",
      orderNo: "",
      remainTime: 0,
      status: "",
      statusDesc: "",
      type: "",
      typeDesc: "",
      unit: "",
      unitDesc: "",
      workPeriod: ""
    },
    {
      amount: "",
      completeTime: "",
      createTime: "",
      id: 0,
      mouldNo: "",
      orderNo: "",
      remainTime: 0,
      status: "",
      statusDesc: "",
      type: "",
      typeDesc: "",
      unit: "",
      unitDesc: "",
      workPeriod: ""
    },
    {
      amount: "",
      completeTime: "",
      createTime: "",
      id: 0,
      mouldNo: "",
      orderNo: "",
      remainTime: 0,
      status: "",
      statusDesc: "",
      type: "",
      typeDesc: "",
      unit: "",
      unitDesc: "",
      workPeriod: ""
    },
    {
      amount: "",
      completeTime: "",
      createTime: "",
      id: 0,
      mouldNo: "",
      orderNo: "",
      remainTime: 0,
      status: "",
      statusDesc: "",
      type: "",
      typeDesc: "",
      unit: "",
      unitDesc: "",
      workPeriod: ""
    },
    {
      amount: "",
      completeTime: "",
      createTime: "",
      id: 0,
      mouldNo: "",
      orderNo: "",
      remainTime: 0,
      status: "",
      statusDesc: "",
      type: "",
      typeDesc: "",
      unit: "",
      unitDesc: "",
      workPeriod: ""
    },
    {
      amount: "",
      completeTime: "",
      createTime: "",
      id: 0,
      mouldNo: "",
      orderNo: "",
      remainTime: 0,
      status: "",
      statusDesc: "",
      type: "",
      typeDesc: "",
      unit: "",
      unitDesc: "",
      workPeriod: ""
    },
    {
      amount: "",
      completeTime: "",
      createTime: "",
      id: 0,
      mouldNo: "",
      orderNo: "",
      remainTime: 0,
      status: "",
      statusDesc: "",
      type: "",
      typeDesc: "",
      unit: "",
      unitDesc: "",
      workPeriod: ""
    },
    {
      amount: "",
      completeTime: "",
      createTime: "",
      id: 0,
      mouldNo: "",
      orderNo: "",
      remainTime: 0,
      status: "",
      statusDesc: "",
      type: "",
      typeDesc: "",
      unit: "",
      unitDesc: "",
      workPeriod: ""
    },
    {
      amount: "",
      completeTime: "",
      createTime: "",
      id: 0,
      mouldNo: "",
      orderNo: "",
      remainTime: 0,
      status: "",
      statusDesc: "",
      type: "",
      typeDesc: "",
      unit: "",
      unitDesc: "",
      workPeriod: ""
    }
  ];
  // @State("advantage")
  // public advantage!: Advantage;
  // @State("order")
  // public order!: Order;
  // @Action(ActionTypes.GetMyBidAdvantage)
  // public getMyBidAdvantage!: Function;
  // @Action(ActionTypes.UpdatePageNum)
  // public updatePageNum!: Function;
  // @Action(ActionTypes.UpdatePageSize)
  // public updatePageSize!: Function;
  // @Action(ActionTypes.UpdateProjectIndex)
  // public updateProjectIndex!: Function;
  // @Action(ActionTypes.UpdateStatusIndex)
  // public updateStatusIndex!: Function;
  // @Action(ActionTypes.UpdateOrderNo)
  // public updateOrderNo!: Function;
  // @Action(ActionTypes.GetOrderDetail)
  // public getOrderDetail!: Function;
  // public created() {
  //   this.getMyBidAdvantage();
  //   this.updatePageNum(1);
  // }
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
        padding 1px 20px
        margin 20px 0
        &-text
          color $color-text-black
          font-size 16px
        &-row
          margin-top 20px
          display flex
          justify-content flex-start
          align-items center
        &-input
          margin-right 20px
          display flex
          justify-content flex-start
          align-items center
          border solid 1px $color-bd-blue
          border-radius 4px
          input
            flex 1
            border 0
            outline 0
            font-size 14px
            color $color-text-black
            padding 10px
          &-button
            text-align center
            padding 9px 16px
            font-size 14px
            color $color-text-white
            background $color-bg-blue
            cursor pointer
            img
              width 22px
              object-fit contain
        &-button
          text-align center
          padding 12px 24px
          border-radius 4px
          font-size 14px
          color $color-text-white
          background $color-bg-blue
          cursor pointer
      &-footer
        width 100%
        background $color-bg-white
        margin 20px 0
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
        // overflow auto
        display flex
        flex-wrap wrap
        justify-content flex-start
        align-items flex-start
        padding 0 20px
        &-static
          position static
      .cell
        background $color-bg-blue-white
        width 100%
        display flex
        justify-content center
        align-items center
        padding 20px 0
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
            margin 0 5px
          &-red
            color $color-text-red
            cursor pointer
            margin 0 5px
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
