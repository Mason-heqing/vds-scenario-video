webpackJsonp([15],{esJ6:function(t,a,i){a=t.exports=i("FZ+f")(!1),a.push([t.i,"\n.repairs-box h3[data-v-6df02234]{border-left:5px solid #3c8dbc;padding-left:5px;line-height:20px;margin-bottom:20px;font-size:20px\n}\n.repairs-box .repairs-msg[data-v-6df02234]{width:50%;padding-left:30px\n}\n.repairs-box .repairs-msg h4[data-v-6df02234]{color:#000\n}\n.repairs-box .repairs-msg>p[data-v-6df02234]{margin-bottom:0;line-height:24px\n}\n.repairs-box .repairs-msg .img-box img[data-v-6df02234]{width:120px;height:120px\n}\n.repairs-box .repairs-msg[data-v-6df02234] .el-textarea__inner{height:120px\n}\n",""])},fRed:function(t,a,i){"use strict";function s(t){i("qFhW")}Object.defineProperty(a,"__esModule",{value:!0});var e=i("TtmE"),o=i("D7x1"),n={name:"home",data:function(){return{rules:{dealSuggestion:[{required:!0,message:"请输入处理意见",trigger:"blur"}]},complaintForm:{dealSuggestion:""},dataForm:{},isRequst:!1,imgurl:"",imgurlList:[]}},watch:{},filters:{},created:function(){this.imgurl=this.tools.global.API_URL},components:{MsgBox:e.a,TableCmp:o.a},mounted:function(){var t=this;this.dataForm=JSON.parse(this.utils.getStore("complaintMsg")),this.dataForm.complainImageUrl?(this.dataForm.complainImageUrl=this.dataForm.complainImageUrl.split(","),this.dataForm.complainImageUrl.forEach(function(a,i){t.imgurlList.push(t.imgurl+"/file/download?path="+a)})):this.dataForm.complainImageUrl=[]},methods:{addComplaint:function(t){var a=this;this.$refs[t].validate(function(t){t&&(a.isRequst=!0,a.utils.http({url:"/property/complaint/handleOption/"+a.dataForm.id,method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:a.utils.changeJson(a.complaintForm)},function(t){a.isRequst=!1,200==t.code&&a.$router.push({path:"/complaint"})}))})},cancel:function(){this.$router.push({path:"/complaint"})}}},r=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"content-wrapper"},[t._m(0),t._v(" "),i("section",{staticClass:"content container-fluid"},[i("div",{staticClass:"box box-primary"},[i("div",{staticClass:"repairs-box"},[i("h3",[t._v("处理投诉")]),t._v(" "),i("div",{staticClass:"repairs-msg"},[i("p",[t._v("投诉人："+t._s(t.dataForm.complainPerson))]),t._v(" "),i("p",[t._v("手机号码："+t._s(t.dataForm.complainPhone))]),t._v(" "),i("p",[t._v("房屋信息："+t._s(t.dataForm.houseAddress))]),t._v(" "),i("h4",{staticClass:"mt-30"},[t._v(t._s(t.dataForm.complainTitle))]),t._v(" "),i("div",{staticClass:"mt-20"},[t._v(t._s(t.dataForm.complainContent))]),t._v(" "),i("div",{staticClass:"img-box mt-20"},t._l(t.dataForm.complainImageUrl,function(a,s){return i("el-image",{key:s,staticStyle:{width:"100px",height:"100px","margin-right":"15px",border:"1px solid #ccc"},attrs:{src:t.imgurl+"/file/download?path="+a,"preview-src-list":t.imgurlList}})})),t._v(" "),i("el-form",{ref:"complaintForm",staticClass:"mt-30",staticStyle:{"padding-bottom":"30px"},attrs:{model:t.complaintForm,rules:t.rules}},[i("div",{staticClass:"row"},[i("label",{staticClass:"col-sm-12 control-label",attrs:{for:"name"}},[i("span",{staticStyle:{color:"red","line-height":"40px"}},[t._v("*")]),t._v("\n                      处理意见\n                    ")]),t._v(" "),i("div",{staticClass:"col-sm-12"},[i("el-form-item",{attrs:{prop:"dealSuggestion"}},[i("el-input",{attrs:{maxlength:"100","show-word-limit":"",type:"textarea"},model:{value:t.complaintForm.dealSuggestion,callback:function(a){t.$set(t.complaintForm,"dealSuggestion",a)},expression:"complaintForm.dealSuggestion"}})],1)],1)])]),t._v(" "),i("div",{staticClass:"form-group text-center pb-40"},[t.isRequst?t._e():i("button",{staticClass:"btn btn-primary mr-20",on:{click:function(a){t.addComplaint("complaintForm")}}},[t._v("保存")]),t._v(" "),t.isRequst?i("button",{staticClass:"btn btn-primary mr-20"},[t._v("保存中")]):t._e(),t._v(" "),i("button",{staticClass:"btn btn-default",attrs:{type:"button",id:"btn-back"},on:{click:t.cancel}},[t._v("取消")])])],1)])])])])},l=[function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("section",{staticClass:"content-header"},[i("h1",{staticClass:"nice"},[t._v("\n      物业服务 - 处理投诉\n        ")]),t._v(" "),i("ol",{staticClass:"breadcrumb"},[i("li",[i("a",{attrs:{href:"/"}},[i("i",{staticClass:"glyphicon glyphicon-home"}),t._v(" 首页\n          ")])]),t._v(" "),i("li",[i("i",{staticClass:"glyphicon glyphicon-list-alt"}),t._v(" 物业服务\n        ")]),t._v(" "),i("li",{staticClass:"active"},[i("i",{staticClass:"glyphicon glyphicon-adjust"}),t._v(" 处理投诉\n        ")])])])}],c={render:r,staticRenderFns:l},m=c,p=i("VU/8"),d=s,u=p(n,m,!1,d,"data-v-6df02234",null);a.default=u.exports},qFhW:function(t,a,i){var s=i("esJ6");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("rjj0")("0d94fa84",s,!0)}});