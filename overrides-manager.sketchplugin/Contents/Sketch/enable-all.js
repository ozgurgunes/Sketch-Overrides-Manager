var that=this;function __skpm_run(e,t){that.context=t;var n=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="./src/enable-all.js")}({"./node_modules/sketch-module-google-analytics/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/sketch-module-google-analytics/index.js ***!
  \**************************************************************/
/*! no static exports found */function(e,t){var n=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid");n||(n=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(n,"google.analytics.uuid")),e.exports=function(e,t,r,o){var s={v:1,tid:t,ds:"Sketch "+NSBundle.mainBundle().objectForInfoDictionaryKey("CFBundleShortVersionString"),cid:n,t:r,an:e.plugin.name(),aid:e.plugin.identifier(),av:e.plugin.version()};o&&Object.keys(o).forEach(function(e){s[e]=o[e]});var a=NSURL.URLWithString(NSString.stringWithFormat("https://www.google-analytics.com/collect%@",function(e){return"?"+Object.keys(e).map(function(t){return encodeURIComponent(t)+"="+encodeURIComponent(e[t])}).join("&")}(s)));a&&NSURLSession.sharedSession().dataTaskWithURL(a).resume()}},"./src/analytics.js":
/*!**************************!*\
  !*** ./src/analytics.js ***!
  \**************************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t);var r=n(/*! sketch-module-google-analytics */"./node_modules/sketch-module-google-analytics/index.js"),o=n.n(r),s=n(/*! ./defaults.js */"./src/defaults.js");t.default=function(e,t,n,r){var a={};return a.ec=s.PLUGIN_NAME,t&&(a.ea=t),n&&(a.el=n),r&&(a.ev=r),o()(e,s.GA_TRACKING_ID,"event",a)}},"./src/defaults.js":
/*!*************************!*\
  !*** ./src/defaults.js ***!
  \*************************/
/*! exports provided: PLUGIN_NAME, PLUGIN_KEY, GA_TRACKING_ID */function(e,t,n){"use strict";n.r(t),n.d(t,"PLUGIN_NAME",function(){return r}),n.d(t,"PLUGIN_KEY",function(){return o}),n.d(t,"GA_TRACKING_ID",function(){return s});var r="Overrides Manager",o="com.gunesozgur.sketch.overrides-manager",s="UA-5738625-2"},"./src/enable-all.js":
/*!***************************!*\
  !*** ./src/enable-all.js ***!
  \***************************/
/*! exports provided: default */function(e,n,r){"use strict";r.r(n);var o=r(/*! sketch/dom */"sketch/dom"),s=r.n(o),a=r(/*! sketch/ui */"sketch/ui"),u=r.n(a),i=r(/*! ./analytics.js */"./src/analytics.js"),c=s.a.getSelectedDocument().selectedLayers;n.default=function(){1!=c.length||c.layers[0].type!=s.a.Types.SymbolMaster?u.a.message("Please select a symbol master."):(c.layers[0].overrides.map(function(e){e.editable=!0}),t.document.reloadInspector(),Object(i.default)(t,"Enable All Overrides"),u.a.message("Overrides Manager: All overrides been enabled."))}},"sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */function(e,t){e.exports=require("sketch/dom")},"sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */function(e,t){e.exports=require("sketch/ui")}});"default"===e&&"function"==typeof n?n(t):n[e](t)}that.onRun=__skpm_run.bind(this,"default");