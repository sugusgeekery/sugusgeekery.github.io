(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["QuestionView"],{"3e66":function(t,e,i){},"43b4":function(t,e,i){"use strict";var n=i("3e66"),a=i.n(n);a.a},"4bb5":function(t,e,i){"use strict";i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return o})),i.d(e,"b",(function(){return r})),i.d(e,"d",(function(){return u}));var n=i("2fe1"),a=i("2f62"),s=l("computed",a["e"]),c=l("computed",a["c"]),o=l("methods",a["b"]),r=l("methods",a["d"]);function u(t,e){function i(e){function i(i,n){if("string"===typeof n){var a=n,s=i;return e(a,{namespace:t})(s,a)}var c=i,o=f(n||{},{namespace:t});return e(c,o)}return i}return e?(console.warn("[vuex-class] passing the 2nd argument to `namespace` function is deprecated. pass only namespace string instead."),i(e)):{State:i(s),Getter:i(c),Mutation:i(r),Action:i(o)}}function l(t,e){function i(i,a){return Object(n["a"])((function(n,s){n[t]||(n[t]={});var c,o=(c={},c[s]=i,c);n[t][s]=void 0!==a?e(a,o)[s]:e(o)[s]}))}function a(t,e){if("string"===typeof e){var n=e,a=t;return i(n,void 0)(a,n)}var s=d(e),c=t;return i(c,s)}return a}function d(t){var e=t&&t.namespace;if("string"===typeof e)return"/"!==e[e.length-1]?e+"/":e}function f(t,e){var i={};return[t,e].forEach((function(t){Object.keys(t).forEach((function(e){i[e]=t[e]}))})),i}},"4df6":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"process"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item"},[i("div",{staticClass:"item-label"},[i("div",{staticClass:"item-label-top"}),i("div",{staticClass:"item-label-circle"}),i("div",{staticClass:"item-label-bottom"})]),i("div",{staticClass:"item-content"},[i("div",{staticClass:"item-content-text"},[t._v("20201112")]),i("div",{staticClass:"item-content-title"},[t._v("备料")])]),i("div",{staticClass:"item-buttons"},[i("div",{staticClass:"item-button item-button-blue"},[t._v("上传照片")]),i("div",{staticClass:"item-button"},[t._v("完成")])]),i("div",{staticClass:"item-images"},[i("div",{staticClass:"item-image"},[i("img",{staticClass:"item-image-icon",attrs:{src:"",alt:""}})])])])])])}],s=i("d4ec"),c=i("bee2"),o=i("262e"),r=i("2caf"),u=i("9ab4"),l=i("60a3"),d=i("4bb5"),f=i("5d99"),v=i("5583"),m=i("2de2"),p=Object(d["d"])("order/process"),b=p.State,h=(p.Getter,p.Action),C=(p.Mutation,function(t){Object(o["a"])(i,t);var e=Object(r["a"])(i);function i(){var t;return Object(s["a"])(this,i),t=e.apply(this,arguments),t.Supplier=f["a"],t.BASE_IMAGE_URL=m["c"],t.index=-1,t}return Object(c["a"])(i,[{key:"created",value:function(){}},{key:"mounted",value:function(){}},{key:"selectFile",value:function(t){this.index=t;var e=document.querySelector("#fileElement");e.click()}},{key:"uploadFile",value:function(t){var e=t.target.files,i=e.length;while(i>0)this.uploadForm({file:e[e.length-i],index:this.index}),i--}}]),i}(l["b"]));Object(u["a"])([b("initOption")],C.prototype,"initOption",void 0),Object(u["a"])([b("stepList")],C.prototype,"stepList",void 0),Object(u["a"])([h(v["a"].UploadForm)],C.prototype,"uploadForm",void 0),C=Object(u["a"])([Object(l["a"])({name:"QuestionView",components:{}})],C);var O=C,g=O,y=(i("43b4"),i("2877")),j=Object(y["a"])(g,n,a,!1,null,"51133f7b",null);e["default"]=j.exports}}]);