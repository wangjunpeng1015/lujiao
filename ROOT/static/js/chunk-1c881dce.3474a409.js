(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c881dce"],{"2ae9":function(t,e,n){"use strict";var i=n("543f"),a=n.n(i);a.a},"3e0f":function(t,e,n){"use strict";n.d(e,"e",(function(){return r})),n.d(e,"h",(function(){return o})),n.d(e,"g",(function(){return l})),n.d(e,"f",(function(){return s})),n.d(e,"c",(function(){return u})),n.d(e,"d",(function(){return d})),n.d(e,"a",(function(){return f})),n.d(e,"b",(function(){return p}));var i=n("b775"),a=n("fed1"),c=n.n(a);function r(t){return Object(i["a"])({url:"/payConfig/list",method:"post",data:t})}function o(t){return Object(i["a"])({url:"/pcAccount/isUsed",method:"post",data:c.a.stringify(t)})}function l(t){return Object(i["a"])({url:"/payConfig/isUsed",method:"post",data:c.a.stringify(t)})}function s(t){return Object(i["a"])({url:"/payConfig/save",method:"post",data:t})}function u(t){return Object(i["a"])({url:"/payConfig/".concat(t),method:"delete"})}function d(t){return Object(i["a"])({url:"/pcAccount/list",method:"post",data:t})}function f(t){return Object(i["a"])({url:"/pcAccount",method:"post",data:t})}function p(t){return Object(i["a"])({url:"/pcAccount/".concat(t),method:"delete"})}},"543f":function(t,e,n){},"5b34":function(t,e,n){"use strict";var i=n("e391"),a=n.n(i);a.a},"6b6c":function(t,e,n){},7384:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pay-container layout-column"},[n("div",{staticClass:"wjp-tools layout-row__between"},[n("div",[n("el-button",{attrs:{type:"primary"},on:{click:t.addChannel}},[t._v("添加账号")])],1),n("el-form",{attrs:{"label-width":"120px",inline:!0}},[n("el-form-item",{attrs:{label:"账号"}},[n("el-input",{attrs:{placeholder:"查询账号"},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}})],1),n("el-form-item",[n("el-select",{attrs:{placeholder:"是否启用",clearable:""},on:{change:t.getAllAcount},model:{value:t.used,callback:function(e){t.used=e},expression:"used"}},[n("el-option",{attrs:{label:"启用",value:!0}}),n("el-option",{attrs:{label:"禁用",value:!1}})],1)],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.getAllAcount}},[t._v("查 询")])],1)],1)],1),n("div",{staticClass:"wjp-content layout-column flex"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"wjp-table",staticStyle:{width:"100%"},attrs:{data:t.dqyhpz,height:"250"}},[n("el-table-column",{attrs:{fixed:"",prop:"id",label:"id",width:"50"}}),n("el-table-column",{attrs:{prop:"account",label:"账号"}}),n("el-table-column",{attrs:{prop:"dailyCeiling",label:"今日限额"}}),n("el-table-column",{attrs:{label:"已添收款码"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",{staticClass:"layout-row"},t._l(e.row.amountList,(function(e,i){return n("el-tag",{key:i,staticStyle:{"margin-left":"5px"},attrs:{type:"success",size:"small"}},[t._v(t._s(e))])})),1)]}}])}),n("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-switch",{attrs:{"active-text":e.row.used?"启用":"禁用"},on:{change:function(n){return t.useChange(e.row.id,n)}},model:{value:e.row.used,callback:function(n){t.$set(e.row,"used",n)},expression:"scope.row.used"}})]}}])}),n("el-table-column",{attrs:{width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){return t.edit(e.row)}}},[t._v("添加配置")]),n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){return t.del(e.row.id)}}},[t._v("删 除")])]}}])})],1)],1),n("div",{staticClass:"page layout-row align-center right"},[n("span",[t._v("每页显示")]),n("el-pagination",{staticClass:"statistics",attrs:{background:"","prev-text":"上一页","next-text":"下一页","current-page":t.currentPage,"page-size":t.pageSize,layout:"sizes, prev, pager, next,total",total:t.totalPage},on:{"size-change":t.sizeChange,"current-change":t.getAllAcount,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}})],1),n("el-dialog",{attrs:{title:"添加账号",visible:t.acVisible,width:"40%","close-on-click-modal":!1},on:{"update:visible":function(e){t.acVisible=e}}},[n("el-form",{ref:"news",attrs:{model:t.news,rules:t.rules,"label-width":"120px"}},[n("el-form-item",{attrs:{label:"账号",prop:"account"}},[n("el-input",{attrs:{placeholder:"请填写新加账号"},model:{value:t.news.account,callback:function(e){t.$set(t.news,"account",e)},expression:"news.account"}})],1),n("el-form-item",{attrs:{label:"每日收款上限",prop:"dailyCeiling",placeholder:"请填写每日收款上限"}},[n("el-input",{attrs:{type:"number"},model:{value:t.news.dailyCeiling,callback:function(e){t.$set(t.news,"dailyCeiling",t._n(e))},expression:"news.dailyCeiling"}})],1)],1),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.cancel}},[t._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:t.addAccount}},[t._v("确 定")])],1)],1),n("Drawer",{attrs:{visible:t.visible,account:t.chooseAccount,channels:t.channels},on:{"update:visible":function(e){t.visible=e},finish:t.getAllAcount}})],1)},a=[],c=(n("5ab2"),n("6d57"),n("e10e"),n("e697"),n("9d37")),r=n("391c"),o=n("3e0f"),l=n("bbbc"),s=n("52c1"),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-drawer",{ref:"drawer",attrs:{title:"账号通道",size:"50%",visible:t.visible,direction:"rtl","custom-class":"drawer"},on:{close:t.cancel,"update:visible":function(e){t.visible=e}}},[n("div",{staticClass:"container layout-column"},[n("div",{staticClass:"wjp-tools layout-row__between"},[n("div",[n("el-button",{attrs:{type:"primary"},on:{click:t.addChannel}},[t._v("添加收款方式")])],1),n("div",{staticClass:"layout-row buttons"},[n("el-select",{attrs:{placeholder:"是否启用",clearable:""},on:{change:t.getPays},model:{value:t.used,callback:function(e){t.used=e},expression:"used"}},[n("el-option",{attrs:{label:"启用",value:!0}}),n("el-option",{attrs:{label:"禁用",value:!1}})],1)],1)]),n("div",{staticClass:"wjp-content"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"wjp-table",staticStyle:{width:"100%"},attrs:{data:t.table,height:"550"}},[n("el-table-column",{attrs:{fixed:"",prop:"id",label:"id",width:"50"}}),n("el-table-column",{attrs:{prop:"payWayDictId",label:"支付名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t.dicFilter(e.row.payWayDictId)))])]}}])}),n("el-table-column",{attrs:{prop:"remark",label:"备注"}}),n("el-table-column",{attrs:{label:"编辑"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){return t.edit(e.row)}}},[t._v("编辑")])]}}])}),n("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-switch",{attrs:{"active-text":e.row.used?"启用":"禁用"},on:{change:function(n){return t.useChange(e.row.id,n)}},model:{value:e.row.used,callback:function(n){t.$set(e.row,"used",n)},expression:"scope.row.used"}})]}}])}),n("el-table-column",{attrs:{width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){return t.del(e.row.id)}}},[t._v("删 除")])]}}])})],1),n("div",{staticClass:"page layout-row align-center right"},[n("span",[t._v("每页显示")]),n("el-pagination",{staticClass:"statistics",attrs:{background:"","prev-text":"上一页","next-text":"下一页","current-page":t.currentPage,"page-size":t.pageSize,layout:"sizes, prev, pager, next,total",total:t.totalPage},on:{"size-change":t.sizeChange,"current-change":t.getPays,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}})],1)],1)])]),n("AddChannel",{attrs:{isAdd:t.isAdd,visible:t.drawerVisible,data:t.form,payWay:t.payWay,payWayId:t.payWayId,account:t.account},on:{finish:t.getPays,"update:visible":function(e){t.drawerVisible=e}}})],1)},d=[],f=(n("ed63"),n("8cf2"),n("ed08")),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{title:"配置",visible:t.visible,width:"40%","close-on-click-modal":!1,"before-close":t.cancel},on:{"update:visible":function(e){t.visible=e}}},[n("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px"}},[n("el-form-item",{attrs:{label:"收款二维码"}},[n("el-upload",{staticClass:"upload-demo",attrs:{action:"","http-request":t.uploadUrl,"show-file-list":!1}},[n("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1)],1),t.isEmpty(t.form.contentObj)?t._e():n("el-form-item",[n("div",{staticClass:"layout-row__between align-center"},[n("div",{staticClass:"layout-row align-center"},[n("img",{staticClass:"img",attrs:{src:t.form.contentObj.url}})])])]),n("el-form-item",{attrs:{label:"单笔限额",prop:"ceiling"}},[n("el-input",{staticStyle:{width:"45%"},attrs:{placeholder:"设置单次最小金额(以防风控)"},model:{value:t.form.singleCeilingMin,callback:function(e){t.$set(t.form,"singleCeilingMin",e)},expression:"form.singleCeilingMin"}}),t._v("-"),n("el-input",{staticStyle:{width:"45%"},attrs:{placeholder:"设置单次最大金额(以防风控)"},model:{value:t.form.singleCeilingMax,callback:function(e){t.$set(t.form,"singleCeilingMax",e)},expression:"form.singleCeilingMax"}})],1),n("el-form-item",{attrs:{label:"备注1",prop:"remark"}},[n("el-input",{attrs:{placeholder:"备注(主要用于备注二维码用途)"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)],1),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.cancel}},[t._v("取 消")]),n("el-button",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{type:"primary"},on:{click:t.submitForm}},[t._v("确 定")])],1)],1)},g=[];function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function h(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?b(Object(n),!0).forEach((function(e){Object(c["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var m={props:["visible","data","isAdd","payWay","account"],components:{},computed:h({},Object(s["c"])(["settings"])),watch:{data:{handler:function(t){this.form=t},deep:!0}},data:function(){return{loading:!1,form:{contentObj:{}},trules:{}}},created:function(){},mounted:function(){},methods:{submitForm:function(){var t=this;Object(r["isEmpty"])(this.form.contentObj)?this.$message.error("请填写支付配置内容！"):(this.loading=!0,Object(o["f"])(h({},this.form,{payWayDictId:6,payConfigAccountId:this.account.id})).then((function(e){t.$message.success("".concat(t.isAdd?"添加":"修改","成功！")),t.cancel(),t.$emit("finish")})).catch((function(e){t.$message.error("修改失败！")})).finally((function(e){t.loading=!1})))},isEmpty:function(t){return Object(r["isEmpty"])(t)},getObjectURL:function(t){var e=null;return void 0!=window.createObjectURL?e=window.createObjectURL(t):void 0!=window.URL?e=window.URL.createObjectURL(t):void 0!=window.webkitURL&&(e=window.webkitURL.createObjectURL(t)),e},uploadUrl:function(t){var e=this,n=new FileReader;n.readAsDataURL(t.file),n.onload=function(){qrcode.decode(e.getObjectURL(t.file)),qrcode.callback=function(t){if("error decoding QR Code"===t)e.$message.error("未能识别支付二维码！");else{var i={url:n.result,qrUrl:t};e.$set(e.form,"contentObj",i)}}}},cancel:function(){this.$emit("update:visible",!1)},sizeChange:function(t){this.pageSize=t,this.getPays()}}},y=m,v=(n("a5f1"),n("5511")),w=Object(v["a"])(y,p,g,!1,null,"2c14f4a1",null),O=w.exports;function j(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function C(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?j(Object(n),!0).forEach((function(e){Object(c["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var P={props:["visible","account","channels","payWayId"],components:{AddChannel:O},computed:C({},Object(s["c"])(["settings"]),{payWay:function(){var t=this;if(this.settings.dict&&this.account){var e=this.settings.dict.PayWay.dicts.filter((function(t){return t.dictValue.includes("ali")})),n=this.settings.dict.PayWay.dicts.filter((function(t){return t.dictValue.includes("wx")})),i=[];return"ali"===this.account.accountType?i=e:"wx"===this.account.accountType&&(i=n),i.filter((function(e){return t.channels.find((function(t){return t.payWayDictId==e.id}))}))}return[]}}),watch:{account:{handler:function(t){this.getPays()},deep:!0}},data:function(){return{form:{},isAdd:!1,loading:!1,drawerVisible:!1,used:"",table:[],totalPage:0,currentPage:1,pageSize:10}},created:function(){},mounted:function(){},methods:{edit:function(t){this.isAdd=!1,this.drawerVisible=!0;var e=Object(r["cloneDeep"])(t),n=Object(f["b"])(e.content,e.payKey);this.form={id:e.id,payWayDictId:e.payWayDictId,used:e.used,remark:e.remark,singleCeilingMin:e.singleCeilingMin,singleCeilingMax:e.singleCeilingMax,qrCodeAdd:e.qrCodeAdd,forNight:e.forNight,ceiling:e.ceiling,contentObj:n}},getPays:function(){var t=this;this.loading=!0,Object(o["e"])({pageNo:this.currentPage,pageSize:this.pageSize,param:{payConfigAccountId:this.account.id,payWayDictId:this.payWayDictId,used:this.used}}).then((function(e){var n=e.data,i=n.totalRecords,a=n.pageNo,c=n.pageSize,r=n.content;t.totalPage=i,t.pageSize=c,t.currentPage=a,t.table=r})).catch((function(t){})).finally((function(e){t.loading=!1}))},del:function(t){var e=this;this.$confirm("确定删除当前通道?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.loading=!0,Object(o["c"])(t).then((function(t){e.getPays()})).catch((function(t){})).finally((function(t){e.loading=!1}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},useChange:function(t,e){var n=this;this.loading=!0,Object(o["g"])({id:t,used:e}).then((function(t){n.$message.success("状态修改成功！")})).finally((function(t){n.loading=!1,n.getPays()}))},cancel:function(){this.$emit("finish"),this.$emit("update:visible",!1)},addChannel:function(){this.form={contentObj:{}},this.isAdd=!0,this.drawerVisible=!0},dicFilter:function(t){var e=this.payWay.find((function(e){return t==e.id}));return e?this.payWay.find((function(e){return t==e.id})).dictValueDisplayName:""},save:function(){},sizeChange:function(t){this.pageSize=t,this.getPays()}}},A=P,x=(n("5b34"),Object(v["a"])(A,u,d,!1,null,"578b6a3e",null)),k=x.exports;function _(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function z(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?_(Object(n),!0).forEach((function(e){Object(c["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):_(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var S={name:"pay",components:{Drawer:k},computed:z({},Object(s["c"])(["settings"])),data:function(){return{tail:"-ali-个码",news:{account:"",dailyCeiling:""},rules:{account:[{required:!0,message:"请输入账号",trigger:"change"}],dailyCeiling:[{required:!0,message:"请输入当日上限",trigger:"change"}]},acVisible:!1,chooseAccount:"",loading:!1,visible:!1,used:"",account:"",channels:[],dqyhpz:[],totalPage:0,currentPage:1,pageSize:10}},created:function(){this.getAllAcount(),this.getAllchannel()},mounted:function(){},methods:{getAllchannel:function(){var t=this;Object(l["d"])({pageNo:1,pageSize:100,param:{}}).then((function(e){t.channels=e.data.content})).catch((function(e){t.$message.error("获取通道失败！")}))},edit:function(t){this.chooseAccount=t,this.visible=!0},getAllAcount:function(){var t=this;this.loading=!0,Object(o["d"])({pageNo:this.currentPage,pageSize:this.pageSize,param:{account:this.tail,used:this.used}}).then((function(e){var n=e.data,i=n.totalRecords,a=n.pageNo,c=n.pageSize,r=n.content;t.totalPage=i,t.pageSize=c,t.currentPage=a,t.dqyhpz=r})).catch((function(t){})).finally((function(e){t.loading=!1}))},addChannel:function(){this.channels.some((function(t){return 6==t.payWayDictId}))?(this.acVisible=!0,this.news={account:"",accountType:"ali",city:"default",dailyCeiling:""}):this.$confirm("请联系我们开通相应通道","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"})},useChange:function(t,e){var n=this;this.loading=!0,Object(o["h"])({id:t,used:e}).then((function(t){n.$message.success("状态修改成功！")})).finally((function(t){n.loading=!1,n.getAllAcount()}))},addAccount:function(){var t=this;this.loading=!0,this.$refs.news.validate((function(e){if(!e)return console.log("error submit!!"),!1;var n=Object(r["cloneDeep"])(t.news);n.account=n.account+t.tail,Object(o["a"])(n).then((function(e){t.getAllAcount(),t.$message.success("添加账号成功！"),t.cancel()})).catch((function(e){t.$message.error(e.message)})).finally((function(e){t.loading=!1}))}))},del:function(t){var e=this;this.$confirm("确定删除这个账号?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.loading=!0,Object(o["b"])(t).then((function(t){e.getAllAcount()})).catch((function(t){})).finally((function(t){e.loading=!1}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},cancel:function(){this.$refs.news.resetFields(),this.acVisible=!1},dicFilter:function(t){return this.settings.payWay.find((function(e){return t==e.value})).label},sizeChange:function(t){this.pageSize=t,this.getAllAcount()}}},$=S,D=(n("2ae9"),Object(v["a"])($,i,a,!1,null,"5c0e60e0",null));e["default"]=D.exports},a5f1:function(t,e,n){"use strict";var i=n("6b6c"),a=n.n(i);a.a},bbbc:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"d",(function(){return o})),n.d(e,"e",(function(){return l})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return u}));var i=n("b775"),a=n("fed1"),c=n.n(a);function r(t){return Object(i["a"])({url:"/proxyCA/renewalRate",method:"post",data:c.a.stringify(t)})}function o(t){return Object(i["a"])({url:"/proxyCA/pageList",method:"post",data:t})}function l(){return Object(i["a"])({url:"/proxyCA",method:"get"})}function s(t){return Object(i["a"])({url:"/proxyCA/".concat(t),method:"delete"})}function u(t){return Object(i["a"])({url:"/proxyCA/channelAuthorization",method:"post",data:t})}},e391:function(t,e,n){},ed08:function(t,e,n){"use strict";n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}));n("ed63"),n("8cf2"),n("e697"),n("9a33e"),n("70da"),n("f548"),n("2b45"),n("2af8");var i=n("7eeb"),a=n.n(i);function c(t,e){var n=a.a.enc.Utf8.parse(e),i=a.a.AES.decrypt(t,n,{mode:a.a.mode.ECB,padding:a.a.pad.Pkcs7});return JSON.parse(a.a.enc.Utf8.stringify(i))}function r(t,e){return e.filter((function(e){return t&&t.find((function(t){return e.id===t.payWayDictId}))}))}function o(t,e,n){var i=[];return t.map((function(t){var n=e.find((function(e){return e.id==t.id}));n&&i.push(n)})),n.filter((function(t){return i.some((function(e){return e.dictValue.includes(t.value)}))}))}}}]);