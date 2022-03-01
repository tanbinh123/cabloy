(()=>{var e={236:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r={}},788:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r={}},933:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r={MonkeyerTestTip1:"This is a monkey page",MonkeyerTestTip2:"This is a monkey component"}},978:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r={MonkeyerTestTip1:"这是一个Monkey页面",MonkeyerTestTip2:"这是一个Monkey组件","Monkey Test":"Monkey测试"}},137:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r={"en-us":n(933).Z,"zh-cn":n(978).Z}},468:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var r=n(605);const o={data:function(){return{}},created:function(){console.log("monkey-component module:",this.$module.name)}},s=(0,n(792).Z)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("f7-block",{attrs:{strong:""}},[n("div",{staticClass:"alert-info"},[e._v(e._s(e.$text("MonkeyerTestTip2")))])])}),[],!1,null,"679109e4",null).exports;function a(e){return{moduleLoaded:function(t){var n=t.module;if("test-party"===n.name){var o=e.prototype.$meta.module.get("test-partymonkey");!function(e,t,n,r){var o=t.options.routes.find((function(e){return"kitchen-sink/monkey/monkeyee"===e.path}));o&&(o.module=e,o.component=r)}(o,n,0,r.default),function(e,t){var n=t.options.store,r=n.getters.message2;n.getters.message2=function(e){var t=r(e);return console.log("monkey-store message2:",t),t};var o=n.mutations.setMessage;n.mutations.setMessage=function(e,t){o(e,t),console.log("monkey-store setMessage:",e.message)}}(0,n),function(e,t){t.options.config.monkeyed=!0}(0,n),function(e,t,n,r){r.module=e,t.options.components.monkeyeeComponent=r}(o,n,0,s)}}}}},644:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=[]},81:(e,t,n)=>{"use strict";function r(e){return{state:{},getters:{},mutations:{},actions:{}}}n.d(t,{Z:()=>r})},891:(e,t,n)=>{var r=n(233),o=n(361)(r);o.push([e.id,"","",{version:3,sources:[],names:[],mappings:"",sourceRoot:""}]),e.exports=o},361:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=e(t);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var s=0;s<this.length;s++){var a=this[s][0];null!=a&&(o[a]=!0)}for(var i=0;i<e.length;i++){var c=[].concat(e[i]);r&&o[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}},233:e=>{"use strict";function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}e.exports=function(e){var n,r,o=(r=4,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=n){var r,o,s=[],a=!0,i=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(s.push(r.value),!t||s.length!==t);a=!0);}catch(e){i=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(i)throw o}}return s}}(n,r)||function(e,n){if(e){if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),s=o[1],a=o[3];if(!a)return s;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),u="/*# ".concat(c," */"),l=a.sources.map((function(e){return"/*# sourceURL=".concat(a.sourceRoot||"").concat(e," */")}));return[s].concat(l).concat([u]).join("\n")}return[s].join("\n")}},605:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>o});const r={data:function(){return{}},created:function(){console.log("monkey-route module:",this.$module.name);var e=this.$store.getters["test/party/message2"];console.log("monkey-store message2:",e);var t=this.$store.getState("test/party/message");this.$store.commit("test/party/setMessage","test for monkey");var n=this.$store.getState("test/party/message");console.log("monkey-store setMessage:",n),this.$store.commit("test/party/setMessage",t),console.log("monkey-config monkeyed:",this.$meta.config.modules["test-party"].monkeyed)}},o=(0,n(792).Z)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("eb-page",[n("eb-navbar",{attrs:{large:"",largeTransparent:"",title:e.$text("Monkey Test"),"eb-back-link":"Back"}}),e._v(" "),n("f7-block",{attrs:{strong:""}},[n("div",{staticClass:"alert-info"},[e._v(e._s(e.$text("MonkeyerTestTip1")))]),e._v(" "),n("eb-component",{attrs:{module:"test-party",name:"monkeyeeComponent"}})],1)],1)}),[],!1,null,"4e902f53",null).exports},792:(e,t,n)=>{"use strict";function r(e,t,n,r,o,s,a,i){var c,u="function"==typeof e?e.options:e;if(t&&(u.render=t,u.staticRenderFns=n,u._compiled=!0),r&&(u.functional=!0),s&&(u._scopeId="data-v-"+s),a?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},u._ssrRegister=c):o&&(c=i?function(){o.call(this,(u.functional?this.parent:this).$root.$options.shadowRoot)}:o),c)if(u.functional){u._injectStyles=c;var l=u.render;u.render=function(e,t){return c.call(t),l(e,t)}}else{var d=u.beforeCreate;u.beforeCreate=d?[].concat(d,c):[c]}return{exports:e,options:u}}n.d(t,{Z:()=>r})},824:(e,t,n)=>{var r=n(891);r.__esModule&&(r=r.default),"string"==typeof r&&(r=[[e.id,r,""]]),r.locals&&(e.exports=r.locals),(0,n(159).Z)("2b4fc06d",r,!0,{})},159:(e,t,n)=>{"use strict";function r(e,t){for(var n=[],r={},o=0;o<t.length;o++){var s=t[o],a=s[0],i={id:e+":"+o,css:s[1],media:s[2],sourceMap:s[3]};r[a]?r[a].parts.push(i):n.push(r[a]={id:a,parts:[i]})}return n}n.d(t,{Z:()=>m});var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var s={},a=o&&(document.head||document.getElementsByTagName("head")[0]),i=null,c=0,u=!1,l=function(){},d=null,f="data-vue-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function m(e,t,n,o){u=n,d=o||{};var a=r(e,t);return y(a),function(t){for(var n=[],o=0;o<a.length;o++){var i=a[o];(c=s[i.id]).refs--,n.push(c)}for(t?y(a=r(e,t)):a=[],o=0;o<n.length;o++){var c;if(0===(c=n[o]).refs){for(var u=0;u<c.parts.length;u++)c.parts[u]();delete s[c.id]}}}}function y(e){for(var t=0;t<e.length;t++){var n=e[t],r=s[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(g(n.parts[o]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var a=[];for(o=0;o<n.parts.length;o++)a.push(g(n.parts[o]));s[n.id]={id:n.id,refs:1,parts:a}}}}function v(){var e=document.createElement("style");return e.type="text/css",a.appendChild(e),e}function g(e){var t,n,r=document.querySelector("style["+f+'~="'+e.id+'"]');if(r){if(u)return l;r.parentNode.removeChild(r)}if(p){var o=c++;r=i||(i=v()),t=k.bind(null,r,o,!1),n=k.bind(null,r,o,!0)}else r=v(),t=_.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}var h,b=(h=[],function(e,t){return h[e]=t,h.filter(Boolean).join("\n")});function k(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=b(t,o);else{var s=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(s,a[t]):e.appendChild(s)}}function _(e,t){var n=t.css,r=t.media,o=t.sourceMap;if(r&&e.setAttribute("media",r),d.ssrId&&e.setAttribute(f,t.id),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}},142:(e,t,n)=>{var r={"./monkeyer.vue":605};function o(e){var t=s(e);return n(t)}function s(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=s,e.exports=o,o.id=142}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={id:r,exports:{}};return e[r](s,s.exports,n),s.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{"use strict";var e;n.r(r),n.d(r,{default:()=>t}),n(824);const t={install:function(t,r){return e?console.error("already installed."):(e=t,r({routes:n(644).Z,store:n(81).Z(e),config:n(788).Z,locales:n(137).Z,components:n(236).Z,monkey:n(468).Z(e)}))}}})(),window["test-partymonkey"]=r})();
//# sourceMappingURL=front.js.map