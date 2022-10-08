(()=>{var t,e,n={56:(t,e,n)=>{"use strict";function r(){return JSON.parse(JSON.stringify({credentials:"same-origin",headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json;"}}))}function o(t,e){return fetch(t,e).then((function(t){if(!t.ok)throw t;return t.json()}))}function i(){return o("/cart.js",r())}function a(t){if("string"!=typeof t||2!==t.split(":").length)throw new TypeError("Theme Cart: Provided key value is not a string with the format xxx:xxx")}function u(){return i()}function s(t,e){return e=e||{},function(t){if("number"!=typeof t||isNaN(t))throw new TypeError("Theme Cart: Variant ID must be a number")}(t),function(t,e,n){var i=r();return i.method="POST",i.body=JSON.stringify({id:t,quantity:e,properties:n}),o("/cart/add.js",i)}(t,e.quantity,e.properties)}function c(t,e){return a(t),function(t){if("object"!=typeof t)throw new TypeError("Theme Cart: Options must be an object");if(void 0===t.quantity&&void 0===t.properties)throw new Error("Theme Cart: You muse define a value for quantity or properties");void 0!==t.quantity&&function(t){if("number"!=typeof t||isNaN(t))throw new TypeError("Theme Cart: An object which specifies a quantity or properties value is required")}(t.quantity),void 0!==t.properties&&function(t){if("object"!=typeof t)throw new TypeError("Theme Cart: Properties must be an object")}(t.properties)}(e),function(t){return a(t),i().then((function(e){var n=-1;return e.items.forEach((function(e,r){n=e.key===t?r+1:n})),-1===n?Promise.reject(new Error("Theme Cart: Unable to match line item with provided key")):n}))}(t).then((function(t){return function(t,e){var n=r();return e=e||{},n.method="POST",n.body=JSON.stringify({line:t,quantity:e.quantity,properties:e.properties}),o("/cart/change.js",n)}(t,e)}))}n.d(e,{jX:()=>s,y0:()=>u,$G:()=>c})},750:(t,e,n)=>{"use strict";function r(t,e){"string"==typeof t&&(t=t.replace(".",""));let n="";const r=/\{\{\s*(\w+)\s*\}\}/,o=e||"${{amount}}";function i(t,e=2,n=",",r="."){if(isNaN(t)||null==t)return 0;const o=(t=(t/100).toFixed(e)).split(".");return o[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,`$1${n}`)+(o[1]?r+o[1]:"")}switch(o.match(r)[1]){case"amount":n=i(t,2);break;case"amount_no_decimals":n=i(t,0);break;case"amount_with_comma_separator":n=i(t,2,".",",");break;case"amount_no_decimals_with_comma_separator":n=i(t,0,".",",")}return o.replace(r,n)}n.d(e,{l:()=>r})},391:(t,e,n)=>{n.p=window.__webpack_public_path__}},r={};function o(t){var e=r[t];if(void 0!==e)return e.exports;var i=r[t]={exports:{}};return n[t](i,i.exports,o),i.exports}o.m=n,o.d=(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.f={},o.e=t=>Promise.all(Object.keys(o.f).reduce(((e,n)=>(o.f[n](t,e),e)),[])),o.u=t=>({355:"a30bd",447:"b6101"}[t]+".bundle.js"),o.miniCssF=t=>{},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),t={},e="shopify-starter-theme:",o.l=(n,r,i,a)=>{if(t[n])t[n].push(r);else{var u,s;if(void 0!==i)for(var c=document.getElementsByTagName("script"),p=0;p<c.length;p++){var d=c[p];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==e+i){u=d;break}}u||(s=!0,(u=document.createElement("script")).charset="utf-8",u.timeout=120,o.nc&&u.setAttribute("nonce",o.nc),u.setAttribute("data-webpack",e+i),u.src=n),t[n]=[r];var l=(e,r)=>{u.onerror=u.onload=null,clearTimeout(f);var o=t[n];if(delete t[n],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((t=>t(r))),e)return e(r)},f=setTimeout(l.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=l.bind(null,u.onerror),u.onload=l.bind(null,u.onload),s&&document.head.appendChild(u)}},o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;o.g.importScripts&&(t=o.g.location+"");var e=o.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var n=e.getElementsByTagName("script");n.length&&(t=n[n.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=t})(),(()=>{var t={18:0};o.f.j=(e,n)=>{var r=o.o(t,e)?t[e]:void 0;if(0!==r)if(r)n.push(r[2]);else{var i=new Promise(((n,o)=>r=t[e]=[n,o]));n.push(r[2]=i);var a=o.p+o.u(e),u=new Error;o.l(a,(n=>{if(o.o(t,e)&&(0!==(r=t[e])&&(t[e]=void 0),r)){var i=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;u.message="Loading chunk "+e+" failed.\n("+i+": "+a+")",u.name="ChunkLoadError",u.type=i,u.request=a,r[1](u)}}),"chunk-"+e,e)}};var e=(e,n)=>{var r,i,[a,u,s]=n,c=0;if(a.some((e=>0!==t[e]))){for(r in u)o.o(u,r)&&(o.m[r]=u[r]);s&&s(o)}for(e&&e(n);c<a.length;c++)i=a[c],o.o(t,i)&&t[i]&&t[i][0](),t[i]=0},n=self.webpackChunkshopify_starter_theme=self.webpackChunkshopify_starter_theme||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))})(),(()=>{"use strict";function t(){this.entries=[]}function e(t){if("object"!=typeof t)throw new TypeError(t+" is not an object.");if(0===Object.keys(t).length&&t.constructor===Object)throw new Error(t+" is empty.")}t.prototype.add=function(t,e,n){this.entries.push({element:t,event:e,fn:n}),t.addEventListener(e,n)},t.prototype.removeAll=function(){this.entries=this.entries.filter((function(t){return t.element.removeEventListener(t.event,t.fn),!1}))};function n(e,n,r){this.element=e,this.product=function(t){if("object"!=typeof t)throw new TypeError(t+" is not an object.");if(void 0===t.variants[0].options)throw new TypeError("Product object is invalid. Make sure you use the product object that is output from {{ product | json }} or from the http://[your-product-url].js route");return t}(n),r=r||{},this._listeners=new t,this._listeners.add(this.element,"submit",this._onSubmit.bind(this,r)),this.optionInputs=this._initInputs('[name^="options"]',r.onOptionChange),this.quantityInputs=this._initInputs('[name="quantity"]',r.onQuantityChange),this.propertyInputs=this._initInputs('[name^="properties"]',r.onPropertyChange)}n.prototype.destroy=function(){this._listeners.removeAll()},n.prototype.options=function(){return t=this.optionInputs,e=function(t){return t.name=/(?:^(options\[))(.*?)(?:\])/.exec(t.name)[2],t},t.reduce((function(t,n){return(n.checked||"radio"!==n.type&&"checkbox"!==n.type)&&t.push(e({name:n.name,value:n.value})),t}),[]);var t,e},n.prototype.variant=function(){return function(t,n){e(t);var r=function(t,n){e(t),function(t){if(!Array.isArray(t))throw new TypeError(t+" is not an array.");if(0===t.length)return[];if(!t[0].hasOwnProperty("name"))throw new Error(t[0]+"does not contain name key.");if("string"!=typeof t[0].name)throw new TypeError("Invalid value type passed for name of option "+t[0].name+". Value should be string.")}(n);var r=[];return n.forEach((function(e){for(var n=0;n<t.options.length;n++)if(t.options[n].name.toLowerCase()===e.name.toLowerCase()){r[n]=e.value;break}})),r}(t,n);return function(t,n){return e(t),function(t){if(Array.isArray(t)&&"object"==typeof t[0])throw new Error(t+"is not a valid array of options.")}(n),t.variants.filter((function(t){return n.every((function(e,n){return t.options[n]===e}))}))[0]||null}(t,r)}(this.product,this.options())},n.prototype.properties=function(){var t,e,n=(t=this.propertyInputs,e=function(t){return/(?:^(properties\[))(.*?)(?:\])/.exec(t)[2]},t.reduce((function(t,n){return(n.checked||"radio"!==n.type&&"checkbox"!==n.type)&&(t[e(n.name)]=n.value),t}),{}));return 0===Object.entries(n).length?null:n},n.prototype.quantity=function(){return this.quantityInputs[0]?Number.parseInt(this.quantityInputs[0].value,10):1},n.prototype._setIdInputValue=function(t){var e=this.element.querySelector('[name="id"]');e||((e=document.createElement("input")).type="hidden",e.name="id",this.element.appendChild(e)),e.value=t.toString()},n.prototype._onSubmit=function(t,e){e.dataset=this._getProductFormEventData(),e.dataset.variant&&this._setIdInputValue(e.dataset.variant.id),t.onFormSubmit&&t.onFormSubmit(e)},n.prototype._onFormEvent=function(t){return void 0===t?Function.prototype:function(e){e.dataset=this._getProductFormEventData(),t(e)}.bind(this)},n.prototype._initInputs=function(t,e){return Array.prototype.slice.call(this.element.querySelectorAll(t)).map(function(t){return this._listeners.add(t,"change",this._onFormEvent(e)),t}.bind(this))},n.prototype._getProductFormEventData=function(){return{options:this.options(),variant:this.variant(),properties:this.properties(),quantity:this.quantity()}};var r=o(750),i=o(56);o(391);var a=document.querySelector("[data-add-to-cart]"),u=document.querySelector("[data-featured-image]"),s=document.querySelector("[data-product-form]"),c=document.querySelectorAll("[data-stock-message]"),p=document.querySelectorAll("[data-thumbnail-links]"),d=window.theme.strings,l=window.theme.moneyFormat;function f(t,e){u.src=t,u.alt=e,u.srcset=""}function h(t){var e=t.dataset.variant;if(console.log(t),console.log("onOptionChange"),c.forEach((function(t){return t.classList.add("hidden")})),!e)return a.disabled=!0,void(a.innerHTML=d.unavailable);document.getElementById("stock-message-".concat(e.id)).classList.remove("hidden"),e.featured_image&&f(e.featured_image.src,e.featured_image.alt),null===e?(a.disabled=!0,a.innerHTML=d.unavailable):e&&!e.available?(a.disabled=!0,a.innerHTML=d.soldOut):e&&e.available&&(a.disabled=!1,a.innerHTML="".concat(d.addToCart," &middot; ").concat((0,r.l)(e.price,l)))}function m(t){console.log(t),t.preventDefault(),a.classList.add("loading");var e=t.dataset.variant.id,n=t.dataset.quantity,r=t.dataset.properties;(0,i.jX)(e,{quantity:n,properties:r}).then((function(){a.classList.remove("loading"),Promise.all([o.e(355),o.e(447)]).then(o.bind(o,529)).then((function(t){return(0,t.default)(),!0})).catch((function(){return!1})).then((function(t){!1===t&&(window.location.href="/cart")}))})).catch((function(){a.classList.remove("loading"),s.submit()}))}p&&p.forEach((function(t){t.addEventListener("click",(function(t){t.preventDefault(),f(t.currentTarget.href,t.target.alt)}))})),fetch("/products/".concat(s.dataset.productHandle,".js")).then((function(t){return t.json()})).then((function(t){new n(s,t,{onOptionChange:h,onFormSubmit:m})}))})()})();