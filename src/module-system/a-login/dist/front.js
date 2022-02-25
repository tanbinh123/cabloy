(()=>{var e={792:(e,t,n)=>{"use strict";function r(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,u=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return s=e.done,e},e:function(e){u=!0,a=e},f:function(){try{s||null==n.return||n.return()}finally{if(u)throw a}}}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t,n,r,o,i,a){try{var s=e[i](a),u=s.value}catch(e){return void n(e)}s.done?t(u):Promise.resolve(u).then(r,o)}function a(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function s(e){i(a,r,o,s,u,"next",e)}function u(e){i(a,r,o,s,u,"throw",e)}s(void 0)}))}}n.d(t,{Z:()=>s});const s={ebAuthProviders:{meta:{global:!1},methods:{onAction:function(e){var t=this;return a(regeneratorRuntime.mark((function n(){var r,o,i;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r=e.ctx,o=e.action,i=e.item,"loadAuthProviders"!==o.name){n.next=5;break}return n.next=4,t.loadAuthProviders(r,i);case 4:return n.abrupt("return",n.sent);case 5:case"end":return n.stop()}}),n)})))()},loadAuthProviders:function(e,t){var n=this;return a(regeneratorRuntime.mark((function r(){var o,i;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=t.state,r.next=3,n.$api.post("/a/login/auth/list");case 3:if(0!==(i=r.sent).length){r.next=6;break}return r.abrupt("return",i);case 6:return r.next=8,n.__checkAuthProviders({ctx:e,providers:i,state:o});case 8:return i=r.sent,r.abrupt("return",i.filter((function(e){return!!e})));case 10:case"end":return r.stop()}}),r)})))()},__checkAuthProviders:function(e){var t=this;return a(regeneratorRuntime.mark((function n(){var o,i,a,s,u,c,l;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:o=e.ctx,i=e.providers,a=e.state,s=[],u=r(i);try{for(u.s();!(c=u.n()).done;)(l=c.value)&&s.push(t.__checkAuthProvider({ctx:o,provider:l,state:a}))}catch(e){u.e(e)}finally{u.f()}return n.next=6,Promise.all(s);case 6:return n.abrupt("return",n.sent);case 7:case"end":return n.stop()}}),n)})))()},__checkAuthProvider:function(e){var t=this;return a(regeneratorRuntime.mark((function n(){var r,o,i,a,s;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.ctx,o=e.provider,i=e.state,n.next=3,t.$meta.module.use(o.module);case 3:if(a=n.sent,o.meta.component){n.next=6;break}return n.abrupt("return",null);case 6:if("migrate"!==i||o.meta.inline){n.next=8;break}return n.abrupt("return",null);case 8:if("associate"!==i||!o.meta.disableAssociate){n.next=10;break}return n.abrupt("return",null);case 10:return s=a.options.components[o.meta.component],n.next=13,t.__checkAuthProviderDisable({ctx:r,component:s,provider:o,state:i});case 13:if(!n.sent){n.next=16;break}return n.abrupt("return",null);case 16:return n.abrupt("return",{provider:o,component:s});case 17:case"end":return n.stop()}}),n)})))()},__checkAuthProviderDisable:function(e){var t=this;return a(regeneratorRuntime.mark((function n(){var r,o,i,a;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r=e.ctx,o=e.component,i=e.provider,a=e.state,o.meta){n.next=3;break}return n.abrupt("return",!1);case 3:if("function"==typeof o.meta.disable){n.next=5;break}return n.abrupt("return",o.meta.disable);case 5:return n.next=7,t.$meta.util.wrapPromise(o.meta.disable({ctx:r,state:a,provider:i}));case 7:return n.abrupt("return",n.sent);case 8:case"end":return n.stop()}}),n)})))()}}}}},788:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r={}},933:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r={SignInTheTargetAccount:"Sign In The Target Account",LookAround:"Look Around"}},978:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r={OR:"或",SignInTheTargetAccount:"登录目标账户",LookAround:"随便看看","Sign In":"登录"}},137:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r={"en-us":n(933).Z,"zh-cn":n(978).Z}},644:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=[{path:"login",component:("login",n(990)("./".concat("login",".jsx")).default)},{path:"migrate",component:n(142)("./".concat("migrate",".vue")).default,meta:{auth:!0}}]},440:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>a});const r=window.Vue;var o=n.n(r);function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const a={meta:{title:"Sign In",size:"small",sizeFixed:!0},data:function(){return{state:this.$f7route.query.state||"login",providers:null,showClose:!1,tabPrefix:o().prototype.$meta.util.nextId("tab")}},computed:{title:function(){return this.$store.getters["auth/title"]}},mounted:function(){this.showClose=this.$meta.vueLayout.backLink(this)},created:function(){var e=this;this.$meta.util.performAction({ctx:this,action:{actionModule:"a-login",actionComponent:"ebAuthProviders",name:"loadAuthProviders"},item:{state:this.state}}).then((function(t){e.providers=t}))},render:function(){var e=arguments[0];return e("eb-page",{attrs:{"login-screen":!0,"no-toolbar":!1,"no-navbar":!0,"no-swipeback":!0}},[this._renderContainer()])},methods:{onClose:function(){this.$f7router.back()},_getComponentFullName:function(e){return"".concat(e.module,":").concat(e.meta.component)},_renderLoginTop_single:function(e){var t=this.$createElement,n=e[0].provider,r={props:{state:this.state}};return t("eb-component",{attrs:{module:n.module,name:n.meta.component,options:r}})},_renderLoginTop_multiple:function(e){var t=this.$createElement,n=[],r=[];for(var o in e){var i=e[o].provider,a=this._getComponentFullName(i),s="".concat(this.tabPrefix,"_").concat(a).replace(/[:-]/g,"_");n.push(t("f7-link",{key:a,attrs:{"tab-link":"#".concat(s),"tab-link-active":0===parseInt(o)}},[i.meta.titleLocale]));var u={props:{state:this.state}};r.push(t("f7-tab",{key:a,attrs:{id:s,"tab-active":0===parseInt(o)}},[t("eb-component",{attrs:{module:i.module,name:i.meta.component,options:u}})]))}return t("div",[t("f7-toolbar",{attrs:{top:!0,tabbar:!0}},[n]),t("f7-tabs",[r])])},_renderLoginTop:function(){if(!this.providers)return null;var e=this.providers.filter((function(e){return e.provider.meta.inline}));return 0===e.length?null:1===e.length?this._renderLoginTop_single(e):this._renderLoginTop_multiple(e)},_renderLoginBottom:function(e){var t=this.$createElement;if("migrate"===this.state)return null;if(!this.providers)return null;var n=this.providers.filter((function(e){return!e.provider.meta.inline}));if(0===n.length)return null;var r,o=[],a=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,u=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return s=e.done,e},e:function(e){u=!0,a=e},f:function(){try{s||null==n.return||n.return()}finally{if(u)throw a}}}}(n);try{for(a.s();!(r=a.n()).done;){var s=r.value.provider,u=this._getComponentFullName(s);o.push(t("eb-component",{key:u,attrs:{module:s.module,name:s.meta.component,options:{attrs:{class:"btn"}}}}))}}catch(e){a.e(e)}finally{a.f()}return t("div",{class:"btns"},[o])},_renderContainer:function(){var e,t=this.$createElement;if(!this.providers)return null;this.showClose&&(e=t("f7-link",{class:"close",attrs:{iconMaterial:"chevron_left"},on:{click:this.onClose}},[this.$text("LookAround")]));var n=t("f7-login-screen-title",[this.title]);"migrate"===this.state&&t("f7-login-screen-title",{class:"sub-title"},[this.$text("SignInTheTargetAccount")]);var r,o,i=this._renderLoginTop(),a=this._renderLoginBottom();return i&&a&&(r=t("div",{class:"line"},[t("div",{class:"text"},[this.$text("OR")])])),(r||a)&&(o=t("f7-block",[r,a])),t("div",{class:"eb-login-container"},[e,n,i,o])}}}},891:(e,t,n)=>{var r=n(233),o=n(361)(r);o.push([e.id,":root .login-screen-content,\n:root .login-screen-page,\n:root .login-screen .page {\n  background: var(--f7-page-bg-color);\n}\n:root .page.login-screen-page .login-screen-content {\n  margin-top: unset;\n  margin-bottom: unset;\n}\n:root .login-screen-page .close {\n  position: absolute;\n  top: 16px;\n  left: 16px;\n}\n:root .login-screen-page .login-screen-title.sub-title {\n  font-size: 20px;\n}\n:root .login-screen-page .line {\n  height: 1px;\n  margin: 30px 0;\n  text-align: center;\n  border-top: 1px solid var(--f7-text-editor-border-color);\n}\n:root .login-screen-page .line .text {\n  position: relative;\n  top: -10px;\n  background: var(--f7-page-bg-color);\n  display: inline-block;\n  padding: 0 8px;\n}\n:root .login-screen-page .btns {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  flex-wrap: wrap;\n  margin-bottom: 30px;\n}\n:root .login-screen-page .btns .btn {\n  width: 36px;\n  height: 36px;\n  margin: 8px;\n  cursor: pointer;\n  padding: 0;\n}\n:root .login-screen-page .btns .btn img {\n  width: 100%;\n  height: 100%;\n}\n","",{version:3,sources:["webpack://./front/src/assets/css/module.less"],names:[],mappings:"AAAA;;;EAII,mCAAA;AAAJ;AAJA;EAQI,iBAAA;EACA,oBAAA;AADJ;AARA;EAcM,kBAAA;EACA,SAAA;EACA,UAAA;AAHN;AAbA;EAoBM,eAAA;AAJN;AAhBA;EAwBM,WAAA;EACA,cAAA;EACA,kBAAA;EACA,wDAAA;AALN;AAtBA;EA8BQ,kBAAA;EACA,UAAA;EACA,mCAAA;EACA,qBAAA;EACA,cAAA;AALR;AA7BA;EAuCM,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;EACA,mBAAA;AAPN;AApCA;EA8CQ,WAAA;EACA,YAAA;EACA,WAAA;EACA,eAAA;EACA,UAAA;AAPR;AA3CA;EAqDU,WAAA;EACA,YAAA;AAPV",sourcesContent:[":root {\n  .login-screen-content,\n  .login-screen-page,\n  .login-screen .page {\n    background: var(--f7-page-bg-color);\n  }\n\n  .page.login-screen-page .login-screen-content {\n    margin-top: unset;\n    margin-bottom: unset;\n  }\n\n  .login-screen-page {\n    .close {\n      position: absolute;\n      top: 16px;\n      left: 16px;\n    }\n\n    .login-screen-title.sub-title {\n      font-size: 20px;\n    }\n\n    .line {\n      height: 1px;\n      margin: 30px 0;\n      text-align: center;\n      border-top: 1px solid var(--f7-text-editor-border-color);\n\n      .text {\n        position: relative;\n        top: -10px;\n        background: var(--f7-page-bg-color);\n        display: inline-block;\n        padding: 0 8px;\n      }\n    }\n\n    .btns {\n      display: flex;\n      flex-direction: row;\n      justify-content: center;\n      flex-wrap: wrap;\n      margin-bottom: 30px;\n\n      .btn {\n        width: 36px;\n        height: 36px;\n        margin: 8px;\n        cursor: pointer;\n        padding: 0;\n\n        img {\n          width: 100%;\n          height: 100%;\n        }\n      }\n    }\n  }\n}\n"],sourceRoot:""}]),e.exports=o},361:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=e(t);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var s=0;s<e.length;s++){var u=[].concat(e[s]);r&&o[u[0]]||(n&&(u[2]?u[2]="".concat(n," and ").concat(u[2]):u[2]=n),t.push(u))}},t}},233:e=>{"use strict";function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}e.exports=function(e){var n,r,o=(r=4,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=n){var r,o,i=[],a=!0,s=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){s=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(s)throw o}}return i}}(n,r)||function(e,n){if(e){if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=o[1],a=o[3];if(!a)return i;if("function"==typeof btoa){var s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),u="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),c="/*# ".concat(u," */"),l=a.sources.map((function(e){return"/*# sourceURL=".concat(a.sourceRoot||"").concat(e," */")}));return[i].concat(l).concat([c]).join("\n")}return[i].join("\n")}},694:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r=function(e,t,n,r,o,i,a,s){var u,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=[],c._compiled=!0),c._scopeId="data-v-b932aade",u)if(c.functional){c._injectStyles=u;var l=c.render;c.render=function(e,t){return u.call(t),l(e,t)}}else{var p=c.beforeCreate;c.beforeCreate=p?[].concat(p,u):[u]}return{exports:e,options:c}}({methods:{onPageAfterIn:function(){this.$meta.vueLayout.openLogin({query:{state:"migrate"}},{ctx:this,target:"_self",reloadCurrent:!0})}}},(function(){var e=this,t=e.$createElement;return(e._self._c||t)("f7-page",{staticClass:"eb-page-empty",on:{"page:afterin":e.onPageAfterIn}})})).exports},824:(e,t,n)=>{var r=n(891);r.__esModule&&(r=r.default),"string"==typeof r&&(r=[[e.id,r,""]]),r.locals&&(e.exports=r.locals),(0,n(159).Z)("7974aecb",r,!0,{})},159:(e,t,n)=>{"use strict";function r(e,t){for(var n=[],r={},o=0;o<t.length;o++){var i=t[o],a=i[0],s={id:e+":"+o,css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}n.d(t,{Z:()=>A});var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i={},a=o&&(document.head||document.getElementsByTagName("head")[0]),s=null,u=0,c=!1,l=function(){},p=null,f="data-vue-ssr-id",d="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function A(e,t,n,o){c=n,p=o||{};var a=r(e,t);return g(a),function(t){for(var n=[],o=0;o<a.length;o++){var s=a[o];(u=i[s.id]).refs--,n.push(u)}for(t?g(a=r(e,t)):a=[],o=0;o<n.length;o++){var u;if(0===(u=n[o]).refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete i[u.id]}}}}function g(e){for(var t=0;t<e.length;t++){var n=e[t],r=i[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(h(n.parts[o]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var a=[];for(o=0;o<n.parts.length;o++)a.push(h(n.parts[o]));i[n.id]={id:n.id,refs:1,parts:a}}}}function m(){var e=document.createElement("style");return e.type="text/css",a.appendChild(e),e}function h(e){var t,n,r=document.querySelector("style["+f+'~="'+e.id+'"]');if(r){if(c)return l;r.parentNode.removeChild(r)}if(d){var o=u++;r=s||(s=m()),t=y.bind(null,r,o,!1),n=y.bind(null,r,o,!0)}else r=m(),t=x.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}var v,b=(v=[],function(e,t){return v[e]=t,v.filter(Boolean).join("\n")});function y(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=b(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function x(e,t){var n=t.css,r=t.media,o=t.sourceMap;if(r&&e.setAttribute("media",r),p.ssrId&&e.setAttribute(f,t.id),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}},990:(e,t,n)=>{var r={"./login.jsx":440};function o(e){var t=i(e);return n(t)}function i(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=i,e.exports=o,o.id=990},142:(e,t,n)=>{var r={"./migrate.vue":694};function o(e){var t=i(e);return n(t)}function i(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=i,e.exports=o,o.id=142}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={id:r,exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{"use strict";var e;n.r(r),n.d(r,{default:()=>t}),n(824);const t={install:function(t,r){return e?console.error("already installed."):(e=t,r({routes:n(644).Z,config:n(788).Z,locales:n(137).Z,components:n(792).Z}))}}})(),window["a-login"]=r})();
//# sourceMappingURL=front.js.map