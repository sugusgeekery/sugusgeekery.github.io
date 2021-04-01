<template>
  <div class="context">
    <div class="context-title">竞价</div>
    <div class="context-body">
      <div class="list">
        <div class="list-header">
          <div class="nav-items">
            <div
              class="nav-item"
              v-for="(a, b) in biddingList"
              :key="a.text + '_竞价导航_' + b"
            >
              <div
                class="nav-item-text"
                :class="{ 'nav-item-text-active': b === biddingIndex }"
                @click="updateBiddingIndex(b)"
              >
                {{ a.text }}
              </div>
            </div>
          </div>
          <div class="filter-items" v-if="biddingIndex < 2">
            <div class="filter-item">
              <div class="filter-item-label">建议价格</div>
              <div class="filter-item-content">
                <span class="filter-item-text">￥</span>
                <input
                  class="filter-item-input"
                  type="text"
                  placeholder="最少价格"
                  :value="biddingList[biddingIndex].minPrice"
                  @change="updateMinPrice($event.target.value)"
                />
                <span class="filter-item-text">至</span>
                <input
                  class="filter-item-input"
                  type="text"
                  placeholder="最多价格"
                  :value="biddingList[biddingIndex].maxPrice"
                  @change="updateMaxPrice($event.target.value)"
                />
              </div>
            </div>
            <div class="filter-item">
              <div class="filter-item-label">建议交期</div>
              <div class="filter-item-content">
                <el-date-picker
                  type="date"
                  :value="biddingList[biddingIndex].payDate"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @input="updatePayDate($event)"
                >
                </el-date-picker>
              </div>
            </div>
            <!-- <div class="filter-item">
              <div class="filter-item-label">交付地区</div>
              <div class="filter-item-content">
                <el-cascader
                  :clearable="true"
                  :filterable="true"
                  placeholder="请选择省市区"
                  :value="biddingList[biddingIndex].provinceCityCountry"
                  :options="provinces"
                  :props="{
                    expandTrigger: 'click'
                  }"
                  @change="updateProvinceCityCountry"
                ></el-cascader>
              </div>
            </div> -->
          </div>
        </div>
        <div class="list-body">
          <div class="cells" v-if="biddingIndex === 3">
            <div class="cell cell-gray">
              <div class="cell-text">单号</div>
              <div class="cell-text">状态</div>
              <div class="cell-text">竞价时间</div>
              <div class="cell-text">操作</div>
            </div>
            <div
              class="cell"
              v-for="(a, b) in biddingList[biddingIndex].list"
              :key="a.id + '_竞价单_' + b"
            >
              <div class="cell-text">{{ a.mouldNo || "" }}</div>
              <div class="cell-text">{{ a.biddingStatusDesc || "" }}</div>
              <div class="cell-text">{{ a.biddingTime || "" }}</div>
              <div
                class="cell-text cell-text-blue"
                @click="getBiddingDetail(b)"
              >
                详情
              </div>
            </div>
          </div>
          <div class="items" v-else>
            <div
              class="item"
              v-for="(a, b) in biddingList[biddingIndex].list"
              :key="a.id + '_竞价单_' + b"
              @click="getBiddingDetail(b)"
            >
              <div class="item-rows">
                <div class="item-row">
                  <div class="item-flex">
                    <span class="item-text">单号：</span>
                    <span class="item-text">{{ a.mouldNo || "" }}</span>
                  </div>
                  <div class="item-flex" v-if="biddingIndex === 0">
                    <span class="item-text item-text-small">已有</span>
                    <span class="item-text item-text-small item-text-red">
                      {{ a.joinSupplierCount || 0 }}
                    </span>
                    <span class="item-text">公司参加</span>
                  </div>
                  <div class="item-flex" v-else-if="biddingIndex === 2">
                    <span class="item-text item-text-red">
                      {{ a.biddingStatusDesc || "" }}
                    </span>
                  </div>
                </div>
                <div class="item-row">
                  <div class="item-flex">
                    <span class="item-text item-text-red" v-if="a.isBidding === 0">（已暂停）</span>
                  </div>
                  <div class="item-flex">
                    <span class="item-button">{{ a.typeDesc }}</span>
                  </div>
                </div>
                <div class="item-row">
                  <div class="item-flex">
                    <span class="item-text">竞价价格：</span>
                    <span class="item-text">￥{{ a.amount || 0 }}</span>
                  </div>
                </div>
                <div class="item-row">
                  <div class="item-flex">
                    <span class="item-text">竞价交期：</span>
                    <span class="item-text">{{ a.workPeriod || 0 }}天</span>
                  </div>
                </div>
              </div>
              <div class="item-rows" v-if="biddingIndex === 0">
                <div class="item-row">
                  <div class="item-flex">
                    <img
                      class="item-icon"
                      src="../../../assets/images/address.png"
                      alt=""
                    />
                    <span class="item-text">
                      {{ a.address || "" }}
                    </span>
                  </div>
                </div>
                <div class="item-row">
                  <div class="item-flex">
                    <img
                      class="item-icon"
                      src="../../../assets/images/date.png"
                      alt=""
                    />
                    <span class="item-text">
                      截止至{{ a.termTime || "" }}
                    </span>
                  </div>
                  <div class="item-flex" v-if="a.isUserBid === 0">
                    <span
                      class="item-button item-button-blue"
                    >
                      竞价
                    </span>
                  </div>
                  <div class="item-flex" v-else>
                    <span
                      class="item-button"
                    >
                      竞价中
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-footer">
          <el-pagination
            @size-change="updatePageSize"
            @current-change="updatePageNum"
            :current-page="biddingList[biddingIndex].pageNo"
            :page-sizes="biddingList[biddingIndex].pageSizes"
            :page-size="biddingList[biddingIndex].pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="biddingList[biddingIndex].total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <BiddingDetailModel></BiddingDetailModel>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("bidding");

import { BiddingList } from "@/store/modules/bidding/state";
import { ActionTypes } from "@/store/modules/bidding/actions";

import { ElementUIProvinces, ElementUICasCader } from "@/utils/provinces";

import BiddingDetailModel from "../models/BiddingDetailModel.vue";

@Component({
  name: "BiddingHomeTemplate",
  components: {
    BiddingDetailModel
  }
})
export default class BiddingHomeTemplate extends Vue {
  @State("biddingIndex")
  public biddingIndex!: number;
  @State("biddingList")
  public biddingList!: Array<BiddingList>;

  public provinces: ElementUICasCader[] = ElementUIProvinces;

  // @Action(ActionTypes.UpdatePageNum)
  // public updatePageNum!: Function;
  @Action(ActionTypes.UpdateBiddingIndex)
  public updateBiddingIndex!: Function;
  @Action(ActionTypes.UpdatePageNum)
  public updatePageNum!: Function;
  @Action(ActionTypes.UpdatePageSize)
  public updatePageSize!: Function;
  @Action(ActionTypes.UpdateMinPrice)
  public updateMinPrice!: Function;
  @Action(ActionTypes.UpdateMaxPrice)
  public updateMaxPrice!: Function;
  @Action(ActionTypes.UpdatePayDate)
  public updatePayDate!: Function;
  @Action(ActionTypes.UpdateProvinceCityCountry)
  public updateProvinceCityCountry!: Function;
  @Action(ActionTypes.JoinBidding)
  public joinBidding!: Function;
  @Action(ActionTypes.GetBiddingDetail)
  public getBiddingDetail!: Function;

  public created() {
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
    flex-direction column
    justify-content flex-start
    align-items flex-start
    padding 20px
    .list
      width 100%
      // max-width 1400px
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
        padding 40px 20px 0px 20px
        .nav-items
          display flex
          justify-content flex-start
          align-items center
          border-bottom solid 1px $color-bd
        .nav-item
          position relative
          padding 0 16px
          cursor pointer
          &:nth-of-type(1)
            padding-left 0
          &:after
            content ""
            position absolute
            top 50%
            right 0
            transform translateY(-50%)
            width 1px
            height 10px
            background $color-bg-gray
            border-radius 10px
          &-text
            color $color-text-gray
            border-bottom solid 2px transparent
            font-size 16px
            padding 5px
            &-active
              color $color-text-blue
              border-bottom solid 2px $color-bd-blue
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
          overflow auto
          display flex
          flex-wrap wrap
          justify-content flex-start
          align-items flex-start
          padding 0 20px
        .cell
          background $color-bg-white
          width 100%
          display flex
          justify-content flex-start
          align-items center
          &-gray
            background $color-bg
          &-text
            flex 1
            text-align center
            padding 10px
            font-size 14px
            color $color-text-black
            &-blue
              color $color-text-blue
              cursor pointer
        .items
          position absolute
          top 0
          left 0
          width 100%
          // height 100%
          overflow auto
          display flex
          flex-wrap wrap
          justify-content flex-start
          align-items flex-start
          padding 0 12px
        .item
          margin 1%
          width 23%
          border-radius 4px
          border solid 1px $color-bd
          background $color-bg
          padding 10px
          &-rows
            padding 5px
            border-bottom solid 1px $color-bd
            &:nth-last-of-type(1)
              border-bottom none
          &-row
            width 100%
            display flex
            justify-content space-between
            align-items center
            margin-top 4px
            &:nth-of-type(1)
              margin-top 0
          &-flex
            display flex
            justify-content flex-start
            align-items center
            margin 5px
          &-icon
            width 20px
            object-fit contain
            margin-right 8px
          &-text
            line-height 20px
            font-size 14px
            color $color-text-black
            &-small
              font-size 12px
              color $color-text-gray
            &-red
              color $color-text-red
          &-button
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
