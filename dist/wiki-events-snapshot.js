parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"war4":[function(require,module,exports) {
exports.endianness=function(){return"LE"},exports.hostname=function(){return"undefined"!=typeof location?location.hostname:""},exports.loadavg=function(){return[]},exports.uptime=function(){return 0},exports.freemem=function(){return Number.MAX_VALUE},exports.totalmem=function(){return Number.MAX_VALUE},exports.cpus=function(){return[]},exports.type=function(){return"Browser"},exports.release=function(){return"undefined"!=typeof navigator?navigator.appVersion:""},exports.networkInterfaces=exports.getNetworkInterfaces=function(){return{}},exports.arch=function(){return"javascript"},exports.platform=function(){return"browser"},exports.tmpdir=exports.tmpDir=function(){return"/tmp"},exports.EOL="\n",exports.homedir=function(){return"/"};
},{}],"g5IB":[function(require,module,exports) {

var t,e,n=module.exports={};function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(t===setTimeout)return setTimeout(e,0);if((t===r||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}function u(t){if(e===clearTimeout)return clearTimeout(t);if((e===o||!e)&&clearTimeout)return e=clearTimeout,clearTimeout(t);try{return e(t)}catch(n){try{return e.call(null,t)}catch(n){return e.call(this,t)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:r}catch(n){t=r}try{e="function"==typeof clearTimeout?clearTimeout:o}catch(n){e=o}}();var c,s=[],l=!1,a=-1;function f(){l&&c&&(l=!1,c.length?s=c.concat(s):a=-1,s.length&&h())}function h(){if(!l){var t=i(f);l=!0;for(var e=s.length;e;){for(c=s,s=[];++a<e;)c&&c[a].run();a=-1,e=s.length}c=null,l=!1,u(t)}}function m(t,e){this.fun=t,this.array=e}function p(){}n.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];s.push(new m(t,e)),1!==s.length||l||i(h)},m.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.env={},n.argv=[],n.version="",n.versions={},n.on=p,n.addListener=p,n.once=p,n.off=p,n.removeListener=p,n.removeAllListeners=p,n.emit=p,n.prependListener=p,n.prependOnceListener=p,n.listeners=function(t){return[]},n.binding=function(t){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(t){throw new Error("process.chdir is not supported")},n.umask=function(){return 0};
},{}],"EawX":[function(require,module,exports) {
var process = require("process");
var r=require("process"),t=r&&r.pid?r.pid.toString(36):"",e="";if("function"!=typeof __webpack_require__){var o="",n=require("os").networkInterfaces();for(let r in n){const t=n[r],e=t.length;for(var i=0;i<e;i++)if(t[i].mac&&"00:00:00:00:00:00"!=t[i].mac){o=t[i].mac;break}}e=o?parseInt(o.replace(/\:|\D+/gi,"")).toString(36):""}function u(){var r=Date.now(),t=u.last||r;return u.last=r>t?r:t+1}module.exports=module.exports.default=function(r,o){return(r||"")+e+t+u().toString(36)+(o||"")},module.exports.process=function(r,e){return(r||"")+t+u().toString(36)+(e||"")},module.exports.time=function(r,t){return(r||"")+u().toString(36)+(t||"")};
},{"os":"war4","process":"g5IB"}],"RCNQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createSnapshot=u,exports.rebuildSnapshot=i;var e=t(require("uniqid"));function t(e){return e&&e.__esModule?e:{default:e}}function n(e){return/^(?:[a-z]+:)?\/\//.test(e)}function r(e,t){if("string"==typeof t){if(n(t))return t;var r=e.split("/"),o=t.split("/");return r.pop(),o.forEach(function(e){".."===e?r.pop():"."===e||r.push(e)}),r.join("/")}return null}function o(e){return["href","src"].includes(e)}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return Array.from(e).map(function(e){return{name:"class"===e.name?"className":e.name,value:o(e.name)?r(window.location.href,e.value):e.value}})}function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return Array.from(e).map(function(e){return t(e)})}function u(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=t.__we_id__||(0,e.default)();switch(t.__we_id__||(t.__we_id__=r),t.nodeType){case Node.COMMENT_NODE:return{__we_id__:r,textContent:t.textContent,type:Node.COMMENT_NODE};case Node.DOCUMENT_NODE:return{__we_id__:r,childNodes:n?d(t.childNodes,u):[],type:t.nodeType};case Node.DOCUMENT_TYPE_NODE:return{__we_id__:r,name:t.name,publicId:t.publicId,systemId:t.systemId,type:t.nodeType};case Node.ELEMENT_NODE:return{__we_id__:r,attrs:a(t.attributes),childNodes:n?d(t.childNodes,u):[],tagName:t.tagName,type:t.nodeType};case Node.TEXT_NODE:return{__we_id__:r,textContent:t.textContent,type:t.nodeType};default:return{}}}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];switch(e.type){case Node.COMMENT_NODE:return document.createComment(e.textContent);case Node.DOCUMENT_NODE:var n=document.implementation.createDocument(null,"",null);return e.childNodes.forEach(function(e){return n.appendChild(i(e,t))}),n;case Node.DOCUMENT_TYPE_NODE:return document.implementation.createDocumentType(e.name,e.systemId,e.publicId);case Node.ELEMENT_NODE:var r=document.createElement(e.tagName);return e.attrs.forEach(function(e){var t=e.name,n=e.value;return r.setAttribute("className"===t?"class":t,n)}),e.childNodes.forEach(function(e){return r.appendChild(i(e,t))}),t&&r.setAttribute("data-we-id",e.__we_id__),r;case Node.TEXT_NODE:return document.createTextNode(e.textContent);default:return null}}
},{"uniqid":"EawX"}]},{},["RCNQ"], "$wes")
//# sourceMappingURL=/wiki-events-snapshot.js.map