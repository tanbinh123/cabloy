window["a-settings"]=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){e.exports=window.Vue},function(e,t,n){"use strict";function r(e,t,n,r,o,a,i,s){var u,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),a&&(c._scopeId="data-v-"+a),i?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},c._ssrRegister=u):o&&(u=s?function(){o.call(this,this.$root.$options.shadowRoot)}:o),u)if(c.functional){c._injectStyles=u;var l=c.render;c.render=function(e,t){return u.call(t),l(e,t)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,u):[u]}return{exports:e,options:c}}n.d(t,"a",function(){return r})},function(e,t,n){"use strict";n.r(t);var r;n(3);t.default={install:function(e,t){return r?console.error("already installed."):(r=e,t({routes:n(6).default,store:n(8).default(r),config:n(9).default,locales:n(10).default}))}}},function(e,t,n){var r=n(4);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,n(14).default)("757650e4",r,!0,{})},function(e,t,n){(e.exports=n(5)(!0)).push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"module.css",sourceRoot:""}])},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(i=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),a=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(a).concat([o]).join("\n")}var i;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(r[a]=!0)}for(o=0;o<e.length;o++){var i=e[o];"number"==typeof i[0]&&r[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),t.push(i))}},t}},function(e,t,n){"use strict";function r(e){return n(7)("./".concat(e,".vue")).default}n.r(t),t.default=[{path:":scene/list",component:r("list")},{path:":scene/edit",component:r("edit")}]},function(e,t,n){var r={"./edit.vue":13,"./list.vue":12};function o(e){var t=a(e);return n(t)}function a(e){var t=r[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id=7},function(e,t,n){"use strict";n.r(t),t.default=function(e){return{state:{},getters:{},mutations:{},actions:{}}}},function(e,t,n){"use strict";n.r(t),t.default={}},function(e,t,n){"use strict";n.r(t),t.default={"zh-cn":n(11).default}},function(e,t,n){"use strict";n.r(t),t.default={Settings:"设置","Info Group":"信息组","Extra Group":"额外组",Extra:"额外",Male:"男",Female:"女"}},function(e,t,n){"use strict";n.r(t);var r=n(0),o={mixins:[n.n(r).a.prototype.$meta.module.get("a-base").options.components.ebModules],data:function(){return{scene:this.$f7route.params.scene,items:null}},computed:{ready:function(){return this.modulesAll&&this.items}},methods:{onLoadClear:function(e){this.items=[],e()},onLoadMore:function(e){var t=this;e.index;return this.$api.post("settings/".concat(this.scene,"/list")).then(function(e){return t.items=t.items.concat(e.list),e})},onItemClick:function(e,t){var n=t.validator?{actionModule:"a-settings",actionPath:"".concat(this.scene,"/edit?module=").concat(t.module)}:t;return this.$meta.util.performAction({ctx:this,action:n,item:t}).then(function(){})}}},a=n(1),i=Object(a.a)(o,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("eb-page",[n("eb-navbar",{attrs:{title:e.$text("Settings"),"eb-back-link":"Back"}}),e._v(" "),e.ready?n("f7-list",e._l(e.items,function(t){return n("eb-list-item",{key:t.module,staticClass:"item",attrs:{title:e.getModule(t.module).titleLocale,link:"#",context:t,onPerform:e.onItemClick}})}),1):e._e(),e._v(" "),n("eb-load-more",{ref:"loadMore",attrs:{onLoadClear:e.onLoadClear,onLoadMore:e.onLoadMore,autoInit:!0}})],1)},[],!1,null,null,null);t.default=i.exports},function(e,t,n){"use strict";n.r(t);var r=n(0),o={mixins:[n.n(r).a.prototype.$meta.module.get("a-base").options.components.ebModules],data:function(){return{scene:this.$f7route.params.scene,module:this.$f7route.query.module,data:null,validateParams:null}},computed:{ready:function(){return this.data&&this.validateParams},title:function(){var e=this.getModule(this.module);return e?e.titleLocale:""}},methods:{onPerformValidate:function(e,t){return this.$api.post("settings/".concat(this.scene,"/save"),{module:this.module,data:this.data}).then(function(){return!0})},onSave:function(e){return this.$refs.validate.perform(e,"save")}},created:function(){var e=this;this.$api.post("settings/".concat(this.scene,"/load"),{module:this.module}).then(function(t){e.data=t.data,e.validateParams={module:t.module,validator:t.validator}})}},a=n(1),i=Object(a.a)(o,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("eb-page",[n("eb-navbar",{attrs:{title:e.title,"eb-back-link":"Back"}},[n("f7-nav-right",[e.ready?n("eb-link",{attrs:{iconMaterial:"save",onPerform:e.onSave}}):e._e()],1)],1),e._v(" "),n("eb-validate",{ref:"validate",attrs:{auto:"",data:e.data,params:e.validateParams,onPerform:e.onPerformValidate}})],1)},[],!1,null,"0d64fbbf",null);t.default=i.exports},function(e,t,n){"use strict";function r(e,t){for(var n=[],r={},o=0;o<t.length;o++){var a=t[o],i=a[0],s={id:e+":"+o,css:a[1],media:a[2],sourceMap:a[3]};r[i]?r[i].parts.push(s):n.push(r[i]={id:i,parts:[s]})}return n}n.r(t),n.d(t,"default",function(){return m});var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var a={},i=o&&(document.head||document.getElementsByTagName("head")[0]),s=null,u=0,c=!1,l=function(){},d=null,f="data-vue-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function m(e,t,n,o){c=n,d=o||{};var i=r(e,t);return v(i),function(t){for(var n=[],o=0;o<i.length;o++){var s=i[o];(u=a[s.id]).refs--,n.push(u)}t?v(i=r(e,t)):i=[];for(o=0;o<n.length;o++){var u;if(0===(u=n[o]).refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete a[u.id]}}}}function v(e){for(var t=0;t<e.length;t++){var n=e[t],r=a[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(g(n.parts[o]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var i=[];for(o=0;o<n.parts.length;o++)i.push(g(n.parts[o]));a[n.id]={id:n.id,refs:1,parts:i}}}}function h(){var e=document.createElement("style");return e.type="text/css",i.appendChild(e),e}function g(e){var t,n,r=document.querySelector("style["+f+'~="'+e.id+'"]');if(r){if(c)return l;r.parentNode.removeChild(r)}if(p){var o=u++;r=s||(s=h()),t=_.bind(null,r,o,!1),n=_.bind(null,r,o,!0)}else r=h(),t=function(e,t){var n=t.css,r=t.media,o=t.sourceMap;r&&e.setAttribute("media",r);d.ssrId&&e.setAttribute(f,t.id);o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}var b,y=(b=[],function(e,t){return b[e]=t,b.filter(Boolean).join("\n")});function _(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(t,o);else{var a=document.createTextNode(o),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}}]);