<template>
  <div class="notification">
    <div class="notification-item">
      <div class="notification-item-image">
        <img
          class="notification-item-image-icon"
          src="../../assets/images/wechat_qrcode.png"
          alt=""
        />
        <img
          class="notification-item-image-icon-active"
          src="../../assets/images/wechat_qrcode_blue.png"
          alt=""
        />
      </div>
      <div class="notification-item-text">微信公众号</div>
      <div class="notification-item-model">
        <img
          class="notification-item-model-icon"
          src="../../assets/images/wechat_image.jpg"
          alt=""
        />
        <!-- <div class="notification-item-model-text">关注公众号</div>
        <div class="notification-item-model-text">如果未收到信息情况下，请取消再重新关注公众号</div> -->
        <!-- <div class="notification-item-model-text">获取订单最新动态</div> -->
      </div>
    </div>
    <!-- <div class="notification-item">
      <div class="notification-item-image">
        <img
          class="notification-item-image-icon"
          src="../../assets/images/wechat_phone.png"
          alt=""
        />
        <img
          class="notification-item-image-icon-active"
          src="../../assets/images/wechat_phone_blue.png"
          alt=""
        />
      </div>
      <div class="notification-item-text">客服热线</div>
      <div class="notification-item-model">
        <div class="notification-item-model-title">客服热线</div>
        <div class="notification-item-model-text">400-062-065</div>
        <div class="notification-item-model-title">工作时间</div>
        <div class="notification-item-model-text">周一至周日</div>
        <div class="notification-item-model-text">09:00-21:30</div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "AsideNotification",
  components: {},
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.notification {
  position: fixed;
  top: 50%;
  right: 0;
  z-index: 1;
  border: solid 1px $color-bd;
  background: $color-bg-white;
  transform: translateY(-50%);
  &-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: $color-bg-white;
    padding: 8px;
    position: relative;
    cursor: pointer;
    transition: all 0.3s;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 10%;
      width: 80%;
      height: 1px;
      background: $color-bd;
    }
    &:nth-of-type(1):after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      display: none;
    }
    &:hover {
      background: $color-bg-blue;
      .notification-item-image {
        background: $color-bg-white;
        .notification-item-image-icon {
          display: none;
        }
        .notification-item-image-icon-active {
          display: block;
          width: 32px;
          height: 32px;
          object-fit: cover;
        }
      }
      .notification-item-text {
        color: $color-text-white;
      }
      .notification-item-model {
        position: absolute;
        left: 0;
        bottom: 0;
        transform: translateX(-101%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: $color-bg-white;
        padding: 18px;
        min-width: 160px;
        min-height: 160px;
        box-shadow: 0 2px 12px 0 rgb(245, 245, 245, 0.1);
        &-icon {
          height: 140px;
          object-fit: contain;
        }
        &-text {
          font-size: 12px;
          color: $color-text-black;
          margin-top: 5px;
        }
        &-title {
          font-size: 18px;
          color: $color-text-black;
          font-weight: bold;
          margin-top: 20px;
        }
      }
    }
    &:nth-of-type(1):hover {
      background: $color-bg-blue;
      .notification-item-image {
        background: $color-bg-white;
        .notification-item-image-icon {
          display: none;
        }
        .notification-item-image-icon-active {
          display: block;
          width: 32px;
          height: 32px;
          object-fit: cover;
        }
      }
      .notification-item-text {
        color: $color-text-white;
      }
      .notification-item-model {
        position: absolute;
        left: 0;
        top: 0;
        transform: translateX(-101%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: $color-bg-white;
        padding: 18px;
        min-width: 160px;
        min-height: 160px;
        box-shadow: 0 2px 12px 0 rgb(245, 245, 245, 0.1);
        &-icon {
          height: 140px;
          object-fit: contain;
        }
        &-text {
          font-size: 12px;
          color: $color-text-black;
          margin-top: 5px;
        }
        &-title {
          font-size: 18px;
          color: $color-text-black;
          font-weight: bold;
          margin-top: 20px;
        }
      }
    }
    &-image {
      width: 52px;
      height: 52px;
      padding: 10px;
      background: $color-bg-blue;
      border-radius: 12px;
      &-icon {
        display: block;
        width: 32px;
        height: 32px;
        object-fit: cover;
        &-active {
          display: none;
        }
      }
    }
    &-text {
      color: $color-text-blue;
      font-size: 12px;
      margin-top: 8px;
    }
    &-model {
      display: none;
    }
  }
}
</style>
