(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["InformationView"],{"173a":function(e,t,a){"use strict";var i=a("d972"),s=a.n(i);s.a},"2aa3":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"context"},[i("div",{staticClass:"context-title"},[e._v("资料信息")]),i("div",{staticClass:"context-body"},[i("div",{staticClass:"list"},[i("div",{staticClass:"nav"},[i("div",{staticClass:"nav-label"},[e._v("账号类型：")]),e.defInfo.type?i("div",{staticClass:"nav-text"},[i("span",{staticClass:"nav-text-gray"},[e._v(e._s(e.defInfo.typeStr||"无"))]),i("span",{staticClass:"nav-text-blue",on:{click:function(t){return e.updateDefInfo({type:0})}}},[e._v("（修改）")])]):e._e(),e.defInfo.type?e._e():i("div",{staticClass:"nav-items"},[i("Selection",{attrs:{type:"题型",label:"选择题型",list:e.defInfo.typeList,name:"text"},on:{updateindex:e.updateIndex}})],1),e.defInfo.type?e._e():i("div",{staticClass:"nav-buttons"},[i("div",{staticClass:"nav-button nav-button-blue",on:{click:function(t){return e.changeSupplierType()}}},[e._v(" 确定 ")])])]),i("div",{staticClass:"form"},[i("div",{staticClass:"form-flex"},[i("div",{staticClass:"form-title"},[e._v("基本信息")]),i("div",{staticClass:"form-items"},[i("div",{staticClass:"form-item"},[i("input",{attrs:{type:"file",name:"",hidden:"hidden",id:"headiconFile"},on:{change:e.uploadFile}}),i("div",{staticClass:"form-item-head",on:{click:function(t){return e.selectFile()}}},[e.userInfo.headImgUrl?i("img",{staticClass:"form-item-head-icon",attrs:{src:e.userInfo.headImgUrl,alt:""}}):i("img",{staticClass:"form-item-head-icon",attrs:{src:a("80bc"),alt:""}}),i("div",{staticClass:"form-item-head-text form-item-head-text-blue"},[e._v(" 上传头像 ")])])]),i("div",{staticClass:"form-item"},[e._m(0),i("div",{staticClass:"form-item-input"},[i("input",{attrs:{type:"text",placeholder:"请输入真实姓名"},domProps:{value:e.userInfo.userName},on:{change:function(t){return e.changeUserInfoInput(t.target.value,"userName")}}})])]),i("div",{staticClass:"form-item"},[e._m(1),i("div",{staticClass:"form-item-radios"},e._l(e.userInfo.sexList,(function(t,a){return i("div",{directives:[{name:"show",rawName:"v-show",value:a,expression:"b"}],key:a,staticClass:"form-item-radio",on:{click:function(t){return e.changeUserInfoInput(a,"sex")}}},[i("div",{staticClass:"form-item-radio-label",class:{"form-item-radio-label-active":a===e.userInfo.sex}}),i("div",{staticClass:"form-item-radio-text"},[e._v(e._s(t))])])})),0)]),i("div",{staticClass:"form-item"},[e._m(2),i("div",{staticClass:"form-item-input"},[i("input",{attrs:{type:"text",placeholder:"请输入手机号码"},domProps:{value:e.userInfo.phoneNo},on:{change:function(t){return e.changeUserInfoInput(t.target.value,"phoneNo")}}})])]),i("div",{staticClass:"form-item"},[e._m(3),i("div",{staticClass:"form-item-input"},[i("input",{attrs:{type:"text",placeholder:"请输入电话号码"},domProps:{value:e.userInfo.telephoneNo},on:{change:function(t){return e.changeUserInfoInput(t.target.value,"telephoneNo")}}})])]),i("div",{staticClass:"form-item"},[e._m(4),i("div",{staticClass:"form-item-input"},[i("input",{attrs:{type:"text",placeholder:"请输入邮箱"},domProps:{value:e.userInfo.email},on:{change:function(t){return e.changeUserInfoInput(t.target.value,"email")}}})])])])]),1===e.defInfo.type?i("div",{staticClass:"form-flex"},[i("div",{staticClass:"form-title"},[e._v("公司信息")]),i("div",{staticClass:"form-items"},[i("div",{staticClass:"form-item"},[e._m(5),i("div",{staticClass:"form-item-input"},[i("input",{attrs:{type:"text",placeholder:"请输入公司名称"},domProps:{value:e.companyInfo.companyName},on:{change:function(t){return e.changeCompanyInfoInput(t.target.value,"companyName")}}})])]),i("div",{staticClass:"form-item"},[e._m(6),i("div",{staticClass:"form-item-picker"},[i("el-select",{staticClass:"form-item-picker-date",attrs:{value:e.companyInfo.staffSize,placeholder:"请选择公司人数"},on:{input:function(t){return e.changeCompanyInfoInput(t,"staffSize")}}},e._l(e.companyInfo.staffsizeList,(function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)]),i("div",{staticClass:"form-item"},[e._m(7),i("div",{staticClass:"form-item-picker"},[i("el-date-picker",{staticClass:"form-item-picker-date",attrs:{"prefix-icon":"",value:e.companyInfo.publishTime,type:"date",placeholder:"选择日期"},on:{input:e.updateDate}})],1)]),i("div",{staticClass:"form-item"},[e._m(8),i("div",{staticClass:"form-item-input"},[i("input",{attrs:{type:"text",placeholder:"请输入公司电话"},domProps:{value:e.companyInfo.companyPhoneNo},on:{change:function(t){return e.changeCompanyInfoInput(t.target.value,"companyPhoneNo")}}})])]),i("div",{staticClass:"form-item"},[e._m(9),i("div",{staticClass:"form-item-picker"},[i("el-cascader",{staticClass:"form-item-picker-date",attrs:{clearable:!0,filterable:!0,placeholder:"请选择省市区",value:[e.companyInfo.provinceId||"",e.companyInfo.cityId||"",e.companyInfo.districtId||""],options:e.provinceCityDistrict,props:{expandTrigger:"click"}},on:{change:e.updateProvinceCityDistrict}})],1)]),i("div",{staticClass:"form-item"},[i("div",{staticClass:"form-item-label"}),i("div",{staticClass:"form-item-input"},[i("input",{attrs:{type:"text",placeholder:"请输入详细地址"},domProps:{value:e.companyInfo.address},on:{change:function(t){return e.changeCompanyInfoInput(t.target.value,"address")}}})])]),i("div",{staticClass:"form-item"},[e._m(10),i("div",{staticClass:"form-item-input"},[i("input",{attrs:{type:"text",placeholder:"请输入公司官网"},domProps:{value:e.companyInfo.officialWebsite},on:{change:function(t){return e.changeCompanyInfoInput(t.target.value,"officialWebsite")}}})])]),i("div",{staticClass:"form-item"},[e._m(11),i("div",{staticClass:"form-item-input"},[i("textarea",{attrs:{type:"text",placeholder:"请输入公司详情"},domProps:{value:e.companyInfo.description},on:{change:function(t){return e.changeCompanyInfoInput(t.target.value,"description")}}})])])])]):i("div",{staticClass:"form-flex"})]),i("div",{staticClass:"buttons"},[i("div",{staticClass:"button button-blue",on:{click:function(t){return e.submitForm()}}},[e._v("保存")])])])])])},s=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-item-label"},[a("span",{staticClass:"form-item-label-red"},[e._v("*")]),a("span",{staticClass:"form-item-label-gray"},[e._v("真实姓名")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-item-label"},[a("span",{staticClass:"form-item-label-gray"},[e._v("性别")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-item-label"},[a("span",{staticClass:"form-item-label-red"},[e._v("*")]),a("span",{staticClass:"form-item-label-gray"},[e._v("手机")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-item-label"},[a("span",{staticClass:"form-item-label-gray"},[e._v("电话")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-item-label"},[a("span",{staticClass:"form-item-label-gray"},[e._v("邮箱")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-item-label"},[a("span",{staticClass:"form-item-label-red"},[e._v("*")]),a("span",{staticClass:"form-item-label-gray"},[e._v("公司名称")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-item-label"},[a("span",{staticClass:"form-item-label-red"},[e._v("*")]),a("span",{staticClass:"form-item-label-gray"},[e._v("公司人数")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-item-label"},[a("span",{staticClass:"form-item-label-red"},[e._v("*")]),a("span",{staticClass:"form-item-label-gray"},[e._v("成立时间")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-item-label"},[a("span",{staticClass:"form-item-label-red"},[e._v("*")]),a("span",{staticClass:"form-item-label-gray"},[e._v("公司电话")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-item-label"},[a("span",{staticClass:"form-item-label-red"},[e._v("*")]),a("span",{staticClass:"form-item-label-gray"},[e._v("公司地址")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-item-label"},[a("span",{staticClass:"form-item-label-gray"},[e._v("公司官网")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-item-label"},[a("span",{staticClass:"form-item-label-red"},[e._v("*")]),a("span",{staticClass:"form-item-label-gray"},[e._v("公司详情")])])}],n=(a("d3b7"),a("ddb0"),a("ade3")),o=a("3835"),c=a("b85c"),r=a("d4ec"),l=a("bee2"),u=a("262e"),f=a("2caf"),d=a("9ab4"),v=a("60a3"),m=a("4bb5"),p=a("8f97"),b=a("e3dd"),y=a("2de2"),C=a("6ddb"),h=a("75fb"),I=a("5c96"),g=a("54c5"),_=Object(m["d"])("account"),O=_.State,j=(_.Getter,_.Action),x=_.Mutation,k=function(e){Object(u["a"])(a,e);var t=Object(f["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.BASE_IMAGE_URL=y["c"],e}return Object(l["a"])(a,[{key:"updateIndex",value:function(e){var t,a=this.defInfo||{},i=a.typeList,s=void 0===i?[]:i,n=Object(c["a"])(s.entries());try{for(n.s();!(t=n.n()).done;){var r=Object(o["a"])(t.value,2),l=r[0];r[1];s[l].isSelected=e===l}}catch(u){n.e(u)}finally{n.f()}this.updateDefInfo({typeList:s})}},{key:"selectFile",value:function(){var e=document.querySelector("#headiconFile");e.click()}},{key:"uploadFile",value:function(e){var t=this,a=e.target.files,i=a.length;while(i>0)this.uploadForm({file:a[a.length-i]}).then((function(e){var a=e||{},i=a.fileThumPath;t.updateUserInfo({headImgUrl:i})})),i--}},{key:"changeUserInfoInput",value:function(e,t){var a=this;"phoneNo"===t?h["b"][h["a"].ValidatePhone]({value:e,success:function(e){var i=e.value;a.updateUserInfo(Object(n["a"])({},t,i))},failed:function(e){var i=e.value,s=e.message;i&&(I["Message"].error(s),a.updateUserInfo(Object(n["a"])({},t,"")))}}):"telephoneNo"===t?h["b"][h["a"].ValidateTelephone]({value:e,success:function(e){var i=e.value;a.updateUserInfo(Object(n["a"])({},t,i))},failed:function(e){var i=e.value,s=e.message;i&&(I["Message"].error(s),a.updateUserInfo(Object(n["a"])({},t,"")))}}):"email"===t?h["b"][h["a"].ValidateEmail]({value:e,success:function(e){var i=e.value;a.updateUserInfo(Object(n["a"])({},t,i))},failed:function(e){var i=e.value,s=e.message;i&&(I["Message"].error(s),a.updateUserInfo(Object(n["a"])({},t,"")))}}):this.updateUserInfo(Object(n["a"])({},t,e))}},{key:"changeCompanyInfoInput",value:function(e,t){var a=this;"companyPhoneNo"===t?h["b"][h["a"].ValidateTelephone]({value:e,success:function(e){var i=e.value;a.updateCompanyInfo(Object(n["a"])({},t,i))},failed:function(e){var i=e.value,s=e.message;i&&(I["Message"].error(s),a.updateCompanyInfo(Object(n["a"])({},t,"")))}}):"officialWebsite"===t?h["b"][h["a"].ValidateWebsite]({value:e,success:function(e){var i=e.value;a.updateCompanyInfo(Object(n["a"])({},t,i))},failed:function(e){var i=e.value,s=e.message;i&&(I["Message"].error(s),a.updateCompanyInfo(Object(n["a"])({},t,"")))}}):this.updateCompanyInfo(Object(n["a"])({},t,e))}},{key:"updateDate",value:function(e){this.changeCompanyInfoInput(Object(C["a"])({date:e,formatType:"yyyy-mm-dd"}),"publishTime")}},{key:"updateProvinceCityDistrict",value:function(e){var t=this.provinceCityDistrict,a=void 0===t?[]:t,i=function(e,t){var a,i=[],s=Object(c["a"])(e.entries());try{for(s.s();!(a=s.n()).done;){var n=Object(o["a"])(a.value,2),r=(n[0],n[1]),l=r.value,u=r.label,f=r.children,d=void 0===f?[]:f;if(d.length&&l===t[0]){i.push(u);var v,m=Object(c["a"])(d.entries());try{for(m.s();!(v=m.n()).done;){var p=Object(o["a"])(v.value,2),b=(p[0],p[1]),y=b.value,C=b.label,h=b.children,I=void 0===h?[]:h;if(I.length&&y===t[1]){i.push(C);var g,_=Object(c["a"])(I.entries());try{for(_.s();!(g=_.n()).done;){var O=Object(o["a"])(g.value,2),j=(O[0],O[1]),x=j.value,k=j.label;if(x===t[2])return i.push(k),i}}catch(V){_.e(V)}finally{_.f()}}}}catch(V){m.e(V)}finally{m.f()}}}}catch(V){s.e(V)}finally{s.f()}}(a,e);this.updateCompanyInfo({provinceId:e[0],cityId:e[1],districtId:e[2],provinceName:i[0],cityName:i[1],districtName:i[2]})}},{key:"submitForm",value:function(){this.saveUserInfo()}},{key:"created",value:function(){this.getInformationDefInfo()}},{key:"mounted",value:function(){var e=this,t=this.defInfo||{},a=t.loginInfo,i=a||{},s=i.isFirstExist;s&&Object(I["MessageBox"])({message:"恭喜您，账号注册成功！请完善信息并提交资质认证。审核通过后就可以开始接单了。",title:"提示",confirmButtonText:"确定",cancelButtonText:"取消",showClose:!1,closeOnClickModal:!1,closeOnPressEscape:!1,center:!0,roundButton:!1,showConfirmButton:!0,showCancelButton:!1}).then((function(t){"confirm"===t&&e.updateDefLoginInfo()})).catch((function(){}))}}]),a}(v["d"]);Object(d["a"])([O("defInfo")],k.prototype,"defInfo",void 0),Object(d["a"])([O("provinceCityDistrict")],k.prototype,"provinceCityDistrict",void 0),Object(d["a"])([O("userInfo")],k.prototype,"userInfo",void 0),Object(d["a"])([O("companyInfo")],k.prototype,"companyInfo",void 0),Object(d["a"])([j(p["a"].GetInformationDefInfo)],k.prototype,"getInformationDefInfo",void 0),Object(d["a"])([j(p["a"].UpdateDefLoginInfo)],k.prototype,"updateDefLoginInfo",void 0),Object(d["a"])([j(p["a"].UploadForm)],k.prototype,"uploadForm",void 0),Object(d["a"])([j(p["a"].ChangeSupplierType)],k.prototype,"changeSupplierType",void 0),Object(d["a"])([j(p["a"].SaveUserInfo)],k.prototype,"saveUserInfo",void 0),Object(d["a"])([j(p["a"].SaveCompanyInfo)],k.prototype,"saveCompanyInfo",void 0),Object(d["a"])([x(b["a"].UpdateDefInfo)],k.prototype,"updateDefInfo",void 0),Object(d["a"])([x(b["a"].UpdateUserInfo)],k.prototype,"updateUserInfo",void 0),Object(d["a"])([x(b["a"].UpdateCompanyInfo)],k.prototype,"updateCompanyInfo",void 0),k=Object(d["a"])([Object(v["a"])({name:"InformationView",components:{Selection:g["a"]}})],k);var V=k,U=V,w=(a("173a"),a("2877")),P=Object(w["a"])(U,i,s,!1,null,"31ed9489",null);t["default"]=P.exports},"4bb5":function(e,t,a){"use strict";a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return c})),a.d(t,"b",(function(){return r})),a.d(t,"d",(function(){return l}));var i=a("2fe1"),s=a("2f62"),n=u("computed",s["e"]),o=u("computed",s["c"]),c=u("methods",s["b"]),r=u("methods",s["d"]);function l(e,t){function a(t){function a(a,i){if("string"===typeof i){var s=i,n=a;return t(s,{namespace:e})(n,s)}var o=a,c=d(i||{},{namespace:e});return t(o,c)}return a}return t?(console.warn("[vuex-class] passing the 2nd argument to `namespace` function is deprecated. pass only namespace string instead."),a(t)):{State:a(n),Getter:a(o),Mutation:a(r),Action:a(c)}}function u(e,t){function a(a,s){return Object(i["a"])((function(i,n){i[e]||(i[e]={});var o,c=(o={},o[n]=a,o);i[e][n]=void 0!==s?t(s,c)[n]:t(c)[n]}))}function s(e,t){if("string"===typeof t){var i=t,s=e;return a(i,void 0)(s,i)}var n=f(t),o=e;return a(o,n)}return s}function f(e){var t=e&&e.namespace;if("string"===typeof t)return"/"!==t[t.length-1]?t+"/":t}function d(e,t){var a={};return[e,t].forEach((function(e){Object.keys(e).forEach((function(t){a[t]=e[t]}))})),a}},"54c5":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{key:e.type+"_"+e.label,staticClass:"selection-container"},[a("div",{staticClass:"selection-list"},e._l(e.list,(function(t,i){return a("div",{key:e.type+"_"+e.label+"_"+i,staticClass:"selection-li",class:{"selection-li-active":t.isSelected},on:{click:function(t){return e.updateIndex(i)}}},[e._v(" "+e._s(t[e.name||"text"]||"全部")+" "),t.isSelected?a("div",{staticClass:"selection-li-line"}):e._e(),t.isSelected?a("div",{staticClass:"selection-li-line1"}):e._e(),t.isSelected?a("div",{staticClass:"selection-li-line2"}):e._e()])})),0)])},s=[],n=a("d4ec"),o=a("bee2"),c=a("262e"),r=a("2caf"),l=a("9ab4"),u=a("60a3"),f=function(e){Object(c["a"])(a,e);var t=Object(r["a"])(a);function a(){return Object(n["a"])(this,a),t.apply(this,arguments)}return Object(o["a"])(a,[{key:"updateIndex",value:function(e){return e}}]),a}(u["d"]);Object(l["a"])([Object(u["c"])(String)],f.prototype,"type",void 0),Object(l["a"])([Object(u["c"])(String)],f.prototype,"label",void 0),Object(l["a"])([Object(u["c"])(Array)],f.prototype,"list",void 0),Object(l["a"])([Object(u["c"])(String)],f.prototype,"name",void 0),Object(l["a"])([Object(u["b"])("updateindex")],f.prototype,"updateIndex",null),f=Object(l["a"])([Object(u["a"])({name:"SelectionMultiple"})],f);var d=f,v=d,m=(a("632d"),a("2877")),p=Object(m["a"])(v,i,s,!1,null,"25d55b10",null);t["a"]=p.exports},"632d":function(e,t,a){"use strict";var i=a("ca0d"),s=a.n(i);s.a},"75fb":function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var i,s,n=a("ade3");(function(e){e["ValidatePhone"]="ValidatePhone",e["ValidateTelephone"]="ValidateTelephone",e["ValidateCode"]="ValidateCode",e["ValidatePassword"]="ValidatePassword",e["ValidateIdentityCard"]="ValidateIdentityCard",e["ValidateEmail"]="ValidateEmail",e["ValidateWebsite"]="ValidateWebsite",e["ValidateCreditCode"]="ValidateCreditCode"})(s||(s={})),t["b"]=(i={},Object(n["a"])(i,s.ValidatePhone,(function(e){var t=e.value,a=e.success,i=void 0===a?function(){}:a,s=e.failed,n=void 0===s?function(){}:s;if(t){var o=/^1[3|4|5|6|7|8|9][0-9]\d{8}$/;o.test(t)?i({value:t,message:"手机号码验证通过"}):n({value:t,message:"请输入正确的手机号码"})}else n({value:t,message:"手机号码不能为空"})})),Object(n["a"])(i,s.ValidateTelephone,(function(e){var t=e.value,a=e.success,i=void 0===a?function(){}:a,s=e.failed,n=void 0===s?function(){}:s;if(t){var o=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;o.test(t)?i({value:t,message:"电话号码验证通过"}):n({value:t,message:"请输入正确的电话号码"})}else n({value:t,message:"电话号码不能为空"})})),Object(n["a"])(i,s.ValidateCode,(function(e){var t=e.value,a=e.success,i=void 0===a?function(){}:a,s=e.failed,n=void 0===s?function(){}:s;if(t){var o=/^\d{6}$/;o.test(t)?i({value:t,message:"验证码验证通过"}):n({value:t,message:"请输入正确的验证码"})}else n({value:t,message:"验证码不能为空"})})),Object(n["a"])(i,s.ValidatePassword,(function(e){var t=e.value,a=e.success,i=void 0===a?function(){}:a,s=e.failed,n=void 0===s?function(){}:s;if(t){var o=/^.{6,18}$/;o.test(t)?i({value:t,message:"密码验证通过"}):n({value:t,message:"请输入正确的密码"})}else n({value:t,message:"密码不能为空"})})),Object(n["a"])(i,s.ValidateIdentityCard,(function(e){var t=e.value,a=e.success,i=void 0===a?function(){}:a,s=e.failed,n=void 0===s?function(){}:s;if(t){var o=/^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;o.test(t)?i({value:t,message:"身份证号码验证通过"}):n({value:t,message:"请输入正确的身份证号码"})}else n({value:t,message:"身份证号码不能为空"})})),Object(n["a"])(i,s.ValidateEmail,(function(e){var t=e.value,a=e.success,i=void 0===a?function(){}:a,s=e.failed,n=void 0===s?function(){}:s;if(t){var o=/(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/;o.test(t)?i({value:t,message:"邮箱验证通过"}):n({value:t,message:"请输入正确的邮箱"})}else n({value:t,message:"邮箱不能为空"})})),Object(n["a"])(i,s.ValidateWebsite,(function(e){var t=e.value,a=e.success,i=void 0===a?function(){}:a,s=e.failed,n=void 0===s?function(){}:s;if(t){var o=/^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/;o.test(t)?i({value:t,message:"网址验证通过"}):n({value:t,message:"请输入正确的网址"})}else n({value:t,message:"网址不能为空"})})),Object(n["a"])(i,s.ValidateCreditCode,(function(e){var t=e.value,a=e.success,i=void 0===a?function(){}:a,s=e.failed,n=void 0===s?function(){}:s;if(t){var o=/^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;o.test(t)?i({value:t,message:"统一社会信用代码验证通过"}):n({value:t,message:"请输入正确的统一社会信用代码"})}else n({value:t,message:"统一社会信用代码不能为空"})})),i)},"80bc":function(e,t,a){e.exports=a.p+"img/headicon.c75bcf6d.png"},ca0d:function(e,t,a){},d972:function(e,t,a){}}]);