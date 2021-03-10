<template>
  <div class="context">
    <div class="context-title">首页</div>
    <div class="context-body">
      <div class="list">
        <div class="list-title">书江同学，您好！</div>
        <div class="list-items">
          <div
            class="list-item"
            v-for="(a, b) in orderMessageList"
            :key="'_订单消息_' + b"
          >
            <div class="list-item-title">{{ a.text }}</div>
            <div class="list-item-text">{{ a.count }}</div>
          </div>
        </div>
        <div class="list-row">
          <div class="list-flex">
            <div class="list-flex-title">待办任务</div>
            <div class="list-flex-items">
              <div
                class="list-flex-item"
                v-for="(a, b) in jobList"
                :key="'_待办任务消息_' + b"
              >
                <div class="list-flex-item-text">
                  <img
                    class="list-flex-item-icon"
                    src="../../../assets/images/tip_1.png"
                    alt=""
                  />
                  <span class="list-flex-item-text-blue">{{ a.taskName }}</span>
                </div>
                <div class="list-flex-item-text">
                  <span class="list-flex-item-text-gray">订单号：</span>
                  <span class="list-flex-item-text-gray">{{ a.orderNo }}</span>
                </div>
                <div class="list-flex-item-text">
                  <img
                    class="list-flex-item-icon"
                    src="../../../assets/images/tip_2.png"
                    alt=""
                  />
                  <span class="list-flex-item-text-gray">{{ a.time }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="list-flex">
            <div class="list-flex-title">新消息</div>
            <div class="list-flex-items">
              <div
                class="list-flex-item list-flex-item-col"
                v-for="(a, b) in userMessageList"
                :key="'_个人消息_' + b"
              >
                <div class="list-flex-item-left">
                  <div class="list-flex-item-text">
                    <img
                      class="list-flex-item-image"
                      src="../../../assets/images/tip_1.png"
                      alt=""
                    />
                    <span class="list-flex-item-text-gray">{{ a.name }}：</span>
                    <span class="list-flex-item-text-black">{{ a.msg }}</span>
                  </div>
                </div>
                <div class="list-flex-item-right">
                  <div class="list-flex-item-text">
                    <span class="list-flex-item-text-gray">订单号：</span>
                    <span class="list-flex-item-text-gray">{{
                      a.orderNo
                    }}</span>
                  </div>
                  <div class="list-flex-item-text">
                    <img
                      class="list-flex-item-icon"
                      src="../../../assets/images/tip_2.png"
                      alt=""
                    />
                    <span class="list-flex-item-text-gray">{{ a.time }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="fixed">
      <div class="fixed-item">
        <div class="fixed-item-image">
          <img
            class="fixed-item-image-icon"
            src="../../../assets/images/wechat_qrcode.png"
            alt=""
          />
          <img
            class="fixed-item-image-icon-active"
            src="../../../assets/images/wechat_qrcode_blue.png"
            alt=""
          />
        </div>
        <div class="fixed-item-text">微信公众号</div>
        <div class="fixed-item-model">
          <img
            class="fixed-item-model-icon"
            src="../../../assets/images/wechat_image.jpg"
            alt=""
          />
          <div class="fixed-item-model-text">关注公众号</div>
          <div class="fixed-item-model-text">获取订单最新动态</div>
        </div>
      </div>
      <div class="fixed-item">
        <div class="fixed-item-image">
          <img
            class="fixed-item-image-icon"
            src="../../../assets/images/wechat_phone.png"
            alt=""
          />
          <img
            class="fixed-item-image-icon-active"
            src="../../../assets/images/wechat_phone_blue.png"
            alt=""
          />
        </div>
        <div class="fixed-item-text">客服热线</div>
        <div class="fixed-item-model">
          <div class="fixed-item-model-title">客服热线</div>
          <div class="fixed-item-model-text">400-062-065</div>
          <div class="fixed-item-model-title">工作时间</div>
          <div class="fixed-item-model-text">周一至周日</div>
          <div class="fixed-item-model-text">09:00-21:30</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("home");

import { OrderMessage, Job, UserMessage } from "@/store/modules/home/state";
import { ActionTypes } from "@/store/modules/home/actions";

@Component({
  name: "HomeTemplate",
  components: {}
})
export default class HomeTemplate extends Vue {
  @State("orderMessageList")
  public orderMessageList!: Array<OrderMessage>;
  @State("jobList")
  public jobList!: Array<Job>;
  @State("userMessageList")
  public userMessageList!: Array<UserMessage>;

  @Action(ActionTypes.GetStatistics)
  public getStatistics!: Function;
  @Action(ActionTypes.GetToBeDeal)
  public getToBeDeal!: Function;

  public created() {
    // this.getStatistics();
    this.getToBeDeal();
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
    flex-direction column
    justify-content flex-start
    align-items flex-start
    position relative
    .list
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      max-width 1200px
      padding 0 20px
      border-radius 8px
      overflow auto
      &-title
        margin 28px 0
        color $color-text-black
        font-size 16px
      &-items
        margin 28px 0
        width 100%
        display flex
        flex-wrap wrap
        justify-content space-between
        align-items flex-start
      &-item
        flex 1
        margin 0 40px 0 0
        padding 24px 28px
        background $color-bg-blue-white
        border-radius 6px
        &:nth-last-of-type(1)
          margin-right 0
        &-title
          color $color-text-blue-black
          font-size 16px
          line-height 40px
        &-text
          color $color-text-blue-black
          font-size 100px
          text-align right
      &-row
        margin 28px 0
        display flex
        justify-content space-between
        align-items flex-start
      &-flex
        margin-right 40px
        border-radius 6px
        background $color-bg-white
        padding 18px
        flex 1
        &:nth-last-of-type(1)
          margin-right 0
        &-title
          margin 20px 0
          font-size 16px
          color $color-text-black
        &-items
          margin 20px 0
        &-item
          padding 20px 5px
          border-bottom solid 1px $color-bd
          display flex
          justify-content space-between
          align-items center
          &-col
            flex-direction column
          &-text
            display flex
            justify-content flex-start
            align-items center
            font-size 14px
            margin 5px 20px 5px 0
            &:nth-last-of-type(1)
              margin-right 0
            &-gray
              color $color-text-gray
            &-black
              color $color-text-black
            &-blue
              color $color-text-blue
              cursor pointer
          &-image
            width 20px
            height 20px
            border-radius 100px
            overflow hidden
            object-fit cover
            margin-right 5px
          &-icon
            width 17px
            margin-right 10px
          &-left
            width 100%
            display flex
            justify-content flex-start
            align-items center
          &-right
            width 100%
            display flex
            justify-content flex-end
            align-items center
  .fixed
    position fixed
    top 50%
    right 0
    z-index 999
    border solid 1px $color-bd
    background $color-bg-white
    transform translateY(-50%)
    &-item
      display flex
      flex-direction column
      justify-content center
      align-items center
      background $color-bg-white
      padding 8px
      position relative
      cursor pointer
      transition all 0.3s
      &:after
        content ""
        position absolute
        top 0
        left 10%
        width 80%
        height 1px
        background $color-bd
      &:nth-of-type(1):after
        content ""
        position absolute
        top 0
        left 0
        width 0
        height 0
        display none
      &:hover
        background $color-bg-blue
        .fixed-item-image
          background $color-bg-white
          .fixed-item-image-icon
            display none
          .fixed-item-image-icon-active
            display block
            width 32px
            height 32px
            object-fit cover
        .fixed-item-text
          color $color-text-white
        .fixed-item-model
          position absolute
          left 0
          bottom 0
          transform translateX(-101%)
          display flex
          flex-direction column
          justify-content center
          align-items center
          background $color-bg-white
          padding 18px 36px
          min-width 180px
          min-height 180px
          &-icon
            width 130px
            height 130px
            object-fit contain
          &-text
            font-size 14px
            color $color-text-black
            margin-top 5px
          &-title
            font-size 18px
            color $color-text-black
            font-weight bold
            margin-top 20px
      &:nth-of-type(1):hover
        background $color-bg-blue
        .fixed-item-image
          background $color-bg-white
          .fixed-item-image-icon
            display none
          .fixed-item-image-icon-active
            display block
            width 32px
            height 32px
            object-fit cover
        .fixed-item-text
          color $color-text-white
        .fixed-item-model
          position absolute
          left 0
          top 0
          transform translateX(-101%)
          display flex
          flex-direction column
          justify-content center
          align-items center
          background $color-bg-white
          padding 18px 36px
          min-width 180px
          min-height 180px
          &-icon
            width 130px
            height 130px
            object-fit contain
          &-text
            font-size 14px
            color $color-text-black
            margin-top 5px
          &-title
            font-size 18px
            color $color-text-black
            font-weight bold
            margin-top 20px
      &-image
        width 52px
        height 52px
        padding 10px
        background $color-bg-blue
        border-radius 12px
        &-icon
          display block
          width 32px
          height 32px
          object-fit cover
          &-active
            display none
      &-text
        color $color-text-blue
        font-size 12px
        margin-top 8px
      &-model
        display none
</style>
