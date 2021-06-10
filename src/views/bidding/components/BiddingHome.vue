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
                {{ a.text || "--" }}
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
                  v-model="biddingList[biddingIndex].minPrice"
                  @change="changeInput($event.target.value, 'minPrice')"
                />
                <span class="filter-item-text">至</span>
                <input
                  class="filter-item-input"
                  type="text"
                  placeholder="最多价格"
                  v-model="biddingList[biddingIndex].maxPrice"
                  @change="changeInput($event.target.value, 'maxPrice')"
                />
              </div>
            </div>
            <div class="filter-item">
              <div class="filter-item-label">建议交期</div>
              <div class="filter-item-content">
                <el-input
                  v-model="biddingList[biddingIndex].payDate" 
                  @input="value => changeInput(value, 'payDate')" 
                  clearable
                  placeholder="选择建议交期"
                ></el-input>
                <div class="filter-item-group">
                  <el-radio-group v-model="biddingList[biddingIndex].unitDes" @change="v => updateUnit(v)">
                    <el-radio-button :label="a.label" :name="a.value" v-for="(a) in biddingList[biddingIndex].units" :key="a.value" ></el-radio-button>
                  </el-radio-group>
                </div>
                
                <!-- <el-date-picker
                  type="datetime"
                  :value="biddingList[biddingIndex].payDate"
                  placeholder="选择建议交期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @input="updatePayDate($event)"
                >
                </el-date-picker> -->
              </div>
            </div>
            <div class="filter-item">
              <div class="filter-item-label">项目类型</div>
              <div class="filter-item-content">
                <el-select
                  multiple
                  v-model="biddingList[biddingIndex].mouldTypes"
                  @change="v => updateMouldTypes(v)"
                  placeholder="请选择项目类型"
                >
                  <el-option
                    v-for="(a) in biddingList[biddingIndex].projectList"
                    :key="a.type"
                    :label="a.text"
                    :value="a.type"
                  ></el-option>
                </el-select>
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
              <div class="cell-text">{{ a.mouldNo || "--" }}</div>
              <div class="cell-text">{{ a.biddingStatusDesc || "--" }}</div>
              <div class="cell-text">{{ a.biddingTime || "--" }}</div>
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
            >
              <div class="item-title">
                <div class="item-row">
                  <div class="item-flex">
                    <span class="item-button item-button-right">{{ a.typeDesc || "--" }}</span>
                    <span class="item-text">单号：</span>
                    <span class="item-text">{{ a.mouldNo || "--" }}</span>
                  </div>
                  <div class="item-flex" v-if="(biddingIndex === 0 || biddingIndex === 1) && a.countdown">
                    <span class="item-text item-text-red" v-if="a.countdown.isTimeout">已超时</span>
                    <span class="item-text item-text-blue" v-if="!a.countdown.isTimeout && a.countdown.day">{{ a.countdown.day || 0 }}天</span>
                    <span class="item-text item-text-blue" v-if="!a.countdown.isTimeout">{{ a.countdown.hour || 0 }}:</span>
                    <span class="item-text item-text-blue" v-if="!a.countdown.isTimeout">{{ a.countdown.minute || 0 }}:</span>
                    <span class="item-text item-text-blue" v-if="!a.countdown.isTimeout">{{ a.countdown.second || 0 }}</span>
                  </div>
                </div>
              </div>
              <div class="item-rows">
                <div class="item-row">
                  <div class="item-flex">
                    <img class="item-icon" src="../../../assets/images/j_price.png" alt=""  />
                    <span class="item-text">建议价格：￥{{ a.amount || "--" }}</span>
                  </div>
                </div>
                <div class="item-row">
                  <div class="item-flex">
                    <img class="item-icon" src="../../../assets/images/j_date.png" alt=""  />
                    <span class="item-text">建议交期：{{ a.workPeriod || "--" }}{{ a.unitDesc || "小时" }}</span>
                  </div>
                </div>
                <div class="item-row">
                  <div class="item-flex">
                    <img class="item-icon" src="../../../assets/images/j_address.png" alt=""  />
                    <span class="item-text">{{ a.address || "--" }}</span>
                  </div>
                </div>
                <div class="item-row">
                  <div class="item-flex">
                    <img class="item-icon" src="../../../assets/images/j_time.png" alt=""  />
                    <span class="item-text">截止至{{ a.termTime || "--" }}</span>
                  </div>
                </div>
              </div>
              <div class="item-rows">
                <div class="item-row item-line" v-if="biddingIndex < 2">
                  <div class="item-flex" v-if="biddingIndex === 0">
                    <span class="item-text item-text-small">已有</span>
                    <span class="item-text item-text-small item-text-red">
                      {{ a.joinSupplierCount || "--" }}
                    </span>
                    <span class="item-text">公司参加</span>
                  </div>
                  <!-- <div class="item-flex" v-else-if="biddingIndex === 2">
                    <span class="item-text item-text-red">
                      {{ a.biddingStatusDesc || "--" }}
                    </span>
                  </div> -->
                  <div class="item-flex" v-if="a.countdown && a.countdown.isTimeout">
                    <span
                      class="item-button item-button-gray"
                    >
                      竞价
                    </span>
                  </div>
                  <div 
                    class="item-flex" 
                    v-else-if="a.isUserBid === 0" 
                    @click="getBiddingDetail(b)"
                  >
                    <span
                      class="item-button item-button-blue"
                    >
                      竞价
                    </span>
                  </div>
                  <div class="item-flex" v-else>
                    <span
                      class="item-button"
                      @click="getBiddingDetail(b)"
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
    <BiddingDetail></BiddingDetail>
    <MaterialAndColor :data="materialAndColor" @updateData="updateMaterialAndColor"></MaterialAndColor>
    <Technology :data="technology" @updateData="updateTechnology"></Technology>
    <ArrangementScheme :data="arrangementScheme" @updateData="updateArrangementScheme"></ArrangementScheme>
    <Ever3D :data="productInfo" @updateData="updateProductInfo" v-if="productInfo.isShow"></Ever3D>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, watch, onUnmounted, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

import { BiddingList } from "@/store/modules/bidding/state";
import { ActionTypes } from "@/store/modules/bidding/actions";
import { MutationTypes } from "@/store/modules/bidding/mutations";

import validate, {
  ValidateTypes,
  ValidateSuccessParams,
  ValidateFailedParams
} from "@/utils/validate";

import BiddingDetail from "./BiddingDetail.vue";

import MaterialAndColor from "@/components/models/MaterialAndColor.vue";
import Technology from "@/components/models/Technology.vue";
import ArrangementScheme from "@/components/models/ArrangementScheme.vue";
import Ever3D from "@/components/models/Ever3D.vue";

export default defineComponent({
  name: "BiddingHome",
  components: {
    BiddingDetail,
    MaterialAndColor,
    Technology,
    ArrangementScheme,
    Ever3D
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const biddingIndex = computed(() => store.state.bidding.biddingIndex);
    const biddingList = computed(() => store.state.bidding.biddingList);
    const materialAndColor = computed(() => store.state.bidding.materialAndColor);
    const technology = computed(() => store.state.bidding.technology);
    const arrangementScheme = computed(() => store.state.bidding.arrangementScheme);
    const productInfo = computed(() => store.state.bidding.productInfo);

    const updateBiddingIndex: Function = (params: any) => store.dispatch(`bidding/${ActionTypes.UpdateBiddingIndex}`, params);
    const updatePageNum: Function = (params: any) => store.dispatch(`bidding/${ActionTypes.UpdatePageNum}`, params);
    const updatePageSize: Function = (params: any) => store.dispatch(`bidding/${ActionTypes.UpdatePageSize}`, params);
    const updateMinPrice: Function = (params: any) => store.dispatch(`bidding/${ActionTypes.UpdateMinPrice}`, params);
    const updateMaxPrice: Function = (params: any) => store.dispatch(`bidding/${ActionTypes.UpdateMaxPrice}`, params);
    const updatePayDate: Function = (params: any) => store.dispatch(`bidding/${ActionTypes.UpdatePayDate}`, params);
    const updateUnit: Function = (params: any) => store.dispatch(`bidding/${ActionTypes.UpdateUnit}`, params);
    const updateMouldTypes: Function = (params: any) => store.dispatch(`bidding/${ActionTypes.UpdateMouldTypes}`, params);
    const joinBidding: Function = (params: any) => store.dispatch(`bidding/${ActionTypes.JoinBidding}`, params);
    const getBiddingDetail: Function = (params: any) => store.dispatch(`bidding/${ActionTypes.GetBiddingDetail}`, params);
    const caculateCountdown: Function = (params: any) => store.dispatch(`bidding/${ActionTypes.CaculateCountdown}`, params);

    const updateMaterialAndColor: Function = (params: any) => store.commit(`bidding/${MutationTypes.UpdateMaterialAndColor}`, params);
    const updateTechnology: Function = (params: any) => store.commit(`bidding/${MutationTypes.UpdateTechnology}`, params);
    const updateArrangementScheme: Function = (params: any) => store.commit(`bidding/${MutationTypes.UpdateArrangementScheme}`, params);
    const updateProductInfo: Function = (params: any) => store.commit(`bidding/${MutationTypes.UpdateProductInfo}`, params);

    const changeInput = (value: string, key: string) => {
      if (key === "payDate") {
        validate[ValidateTypes.ValidateNumber]({
          value,
          success: ({ value }: ValidateSuccessParams) => {
            updatePayDate(value);
          },
          failed: ({ value, message }: ValidateFailedParams) => {
            // if (value) {
              ElMessage.error(message);
              updatePayDate("");
            // }
          }
        });
      } else if (key === "minPrice") {
        validate[ValidateTypes.ValidateNumber]({
          value,
          success: ({ value }: ValidateSuccessParams) => {
            updateMinPrice(value);
          },
          failed: ({ value, message }: ValidateFailedParams) => {
            // if (value) {
              ElMessage.error(message);
              updateMinPrice("");
            // }
          }
        });
      } else if (key === "maxPrice") {
        validate[ValidateTypes.ValidateNumber]({
          value,
          success: ({ value }: ValidateSuccessParams) => {
            updateMaxPrice(value);
          },
          failed: ({ value, message }: ValidateFailedParams) => {
            // if (value) {
              ElMessage.error(message);
              updateMaxPrice("");
            // }
          }
        });
      }
    }

    onMounted(() => {
      updateBiddingIndex(0);
    })

    onUnmounted(() => {
      caculateCountdown(false);
    })

    return {
      biddingIndex,
      biddingList,
      materialAndColor,
      technology,
      arrangementScheme,
      productInfo,
      updateBiddingIndex,
      updatePageNum,
      updatePageSize,
      updateMinPrice,
      updateMaxPrice,
      updatePayDate,
      updateUnit,
      updateMouldTypes,
      joinBidding,
      getBiddingDetail,
      caculateCountdown,
      updateMaterialAndColor,
      updateTechnology,
      updateArrangementScheme,
      updateProductInfo,
      changeInput,
    };
  }
});
</script>

<style lang="scss" scoped>
.context {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  &-title {
    width: 100%;
    font-size: 16px;
    color: $color-text-black;
    padding: 20px;
    background: $color-bg-white;
  }
  &-body {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
    .list {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      background: $color-bg-white;
      border-radius: 8px;
      overflow: hidden;
      &-header {
        width: 100%;
        background: $color-bg-white;
        padding: 40px 20px 0px 20px;
        .nav-items {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-bottom: solid 1px $color-bd;
        }
        .nav-item {
          position: relative;
          padding: 0 16px;
          cursor: pointer;
          &:nth-of-type(1) {
            padding-left: 0;
          }
          &:after {
            content: "";
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            width: 1px;
            height: 10px;
            background: $color-bg-gray;
            border-radius: 10px;
          }
          &-text {
            color: $color-text-gray;
            border-bottom: solid 2px transparent;
            font-size: 16px;
            padding: 5px;
            &-active {
              color: $color-text-blue;
              border-bottom: solid 2px $color-bd-blue;
            }
          }
        }
        .filter-items {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: 20px auto;
        }
        .filter-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-right: 40px;
          &-label {
            font-size: 14px;
            color: $color-text-gray;
            margin-right: 8px;
          }
          &-content {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          &-text {
            font-size: 14px;
            color: $color-text-gray;
            margin: 0 8px;
          }
          &-input {
            max-width: 100px;
            min-height: 40px;
            border: solid 1px $color-bd;
            border-radius: 4px;
            outline: none;
            font-size: 14px;
            color: $color-text-gray;
            padding: 10px;
          }
          &-group {
            width: 200px;
            height: 40px;
          }
        }
      }
      &-footer {
        width: 100%;
        background: $color-bg-white;
        margin: auto;
        padding: 5px;
        text-align: center;
      }
      &-body {
        width: 100%;
        flex: 1;
        position: relative;
        overflow: auto;
        .cells {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          overflow: auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 0 20px;
        }
        .cell {
          background: $color-bg-white;
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          &-gray {
            background: $color-bg;
          }
          &-text {
            flex: 1;
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: $color-text-black;
            &-blue {
              color: $color-text-blue;
              cursor: pointer;
            }
          }
        }
        .items {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          overflow: auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 15px;
        }
        .item {
          min-width: 400px;
          margin: 10px;
          border-radius: 4px;
          border: solid 1px #DDDDDD;
          background: #FBFCFE;
          &-rows {
            padding: 8px 18px 0 18px;
          }
          &-title {
            padding: 0px 8px;
            background: #EBEFF8;
          }
          &-row {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
          }
          &-line {
            border-top: solid 1px #DDDDDD;
            padding: 16px 0;
          }
          &-flex {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          &-icon {
            width: 20px;
            object-fit: contain;
            margin-right: 8px;
          }
          &-text {
            font-size: 14px;
            color: $color-text-black;
            &-small {
              font-size: 12px;
              color: $color-text-gray;
            }
            &-red {
              color: $color-text-red;
            }
            &-blue {
              color: $color-text-blue;
            }
          }
          &-button {
            padding: 9px 16px;
            border-radius: 4px;
            font-size: 14px;
            color: $color-text-blue;
            background: rgba($color-bg-blue, .3);
            min-width: 80px;
            text-align: center;
            &-right {
              margin-right: 8px;
            }
            &-blue {
              color: $color-text-white;
              background: rgba($color-bg-blue, 1);
              cursor: pointer;
            }
            &-gray {
              color: $color-text-white;
              background: rgba(#BFBFBF, 1);
            }
          }
        }
      }
    }
  }
}
</style>
