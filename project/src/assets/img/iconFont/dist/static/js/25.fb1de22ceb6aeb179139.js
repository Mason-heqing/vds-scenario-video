webpackJsonp([25],{JZAe:function(t,e,i){var a=i("uo1F");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("8ab2b0ee",a,!0)},MBzj:function(t,e,i){"use strict";function a(t){i("JZAe")}Object.defineProperty(e,"__esModule",{value:!0});var s=i("TtmE"),o=i("D7x1"),n={name:"home",data:function(){return{value:!0,textVal:"",isEdit:!0,isFocus:!1,formData:{},editForm:{appId:"",modelName:"",remark:"",status:""},loading:!1,checkStatusOption:[{value:0,label:"不需要物业审核"},{value:1,label:"需要物业审核"},{value:2,label:"超过5人需要物业审核"},{value:3,label:"超过10人需要物业审核"},{value:4,label:"超过15人需要物业审核"},{value:5,label:"超过20人需要物业审核"}],checkStatus:0,chenkStatusPop:!1,nice:0,isRequest:!1,isChangeTiping:!1}},filters:{},created:function(){},components:{MsgBox:s.a,TableCmp:o.a},computed:{appId:{get:function(){return this.$store.state.project.projectId},set:function(t){this.$store.commit("changeProjectId",t)}}},watch:{appId:function(t,e){this.appId=t,this.editForm.appId=t,this.getService()}},mounted:function(){this.appId&&(this.editForm.appId=this.appId,this.getService())},methods:{getService:function(){var t=this;this.loading=!0,this.utils.http({url:"/base/model/setting/find/"+this.appId,method:"GET",params:{}},function(e){t.loading=!1,200==e.code&&(e.data.tips||(e.data.tips="为保障本小区的住户都能享受高品质的服务，请务必填写正确信息，以便快速审核；物业可自行编辑修改提示内容，最大支持100字"),t.formData=e.data)})},edit:function(){var t=this;this.isEdit=!1,this.$nextTick(function(){t.$refs.textData.focus()})},finish:function(){this.isChangeTiping=!0,this.editForm.modelName="tips",this.editForm.status="",this.editForm.remark=this.formData.tips,this.editStatus("tips")},changeStatus:function(t,e){this.editForm.status=t?1:0,this.editForm.modelName=e,delete this.editForm.remark,this.editStatus()},editStatus:function(t){var e=this;this.utils.http({url:"/base/model/setting/operation",method:"POST",data:this.editForm},function(i){e.isChangeTiping=!1,e.isRequest=!1,200==i.code&&(e.getService(),"tips"==t&&(e.isEdit=!0),"audit"==t&&(e.chenkStatusPop=!1))})},editCheckStatus:function(){this.checkStatus=this.formData.audit,this.chenkStatusPop=!0},sendCheckStatus:function(){this.isRequest=!0,this.editForm.status=this.checkStatus,this.editForm.modelName="audit",delete this.editForm.remark,this.editStatus("audit")}}},c=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"content-wrapper"},[t._m(0),t._v(" "),i("section",{staticClass:"content container-fluid"},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"box box-primary"},[i("div",{staticClass:"service-box"},[i("h4",[t._v("设置要开启的物业服务")]),t._v(" "),i("ul",[i("li",[i("el-switch",{attrs:{"inactive-text":"房屋报修"},on:{change:function(e){t.changeStatus(e,"repairs")}},model:{value:t.formData.repairs,callback:function(e){t.$set(t.formData,"repairs",e)},expression:"formData.repairs"}})],1),t._v(" "),i("li",[i("el-switch",{attrs:{"inactive-text":"举报投诉"},on:{change:function(e){t.changeStatus(e,"complaints")}},model:{value:t.formData.complaints,callback:function(e){t.$set(t.formData,"complaints",e)},expression:"formData.complaints"}})],1),t._v(" "),i("li",[i("el-switch",{attrs:{"inactive-text":"物业账单"},on:{change:function(e){t.changeStatus(e,"bill")}},model:{value:t.formData.bill,callback:function(e){t.$set(t.formData,"bill",e)},expression:"formData.bill"}})],1)])]),t._v(" "),i("div",{staticClass:"service-box"},[i("h4",[t._v("家属，租客及其他住户审核\n                  "),i("span",{staticStyle:{color:"#3c8dbc",cursor:"pointer","font-size":"14px","margin-left":"5px"},on:{click:t.editCheckStatus}},[t._v("编辑")])]),t._v(" "),i("ul",[i("li",[0==t.formData.audit?i("span",[t._v("不需要物业审核")]):1==t.formData.audit?i("span",[t._v("需要物业审核")]):2==t.formData.audit?i("span",[t._v("超过5人需要物业审核")]):3==t.formData.audit?i("span",[t._v("超过10人需要物业审核")]):4==t.formData.audit?i("span",[t._v("超过15人需要物业审核")]):5==t.formData.audit?i("span",[t._v("超过20人需要物业审核")]):t._e()])])]),t._v(" "),i("div",{staticClass:"service-box text-box"},[i("h4",[t._v("住户申请资料提示\n                  "),t.isEdit?i("span",{on:{click:t.edit}},[t._v("编辑")]):t._e(),t._v(" "),t.isEdit||t.isChangeTiping?t._e():i("span",{on:{click:t.finish}},[t._v("完成")]),t._v(" "),!t.isEdit&&t.isChangeTiping?i("span",[t._v("完成")]):t._e()]),t._v(" "),i("ul",[i("li",[t.isEdit?i("div",{staticClass:"finish-box"},[t._v(t._s(t.formData.tips))]):t._e(),t._v(" "),t.isEdit?t._e():i("el-input",{ref:"textData",attrs:{type:"textarea",disabled:t.isEdit},model:{value:t.formData.tips,callback:function(e){t.$set(t.formData,"tips",e)},expression:"formData.tips"}})],1)])])])]),t._v(" "),i("el-dialog",{staticClass:"el-dialog-reset set-pop",attrs:{title:"家属，租客及其他住户审核",visible:t.chenkStatusPop,width:"40%"},on:{"update:visible":function(e){t.chenkStatusPop=e}}},[i("div",{staticStyle:{padding:"0px"}},[i("div",{staticClass:"row"},[i("label",{staticClass:"col-sm-4 control-label text-right",attrs:{for:"name"}},[i("span",{staticStyle:{color:"red","line-height":"40px"}},[t._v("*")]),t._v("\n              是否需要审核\n            ")]),t._v(" "),i("div",{staticClass:"col-sm-6"},[i("el-select",{staticStyle:{},attrs:{placeholder:""},model:{value:t.checkStatus,callback:function(e){t.checkStatus=e},expression:"checkStatus"}},t._l(t.checkStatusOption,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)])]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.chenkStatusPop=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:!t.isRequest,expression:"!isRequest"}],attrs:{type:"primary"},on:{click:t.sendCheckStatus}},[t._v("确 定")]),t._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:t.isRequest,expression:"isRequest"}],attrs:{type:"primary"}},[t._v("提交中")])],1)])],1)},l=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"content-header"},[i("h1",{staticClass:"nice"},[t._v("\n      基础设置 - 服务设置\n        ")]),t._v(" "),i("ol",{staticClass:"breadcrumb"},[i("li",[i("a",{attrs:{href:"/"}},[i("i",{staticClass:"glyphicon glyphicon-home"}),t._v(" 首页\n          ")])]),t._v(" "),i("li",[i("i",{staticClass:"glyphicon glyphicon-cog"}),t._v(" 基础设置\n        ")]),t._v(" "),i("li",{staticClass:"active"},[i("i",{staticClass:"glyphicon glyphicon-adjust"}),t._v(" 服务设置\n        ")])])])}],r={render:c,staticRenderFns:l},d=r,u=i("VU/8"),p=a,h=u(n,d,!1,p,"data-v-5c93b82b",null);e.default=h.exports},uo1F:function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,"\n.service-box[data-v-5c93b82b]{margin-bottom:20px\n}\n.service-box ul[data-v-5c93b82b]{overflow:hidden;margin-top:20px\n}\n.service-box ul li[data-v-5c93b82b]{width:25%;height:130px;border-radius:10px;border:1px solid #ccc;float:left;margin-right:20px;line-height:130px;text-align:center\n}\n.service-box.text-box[data-v-5c93b82b]{padding-bottom:30px\n}\n.service-box.text-box h4 span[data-v-5c93b82b]{color:#3c8dbc;cursor:pointer;font-size:14px;margin-left:5px\n}\n.service-box.text-box ul[data-v-5c93b82b]{overflow:hidden;margin-top:20px\n}\n.service-box.text-box ul li[data-v-5c93b82b] {line-height:24px;text-align:left;border:0\n}\n.service-box.text-box ul li[data-v-5c93b82b] .finish-box{height:130px;border-radius:10px;border:1px solid #ccc;padding:0 10px;word-wrap:break-word\n}\n.service-box.text-box ul li[data-v-5c93b82b] .el-textarea{height:100%\n}\n.service-box.text-box ul li[data-v-5c93b82b] .el-textarea__inner{height:100%\n}\n",""])}});