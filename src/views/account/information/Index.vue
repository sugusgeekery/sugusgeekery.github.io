<template>
  <div class="context">
    <div class="context-title">资料信息</div>
    <div class="context-body">
      <div class="list">
        <div class="nav">
          <div class="nav-label">账号类型：</div>
          <div class="nav-items">
            <Selection
              type="题型"
              label="选择题型"
              :list="typeList"
              name="name"
              @updateindex="updateIndex"
            ></Selection>
          </div>
          <div class="nav-buttons">
            <div class="nav-button nav-button-blue">确定</div>
          </div>
        </div>
        <div class="form">
          <div class="form-flex">
            <div class="form-title">基本信息</div>
            <div class="form-items">
              <div class="form-item">
                <div class="form-item-head">
                  <img class="form-item-head-icon" src="" alt="" />
                  <div class="form-item-head-text">上传头像</div>
                </div>
              </div>
              <div class="form-item">
                <div class="form-item-label">
                  <span class="form-item-label-red">*</span>
                  <span class="form-item-label-gray">真实姓名</span>
                </div>
                <div class="form-item-input">
                  <input type="text" placeholder="请输入真实姓名" value="" />
                </div>
              </div>
            </div>
          </div>
          <div class="form-flex">
            <div class="form-title">公司信息</div>
            <div class="form-items">
              <div class="form-item">
                <div class="form-item-label">
                  <span class="form-item-label-red">*</span>
                  <span class="form-item-label-gray">真实姓名</span>
                </div>
                <div class="form-item-input">
                  <input type="text" placeholder="请输入真实姓名" value="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { namespace } from "vuex-class";
// const { State, Getter, Action, Mutation } = namespace("account");

// import {} from "@/store/modules/account/state";
// import { ActionTypes } from "@/store/modules/account/actions";

import Selection from "@/components/Selection.vue";

@Component({
  name: "InformationView",
  components: {
    Selection
  }
})
export default class InformationView extends Vue {
  public typeList = [
    {
      name: "公司",
      isSelected: true
    },
    {
      name: "个人",
      isSelected: false
    }
  ];
  public updateIndex(index: number) {
    console.log(index);
  }
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
      overflow auto
      padding 1px 30px
      .nav
        padding 20px 0
        width 100%
        display flex
        justify-content flex-start
        align-items center
        border-bottom solid 1px $color-bd
        &-label
          color $color-text-gray
          font-size 16px
        &-items
          display flex
          justify-content flex-start
          align-items center
          margin-right 20px
        &-buttons
          display flex
          justify-content flex-start
          align-items center
        &-button
          text-align center
          padding 9px 16px
          border-radius 4px
          font-size 14px
          color $color-text-blue
          background $color-bg-white
          cursor pointer
          &-blue
            color $color-text-white
            background $color-text-blue
      .form
        width 100%
        margin 20px 0
        display flex
        justify-content flex-start
        align-items flex-start
        &-flex
          flex 1
          padding-right 30px
        &-title
          border-left solid 2px $color-text-blue
          font-size 16px
          color $color-text-black
          padding 0 8px
          margin 30px 0
        &-items
          width 100%
        &-item
          display flex
          justify-content flex-start
          align-items center
          margin 10px 0
          &-head
            width 100%
            display flex
            flex-direction column
            justify-content center
            align-items center
            margin 20px
            &-icon
              width 90px
              height 90px
              border-radius 100px
              background $color-bg-gray
              overflow hidden
            &-text
              margin-top 10px
          &-label
            flex 2
            text-align right
            margin-right 20px
            &-red
              color $color-text-red
              font-size 16px
            &-gray
              color $color-text-gray
              font-size 16px
          &-input
            flex 8
            text-align left
            border solid 1px $color-bd
            padding 10px
            input
              width 100%
              border none
              outline none
</style>
