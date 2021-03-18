// 验证规则导出类型
export interface ValidateParams {
  value: string;
  success: ValidateSuccess;
  failed: ValidateFailed;
}
// 验证成功返回函数
export interface ValidateSuccess {
  (validateSuccessParams: ValidateSuccessParams): void;
}
// 验证成功返回函数参数
export interface ValidateSuccessParams {
  value: string;
  message: string;
}
// 验证失败返回函数
export interface ValidateFailed {
  (validateFailedParams: ValidateFailedParams): void;
}
// 验证失败返回函数参数
export interface ValidateFailedParams {
  value: string;
  message: string;
}

// 验证方法名
export enum ValidateTypes {
  ValidateNumber = "ValidateNumber",
  ValidatePhone = "ValidatePhone",
  ValidateTelephone = "ValidateTelephone",
  ValidateCode = "ValidateCode",
  ValidatePassword = "ValidatePassword",
  ValidateIdentityCard = "ValidateIdentityCard",
  ValidateEmail = "ValidateEmail",
  ValidateWebsite = "ValidateWebsite",
  ValidateCreditCode = "ValidateCreditCode"
}

export default {
  /**
   * 数字类型验证
   */
   [ValidateTypes.ValidateNumber]: (params: ValidateParams) => {
    const { value, success = function() {}, failed = function() {} } = params;
    if (!value) {
      failed({ value, message: "内容不能为空" });
    } else {
      const reg = /^[\d\.]+$/;
      console.log(reg.test(value), value, reg)
      if (reg.test(value)) {
        success({ value,  message: "内容验证通过" });
      } else {
        failed({ value, message: "只能输入数字哦" });
      }
    }
  },

  /**
   * 手机号码验证
   */
  [ValidateTypes.ValidatePhone]: (params: ValidateParams) => {
    const { value, success = function() {}, failed = function() {} } = params;
    if (!value) {
      failed({ value, message: "手机号码不能为空" });
    } else {
      const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      if (reg.test(value)) {
        success({ value,  message: "手机号码验证通过" });
      } else {
        failed({ value, message: "请输入正确的手机号码" });
      }
    }
  },

  /**
   * 电话号码验证
   */
   [ValidateTypes.ValidateTelephone]: (params: ValidateParams) => {
    const { value, success = function() {}, failed = function() {} } = params;
    if (!value) {
      failed({ value, message: "电话号码不能为空" });
    } else {
      const reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
      if (reg.test(value)) {
        success({ value,  message: "电话号码验证通过" });
      } else {
        failed({ value, message: "请输入正确的电话号码" });
      }
    }
  },

  /**
   * 验证码验证
   */
   [ValidateTypes.ValidateCode]: (params: ValidateParams) => {
    const { value, success = function() {}, failed = function() {} } = params;
    if (!value) {
      failed({ value, message: "验证码不能为空" });
    } else {
      const reg = /^\d{6}$/;
      if (reg.test(value)) {
        success({ value,  message: "验证码验证通过" });
      } else {
        failed({ value, message: "请输入正确的验证码" });
      }
    }
  },

  /**
   * 密码验证
   */
   [ValidateTypes.ValidatePassword]: (params: ValidateParams) => {
    const { value, success = function() {}, failed = function() {} } = params;
    if (!value) {
      failed({ value, message: "密码不能为空" });
    } else {
      const reg = /^.{6,18}$/;
      if (reg.test(value)) {
        success({ value,  message: "密码验证通过" });
      } else {
        failed({ value, message: "请输入正确的密码" });
      }
    }
  },

  /**
   * 身份证号码验证
   */
   [ValidateTypes.ValidateIdentityCard]: (params: ValidateParams) => {
    const { value, success = function() {}, failed = function() {} } = params;
    if (!value) {
      failed({ value, message: "身份证号码不能为空" });
    } else {
      const reg = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
      if (reg.test(value)) {
        success({ value,  message: "身份证号码验证通过" });
      } else {
        failed({ value, message: "请输入正确的身份证号码" });
      }
    }
  },

  /**
   * 邮箱验证
   */
   [ValidateTypes.ValidateEmail]: (params: ValidateParams) => {
    const { value, success = function() {}, failed = function() {} } = params;
    if (!value) {
      failed({ value, message: "邮箱不能为空" });
    } else {
      const reg = /(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/;
      if (reg.test(value)) {
        success({ value,  message: "邮箱验证通过" });
      } else {
        failed({ value, message: "请输入正确的邮箱" });
      }
    }
  },

  /**
   * 网址验证
   */
   [ValidateTypes.ValidateWebsite]: (params: ValidateParams) => {
    const { value, success = function() {}, failed = function() {} } = params;
    if (!value) {
      failed({ value, message: "网址不能为空" });
    } else {
      const reg = /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/;
      if (reg.test(value)) {
        success({ value,  message: "网址验证通过" });
      } else {
        failed({ value, message: "请输入正确的网址" });
      }
    }
  },

  /**
   * 统一社会信用代码验证
   */
   [ValidateTypes.ValidateCreditCode]: (params: ValidateParams) => {
    const { value, success = function() {}, failed = function() {} } = params;
    if (!value) {
      failed({ value, message: "统一社会信用代码不能为空" });
    } else {
      const reg = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
      if (reg.test(value)) {
        success({ value,  message: "统一社会信用代码验证通过" });
      } else {
        failed({ value, message: "请输入正确的统一社会信用代码" });
      }
    }
  },
};