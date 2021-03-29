<template>
  <div class="context">
    <div class="context-title">资料信息</div>
    <div class="context-body">
      <div class="list">
        <div class="nav">
          <div class="nav-label">账号类型：</div>
          <div class="nav-text" v-if="initInfo.type">
            <span class="nav-text-gray">{{ initInfo.typeStr || "无" }}</span>
            <!-- <span
              class="nav-text-blue"
              @click="
                updateInitInfo({
                  type: 0
                })
              "
              >（修改）</span
            > -->
          </div>
          <div class="nav-items" v-if="!initInfo.type">
            <Selection
              type="题型"
              label="选择题型"
              :list="initInfo.typeList"
              name="text"
              @updateindex="updateIndex"
            ></Selection>
          </div>
          <div class="nav-buttons" v-if="!initInfo.type">
            <div
              class="nav-button nav-button-blue"
              @click="changeSupplierType()"
            >
              确定
            </div>
          </div>
        </div>
        <div class="form">
          <div class="form-flex">
            <div class="form-title">基本信息</div>
            <div class="form-items">
              <div class="form-item">
                <input
                  type="file"
                  name=""
                  hidden="hidden"
                  id="headiconFile"
                  accept="image/*"
                  @change="uploadFile"
                />
                <div class="form-item-head" @click="selectFile()">
                  <img
                    class="form-item-head-icon"
                    v-if="userInfo.headImgUrl"
                    :src="userInfo.headImgUrl"
                    alt=""
                  />
                  <img
                    v-else
                    class="form-item-head-icon"
                    src="../../../assets/images/headicon.png"
                    alt=""
                  />
                  <div class="form-item-head-text form-item-head-text-blue">
                    上传头像
                  </div>
                </div>
              </div>
              <div class="form-item">
                <div class="form-item-label">
                  <span class="form-item-label-red">*</span>
                  <span class="form-item-label-gray">真实姓名</span>
                </div>
                <div class="form-item-input">
                  <input
                    type="text"
                    placeholder="请输入真实姓名"
                    :value="userInfo.userName"
                    @change="
                      changeUserInfoInput($event.target.value, 'userName')
                    "
                    @keyup.enter="submitForm()"
                  />
                </div>
              </div>
              <div class="form-item">
                <div class="form-item-label">
                  <span class="form-item-label-gray">性别</span>
                </div>
                <div class="form-item-radios">
                  <div
                    class="form-item-radio"
                    v-for="(a, b) in userInfo.sexList"
                    :key="b"
                    v-show="b"
                    @click="changeUserInfoInput(b, 'sex')"
                  >
                    <div
                      class="form-item-radio-label"
                      :class="{
                        'form-item-radio-label-active': b === userInfo.sex
                      }"
                    ></div>
                    <div class="form-item-radio-text">{{ a }}</div>
                  </div>
                </div>
              </div>
              <div class="form-item">
                <div class="form-item-label">
                  <span class="form-item-label-red">*</span>
                  <span class="form-item-label-gray">手机</span>
                </div>
                <div class="form-item-input">
                  <input
                    type="text"
                    placeholder="请输入手机号码"
                    :value="userInfo.phoneNo"
                    @change="
                      changeUserInfoInput($event.target.value, 'phoneNo')
                    "
                    @keyup.enter="submitForm()"
                  />
                </div>
              </div>
              <div class="form-item">
                <div class="form-item-label">
                  <span class="form-item-label-gray">电话</span>
                </div>
                <div class="form-item-input">
                  <input
                    type="text"
                    placeholder="请输入电话号码"
                    :value="userInfo.telephoneNo"
                    @change="
                      changeUserInfoInput($event.target.value, 'telephoneNo')
                    "
                    @keyup.enter="submitForm()"
                  />
                </div>
              </div>
              <div class="form-item">
                <div class="form-item-label">
                  <span class="form-item-label-gray">邮箱</span>
                </div>
                <div class="form-item-input">
                  <input
                    type="text"
                    placeholder="请输入邮箱"
                    :value="userInfo.email"
                    @change="changeUserInfoInput($event.target.value, 'email')"
                    @keyup.enter="submitForm()"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form-flex" v-if="initInfo.type === 1">
            <div class="form-title">公司信息</div>
            <div class="form-items">
              <div class="form-item">
                <div class="form-item-label">
                  <span class="form-item-label-red">*</span>
                  <span class="form-item-label-gray">公司名称</span>
                </div>
                <div class="form-item-input">
                  <input
                    type="text"
                    placeholder="请输入公司名称"
                    :value="companyInfo.companyName"
                    @change="
                      changeCompanyInfoInput($event.target.value, 'companyName')
                    "
                    @keyup.enter="submitForm()"
                  />
                </div>
              </div>
              <div class="form-item">
                <div class="form-item-label">
                  <span class="form-item-label-red">*</span>
                  <span class="form-item-label-gray">公司人数</span>
                </div>
                <div class="form-item-picker">
                  <el-select
                    class="form-item-picker-date"
                    :value="companyInfo.staffSize"
                    placeholder="请选择公司人数"
                    @input="v => changeCompanyInfoInput(v, 'staffSize')"
                    @keyup.enter="submitForm()"
                  >
                    <el-option
                      v-for="item in companyInfo.staffsizeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                  <!-- <input
                    type="text"
                    placeholder="请输入公司人数"
                    :value="companyInfo.staffSize"
                    @change="
                      changeCompanyInfoInput($event.target.value, 'staffSize')
                    "
                  /> -->
                </div>
              </div>
              <div class="form-item">
                <div class="form-item-label">
                  <span class="form-item-label-red">*</span>
                  <span class="form-item-label-gray">成立时间</span>
                </div>
                <div class="form-item-picker">
                  <el-date-picker
                    class="form-item-picker-date"
                    prefix-icon=""
                    :value="companyInfo.publishTime"
                    type="date"
                    placeholder="选择日期"
                    @input="updateDate"
                    @keyup.enter="submitForm()"
                  >
                  </el-date-picker>
                </div>
              </div>
              <div class="form-item">
                <div class="form-item-label">
                  <span class="form-item-label-red">*</span>
                  <span class="form-item-label-gray">公司电话</span>
                </div>
                <div class="form-item-input">
                  <input
                    type="text"
                    placeholder="请输入公司电话"
                    :value="companyInfo.companyPhoneNo"
                    @change="
                      changeCompanyInfoInput(
                        $event.target.value,
                        'companyPhoneNo'
                      )
                    "
                    @keyup.enter="submitForm()"
                  />
                </div>
              </div>
              <div class="form-item">
                <div class="form-item-label">
                  <span class="form-item-label-red">*</span>
                  <span class="form-item-label-gray">公司地址</span>
                </div>
                <div class="form-item-picker">
                  <el-cascader
                    class="form-item-picker-date"
                    :clearable="true"
                    :filterable="true"
                    placeholder="请选择省市区"
                    :value="[
                      companyInfo.provinceId || '',
                      companyInfo.cityId || '',
                      companyInfo.districtId || ''
                    ]"
                    :options="provinceCityDistrict"
                    :props="{
                      expandTrigger: 'click'
                    }"
                    @change="updateProvinceCityDistrict"
                  ></el-cascader>
                  <!-- <ProvinceCityCountry
                    type="kmt-list-province"
                    label="地区"
                    :provinceCityCountry="questionProvinceCityCountry"
                    @updateProvinceCityCountry="updateQuestionProvinceCityCountry"
                  ></ProvinceCityCountry> -->
                </div>
              </div>
              <div class="form-item">
                <div class="form-item-label">
                  <!-- <span class="form-item-label-red">*</span>
                  <span class="form-item-label-gray">详细地址</span> -->
                </div>
                <div class="form-item-input">
                  <input
                    type="text"
                    placeholder="请输入详细地址"
                    :value="companyInfo.address"
                    @change="
                      changeCompanyInfoInput($event.target.value, 'address')
                    "
                    @keyup.enter="submitForm()"
                  />
                </div>
              </div>
              <div class="form-item">
                <div class="form-item-label">
                  <span class="form-item-label-gray">公司官网</span>
                </div>
                <div class="form-item-input">
                  <input
                    type="text"
                    placeholder="请输入公司官网"
                    :value="companyInfo.officialWebsite"
                    @change="
                      changeCompanyInfoInput(
                        $event.target.value,
                        'officialWebsite'
                      )
                    "
                    @keyup.enter="submitForm()"
                  />
                </div>
              </div>
              <div class="form-item">
                <div class="form-item-label">
                  <span class="form-item-label-red">*</span>
                  <span class="form-item-label-gray">公司详情</span>
                </div>
                <div class="form-item-input">
                  <textarea
                    type="text"
                    placeholder="请输入公司详情"
                    :value="companyInfo.description"
                    @change="
                      changeCompanyInfoInput($event.target.value, 'description')
                    "
                    @keyup.enter="submitForm()"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="form-flex" v-else></div>
        </div>
        <div class="buttons">
          <div class="button button-blue" @click="submitForm()">保存</div>
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
  ProvinceCityDistrict,
  UserInfo,
  CompanyInfo
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
  name: "InformationView",
  components: {
    Selection
  }
})
export default class InformationView extends Vue {
  public BASE_IMAGE_URL = BASE_IMAGE_URL;

  @State("initInfo")
  public initInfo!: any | InitInfo;
  @State("provinceCityDistrict")
  public provinceCityDistrict!: Array<ProvinceCityDistrict>;
  @State("userInfo")
  public userInfo!: UserInfo;
  @State("companyInfo")
  public companyInfo!: CompanyInfo;

  @Action(ActionTypes.GetInformationDefInfo)
  public getInformationDefInfo!: Function;
  @Action(ActionTypes.UpdateDefLoginInfo)
  public updateDefLoginInfo!: Function;
  @Action(ActionTypes.UploadForm)
  public uploadForm!: Function;
  @Action(ActionTypes.ChangeSupplierType)
  public changeSupplierType!: Function;
  @Action(ActionTypes.SaveUserInfo)
  public saveUserInfo!: Function;
  @Action(ActionTypes.SaveCompanyInfo)
  public saveCompanyInfo!: Function;

  @Mutation(MutationTypes.UpdateInitInfo)
  public updateInitInfo!: Function;
  @Mutation(MutationTypes.UpdateUserInfo)
  public updateUserInfo!: Function;
  @Mutation(MutationTypes.UpdateCompanyInfo)
  public updateCompanyInfo!: Function;

  public updateIndex(index: number) {
    const { typeList = [] } = this.initInfo || {};
    for (const [a, b] of typeList.entries()) {
      typeList[a].isSelected = index === a;
    }
    this.updateInitInfo({ typeList });
  }

  public selectFile() {
    const dom: any = document.querySelector("#headiconFile");
    dom.click();
  }
  public uploadFile(e: any) {
    const files = e.target.files;
    let len = files.length;
    while (len > 0) {
      this.uploadForm({ file: files[files.length - len] }).then((res: any) => {
        const { fileThumPath } = res || {};
        this.updateUserInfo({ headImgUrl: fileThumPath });
        e.target.value = null;
      });
      len--;
    }
  }

  public changeUserInfoInput(value: string, key: string) {
    if (key === "phoneNo") {
      validate[ValidateTypes.ValidatePhone]({
        value,
        success: ({ value }: ValidateSuccessParams) => {
          this.updateUserInfo({ [key]: value });
        },
        failed: ({ value, message }: ValidateFailedParams) => {
          if (value) {
            Message.error(message);
            this.updateUserInfo({ [key]: "" });
          }
        }
      });
    } else if (key === "telephoneNo") {
      validate[ValidateTypes.ValidateTelephone]({
        value,
        success: ({ value }: ValidateSuccessParams) => {
          this.updateUserInfo({ [key]: value });
        },
        failed: ({ value, message }: ValidateFailedParams) => {
          if (value) {
            Message.error(message);
            this.updateUserInfo({ [key]: "" });
          }
        }
      });
    } else if (key === "email") {
      validate[ValidateTypes.ValidateEmail]({
        value,
        success: ({ value }: ValidateSuccessParams) => {
          this.updateUserInfo({ [key]: value });
        },
        failed: ({ value, message }: ValidateFailedParams) => {
          if (value) {
            Message.error(message);
            this.updateUserInfo({ [key]: "" });
          }
        }
      });
    } else {
      this.updateUserInfo({ [key]: value });
    }
  }

  public changeCompanyInfoInput(value: string, key: string) {
    if (key === "companyPhoneNo") {
      validate[ValidateTypes.ValidateTelephone]({
        value,
        success: ({ value }: ValidateSuccessParams) => {
          this.updateCompanyInfo({ [key]: value });
        },
        failed: ({ value, message }: ValidateFailedParams) => {
          if (value) {
            Message.error(message);
            this.updateCompanyInfo({ [key]: "" });
          }
        }
      });
    } else if (key === "officialWebsite") {
      validate[ValidateTypes.ValidateWebsite]({
        value,
        success: ({ value }: ValidateSuccessParams) => {
          this.updateCompanyInfo({ [key]: value });
        },
        failed: ({ value, message }: ValidateFailedParams) => {
          if (value) {
            Message.error(message);
            this.updateCompanyInfo({ [key]: "" });
          }
        }
      });
    } else {
      this.updateCompanyInfo({ [key]: value });
    }
  }

  public updateDate(e: any) {
    this.changeCompanyInfoInput(
      formatDateTime({ date: e, formatType: "yyyy-mm-dd" }),
      "publishTime"
    );
  }

  public updateProvinceCityDistrict(value: any) {
    const { provinceCityDistrict = [] } = this;
    const label: any = ((ls, arr) => {
      const array = [];
      for (const [a, b] of ls.entries()) {
        const { value, label, children = [] } = b;
        if (children.length && value === arr[0]) {
          array.push(label);
          for (const [c, d] of children.entries()) {
            const { value, label, children = [] } = d;
            if (children.length && value === arr[1]) {
              array.push(label);
              for (const [e, f] of children.entries()) {
                const { value, label } = f;
                if (value === arr[2]) {
                  array.push(label);
                  return array;
                }
              }
            }
          }
        }
      }
    })(provinceCityDistrict, value);
    this.updateCompanyInfo({
      provinceId: value[0],
      cityId: value[1],
      districtId: value[2],
      provinceName: label[0],
      cityName: label[1],
      districtName: label[2]
    });
  }

  public submitForm() {
    this.saveUserInfo();
    // this.saveCompanyInfo();
  }

  public created() {
    this.getInformationDefInfo();
  }
  public mounted() {
    const { loginInfo } = this.initInfo || {};
    const { isFirstExist } = loginInfo || {};
    if (isFirstExist) {
      MessageBox({
        message:
          "恭喜您，账号注册成功！请完善信息并提交资质认证。审核通过后就可以开始接单了。",
        title: "提示",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        center: true,
        roundButton: false,
        showConfirmButton: true,
        showCancelButton: false
      })
        .then(action => {
          if (action === "confirm") {
            this.updateDefLoginInfo();
          }
        })
        .catch(() => {});
    }
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
      .nav
        padding 20px 0
        width 100%
        display flex
        justify-content flex-start
        align-items center
        border-bottom solid 1px $color-bd
        &-text
          font-size 16px
          &-gray
            color $color-text-gray
          &-blue
            cursor pointer
            color $color-text-blue
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
          margin 20px 0
          &-head
            width 100%
            display flex
            flex-direction column
            justify-content center
            align-items center
            margin 20px
            cursor pointer
            &-icon
              width 90px
              height 90px
              border-radius 100px
              background $color-bg-gray
              overflow hidden
            &-text
              margin-top 10px
              font-size 14px
              color $color-text-gray
              &-blue
                color $color-text-blue
          &-label
            flex 2
            text-align right
            margin-right 20px
            font-size 14px
            &-red
              color $color-text-red
            &-gray
              color $color-text-gray
          &-picker
            flex 8
            text-align left
            // border solid 1px $color-bd
            // padding 10px
            &-date
              width 100%
          &-input
            flex 8
            text-align left
            border solid 1px $color-bd-grey
            // padding 10px
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
            flex 8
            text-align left
            // padding 10px
            display flex
            justify-content flex-start
            align-items center
          &-radio
            display flex
            justify-content flex-start
            align-items center
            cursor pointer
            font-size 14px
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
</style>
