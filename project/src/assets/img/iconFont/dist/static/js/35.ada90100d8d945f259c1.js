webpackJsonp([35],{"54bE":function(e,t,a){var n=a("9fgz");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("6420d58a",n,!0)},"9fgz":function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,"\n#charts[data-v-2110b4d0]{height:300px\n}\n",""])},lRD3:function(e,t,a){"use strict";function n(e){a("54bE")}Object.defineProperty(t,"__esModule",{value:!0});var i=a("XLwt"),o=a.n(i),r={name:"home",data:function(){return{msg:"设备列表"}},watch:{},filters:{},created:function(){},mounted:function(){},methods:{drawChart:function(){console.log(122);var e=o.a.init(document.getElementById("charts")),t={tooltip:{trigger:"item",formatter:"{a} <br/>{b}: {c} ({d}%)"},legend:{orient:"vertical",right:10,data:["其它","面试","商务","快递","外卖","送水","送货","装修"]},series:[{name:"访客构成",type:"pie",radius:["50%","70%"],center:["40%","50%"],avoidLabelOverlap:!1,label:{normal:{show:!1,position:"center"},emphasis:{show:!0,textStyle:{fontSize:"24",fontWeight:"bold"}}},labelLine:{normal:{show:!1}},data:[{value:23,name:"其它"},{value:44,name:"面试"},{value:55,name:"商务"},{value:66,name:"快递"},{value:77,name:"外卖"},{value:11,name:"送水"},{value:22,name:"送货"},{value:99,name:"装修"}]}]};e.setOption(t)}}},s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content-wrapper"},[a("section",{staticClass:"content-header"},[a("h1",{staticClass:"nice"},[e._v("\n        "+e._s(e.msg)+"\n        "),a("small",[e._v("Optional description")])])])])},l=[],c={render:s,staticRenderFns:l},u=c,d=a("VU/8"),m=n,v=d(r,u,!1,m,"data-v-2110b4d0",null);t.default=v.exports}});