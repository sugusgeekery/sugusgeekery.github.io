<template>
  <div class="context">
    <input
      type="file"
      name="file"
      hidden="hidden"
      id="file"
      @change="uploadFile"
    />
    <div class="context-title">资质申请</div>
    <div class="context-body">
      <div class="list" v-if="initInfo.type === 1">
        <div class="li">
          <div class="li-title">营业执照</div>
          <div class="li-row">
            <div class="li-flex">
              <div class="li-items">
                <div class="li-item">
                  <div class="li-item-label">
                    <span class="li-item-label-gray">统一社会信用代码</span>
                  </div>
                  <div class="li-item-input">
                    <input
                      type="text"
                      placeholder="请输入统一社会信用代码"
                      :value="companyQualify.creditCode"
                      @change="
                        changeCompanyQualifyInput(
                          $event.target.value,
                          'creditCode'
                        )
                      "
                    />
                  </div>
                </div>
              </div>
              <div class="li-text">
                <span class="li-button" @click="selectFile(1)"
                  >上传营业执照</span
                >
                <span class="li-text-gray">
                  支持 jpg、png、jpeg格式，大小不超过5M
                </span>
              </div>
              <div class="li-text">
                <span class="li-text-gray">
                  说明“上传之后，按钮显示为”重新上传”
                </span>
              </div>
            </div>
            <div class="li-img">
              <img
                class="li-img-icon"
                v-if="companyQualify.businessLicenseImgUrl"
                :src="BASE_IMAGE_URL + companyQualify.businessLicenseImgUrl"
                alt=""
              />
              <img
                v-else
                class="li-img-icon"
                src="../../../assets/images/headicon.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="li">
          <div class="li-title">法人信息</div>
          <div class="li-items">
            <div class="li-item">
              <div class="li-item-label">
                <span class="li-item-label-gray">法人姓名</span>
              </div>
              <div class="li-item-input">
                <input
                  type="text"
                  placeholder="请输入法人姓名"
                  :value="companyQualify.operName"
                  @change="
                    changeCompanyQualifyInput($event.target.value, 'operName')
                  "
                />
              </div>
            </div>
            <div class="li-item">
              <div class="li-item-label">
                <span class="li-item-label-gray">身份证号码</span>
              </div>
              <div class="li-item-input">
                <input
                  type="text"
                  placeholder="请输入身份证号码"
                  :value="companyQualify.operIdcardNo"
                  @change="
                    changeCompanyQualifyInput(
                      $event.target.value,
                      'operIdcardNo'
                    )
                  "
                />
              </div>
            </div>
            <div class="li-item">
              <div class="li-item-label">
                <span class="li-item-label-gray">手机号码</span>
              </div>
              <div class="li-item-input">
                <input
                  type="text"
                  placeholder="请输入手机号码"
                  :value="companyQualify.operPhoneNo"
                  @change="
                    changeCompanyQualifyInput(
                      $event.target.value,
                      'operPhoneNo'
                    )
                  "
                />
              </div>
            </div>
          </div>
          <div class="li-images">
            <div class="li-image">
              <div class="li-image-icon" @click="selectFile(2)">
                <img
                  class="li-image-icon-src"
                  :src="BASE_IMAGE_URL + companyQualify.operIdcardFrontUrl"
                  v-if="companyQualify.operIdcardFrontUrl"
                  alt=""
                />
                <div class="li-image-icon-span" v-else>+</div>
              </div>
              <div class="li-image-text">法人身份证正面</div>
            </div>
            <div class="li-image">
              <div class="li-image-icon" @click="selectFile(3)">
                <img
                  class="li-image-icon-src"
                  :src="BASE_IMAGE_URL + companyQualify.operIdcardBackendUrl"
                  v-if="companyQualify.operIdcardBackendUrl"
                  alt=""
                />
                <div class="li-image-icon-span" v-else>+</div>
              </div>
              <div class="li-image-text">法人身份证背面</div>
            </div>
          </div>
        </div>
        <div class="li">
          <div class="li-title">选择你拥有的生产能力标签</div>
          <div class="li-content">
            <Selection
              type="生产能力标签"
              label="选择生产能力标签"
              :list="companyQualify.labelList"
              name="name"
              @updateindex="updateCompanyQualifyLabelIndex"
            ></Selection>
          </div>
        </div>
        <div class="buttons">
          <div class="button button-blue" @click="saveCompanyQualifyInfo()">
            提交
          </div>
        </div>
      </div>
      <div class="list" v-else-if="initInfo.type === 2">
        <div class="li">
          <div class="li-title">个人信息</div>
          <div class="li-images">
            <div class="li-image">
              <div class="li-image-icon" @click="selectFile(4)">
                <img
                  class="li-image-icon-src"
                  :src="BASE_IMAGE_URL + userQualify.idcardFrontImgUrl"
                  v-if="userQualify.idcardFrontImgUrl"
                  alt=""
                />
                <div class="li-image-icon-span" v-else>+</div>
              </div>
              <div class="li-image-text">法人身份证正面</div>
            </div>
            <div class="li-image">
              <div class="li-image-icon" @click="selectFile(5)">
                <img
                  class="li-image-icon-src"
                  :src="BASE_IMAGE_URL + userQualify.idcardBackImgUrl"
                  v-if="userQualify.idcardBackImgUrl"
                  alt=""
                />
                <div class="li-image-icon-span" v-else>+</div>
              </div>
              <div class="li-image-text">法人身份证背面</div>
            </div>
          </div>
        </div>
        <div class="li">
          <div class="li-title">选择你拥有的生产能力标签</div>
          <div class="li-content">
            <Selection
              type="生产能力标签"
              label="选择生产能力标签"
              :list="userQualify.labelList"
              name="name"
              @updateindex="updateUserQualifyLabelIndex"
            ></Selection>
          </div>
        </div>
        <div class="buttons">
          <div class="button button-blue" @click="saveUserQualifyInfo()">
            提交
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const { State, Getter, Action, Mutation } = namespace("account");

import {
  InitInfo,
  UserQualify,
  CompanyQualify
} from "@/store/modules/account/state";
import { ActionTypes } from "@/store/modules/account/actions";
import { MutationTypes } from "@/store/modules/account/mutations";

import { BASE_IMAGE_URL } from "@/config";
import { formatDateTime } from "@/utils/util";
import validate, {
  ValidateTypes,
  ValidateSuccessParams,
  ValidateFailedParams
} from "@/utils/validate";
import { Message, MessageBox } from "element-ui";

import Selection from "@/components/Selection.vue";

@Component({
  name: "ApplicationView",
  components: {
    Selection
  }
})
export default class ApplicationView extends Vue {
  public BASE_IMAGE_URL = BASE_IMAGE_URL;
  public date = "";

  @State("initInfo")
  public initInfo!: any | InitInfo;
  @State("userQualify")
  public userQualify!: UserQualify;
  @State("companyQualify")
  public companyQualify!: CompanyQualify;

  @Action(ActionTypes.GetQualifyDefInfo)
  public getQualifyDefInfo!: Function;
  @Action(ActionTypes.UploadForm)
  public uploadForm!: Function;
  @Action(ActionTypes.SavePersonQualifyInfo)
  public saveUserQualifyInfo!: Function;
  @Action(ActionTypes.SaveCompanyQualifyInfo)
  public saveCompanyQualifyInfo!: Function;

  @Mutation(MutationTypes.UpdateUserQualify)
  public updateUserQualify!: Function;
  @Mutation(MutationTypes.UpdateCompanyQualify)
  public updateCompanyQualify!: Function;

  public updateUserQualifyLabelIndex(index: number) {
    const { labelList = [] } = this.userQualify || {};
    const { isSelected } = labelList[index] || {};
    labelList[index].isSelected = ~~!isSelected;
    this.updateCompanyQualify({ labelList });
  }
  public updateCompanyQualifyLabelIndex(index: number) {
    const { labelList = [] } = this.companyQualify || {};
    const { isSelected } = labelList[index] || {};
    labelList[index].isSelected = ~~!isSelected;
    this.updateCompanyQualify({ labelList });
  }

  public fileType = 0;
  public selectFile(fileType: number) {
    this.fileType = fileType;
    const dom: any = document.querySelector("#file");
    dom.click();
  }
  public uploadFile(e: any) {
    const files = e.target.files;
    let len = files.length;
    while (len > 0) {
      this.uploadForm({ file: files[files.length - len] }).then((res: any) => {
        const { filePath, id } = res || {};
        switch (this.fileType) {
          case 1:
            this.updateCompanyQualify({
              businessLicenseImgUrl: filePath,
              businessLicenseImgId: id
            });
            break;
          case 2:
            this.updateCompanyQualify({
              operIdcardFrontUrl: filePath,
              operIdcardFrontId: id
            });
            break;
          case 3:
            this.updateCompanyQualify({
              operIdcardBackendUrl: filePath,
              operIdcardBackendId: id
            });
            break;
          case 4:
            this.updateUserQualify({
              idcardFrontImgUrl: filePath,
              idcardFrontImgId: id
            });
            break;
          case 5:
            this.updateUserQualify({
              idcardBackImgUrl: filePath,
              idcardBackImgId: id
            });
            break;
        }
      });
      len--;
    }
  }

  // public changeUserQualifyInput(value: string, key: string) {
  //   if (key === "phoneNo") {
  //     validate[ValidateTypes.ValidatePhone]({
  //       value,
  //       success: ({ value }: ValidateSuccessParams) => {
  //         this.updateUserQualify({ [key]: value });
  //       },
  //       failed: ({ value, message }: ValidateFailedParams) => {
  //         if (value) {
  //           Message.error(message);
  //           this.updateUserQualify({ [key]: "" });
  //         }
  //       }
  //     });
  //   } else if (key === "telephoneNo") {
  //     validate[ValidateTypes.ValidateTelephone]({
  //       value,
  //       success: ({ value }: ValidateSuccessParams) => {
  //         this.updateUserQualify({ [key]: value });
  //       },
  //       failed: ({ value, message }: ValidateFailedParams) => {
  //         if (value) {
  //           Message.error(message);
  //           this.updateUserQualify({ [key]: "" });
  //         }
  //       }
  //     });
  //   } else {
  //     this.updateUserQualify({ [key]: value });
  //   }
  // }

  public changeCompanyQualifyInput(value: string, key: string) {
    if (key === "creditCode") {
      validate[ValidateTypes.ValidateCreditCode]({
        value,
        success: ({ value }: ValidateSuccessParams) => {
          this.updateCompanyQualify({ [key]: value });
        },
        failed: ({ value, message }: ValidateFailedParams) => {
          if (value) {
            Message.error(message);
            this.updateCompanyQualify({ [key]: "" });
          }
        }
      });
    } else if (key === "operIdcardNo") {
      validate[ValidateTypes.ValidateIdentityCard]({
        value,
        success: ({ value }: ValidateSuccessParams) => {
          this.updateCompanyQualify({ [key]: value });
        },
        failed: ({ value, message }: ValidateFailedParams) => {
          if (value) {
            Message.error(message);
            this.updateCompanyQualify({ [key]: "" });
          }
        }
      });
    } else if (key === "operPhoneNo") {
      validate[ValidateTypes.ValidatePhone]({
        value,
        success: ({ value }: ValidateSuccessParams) => {
          this.updateCompanyQualify({ [key]: value });
        },
        failed: ({ value, message }: ValidateFailedParams) => {
          if (value) {
            Message.error(message);
            this.updateCompanyQualify({ [key]: "" });
          }
        }
      });
    } else {
      this.updateCompanyQualify({ [key]: value });
    }
  }

  public created() {
    this.getQualifyDefInfo();
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
      overflow auto
      padding 1px 30px
      .li
        width 100%
        &-title
          padding 20px 0 14px 0
          color $color-text-black
          font-size 20px
          font-weight bold
          border-bottom solid 1px $color-bd
        &-content
          margin 20px 20px 20px 0
        &-row
          width 100%
          display flex
          justify-content space-between
          align-items flex-start
        &-flex
          flex 2
        &-img
          flex 1
          margin 20px 40px
          text-align right
          &-icon
            width 124px
            height 154px
            background $color-bg-gray
            object-fit contain
        &-images
          margin 20px 20px 20px 0
          display flex
          justify-content flex-start
          align-items flex-start
        &-image
          margin-right 20px
          &-icon
            border solid 2px $color-bd-blue
            position relative
            width 124px
            height 154px
            background $color-bg-blue-white
            &-src
              width 100%
              height 100%
              object-fit contain
              cursor pointer
            &-span
              width 100%
              height 100%
              display flex
              justify-content center
              align-items center
              font-size 50px
              color $color-text-blue
              cursor pointer
          &-text
            text-align center
            font-size 14px
            margin 10px auto
            color $color-text-gray
        &-text
          font-size 14px
          margin 20px 20px 20px 0
          &-gray
            color $color-text-gray
          &-blue
            cursor pointer
            color $color-text-blue
        &-buttons
          display flex
          justify-content flex-start
          align-items center
        &-button
          text-align center
          padding 9px 16px
          margin-right 10px
          border-radius 4px
          border solid 1px $color-text-blue
          font-size 14px
          color $color-text-blue
          background $color-bg-white
          cursor pointer
          &-blue
            color $color-text-white
            background $color-text-blue
        &-items
          width 100%
          display flex
          justify-content space-between
          align-items flex-start
        &-item
          flex 1
          display flex
          justify-content flex-start
          align-items center
          margin 20px 20px 20px 0
          &-label
            margin-right 20px
            font-size 14px
            &-red
              color $color-text-red
            &-gray
              color $color-text-gray
          &-picker
            &-date
              width 100%
          &-input
            border solid 1px $color-bd-grey
            font-size 14px
            flex 1
            input
              width 100%
              border none
              outline none
              padding 10px
              border-radius 4px
              font-size 14px
            textarea
              width 100%
              height 100px
              border none
              outline none
              padding 10px
              border-radius 4px
              font-size 14px
          &-radios
            display flex
            justify-content flex-start
            align-items center
          &-radio
            display flex
            justify-content flex-start
            align-items center
            cursor pointer
            &-label
              width 12px
              height 12px
              border-radius 100px
              border solid 1px $color-bd-gray
              background $color-bg-blue-white
              margin-right 8px
              &-active
                background $color-bg-blue
            &-text
              color $color-text-gray
              font-size 16px
              margin-right 16px
      .buttons
        margin 20px auto
        display flex
        justify-content center
        align-items center
      .button
        border-radius 4px
        padding 10px 20px
        font-size 14px
        border solid 1px $color-bd-blue
        color $color-text-blue
        background $color-bg-white
        cursor pointer
        margin 0 20px
        &-blue
          border solid 1px $color-bd-blue
          color $color-text-white
          background $color-bg-blue
</style>
