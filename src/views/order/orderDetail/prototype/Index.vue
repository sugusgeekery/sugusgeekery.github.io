<template>
  <div class="prototype">
    <div class="list">
      <div class="li" v-if="prototype.status === 1">
        <div class="li-title">
          模具：{{ prototype.productSamplePostInfo.mouldNo || "" }}
        </div>
        <div class="li-row">
          <div class="li-flex">
            <div class="li-image">
              <img
                class="li-image-icon"
                src="../../../../assets/images/car.png"
                alt=""
              />
            </div>
          </div>
          <div class="li-flex">
            <div class="li-content">
              <div class="li-text">
                快递公司：{{
                  prototype.productSamplePostInfo.postCompany || ""
                }}
              </div>
            </div>
            <div class="li-content">
              <div class="li-text">
                快递单号：{{
                  prototype.productSamplePostInfo.postOrderNo || ""
                }}
              </div>
              <div
                class="li-button"
                @click="copy(prototype.productSamplePostInfo.postOrderNo || '')"
              >
                复制
              </div>
            </div>
          </div>
        </div>
        <div class="li-title" v-if="prototype.receiveStatus === 1">
          客户已经验收
        </div>
        <div class="li-title" v-else>请等待客户验收</div>
      </div>
      <div class="li" v-else>
        <div class="li-title">邮寄地址</div>
        <div class="li-row">
          <div class="li-flex">
            <div class="li-image">
              <img
                class="li-image-icon"
                src="../../../../assets/images/address.png"
                alt=""
              />
            </div>
          </div>
          <div class="li-flex" v-if="prototype.fixedPostInfo">
            <div class="li-content">
              <div class="li-text">
                {{ prototype.fixedPostInfo.userName || "" }}
              </div>
              <div class="li-text">
                {{ prototype.fixedPostInfo.phoneNo || "" }}
              </div>
            </div>
            <div class="li-content">
              <div class="li-text">
                {{ prototype.fixedPostInfo.address || "" }}
              </div>
              <div
                class="li-button"
                @click="
                  copy(
                    (prototype.fixedPostInfo.userName || '') +
                      (prototype.fixedPostInfo.phoneNo || '') +
                      (prototype.fixedPostInfo.address || '')
                  )
                "
              >
                复制
              </div>
            </div>
          </div>
        </div>
        <div class="li-title">邮寄后请填写快递信息</div>
        <div class="li-row" v-if="prototype.productSamplePostInfo">
          <div class="li-input">
            <input
              type="text"
              placeholder="请输入快递公司"
              :value="prototype.productSamplePostInfo.postCompany || ''"
              @change="
                updatePrototypeData({
                  name: 'postCompany',
                  value: $event.target.value
                })
              "
            />
          </div>
          <div class="li-input">
            <input
              type="text"
              placeholder="请输入快递单号"
              :value="prototype.productSamplePostInfo.postOrderNo || ''"
              @change="
                updatePrototypeData({
                  name: 'postOrderNo',
                  value: $event.target.value
                })
              "
            />
          </div>
          <div class="li-button li-button-large" @click="commitMailInfo()">
            提交
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("order/prototype");

import { Supplier } from "@/store/modules/order/state";
import {
  InitInfo,
  Prototype
} from "@/store/modules/order/modules/prototype/state";
import { ActionTypes } from "@/store/modules/order/modules/prototype/actions";

import { BASE_IMAGE_URL } from "@/config";

@Component({
  name: "PrototypeView",
  components: {}
})
export default class PrototypeView extends Vue {
  // 供应商类型列表
  public Supplier = Supplier;

  // 图片域名
  public BASE_IMAGE_URL = BASE_IMAGE_URL;

  @State("initInfo")
  public initInfo!: InitInfo;
  @State("prototype")
  public prototype!: Prototype;

  @Action(ActionTypes.GetPrototype)
  public getPrototype!: Function;
  @Action(ActionTypes.UpdatePrototypeData)
  public updatePrototypeData!: Function;
  @Action(ActionTypes.CommitMailInfo)
  public commitMailInfo!: Function;

  public created() {
    this.getPrototype();
  }

  public copy(value: string) {
    const outInput = document.createElement("input");
    outInput.value = value;
    document.body.appendChild(outInput);
    outInput.select();
    document.execCommand("copy");
    outInput.style.display = "none";
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../stylus/index.styl';

.prototype
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  overflow auto
  .list
    padding 20px
    .li
      margin 20px
      padding 1px 20px
      background $color-bg-blue-white
      border-radius 8px
      &-title
        color $color-text-black
        font-size 16px
        margin 20px 0
      &-row
        display flex
        justify-content flex-start
        align-items center
        margin 20px 0
      &-image
        height 30px
        margin-right 20px
        &-icon
          height 100%
          object-fit contain
      &-content
        margin-right 20px
        display flex
        justify-content flex-start
        align-items center
      &-text
        color $color-text-gray
        font-size 14px
        margin-right 20px
      &-input
        color $color-text-black
        font-size 14px
        border-radius 8px
        background $color-bg-white
        padding 10px
        margin-right 20px
        input
          outline none
          border none
          color $color-text-black
          font-size 14px
      &-button
        border-radius 4px
        padding 4px 8px
        font-size 14px
        border solid 1px $color-bd-blue
        color $color-text-blue
        background $color-bg-white
        cursor pointer
        margin-right 20px
        &-large
          padding 9px 18px
        &-blue
          border solid 1px $color-bd-blue
          color $color-text-white
          background $color-bg-blue
</style>
