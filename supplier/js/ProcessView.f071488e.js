(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ProcessView"],{2909:function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));var s=i("6b75");function a(t){if(Array.isArray(t))return Object(s["a"])(t)}i("a4d3"),i("e01a"),i("d28b"),i("a630"),i("d3b7"),i("3ca3"),i("ddb0");function n(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}var c=i("06c5");function l(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(t){return a(t)||n(t)||Object(c["a"])(t)||l()}},"4bb5":function(t,e,i){"use strict";i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return l})),i.d(e,"b",(function(){return o})),i.d(e,"d",(function(){return r}));var s=i("2fe1"),a=i("2f62"),n=d("computed",a["e"]),c=d("computed",a["c"]),l=d("methods",a["b"]),o=d("methods",a["d"]);function r(t,e){function i(e){function i(i,s){if("string"===typeof s){var a=s,n=i;return e(a,{namespace:t})(n,a)}var c=i,l=u(s||{},{namespace:t});return e(c,l)}return i}return e?(console.warn("[vuex-class] passing the 2nd argument to `namespace` function is deprecated. pass only namespace string instead."),i(e)):{State:i(n),Getter:i(c),Mutation:i(o),Action:i(l)}}function d(t,e){function i(i,a){return Object(s["a"])((function(s,n){s[t]||(s[t]={});var c,l=(c={},c[n]=i,c);s[t][n]=void 0!==a?e(a,l)[n]:e(l)[n]}))}function a(t,e){if("string"===typeof e){var s=e,a=t;return i(s,void 0)(a,s)}var n=p(e),c=t;return i(c,n)}return a}function p(t){var e=t&&t.namespace;if("string"===typeof e)return"/"!==e[e.length-1]?e+"/":e}function u(t,e){var i={};return[t,e].forEach((function(t){Object.keys(t).forEach((function(e){i[e]=t[e]}))})),i}},bbcc:function(t,e,i){},bc86:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"process"},[i("input",{attrs:{type:"file",name:"file",hidden:"hidden",id:"file",accept:"image/*"},on:{change:t.uploadFile}}),t.initInfo.type===t.Supplier.Machining&&t.machinStepList&&t.machinStepList.length?i("div",{staticClass:"items"},[i("div",{staticClass:"items-text"},[t._v("加工")]),t._l(t.machinStepList,(function(e,s){return i("div",{key:s,staticClass:"item"},[i("div",{staticClass:"item-label"},[i("div",{staticClass:"item-label-top",class:{"item-label-top-blue":e.isFinished||1===e.isNext}}),i("div",{staticClass:"item-label-circle",class:{"item-label-circle-blue":e.isFinished||1===e.isNext}}),s<t.machinStepList.length-1?i("div",{staticClass:"item-label-bottom",class:{"item-label-bottom-blue":e.isFinished}}):t._e()]),i("div",{staticClass:"item-content"},[i("div",{staticClass:"item-content-title"},[t._v(t._s(e.stepName))])]),1===e.isNext?i("div",{staticClass:"item-buttons"},[i("div",{staticClass:"item-button item-button-blue",on:{click:function(e){return t.selectFile({type:1,index:s})}}},[t._v(" 上传照片 ")]),i("div",{staticClass:"item-button",on:{click:function(e){return t.finishedStep({type:1,index:s})}}},[t._v("完成")])]):t._e(),e.fileInfos&&e.fileInfos.length?i("div",{staticClass:"item-images"},t._l(e.fileInfos,(function(a,n){return i("div",{directives:[{name:"show",rawName:"v-show",value:a.filePath,expression:"c.filePath"}],key:n,staticClass:"item-image"},[i("img",{staticClass:"item-image-icon",attrs:{src:t.BASE_IMAGE_URL+a.filePath,alt:""}}),1===e.isNext?i("div",{staticClass:"item-image-delete",on:{click:function(e){return t.deleteStepFile({type:1,index:s,key:n})}}},[t._v(" X ")]):t._e()])})),0):t._e()])}))],2):t._e(),t.initInfo.type===t.Supplier.Machining&&t.assembleStepList&&t.assembleStepList.length?i("div",{staticClass:"items"},[i("div",{staticClass:"items-text"},[t._v("装配")]),t._l(t.assembleStepList,(function(e,s){return i("div",{key:s,staticClass:"item"},[i("div",{staticClass:"item-label"},[i("div",{staticClass:"item-label-top",class:{"item-label-top-blue":e.isFinished||1===e.isNext}}),i("div",{staticClass:"item-label-circle",class:{"item-label-circle-blue":e.isFinished||1===e.isNext}}),s<t.assembleStepList.length-1?i("div",{staticClass:"item-label-bottom",class:{"item-label-bottom-blue":e.isFinished}}):t._e()]),i("div",{staticClass:"item-content"},[i("div",{staticClass:"item-content-title"},[t._v(t._s(e.stepName))])]),1===e.isNext?i("div",{staticClass:"item-buttons"},[i("div",{staticClass:"item-button item-button-blue",on:{click:function(e){return t.selectFile({type:2,index:s})}}},[t._v(" 上传照片 ")]),i("div",{staticClass:"item-button",on:{click:function(e){return t.finishedStep({type:2,index:s})}}},[t._v("完成")])]):t._e(),e.fileInfos&&e.fileInfos.length?i("div",{staticClass:"item-images"},t._l(e.fileInfos,(function(a,n){return i("div",{directives:[{name:"show",rawName:"v-show",value:a.filePath,expression:"c.filePath"}],key:n,staticClass:"item-image"},[i("img",{staticClass:"item-image-icon",attrs:{src:t.BASE_IMAGE_URL+a.filePath,alt:""}}),1===e.isNext?i("div",{staticClass:"item-image-delete",on:{click:function(e){return t.deleteStepFile({type:2,index:s,key:n})}}},[t._v(" X ")]):t._e()])})),0):t._e()])}))],2):t._e(),t.initInfo.type===t.Supplier.Injection&&t.injectionStepList&&t.injectionStepList.length?i("div",{staticClass:"items"},[i("div",{staticClass:"items-text"},[t._v("试模")]),t._l(t.injectionStepList,(function(e,s){return i("div",{key:s,staticClass:"item"},[i("div",{staticClass:"item-label"},[i("div",{staticClass:"item-label-top",class:{"item-label-top-blue":e.isFinished||1===e.isNext}}),i("div",{staticClass:"item-label-circle",class:{"item-label-circle-blue":e.isFinished||1===e.isNext}}),s<t.injectionStepList.length-1?i("div",{staticClass:"item-label-bottom",class:{"item-label-bottom-blue":e.isFinished}}):t._e()]),i("div",{staticClass:"item-content"},[i("div",{staticClass:"item-content-title"},[t._v(t._s(e.stepName))])]),1===e.isNext?i("div",{staticClass:"item-buttons"},[i("div",{staticClass:"item-button item-button-blue",on:{click:function(e){return t.selectFile({type:3,index:s})}}},[t._v(" 上传照片 ")]),i("div",{staticClass:"item-button",on:{click:function(e){return t.finishedStep({type:3,index:s})}}},[t._v("完成")])]):t._e(),e.fileInfos&&e.fileInfos.length?i("div",{staticClass:"item-images"},t._l(e.fileInfos,(function(a,n){return i("div",{directives:[{name:"show",rawName:"v-show",value:a.filePath,expression:"c.filePath"}],key:n,staticClass:"item-image"},[i("img",{staticClass:"item-image-icon",attrs:{src:t.BASE_IMAGE_URL+a.filePath,alt:""}}),1===e.isNext?i("div",{staticClass:"item-image-delete",on:{click:function(e){return t.deleteStepFile({type:3,index:s,key:n})}}},[t._v(" X ")]):t._e()])})),0):t._e()])}))],2):t._e()])},a=[],n=(i("99af"),i("2909")),c=(i("96cf"),i("1da1")),l=i("d4ec"),o=i("bee2"),r=i("262e"),d=i("2caf"),p=i("9ab4"),u=i("60a3"),m=i("4bb5"),f=i("5d99"),b=i("5583"),v=i("8d72"),h=i("2de2"),S=i("5c96"),y=i("79f6"),g=Object(m["d"])("order/process"),C=g.State,_=(g.Getter,g.Action),j=g.Mutation,I=function(t){Object(r["a"])(i,t);var e=Object(d["a"])(i);function i(){var t;return Object(l["a"])(this,i),t=e.apply(this,arguments),t.Supplier=f["a"],t.BASE_IMAGE_URL=h["c"],t.type=-1,t.index=-1,t}return Object(o["a"])(i,[{key:"created",value:function(){var t=this.initInfo||{},e=t.type,i=void 0===e?"":e;switch(i){case f["a"].Dfm:break;case f["a"].Design:break;case f["a"].Machining:this.getMachinSteps(),this.getAssembleSteps();break;case f["a"].Injection:this.getInjectionSteps();break}}},{key:"mounted",value:function(){}},{key:"selectFile",value:function(t){var e=t.type,i=void 0===e?0:e,s=t.index,a=void 0===s?0:s;this.type=i,this.index=a;var n=document.querySelector("#file");n.click()}},{key:"uploadFile",value:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(e){var i,s,a,c,l,o,r,d,p,u,m,f,b,v,h,g,C,_,j;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,i=this.type,s=this.index,a=this.machinStepList,c=this.assembleStepList,l=this.injectionStepList,o=e.target.files[0],r=new FormData,r.append("files",o),t.next=7,Object(y["j"])(r);case 7:d=t.sent,p=d.success,u=d.message,m=d.data,p?(f=m||{},b=f.pics,v=void 0===b?[]:b,h=v[0],g=h.filePath,C=void 0===g?"":g,_=h.fileName,j=h.id,1===i?(a[s].fileInfos=[].concat(Object(n["a"])(a[s].fileInfos||[]),[{filePath:C,fileName:_,fileId:j}]),this.updateMachinStepList(a)):2===i?(c[s].fileInfos=[].concat(Object(n["a"])(c[s].fileInfos||[]),[{filePath:C,fileName:_,fileId:j}]),this.updateAssembleStepList(c)):3===i&&(l[s].fileInfos=[].concat(Object(n["a"])(l[s].fileInfos||[]),[{filePath:C,fileName:_,fileId:j}]),this.updateInjectionStepList(l))):S["Message"].error(u),e.target.value=null,t.next=18;break;case 15:throw t.prev=15,t.t0=t["catch"](0),new Error(t.t0);case 18:case"end":return t.stop()}}),t,this,[[0,15]])})));function e(e){return t.apply(this,arguments)}return e}()}]),i}(u["d"]);Object(p["a"])([C("initInfo")],I.prototype,"initInfo",void 0),Object(p["a"])([C("machinStepList")],I.prototype,"machinStepList",void 0),Object(p["a"])([C("assembleStepList")],I.prototype,"assembleStepList",void 0),Object(p["a"])([C("injectionStepList")],I.prototype,"injectionStepList",void 0),Object(p["a"])([_(b["a"].FinishedStep)],I.prototype,"finishedStep",void 0),Object(p["a"])([_(b["a"].DeleteStepFile)],I.prototype,"deleteStepFile",void 0),Object(p["a"])([j(v["a"].UpdateMachinStepList)],I.prototype,"updateMachinStepList",void 0),Object(p["a"])([j(v["a"].UpdateAssembleStepList)],I.prototype,"updateAssembleStepList",void 0),Object(p["a"])([j(v["a"].UpdateInjectionStepList)],I.prototype,"updateInjectionStepList",void 0),Object(p["a"])([_(b["a"].GetMachinSteps)],I.prototype,"getMachinSteps",void 0),Object(p["a"])([_(b["a"].GetAssembleSteps)],I.prototype,"getAssembleSteps",void 0),Object(p["a"])([_(b["a"].GetInjectionSteps)],I.prototype,"getInjectionSteps",void 0),I=Object(p["a"])([Object(u["a"])({name:"ProcessView",components:{}})],I);var x=I,L=x,k=(i("f15c"),i("2877")),O=Object(k["a"])(L,s,a,!1,null,"0abf475a",null);e["default"]=O.exports},f15c:function(t,e,i){"use strict";var s=i("bbcc"),a=i.n(s);a.a}}]);