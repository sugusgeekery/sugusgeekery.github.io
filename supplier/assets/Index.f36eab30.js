import{d as e,m as t,u as l,n as i,q as a,i as o,K as n,I as s,p as c,e as p,j as r,o as v,f as m,h as d,F as f,t as u,v as k,g as x,w as g}from"./vendor.54beb8e3.js";import{m as I,S as y,B as A,n as C}from"./index.9997e8f1.js";import{U as b}from"./upload.13485518.js";import{_ as h,a as S,b as R}from"./pictrue_add.294a7a44.js";import{_ as j}from"./select_green.c30f614b.js";var D=e({name:"ReportView",components:{ReasonContent:h},setup(){t();const e=l(),c=i((()=>e.state.order.report.initInfo)),p=i((()=>e.state.order.report.reportList)),r=i((()=>e.state.order.report.reasonContent)),v=t=>e.dispatch(`order/report/${I.GetDfmReportList}`,t),m=t=>e.dispatch(`order/report/${I.UpdateReportData}`,t),d=t=>e.commit(`order/report/${C.UpdateReportList}`,t),f=a(-1),u=a(0),k=async e=>{const{clipboardData:t}=e||window,{items:l}=t||{};if(!l||!l.length)return;if(-1===f.value)return void s.error("请选择你需要粘贴的地方");const i=async e=>{const t=await b({files:[e]});for(const l of t)x(l)},a=e=>{if(1===u.value)m({index:f,name:"describe",value:e});else switch(c.type){case y.Dfm:break;case y.Machining:{const t=p[f.value]||{};t.approvalContent=e,m({index:f,name:"machiningApprovalInfo",value:t});break}case y.Injection:{const t=p[f.value]||{};t.approvalContent=e,m({index:f,name:"injectionApprovalInfo",value:t});break}}};for(let o=0,n=l.length;o<n;o++){const{type:e}=l[o];if(e.includes("image")){const e=l[o].getAsFile();e&&i(e);break}l[o].getAsString((e=>{e&&a(e)}));break}},x=e=>{const{filePath:t,fileName:l,id:i}=e||{},a={filePath:t,fileName:l,fileId:i};if(1===u.value){const{fileList:e=[]}=p[f.value]||{};p[f.value].fileList=[...e||[],a],d(p)}else if(2===u.value){switch(c.type){case y.Dfm:break;case y.Machining:{const{approvalFiles:e=[]}=p[f.value].machiningApprovalInfo||{};p[f.value].machiningApprovalInfo.approvalFiles=[...e||[],a];break}case y.Injection:{const{approvalFiles:e=[]}=p[f.value].injectionApprovalInfo||{};p[f.value].injectionApprovalInfo.approvalFiles=[...e||[],a];break}}d(p)}};return o((async()=>{await v(),document.addEventListener("paste",k)})),n((()=>{document.removeEventListener("paste",k)})),{Supplier:y,BASE_IMAGE_URL:A,initInfo:c,reportList:p,reasonContent:r,getDfmReportList:v,updateReportData:m,commitReport:t=>e.dispatch(`order/report/${I.CommitReport}`,t),approvalDfmReport:t=>e.dispatch(`order/report/${I.ApprovalDfmReport}`,t),deleteReportFile:t=>e.dispatch(`order/report/${I.DeleteReportFile}`,t),deleteReportApprovalFile:t=>e.dispatch(`order/report/${I.DeleteReportApprovalFile}`,t),getReasonContent:t=>e.dispatch(`order/report/${I.GetReasonContent}`,t),updateReportList:d,updateReasonContent:t=>e.commit(`order/report/${C.UpdateReasonContent}`,t),index:f,pasteType:u,selectFile:(e,t)=>{f.value=e,u.value=t;document.querySelector("#file").click()},uploadFile:async e=>{const t=e.target.files,l=await b({files:t});for(const i of l)x(i);e.target.value=null},handlePaste:k,getUrls:e=>{const t=[];if(e&&e.length)for(const l of e){const{filePath:e=""}=l;e&&t.push(A+e)}return t},updateReport:x}}});const w=g();c("data-v-3618cf22");const F={key:0,class:"report"},L={class:"items"},U={class:"item-title"},_={class:"item-title-text"},$={key:0,class:"item-title-select"},q=d("span",{class:"item-title-select-span"},"标记为非必填项",-1),E={key:1,class:"item-title-icon",src:j,alt:""},M={class:"item-row"},P={key:0,class:"swiper-wrapper"},V={key:1,class:"swiper-tip"},G={key:2,class:"swiper-tip"},N=d("div",{class:"swiper-tip-text swiper-tip-text-gray"},"该项已标记为非必填项",-1),T={class:"item-content"},B={key:0,class:"item-content-textarea"},K={key:1,class:"item-content-text item-content-line"},z={key:2,class:"item-content-text item-content-text-gray item-content-line"},H={key:0,class:"item-cells"},J={key:0,class:"item-cell"},O=d("div",{class:"item-cell-text item-cell-text-black"},"加工方：",-1),Q={key:0,class:"item-cell-text item-cell-text-red"},W=d("img",{class:"item-cell-img",src:S},null,-1),X=d("span",{class:"item-cell-text-blue"},"查看原因",-1),Y={key:2,class:"item-cell-text item-cell-text-blue"},Z={key:3,class:"item-cell-text item-cell-text-black"},ee={key:1,class:"item-cell"},te=d("div",{class:"item-cell-text item-cell-text-black"},"试模方：",-1),le={key:0,class:"item-cell-text item-cell-text-red"},ie=d("img",{class:"item-cell-img",src:S},null,-1),ae=d("span",{class:"item-cell-text-blue"},"查看原因",-1),oe={key:2,class:"item-cell-text item-cell-text-blue"},ne={key:3,class:"item-cell-text item-cell-text-black"},se={key:2,class:"item-cell"},ce=d("div",{class:"item-cell-text item-cell-text-black"},"客户方：",-1),pe={key:0,class:"item-cell-text item-cell-text-red"},re=d("img",{class:"item-cell-img",src:S},null,-1),ve=d("span",{class:"item-cell-text-blue"},"查看原因",-1),me={key:2,class:"item-cell-text item-cell-text-blue"},de={key:3,class:"item-cell-text item-cell-text-black"},fe={key:1,class:"item-cells"},ue={key:0,class:"item-cell"},ke=d("div",{class:"item-cell-text item-cell-text-black"},"试模方：",-1),xe={key:0,class:"item-cell-text item-cell-text-red"},ge=d("img",{class:"item-cell-img",src:S},null,-1),Ie=d("span",{class:"item-cell-text-blue"},"查看原因",-1),ye={key:2,class:"item-cell-text item-cell-text-blue"},Ae={key:3,class:"item-cell-text item-cell-text-black"},Ce={key:1,class:"item-cell"},be=d("div",{class:"item-cell-text item-cell-text-black"},"客户方：",-1),he={key:0,class:"item-cell-text item-cell-text-red"},Se=d("img",{class:"item-cell-img",src:S},null,-1),Re=d("span",{class:"item-cell-text-blue"},"查看原因",-1),je={key:2,class:"item-cell-text item-cell-text-blue"},De={key:3,class:"item-cell-text item-cell-text-black"},we={key:2,class:"item-cell"},Fe=d("div",{class:"item-cell-text item-cell-text-black"},"加工方：",-1),Le={key:0,class:"item-cell-text item-cell-text-red"},Ue=d("img",{class:"item-cell-img",src:S},null,-1),_e=d("span",{class:"item-cell-text-blue"},"查看原因",-1),$e={key:2,class:"item-cell-text item-cell-text-blue"},qe={key:3,class:"item-cell"},Ee=d("div",{class:"item-cell-li-text"}," 确认 ",-1),Me=d("div",{class:"item-cell-li-text"},"驳回",-1),Pe={class:"item-cell-li"},Ve={key:4,class:"form-container"},Ge={class:"form-wrapper"},Ne={class:"form-content"},Te={class:"form-textarea"},Be={class:"form-list"},Ke={class:"form-li-text"},ze=d("img",{class:"form-add-img",src:R,alt:""},null,-1),He={key:2,class:"item-cells"},Je={key:0,class:"item-cell"},Oe=d("div",{class:"item-cell-text item-cell-text-black"},"加工方：",-1),Qe={key:0,class:"item-cell-text item-cell-text-red"},We=d("img",{class:"item-cell-img",src:S},null,-1),Xe=d("span",{class:"item-cell-text-blue"},"查看原因",-1),Ye={key:2,class:"item-cell-text item-cell-text-blue"},Ze={key:3,class:"item-cell-text item-cell-text-black"},et={key:1,class:"item-cell"},tt=d("div",{class:"item-cell-text item-cell-text-black"},"客户方：",-1),lt={key:0,class:"item-cell-text item-cell-text-red"},it=d("img",{class:"item-cell-img",src:S},null,-1),at=d("span",{class:"item-cell-text-blue"},"查看原因",-1),ot={key:2,class:"item-cell-text item-cell-text-blue"},nt={key:3,class:"item-cell-text item-cell-text-black"},st={key:2,class:"item-cell"},ct=d("div",{class:"item-cell-text item-cell-text-black"},"试模方：",-1),pt={key:0,class:"item-cell-text item-cell-text-red"},rt=d("img",{class:"item-cell-img",src:S},null,-1),vt=d("span",{class:"item-cell-text-blue"},"查看原因",-1),mt={key:2,class:"item-cell-text item-cell-text-blue"},dt={key:3,class:"item-cell"},ft=d("div",{class:"item-cell-li-text"},"确认",-1),ut=d("div",{class:"item-cell-li-text"},"驳回",-1),kt={class:"item-cell-li"},xt={key:4,class:"form-container"},gt={class:"form-wrapper"},It={class:"form-content"},yt={class:"form-textarea"},At={class:"form-list"},Ct={class:"form-li-text"},bt=d("img",{class:"form-add-img",src:R,alt:""},null,-1),ht={key:0,class:"footer-buttons"};p();const St=w(((e,t,l,i,a,o)=>{const n=r("el-checkbox"),s=r("el-image"),c=r("ReasonContent");return e.reportList.length?(v(),m("div",F,[d("input",{type:"file",name:"file",id:"file",hidden:"hidden",accept:"image/*",onChange:t[1]||(t[1]=(...t)=>e.uploadFile&&e.uploadFile(...t))},null,32),d("div",L,[(v(!0),m(f,null,u(e.reportList,((t,l)=>(v(),m("div",{class:["item",{"item-green":2===t.state,"item-gray":t.required}],key:l},[d("div",U,[d("div",_,k(t.reportTitle),1),t.state||e.initInfo.type!==e.Supplier.Dfm?x("v-if",!0):(v(),m("div",$,[d(n,{class:"item-title-select-box",modelValue:t.required,"onUpdate:modelValue":e=>t.required=e,onChange:t=>e.updateReportData({index:l,name:"required",value:t})},null,8,["modelValue","onUpdate:modelValue","onChange"]),q])),2===t.state?(v(),m("img",E)):3===t.state&&e.initInfo.type===e.Supplier.Dfm?(v(),m("div",{key:2,class:"item-title-button",onClick:t=>e.updateReportData({index:l,name:"state",value:0})}," 修改 ",8,["onClick"])):x("v-if",!0)]),d("div",M,[d("div",{class:["item-flex swiper-container",{"swiper-container-active":e.index===l}],onClick:i=>{!t.state&&e.initInfo.type===e.Supplier.Dfm&&(e.index=l,e.pasteType=1)}},[t.fileList&&t.fileList.length?(v(),m("div",P,[(v(!0),m(f,null,u(t.fileList,((i,a)=>(v(),m("div",{class:["swiper-slide",{"swiper-slide-large":t.fileList.length<3}],key:a},[d(s,{class:"swiper-slide-image",src:e.BASE_IMAGE_URL+i.filePath,"preview-src-list":e.getUrls(t.fileList)},null,8,["src","preview-src-list"]),t.state||e.initInfo.type!==e.Supplier.Dfm?x("v-if",!0):(v(),m("div",{key:0,class:"swiper-slide-delete",onClick:t=>e.deleteReportFile({index:l,key:a})}," + ",8,["onClick"]))],2)))),128)),t.state||e.initInfo.type!==e.Supplier.Dfm?x("v-if",!0):(v(),m("div",{key:0,class:"swiper-slide",onClick:t=>e.index=l},[d("div",{class:"swiper-slide-add",onClick:t=>e.selectFile(l,1)},"+",8,["onClick"])],8,["onClick"]))])):t.state||e.initInfo.type!==e.Supplier.Dfm?t.required?(v(),m("div",G,[N])):x("v-if",!0):(v(),m("div",V,[d("div",{class:"swiper-tip-text",onClick:t=>e.selectFile(l,1)},"点击或ctrl+v粘贴上传图片",8,["onClick"])]))],10,["onClick"]),d("div",{class:"item-flex",onClick:i=>{!t.state&&e.initInfo.type===e.Supplier.Dfm&&(e.index=l,e.pasteType=2)}},[d("div",T,[t.state||e.initInfo.type!==e.Supplier.Dfm?t.describe?(v(),m("div",K,k(t.describe),1)):t.required?(v(),m("div",z,"该项已标记为非必填项")):x("v-if",!0):(v(),m("div",B,[d("textarea",{name:"",id:"",placeholder:"请填写报告描述",value:t.describe,cols:"30",rows:"10",onChange:t=>e.updateReportData({index:l,name:"describe",value:t.target.value})},null,40,["value","onChange"])]))]),!t.state||e.initInfo.type!==e.Supplier.Dfm&&e.initInfo.type!==e.Supplier.Design?x("v-if",!0):(v(),m("div",H,[t.machiningApprovalInfo?(v(),m("div",J,[O,0===t.machiningApprovalInfo.approvalStatus?(v(),m("div",Q," 已驳回 ")):x("v-if",!0),0===t.machiningApprovalInfo.approvalStatus?(v(),m("div",{key:1,class:"item-cell-text",onClick:l=>e.getReasonContent(t.machiningApprovalInfo)},[W,X],8,["onClick"])):1===t.machiningApprovalInfo.approvalStatus?(v(),m("div",Y," 通过 ")):2===t.machiningApprovalInfo.approvalStatus?(v(),m("div",Z," 待确认 ")):x("v-if",!0)])):x("v-if",!0),t.injectionApprovalInfo?(v(),m("div",ee,[te,0===t.injectionApprovalInfo.approvalStatus?(v(),m("div",le," 已驳回 ")):x("v-if",!0),0===t.injectionApprovalInfo.approvalStatus?(v(),m("div",{key:1,class:"item-cell-text",onClick:l=>e.getReasonContent(t.injectionApprovalInfo)},[ie,ae],8,["onClick"])):1===t.injectionApprovalInfo.approvalStatus?(v(),m("div",oe," 通过 ")):2===t.injectionApprovalInfo.approvalStatus?(v(),m("div",ne," 待确认 ")):x("v-if",!0)])):x("v-if",!0),t.customerApprovalInfo?(v(),m("div",se,[ce,0===t.customerApprovalInfo.approvalStatus?(v(),m("div",pe," 已驳回 ")):x("v-if",!0),0===t.customerApprovalInfo.approvalStatus?(v(),m("div",{key:1,class:"item-cell-text",onClick:l=>e.getReasonContent(t.customerApprovalInfo)},[re,ve],8,["onClick"])):1===t.customerApprovalInfo.approvalStatus?(v(),m("div",me," 通过 ")):2===t.customerApprovalInfo.approvalStatus?(v(),m("div",de," 待确认 ")):x("v-if",!0)])):x("v-if",!0)])),t.state&&e.initInfo.type===e.Supplier.Machining?(v(),m("div",fe,[t.injectionApprovalInfo?(v(),m("div",ue,[ke,0===t.injectionApprovalInfo.approvalStatus?(v(),m("div",xe," 已驳回 ")):x("v-if",!0),0===t.injectionApprovalInfo.approvalStatus?(v(),m("div",{key:1,class:"item-cell-text",onClick:l=>e.getReasonContent(t.injectionApprovalInfo)},[ge,Ie],8,["onClick"])):1===t.injectionApprovalInfo.approvalStatus?(v(),m("div",ye," 通过 ")):2===t.injectionApprovalInfo.approvalStatus?(v(),m("div",Ae," 待确认 ")):x("v-if",!0)])):x("v-if",!0),t.customerApprovalInfo?(v(),m("div",Ce,[be,0===t.customerApprovalInfo.approvalStatus?(v(),m("div",he," 已驳回 ")):x("v-if",!0),0===t.customerApprovalInfo.approvalStatus?(v(),m("div",{key:1,class:"item-cell-text",onClick:l=>e.getReasonContent(t.customerApprovalInfo)},[Se,Re],8,["onClick"])):1===t.customerApprovalInfo.approvalStatus?(v(),m("div",je," 通过 ")):2===t.customerApprovalInfo.approvalStatus?(v(),m("div",De," 待确认 ")):x("v-if",!0)])):x("v-if",!0),t.machiningApprovalInfo?(v(),m("div",we,[Fe,0===t.machiningApprovalInfo.approvalStatus?(v(),m("div",Le," 已驳回 ")):x("v-if",!0),0===t.machiningApprovalInfo.approvalStatus?(v(),m("div",{key:1,class:"item-cell-text",onClick:l=>e.getReasonContent(t.machiningApprovalInfo)},[Ue,_e],8,["onClick"])):1===t.machiningApprovalInfo.approvalStatus?(v(),m("div",$e," 通过 ")):x("v-if",!0)])):x("v-if",!0),t.machiningApprovalInfo&&2===t.machiningApprovalInfo.approvalStatus?(v(),m("div",qe,[d("div",{class:"item-cell-li",onClick:t=>e.updateReportData({index:l,text:"machiningApprovalInfo",name:"opinion",value:1})},[d("div",{class:["item-cell-li-label",{"item-cell-li-label-active":1===t.machiningApprovalInfo.opinion}]},null,2),Ee],8,["onClick"]),d("div",{class:"item-cell-li",onClick:t=>e.updateReportData({index:l,text:"machiningApprovalInfo",name:"opinion",value:0})},[d("div",{class:["item-cell-li-label",{"item-cell-li-label-active":0===t.machiningApprovalInfo.opinion}]},null,2),Me],8,["onClick"]),d("div",Pe,[d("div",{class:"item-cell-li-button item-cell-li-button-blue",onClick:t=>e.approvalDfmReport({index:l})}," 确定 ",8,["onClick"])])])):x("v-if",!0),t.machiningApprovalInfo&&2===t.machiningApprovalInfo.approvalStatus&&0===t.machiningApprovalInfo.opinion?(v(),m("div",Ve,[d("div",Ge,[d("div",Ne,[d("div",Te,[d("textarea",{name:"",id:"",value:t.machiningApprovalInfo.approvalContent,placeholder:"请填写驳回原因",cols:"30",rows:"10",onChange:t=>e.updateReportData({index:l,text:"machiningApprovalInfo",name:"approvalContent",value:t.target.value})},null,40,["value","onChange"])]),d("div",Be,[(v(!0),m(f,null,u(t.machiningApprovalInfo.approvalFiles,((t,i)=>(v(),m("div",{class:"form-li",key:i},[d("div",Ke,k(t.fileName),1),d("div",{class:"form-li-del",onClick:t=>e.deleteReportApprovalFile({index:l,text:"machiningApprovalInfo",name:"approvalFiles",key:i})},"+",8,["onClick"])])))),128))])]),d("div",{class:"form-add",onClick:t=>e.selectFile(l,2)},[ze],8,["onClick"])])])):x("v-if",!0)])):x("v-if",!0),t.state&&e.initInfo.type===e.Supplier.Injection?(v(),m("div",He,[t.machiningApprovalInfo?(v(),m("div",Je,[Oe,0===t.machiningApprovalInfo.approvalStatus?(v(),m("div",Qe," 已驳回 ")):x("v-if",!0),0===t.machiningApprovalInfo.approvalStatus?(v(),m("div",{key:1,class:"item-cell-text",onClick:l=>e.getReasonContent(t.machiningApprovalInfo)},[We,Xe],8,["onClick"])):1===t.machiningApprovalInfo.approvalStatus?(v(),m("div",Ye," 通过 ")):2===t.machiningApprovalInfo.approvalStatus?(v(),m("div",Ze," 待确认 ")):x("v-if",!0)])):x("v-if",!0),t.customerApprovalInfo?(v(),m("div",et,[tt,0===t.customerApprovalInfo.approvalStatus?(v(),m("div",lt," 已驳回 ")):x("v-if",!0),0===t.customerApprovalInfo.approvalStatus?(v(),m("div",{key:1,class:"item-cell-text",onClick:l=>e.getReasonContent(t.customerApprovalInfo)},[it,at],8,["onClick"])):1===t.customerApprovalInfo.approvalStatus?(v(),m("div",ot," 通过 ")):2===t.customerApprovalInfo.approvalStatus?(v(),m("div",nt," 待确认 ")):x("v-if",!0)])):x("v-if",!0),t.injectionApprovalInfo?(v(),m("div",st,[ct,0===t.injectionApprovalInfo.approvalStatus?(v(),m("div",pt," 已驳回 ")):x("v-if",!0),0===t.injectionApprovalInfo.approvalStatus?(v(),m("div",{key:1,class:"item-cell-text",onClick:l=>e.getReasonContent(t.injectionApprovalInfo)},[rt,vt],8,["onClick"])):1===t.injectionApprovalInfo.approvalStatus?(v(),m("div",mt," 通过 ")):x("v-if",!0)])):x("v-if",!0),t.injectionApprovalInfo&&2===t.injectionApprovalInfo.approvalStatus?(v(),m("div",dt,[d("div",{class:"item-cell-li",onClick:t=>e.updateReportData({index:l,text:"injectionApprovalInfo",name:"opinion",value:1})},[d("div",{class:["item-cell-li-label",{"item-cell-li-label-active":1===t.injectionApprovalInfo.opinion}]},null,2),ft],8,["onClick"]),d("div",{class:"item-cell-li",onClick:t=>e.updateReportData({index:l,text:"injectionApprovalInfo",name:"opinion",value:0})},[d("div",{class:["item-cell-li-label",{"item-cell-li-label-active":0===t.injectionApprovalInfo.opinion}]},null,2),ut],8,["onClick"]),d("div",kt,[d("div",{class:"item-cell-li-button item-cell-li-button-blue",onClick:t=>e.approvalDfmReport({index:l})}," 确定 ",8,["onClick"])])])):x("v-if",!0),t.injectionApprovalInfo&&2===t.injectionApprovalInfo.approvalStatus&&0===t.injectionApprovalInfo.opinion?(v(),m("div",xt,[d("div",gt,[d("div",It,[d("div",yt,[d("textarea",{name:"",id:"",value:t.injectionApprovalInfo.approvalContent,placeholder:"请填写驳回原因",cols:"30",rows:"10",onChange:t=>e.updateReportData({index:l,text:"injectionApprovalInfo",name:"approvalContent",value:t.target.value})},null,40,["value","onChange"])]),d("div",At,[(v(!0),m(f,null,u(t.injectionApprovalInfo.approvalFiles,((t,i)=>(v(),m("div",{class:"form-li",key:i},[d("div",Ct,k(t.fileName),1),d("div",{class:"form-li-del",onClick:t=>e.deleteReportApprovalFile({index:l,text:"injectionApprovalInfo",name:"approvalFiles",key:i})},"+",8,["onClick"])])))),128))])]),d("div",{class:"form-add",onClick:t=>e.selectFile(l,2)},[bt],8,["onClick"])])])):x("v-if",!0)])):x("v-if",!0)],8,["onClick"])])],2)))),128))]),e.initInfo.type===e.Supplier.Dfm?(v(),m("div",ht,[d("div",{class:"footer-button",onClick:t[2]||(t[2]=t=>e.commitReport({type:1}))},"暂存"),d("div",{class:"footer-button footer-button-blue",onClick:t[3]||(t[3]=t=>e.commitReport({type:2}))},"提交")])):x("v-if",!0),d(c,{data:e.reasonContent,onUpdateData:e.updateReasonContent},null,8,["data","onUpdateData"])])):x("v-if",!0)}));D.render=St,D.__scopeId="data-v-3618cf22";export default D;
