// 验证规则导出类型
export interface ValidateParams {
  value: string;
  success?: ValidateSuccess;
  failed?: ValidateFailed;
}
// 验证成功返回函数
export interface ValidateSuccess {
  (validateSuccessParams: ValidateSuccessParams): void;
}
// 验证成功返回函数参数
export interface ValidateSuccessParams {
  value: string;
  message?: string;
}
// 验证失败返回函数
export interface ValidateFailed {
  (validateFailedParams: ValidateFailedParams): void;
}
// 验证失败返回函数参数
export interface ValidateFailedParams {
  message: string;
}

// 验证方法名
export enum ValidateTypes {
  ValidatePhone = "ValidatePhone",
  ValidateCode = "ValidateCode",
  ValidatePassword = "ValidatePassword",
  ValidateNumber = "ValidateNumber",
  ValidateNotEmptyValue = "ValidateNotEmptyValue",
  ValidateNotEmptyImage = "ValidateNotEmptyImage",
  ValidateIdentityCard = "ValidateIdentityCard",
  ValidateEmail = "ValidateEmail"
}

export default {
  /**
   * 手机号验证
   */
  [ValidateTypes.ValidatePhone]: (params: ValidateParams) => {
    const { value, success = function() {}, failed = function() {} } = params;
    if (!value) {
      failed({ message: "手机号不能为空" });
    } else {
      const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      if (reg.test(value)) {
        success({ value });
      } else {
        failed({ message: "请输入正确的手机号" });
      }
    }
  },

  /**
   * 验证码验证
   */
  [ValidateTypes.ValidateCode]: (params: ValidateParams) => {
    const { value, success = function() {}, failed = function() {} } = params;
    if (!value) {
      failed({ message: "验证码不能为空" });
    } else {
      const reg = /^\d{6}$/;
      if (reg.test(value)) {
        success({ value });
      } else {
        failed({ message: "请输入正确的验证码" });
      }
    }
  },

  /**
   * 登录密码
   */
  [ValidateTypes.ValidatePassword]: (params: ValidateParams) => {
    const { value, success = function() {}, failed = function() {} } = params;
    if (!value) {
      failed({ message: "密码不能为空" });
    } else {
      const reg = /^.{6,18}$/;
      if (reg.test(value)) {
        success({ value });
      } else {
        failed({ message: "密码是有6到20字符组成" });
      }
    }
  },

  /**
   * 数字
   */
  [ValidateTypes.ValidateNumber]: (params: ValidateParams) => {
    const { value, success = function() {}, failed = function() {} } = params;
    if (!value) {
      failed({ message: "值不能为空" });
    } else {
      const reg = /^\d+$/;
      if (reg.test(value)) {
        success({ value });
      } else {
        failed({ message: "只能输入数字" });
      }
    }
  },

  /**
   * 字段不为空
   */
  [ValidateTypes.ValidateNotEmptyValue]: (params: ValidateParams) => {
    const { value, success = function() {}, failed = function() {} } = params;
    if (!value) {
      failed({ message: "不能为空" });
    } else {
      success({ value });
    }
  },

  /**
   * 图片不为空
   */
  [ValidateTypes.ValidateNotEmptyImage]: (params: ValidateParams) => {
    const { value, success = function() {}, failed = function() {} } = params;
    if (!value) {
      failed({ message: "图片不能为空" });
    } else {
      success({ value });
    }
  },

  /**
   * 身份证号码验证
   */
  [ValidateTypes.ValidateIdentityCard]: (params: ValidateParams) => {
    const { value, success = function() {}, failed = function() {} } = params;
    if (!value) {
      failed({ message: "身份证号码不能为空" });
    } else {
      const regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (regIdNo.test(value)) {
        success({ value });
      } else {
        failed({ message: "身份证号码不能为空" });
      }
    }
  },

  /**
   *邮箱验证
   */
  [ValidateTypes.ValidateEmail]: (params: ValidateParams) => {
    const { value, success = function() {}, failed = function() {} } = params;
    if (!value) {
      failed({ message: "邮箱不能为空" });
    } else {
      const regIdNo = /(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/;
      if (regIdNo.test(value)) {
        success({ value });
      } else {
        failed({ message: "请输入正确的邮箱" });
      }
    }
  }
};