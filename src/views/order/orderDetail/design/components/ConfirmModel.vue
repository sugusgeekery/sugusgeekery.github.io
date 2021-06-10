<template>
  <div class="model-container" v-dialogDrag v-show="data.isShow">
    <input
      type="file"
      name="singlefileOfConfirmModelComponent"
      id="singlefileOfConfirmModelComponent"
      hidden="hidden"
      accept="image/*"
      @change="uploadFile"
    />
    <div class="model-wrapper">
      <div class="model-header">
        <div class="model-title">
          <div class="model-title-text">
            {{ data.opinion === 0 ? '驳回' : data.opinion === 1 ? '通过' : ''}}原因
          </div>
        </div>
        <div
          class="model-cancel"
          @click="updateData({ isShow: false, confirm: 0 })"
        ></div>
      </div>
      <div class="model-body">
        <div class="form-container">
          <div class="form-wrapper">
            <div class="form-content">
              <div class="form-textarea">
                <textarea
                  :value="data.content"
                  :placeholder="`请填写${ data.opinion === 0 ? '驳回' : data.opinion === 1 ? '通过' : ''}原因`"
                  cols="30"
                  rows="10"
                  @change="updateContent({ value: $event.target.value })"
                ></textarea>
              </div>
              <div class="form-list">
                <div class="form-li" v-for="(a, b) in data.fileList" :key="b">
                  <div class="form-li-text">{{ a.fileName }}</div>
                  <div class="form-li-del" @click="deleteFile({ index: b })">+</div> 
                </div>
              </div>
            </div>
            <div class="form-add" @click="checkfile()">
              <img class="form-add-img" src="../../../../../assets/images/pictrue_add.png" alt="">
            </div>
          </div>
          <div class="form-selects" v-if="data.isShowUpdate3D">
            <div class="form-select" @click="updateData({ isUpdate3D: !data.isUpdate3D, confirm: -1 })">
              <img class="form-select-img" v-if="data.isUpdate3D" src="../../../../../assets/images/check_blue.png" alt="">
              <img class="form-select-img" v-else src="../../../../../assets/images/check_gray.png" alt="">
              <span class="form-select-text">需更新3D图纸</span>
            </div>
          </div>
        </div>
      </div>
      <div class="model-footer">
        <div class="model-buttons">
          <div class="model-button" @click="updateData({ isShow: false, confirm: 0 })">取消</div>
          <div class="model-button model-button-blue" @click="updateData({ isShow: false, confirm: 1 })">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, watch, onMounted, onUnmounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";

import Upload from "@/api/upload";

export default defineComponent({
  name: "ConfirmModelComponent",
  components: {},
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  setup(props, context) {
    const data = reactive(props.data);

    const updateData = (params: ConfirmModelTypes | any) => {
      context.emit("updateData", { ...data, ...params });
    };

    const checkfile = () => {
      const dom: any = document.querySelector("#singlefileOfConfirmModelComponent");
      dom.click();
    }
    const uploadFile = async (e: any) => {
      try {
        const files = e.target.files;
        const fileList: any = await Upload({ files });
        for (const v of fileList) {
          addFile(v);
        }
        e.target.value = null;
      } catch(e) {
        throw new Error(e);
      }
    }
    const addFile = (newFile: any) => {
      const { fileList } = data;
      const { id, fileName, filePath } = newFile || {};
      if (id && filePath) {
        fileList.push({ fileId: id, fileName, filePath });
        updateData({ fileList, confirm: -1 });
      }
    }
    const deleteFile = (index: number) => {
      const { fileList } = data;
      const temp: any = JSON.parse(JSON.stringify(fileList));
      if (temp && temp.length) {
        temp.splice(index, 1);
        updateData({ fileList: temp, confirm: -1 });
      }
    }
    const updateContent = (params: any) => {
      const { value, isPaste } = params || {};
      if (value) {
        const content = isPaste ? data.content + value : value;
        updateData({ content, confirm: -1 });
      }
    }

    // 当前方案设计页面的粘贴事件只针对审批原因图片有效
    const handlePaste = async (e: any) => {
      const { clipboardData } = e || window;
      const { items } = clipboardData || {};
      if (!(items && items.length)) {
          return ;
      }

      const uploadFile = async (file: any) => {
        const fileList: any = await Upload({ files: [file]});
        for (const v of fileList) {
          addFile(v);
        }
      };

      for (let i = 0, len = items.length; i < len; i++) {
        const { type } = items[i];
        if (type.includes("image")) {
          const file = items[i].getAsFile();
          if (file) {
            uploadFile(file);
          }
          break;
        } else {
          items[i].getAsString((str: string) => {
            if (str) {
              updateContent({ value: str, isPaste: true });
            }
          });
          break;
        }
      }
    }

    onMounted(() => {
      document.addEventListener("paste", handlePaste);
    })
    onUnmounted(() => {
      document.removeEventListener("paste", handlePaste);
    })
    
    return {
      data,
      updateData,
      checkfile,
      uploadFile,
      addFile,
      deleteFile,
      updateContent,
      handlePaste,
    };
  }
});
</script>

<style lang="scss" scoped>
.model {
  &-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color-bg-black, 0.3);
    z-index: 999;
  }
  &-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 40%;
    min-height: 40%;
    max-width: 80%;
    max-height: 80%;
    background: $color-bg-white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  &-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 15px 20px;
    background: $color-bg;
  }
  &-cancel {
    width: 12px;
    height: 12px;
    position: relative;
    cursor: pointer;
    &:before {
      content: "";
      position: absolute;
      width: 141%;
      height: 100%;
      border-top: solid 1px $color-bd-black;
      transform-origin: 0 0;
      transform: rotate(45deg);
      z-index: 1;
    }
    &:after {
      content: "";
      position: absolute;
      width: 141%;
      height: 100%;
      border-bottom: solid 1px $color-bd-black;
      transform-origin: 0 100%;
      transform: rotate(-45deg);
    }
  }
  &-body {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: auto;
  }
  &-footer {
    width: 100%;
    box-shadow: 0px -3px 5px 0px rgba(0, 0, 0, 0.1);
  }
  &-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    &-text {
      font-size: 16px;
      font-weight: bold;
      color: $color-text-black;
      margin-right: 20px;
    }
  }
  &-text {
    margin-left: 10px;
    font-size: 14px;
    color: $color-text-gray;
    position: relative;
    &-black {
      color: $color-text-black;
    }
    &-blue {
      color: $color-text-blue;
      cursor: pointer;
    }
    &-red {
      color: $color-text-red;
    }
    &-gray {
      color: $color-text-gray;
      cursor: pointer;
    }
    &-arrow {
      padding-right: 14px;
      border-right: solid 1px $color-bd;
    }
    &-tip {
      position: absolute;
      top: 0;
      right: 14px;
      width: 6px;
      height: 6px;
      border-radius: 10px;
      background: $color-bg-red;
    }
    &-img {
      width: 13px;
      margin-left: 14px;
    }
  }
  &-buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
  }
  &-button {
    border-radius: 4px;
    padding: 9px 18px;
    font-size: 14px;
    border: solid 1px $color-bd-blue;
    color: $color-text-blue;
    background: $color-bg-white;
    cursor: pointer;
    margin: 0 20px;
    &-blue {
      border: solid 1px $color-bd-blue;
      color: $color-text-white;
      background: $color-bg-blue;
    }
  }
}
.form {
  &-container {
    width: 100%;
    height: 100%;
    position: relative;
    background: white;
    border-radius: 4px;
    border: solid 1px transparent;
    &-active {
      border: solid 1px $color-bd-grey;
    }
  }
  &-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 12px;
  }
  &-content {
    flex: 1;
  }
  &-add {
    margin-left: 10px;
    &-img {
      width: 48px;
      height: 48px;
      object-fit: contain;
    }
  }
  &-textarea {
    font-size: 14px;
    color: $color-text-gray;
    background: $color-bg-white;
    border: solid 1px $color-bd-grey;
    border-radius: 4px;
    padding: 8px;
    textarea {
      font-size: 14px;
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
    }
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
  &-li {
    margin: 5px;
    background: #F1F1F1;
    position: relative;
    border: solid 1px $color-bd-grey;
    padding: 5px 8px;
    &-text {
      color: $color-text-blue;
      font-size: 12px;
    }
    &-image {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &-del {
      display: none;
    }
    &:hover {
      border: solid 1px $color-bd-blue;
      .form-li-del {
        position: absolute;
        top: 0;
        right: 0;
        width: 14px;
        height: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        background: #86ABF6;
        color: #FFFFFF;
        cursor: pointer;
        transform: translate(50%, -50%) rotate(45deg);
      }
    }
  }
  &-selects {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &-select {
    margin: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center ;
    cursor: pointer;
    &-img {
      width: 13px;
      height: 13px;
      object-fit: contain;
    }
    &-text {
      color: #1B1B1B;
      font-size: 12px;
      margin-left: 5px;
    }
  }
}
</style>
