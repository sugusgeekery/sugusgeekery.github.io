<template>
  <div class="context">
    <div class="context-title">首页</div>
    <div class="context-body">
      <div class="list">
        <div class="list-title" v-if="initInfo.accountInfo && initInfo.accountInfo.userName">{{ initInfo.accountInfo.userName }}，您好！</div>
        <div class="list-items">
          <div
            class="list-item"
            v-for="(a, b) in orderMessageList"
            :key="'_订单消息_' + b"
            @click="navigateToPath(a.path)"
          >
            <div class="list-item-title">{{ a.text }}</div>
            <div class="list-item-text">{{ a.count }}</div>
          </div>
        </div>
        <div class="list-row">
          <div class="list-flex">
            <div class="list-flex-title">待办任务</div>
            <div class="list-flex-items" v-if="job.list.length">
              <div
                class="list-flex-item"
                v-for="(a, b) in job.list"
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
        </div>
        <div class="list-footer">
          <el-pagination
            @size-change="updatePageSize"
            @current-change="updatePageNum"
            :current-page="job.pageNo"
            :page-sizes="job.pageSizes"
            :page-size="job.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="job.total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

import { InitInfo, OrderMessage, Job, UserMessage } from "@/store/modules/home/state";
import { ActionTypes } from "@/store/modules/home/actions";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();

    const initInfo = computed(() => store.state.home.initInfo);
    const orderMessageList = computed(() => store.state.home.orderMessageList);
    const job = computed(() => store.state.home.job);
    const userMessageList = computed(() => store.state.home.userMessageList);

    const init: Function = (params: any) => store.dispatch(`home/${ActionTypes.Init}`, params);
    const updatePageNum: Function = (params: any) => store.dispatch(`home/${ActionTypes.UpdatePageNum}`, params);
    const updatePageSize: Function = (params: any) => store.dispatch(`home/${ActionTypes.UpdatePageSize}`, params);

    const navigateToPath = (path: string) => {
      if (path) {
        router.push(path);
      }
    }

    init();

    return {
      initInfo,
      orderMessageList,
      job,
      userMessageList,
      updatePageNum,
      updatePageSize,
      init,
      navigateToPath,
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
    position: relative;
    .list {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      max-width: 1400px;
      padding: 0 20px;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      &-title {
        width: 100%;
        margin: 28px 0 0 0;
        color: $color-text-black;
        font-size: 16px;
      }
      &-items {
        margin: 28px 0;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-start;
      }
      &-item {
        flex: 1;
        margin: 0 40px 0 0;
        padding: 24px 28px;
        background: $color-bg-blue-white;
        border-radius: 6px;
        &:nth-last-of-type(1) {
          margin-right: 0;
        }
        &-title {
          color: $color-text-blue-black;
          font-size: 16px;
          line-height: 40px;
        }
        &-text {
          color: $color-text-blue-black;
          font-size: 100px;
          text-align: right;
        }
      }
      &-row {
        flex: 1;
        width: 100%;
        overflow: auto;
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      &-flex {
        margin-right: 40px;
        border-radius: 6px;
        background: $color-bg-white;
        padding: 18px;
        flex: 1;
        &:nth-last-of-type(1) {
          margin-right: 0;
        }
        &-title {
          margin: 20px 0;
          font-size: 16px;
          color: $color-text-black;
        }
        &-items {
          margin: 20px 0;
        }
        &-item {
          padding: 20px 5px;
          border-bottom: solid 1px $color-bd;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &-col {
            flex-direction: column;
          }
          &-text {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 14px;
            margin: 5px 20px 5px 0;
            &:nth-last-of-type(1) {
              margin-right: 0;
            }
            &-gray {
              color: $color-text-gray;
            }
            &-black {
              color: $color-text-black;
            }
            &-blue {
              color: $color-text-blue;
            }
          }
          &-image {
            width: 20px;
            height: 20px;
            border-radius: 100px;
            overflow: hidden;
            object-fit: cover;
            margin-right: 5px;
          }
          &-icon {
            width: 17px;
            margin-right: 10px;
          }
          &-left {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          &-right {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
        }
      }
      &-footer {
        width: 100%;
        background: $color-bg-white;
        margin: 0 auto;
        padding: 5px;
        text-align: center;
      }
    }
  }
} 
</style>
