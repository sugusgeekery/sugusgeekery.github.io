(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["OrderHome"],{"2f7b":function(t,e,a){"use strict";var s=a("5d3e"),i=a.n(s);i.a},"4bb5":function(t,e,a){"use strict";a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return l})),a.d(e,"d",(function(){return o}));var s=a("2fe1"),i=a("2f62"),r=d("computed",i["e"]),c=d("computed",i["c"]),n=d("methods",i["b"]),l=d("methods",i["d"]);function o(t,e){function a(e){function a(a,s){if("string"===typeof s){var i=s,r=a;return e(i,{namespace:t})(r,i)}var c=a,n=v(s||{},{namespace:t});return e(c,n)}return a}return e?(console.warn("[vuex-class] passing the 2nd argument to `namespace` function is deprecated. pass only namespace string instead."),a(e)):{State:a(r),Getter:a(c),Mutation:a(l),Action:a(n)}}function d(t,e){function a(a,i){return Object(s["a"])((function(s,r){s[t]||(s[t]={});var c,n=(c={},c[r]=a,c);s[t][r]=void 0!==i?e(i,n)[r]:e(n)[r]}))}function i(t,e){if("string"===typeof e){var s=e,i=t;return a(s,void 0)(i,s)}var r=u(e),c=t;return a(c,r)}return i}function u(t){var e=t&&t.namespace;if("string"===typeof e)return"/"!==e[e.length-1]?e+"/":e}function v(t,e){var a={};return[t,e].forEach((function(t){Object.keys(t).forEach((function(e){a[e]=t[e]}))})),a}},"5d3e":function(t,e,a){},b565:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"context"},[a("div",{staticClass:"context-title"},[t._v("订单中心")]),a("div",{staticClass:"context-body"},[a("div",{staticClass:"list"},[a("div",{staticClass:"list-header"},[a("div",{staticClass:"filter-items"},[a("div",{staticClass:"filter-item"},[a("div",{staticClass:"filter-item-content"},[a("el-select",{attrs:{value:t.order.projectList[t.order.projectIndex].text,placeholder:"请选择项目类型"},on:{change:function(e){return t.updateProjectIndex(Number(e))}}},t._l(t.order.projectList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.text,value:String(e)}})})),1)],1)]),a("div",{staticClass:"filter-item"},[a("div",{staticClass:"filter-item-content"},[a("el-select",{attrs:{value:t.order.statusList[t.order.statusIndex].text,placeholder:"请选择状态"},on:{change:function(e){return t.updateStatusIndex(Number(e))}}},t._l(t.order.statusList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.text,value:String(e)}})})),1)],1)]),a("div",{staticClass:"filter-item"},[a("div",{staticClass:"filter-item-content"},[a("el-input",{attrs:{value:t.order.mouldNo,placeholder:"请搜索你想要的订单"},on:{input:function(e){return t.updateOrderNo(e)}}})],1)])])]),a("div",{staticClass:"list-body"},[a("div",{staticClass:"cells"},[t._m(0),t._l(t.order.list,(function(e,s){return a("div",{key:e.id+"_订单_"+s,staticClass:"cell"},[a("div",{staticClass:"cell-text"},[t._v(t._s(e.id||""))]),a("div",{staticClass:"cell-text"},[t._v(t._s(e.mouldNo||""))]),a("div",{staticClass:"cell-text"},[t._v(t._s(e.mouldNo||""))]),a("div",{staticClass:"cell-text"},[t._v(t._s(e.statusDesc||""))]),a("div",{staticClass:"cell-text"},[t._v(t._s(e.mouldNo||""))]),a("div",{staticClass:"cell-text"},[t._v(t._s(e.mouldNo||""))]),a("div",{staticClass:"cell-text"},[t._v(t._s(e.mouldNo||""))]),a("div",{staticClass:"cell-text"},[t._v(t._s(e.typeDesc||""))]),a("div",{staticClass:"cell-button cell-button-blue",on:{click:function(e){return t.getOrderDetail(s)}}},[t._v(" 详情 ")])])}))],2)]),a("div",{staticClass:"list-footer"},[a("el-pagination",{attrs:{"current-page":t.order.pageNo,"page-sizes":t.order.pageSizes,"page-size":t.order.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.order.total},on:{"size-change":t.updatePageSize,"current-change":t.updatePageNum}})],1)]),a("div",{staticClass:"tip"},[a("div",{staticClass:"tip-title"},[t._v("我的竞价指标")]),a("div",{staticClass:"tip-text"},[t._v("交期准时率:："+t._s(t.advantage.accuracy||0)+"%")]),a("div",{staticClass:"tip-text"},[t._v("交付失误率："+t._s(t.advantage.anerror||0)+"%")])])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cell cell-gray"},[a("div",{staticClass:"cell-text"},[t._v("订单编号")]),a("div",{staticClass:"cell-text"},[t._v("模具编号")]),a("div",{staticClass:"cell-text"},[t._v("项目内容")]),a("div",{staticClass:"cell-text"},[t._v("状态")]),a("div",{staticClass:"cell-text"},[t._v("模具进展")]),a("div",{staticClass:"cell-text"},[t._v("交期")]),a("div",{staticClass:"cell-text"},[t._v("交付倒计时")]),a("div",{staticClass:"cell-text"},[t._v("订单金额")]),a("div",{staticClass:"cell-text"},[t._v("操作")])])}],r=a("d4ec"),c=a("bee2"),n=a("262e"),l=a("2caf"),o=a("9ab4"),d=a("60a3"),u=a("4bb5"),v=a("5db1"),p=Object(u["d"])("order"),f=p.State,b=(p.Getter,p.Action),_=(p.Mutation,function(t){Object(n["a"])(a,t);var e=Object(l["a"])(a);function a(){return Object(r["a"])(this,a),e.apply(this,arguments)}return Object(c["a"])(a,[{key:"created",value:function(){this.getMyBidAdvantage(),this.updatePageNum(1)}}]),a}(d["b"]));Object(o["a"])([f("advantage")],_.prototype,"advantage",void 0),Object(o["a"])([f("order")],_.prototype,"order",void 0),Object(o["a"])([b(v["a"].GetMyBidAdvantage)],_.prototype,"getMyBidAdvantage",void 0),Object(o["a"])([b(v["a"].UpdatePageNum)],_.prototype,"updatePageNum",void 0),Object(o["a"])([b(v["a"].UpdatePageSize)],_.prototype,"updatePageSize",void 0),Object(o["a"])([b(v["a"].UpdateProjectIndex)],_.prototype,"updateProjectIndex",void 0),Object(o["a"])([b(v["a"].UpdateStatusIndex)],_.prototype,"updateStatusIndex",void 0),Object(o["a"])([b(v["a"].UpdateOrderNo)],_.prototype,"updateOrderNo",void 0),Object(o["a"])([b(v["a"].GetOrderDetail)],_.prototype,"getOrderDetail",void 0),_=Object(o["a"])([Object(d["a"])({name:"OrderHome",components:{}})],_);var g=_,C=g,m=(a("2f7b"),a("2877")),x=Object(m["a"])(C,s,i,!1,null,"2d38f502",null);e["default"]=x.exports}}]);