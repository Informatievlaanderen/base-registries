(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["status"],{"02f4":function(t,e,n){var r=n("4588"),i=n("be13");t.exports=function(t){return function(e,n){var a,s,o=String(i(e)),c=r(n),u=o.length;return c<0||c>=u?t?"":void 0:(a=o.charCodeAt(c),a<55296||a>56319||c+1===u||(s=o.charCodeAt(c+1))<56320||s>57343?t?o.charAt(c):a:t?o.slice(c,c+2):s-56320+(a-55296<<10)+65536)}}},"0390":function(t,e,n){"use strict";var r=n("02f4")(!0);t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},"0bfb":function(t,e,n){"use strict";var r=n("cb7c");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"214f":function(t,e,n){"use strict";n("b0c5");var r=n("2aba"),i=n("32e9"),a=n("79e5"),s=n("be13"),o=n("2b4c"),c=n("520a"),u=o("species"),l=!a((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),d=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();t.exports=function(t,e,n){var f=o(t),p=!a((function(){var e={};return e[f]=function(){return 7},7!=""[t](e)})),v=p?!a((function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[u]=function(){return n}),n[f](""),!e})):void 0;if(!p||!v||"replace"===t&&!l||"split"===t&&!d){var g=/./[f],h=n(s,f,""[t],(function(t,e,n,r,i){return e.exec===c?p&&!i?{done:!0,value:g.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}})),m=h[0],b=h[1];r(String.prototype,t,m),i(RegExp.prototype,f,2==e?function(t,e){return b.call(t,this,e)}:function(t){return b.call(t,this)})}}},"230e":function(t,e,n){var r=n("d3f4"),i=n("7726").document,a=r(i)&&r(i.createElement);t.exports=function(t){return a?i.createElement(t):{}}},"23c6":function(t,e,n){var r=n("2d95"),i=n("2b4c")("toStringTag"),a="Arguments"==r(function(){return arguments}()),s=function(t,e){try{return t[e]}catch(n){}};t.exports=function(t){var e,n,o;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=s(e=Object(t),i))?n:a?r(e):"Object"==(o=r(e))&&"function"==typeof e.callee?"Arguments":o}},"28a5":function(t,e,n){"use strict";var r=n("aae3"),i=n("cb7c"),a=n("ebd6"),s=n("0390"),o=n("9def"),c=n("5f1b"),u=n("520a"),l=n("79e5"),d=Math.min,f=[].push,p="split",v="length",g="lastIndex",h=4294967295,m=!l((function(){RegExp(h,"y")}));n("214f")("split",2,(function(t,e,n,l){var b;return b="c"=="abbc"[p](/(b)*/)[1]||4!="test"[p](/(?:)/,-1)[v]||2!="ab"[p](/(?:ab)*/)[v]||4!="."[p](/(.?)(.?)/)[v]||"."[p](/()()/)[v]>1||""[p](/.?/)[v]?function(t,e){var i=String(this);if(void 0===t&&0===e)return[];if(!r(t))return n.call(i,t,e);var a,s,o,c=[],l=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),d=0,p=void 0===e?h:e>>>0,m=new RegExp(t.source,l+"g");while(a=u.call(m,i)){if(s=m[g],s>d&&(c.push(i.slice(d,a.index)),a[v]>1&&a.index<i[v]&&f.apply(c,a.slice(1)),o=a[0][v],d=s,c[v]>=p))break;m[g]===a.index&&m[g]++}return d===i[v]?!o&&m.test("")||c.push(""):c.push(i.slice(d)),c[v]>p?c.slice(0,p):c}:"0"[p](void 0,0)[v]?function(t,e){return void 0===t&&0===e?[]:n.call(this,t,e)}:n,[function(n,r){var i=t(this),a=void 0==n?void 0:n[e];return void 0!==a?a.call(n,i,r):b.call(String(i),n,r)},function(t,e){var r=l(b,t,this,e,b!==n);if(r.done)return r.value;var u=i(t),f=String(this),p=a(u,RegExp),v=u.unicode,g=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(m?"y":"g"),y=new p(m?u:"^(?:"+u.source+")",g),w=void 0===e?h:e>>>0;if(0===w)return[];if(0===f.length)return null===c(y,f)?[f]:[];var _=0,x=0,S=[];while(x<f.length){y.lastIndex=m?x:0;var j,L=c(y,m?f:f.slice(x));if(null===L||(j=d(o(y.lastIndex+(m?0:x)),f.length))===_)x=s(f,x,v);else{if(S.push(f.slice(_,x)),S.length===w)return S;for(var C=1;C<=L.length-1;C++)if(S.push(L[C]),S.length===w)return S;x=_=j}}return S.push(f.slice(_)),S}]}))},"2aba":function(t,e,n){var r=n("7726"),i=n("32e9"),a=n("69a8"),s=n("ca5a")("src"),o=n("fa5b"),c="toString",u=(""+o).split(c);n("8378").inspectSource=function(t){return o.call(t)},(t.exports=function(t,e,n,o){var c="function"==typeof n;c&&(a(n,"name")||i(n,"name",e)),t[e]!==n&&(c&&(a(n,s)||i(n,s,t[e]?""+t[e]:u.join(String(e)))),t===r?t[e]=n:o?t[e]?t[e]=n:i(t,e,n):(delete t[e],i(t,e,n)))})(Function.prototype,c,(function(){return"function"==typeof this&&this[s]||o.call(this)}))},"2b4c":function(t,e,n){var r=n("5537")("wks"),i=n("ca5a"),a=n("7726").Symbol,s="function"==typeof a,o=t.exports=function(t){return r[t]||(r[t]=s&&a[t]||(s?a:i)("Symbol."+t))};o.store=r},"2d00":function(t,e){t.exports=!1},"2d95":function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},"2f21":function(t,e,n){"use strict";var r=n("79e5");t.exports=function(t,e){return!!t&&r((function(){e?t.call(null,(function(){}),1):t.call(null)}))}},"32e9":function(t,e,n){var r=n("86cc"),i=n("4630");t.exports=n("9e1e")?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},"3eea":function(t,e,n){},4588:function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},4630:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},4734:function(t,e,n){"use strict";var r=n("4bd7"),i=n.n(r);i.a},"4bd7":function(t,e,n){},"4bf8":function(t,e,n){var r=n("be13");t.exports=function(t){return Object(r(t))}},"520a":function(t,e,n){"use strict";var r=n("0bfb"),i=RegExp.prototype.exec,a=String.prototype.replace,s=i,o="lastIndex",c=function(){var t=/a/,e=/b*/g;return i.call(t,"a"),i.call(e,"a"),0!==t[o]||0!==e[o]}(),u=void 0!==/()??/.exec("")[1],l=c||u;l&&(s=function(t){var e,n,s,l,d=this;return u&&(n=new RegExp("^"+d.source+"$(?!\\s)",r.call(d))),c&&(e=d[o]),s=i.call(d,t),c&&s&&(d[o]=d.global?s.index+s[0].length:e),u&&s&&s.length>1&&a.call(s[0],n,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(s[l]=void 0)})),s}),t.exports=s},5537:function(t,e,n){var r=n("8378"),i=n("7726"),a="__core-js_shared__",s=i[a]||(i[a]={});(t.exports=function(t,e){return s[t]||(s[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n("2d00")?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},"55dd":function(t,e,n){"use strict";var r=n("5ca1"),i=n("d8e8"),a=n("4bf8"),s=n("79e5"),o=[].sort,c=[1,2,3];r(r.P+r.F*(s((function(){c.sort(void 0)}))||!s((function(){c.sort(null)}))||!n("2f21")(o)),"Array",{sort:function(t){return void 0===t?o.call(a(this)):o.call(a(this),i(t))}})},"5ca1":function(t,e,n){var r=n("7726"),i=n("8378"),a=n("32e9"),s=n("2aba"),o=n("9b43"),c="prototype",u=function(t,e,n){var l,d,f,p,v=t&u.F,g=t&u.G,h=t&u.S,m=t&u.P,b=t&u.B,y=g?r:h?r[e]||(r[e]={}):(r[e]||{})[c],w=g?i:i[e]||(i[e]={}),_=w[c]||(w[c]={});for(l in g&&(n=e),n)d=!v&&y&&void 0!==y[l],f=(d?y:n)[l],p=b&&d?o(f,r):m&&"function"==typeof f?o(Function.call,f):f,y&&s(y,l,f,t&u.U),w[l]!=f&&a(w,l,p),m&&_[l]!=f&&(_[l]=f)};r.core=i,u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},"5f1b":function(t,e,n){"use strict";var r=n("23c6"),i=RegExp.prototype.exec;t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var a=n.call(t,e);if("object"!==typeof a)throw new TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==r(t))throw new TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},"60f6":function(t,e,n){},"66bb":function(t,e,n){},"69a8":function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},"6a99":function(t,e,n){var r=n("d3f4");t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},7726:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},"77cc":function(t,e,n){"use strict";var r=n("a383"),i=n.n(r);i.a},"79e5":function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},8378:function(t,e){var n=t.exports={version:"2.6.11"};"number"==typeof __e&&(__e=n)},"86cc":function(t,e,n){var r=n("cb7c"),i=n("c69a"),a=n("6a99"),s=Object.defineProperty;e.f=n("9e1e")?Object.defineProperty:function(t,e,n){if(r(t),e=a(e,!0),r(n),i)try{return s(t,e,n)}catch(o){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},"98c0":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("vl-page",[n("vl-region",{attrs:{"mod-no-space-bottom":""}},[n("vl-layout",[n("header",{staticClass:"wp-pt-heading"},[n("div",{staticClass:"wp-pt-heading__title-wrapper"},[n("vl-title",{staticClass:"wp-pt-heading__title",attrs:{"tag-name":"h1"}},[t._v("Status")])],1),n("vl-grid",[n("vl-column",{attrs:{width:"9","width-s":"12"}},[n("div",{staticClass:"wp-pt-heading__content"},[n("vl-typography",[n("vl-introduction",[t._v("\n                  Wat is de "),n("strong",[t._v("huidige")]),t._v(" status van de basisregisters? Bekijk hier het live overzicht!\n                ")])],1)],1)])],1)],1)])],1),n("vl-main",[n("vl-region",[n("vl-layout",[n("vl-grid",{attrs:{"mod-stacked":""}},[n("vl-column",{attrs:{width:"12"}},[n("vl-grid",{attrs:{"mod-stacked":""}},[n("vl-column",{attrs:{width:"12","width-m":"6","width-s":"12"}},[n("registry-status",{attrs:{title:"Gemeenten",text:"de Belgische gemeenten.",to:"/registers/gemeenten",status:t.municipalityRegistry}})],1),n("vl-column",{attrs:{width:"12","width-m":"6","width-s":"12"}},[n("registry-status",{attrs:{title:"Postinformatie",text:"de Belgische postcodes.",to:"/registers/postinformatie",status:t.postalRegistry}})],1),n("vl-column",{attrs:{width:"12","width-m":"6","width-s":"12"}},[n("registry-status",{attrs:{title:"Straatnamen",text:"de Vlaamse straatnamen.",to:"/registers/straatnamen",status:t.streetNameRegistry}})],1),n("vl-column",{attrs:{width:"12","width-m":"6","width-s":"12"}},[n("registry-status",{attrs:{title:"Adressen",text:"de Vlaamse adressen.",to:"/registers/adressen",status:t.addressRegistry}})],1),n("vl-column",{attrs:{width:"12","width-m":"6","width-s":"12"}},[n("registry-status",{attrs:{title:"Gebouwen",text:"de Vlaamse gebouwen en gebouweenheden.",to:"/registers/gebouwen",status:t.buildingRegistry}})],1),n("vl-column",{attrs:{width:"12","width-m":"6","width-s":"12"}},[n("registry-status",{attrs:{title:"Percelen",text:"de Vlaamse percelen.",to:"/registers/percelen",status:t.parcelRegistry}})],1)],1)],1)],1)],1)],1)],1)],1)},i=[],a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h3",{staticClass:"vl-registry-status-item__title",attrs:{itemprop:"name"}},[t._v(t._s(t.title))]),t.status.hide.includes("projections")?t._e():n("projection-status",{attrs:{status:t.status.projections,"is-loading":t.status.isLoading.includes("projections")}}),t.status.hide.includes("cache")?t._e():n("cache-status",{attrs:{status:t.status.cache,"is-loading":t.status.isLoading.includes("cache")}}),t.status.hide.includes("import")?t._e():n("import-status",{attrs:{status:t.status.import,"is-loading":t.status.isLoading.includes("import")}})],1)},s=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("status-category",{staticClass:"vl-registry-status-item__type",attrs:{title:"Projecties","alert-level":t.alertLevel}},[t.noData?n("vl-column",{attrs:{width:"12"}},[t.isLoading?n("div",{directives:[{name:"vl-align",rawName:"v-vl-align:center",arg:"center"}]},[n("vl-loader",{attrs:{message:"De status van de projecties wordt opgevraagd"}})],1):n("vl-alert",{attrs:{title:"Status van de projecties ophalen mislukt",content:"Er is iets fout gelopen tijdens het ophalen van de status van de projecties. Probeer later opnieuw.","mod-error":""}})],1):t._e(),t._l(t.projections,(function(e){return n("status-item",{key:e.name,attrs:{"alert-level":e.alertLevel}},[n("div",{class:"projection-name projection-state "+e.state},[t._v(t._s(t.formatName(e.name)))]),n("div",{staticClass:"progress --right"},[t._v(t._s(e.progress.isBehind?t.formatProgress(e.progress):"100%"))])])}))],2)},c=[],u=(n("55dd"),n("a481"),n("28a5"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vl-status__catergory"},[n("div",{class:"vl-status__title vl-alert vl-alert--"+t.alertLevel},[n("div",[t._v(t._s(t.title))]),"none"!=t.alertLevel?n("div",{staticClass:"vl-alert__icon"},[n("span",{class:"vl-icon vl-vi vl-vi-"+t.alertLevel,attrs:{"aria-hidden":"true"}})]):t._e()]),t._t("default")],2)}),l=[],d={name:"StatusCategory",components:{},props:{alertLevel:{type:String,required:!0},title:{type:String,required:!0}}},f=d,p=(n("77cc"),n("2877")),v=Object(p["a"])(f,u,l,!1,null,null,null),g=v.exports,h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:"vl-status__item vl-alert vl-alert--"+t.alertLevel},[t._t("default"),n("div",{staticClass:"vl-alert__icon"},[n("span",{class:"vl-icon vl-vi vl-vi-"+t.alertLevel,attrs:{"aria-hidden":"true"}})])],2)},m=[],b={name:"StatusItem",components:{},props:{alertLevel:{type:String,required:!0}}},y=b,w=(n("f151"),Object(p["a"])(y,h,m,!1,null,null,null)),_=w.exports;const x={crashed:"error",stopped:"stopped",catchingup:"active",subscribed:"active"},S=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1;return{position:t,relativePostion:t-e,percentage:e<0?100:(t+1)/(e+1)*100,streamPosition:e,isBehind:t<e}},j=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"error"===t?"error":"stopped"===t?"warning":"active"===t?e.relativePostion<-50?"warning":"success":"unkown"},L=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1;const n=t.name,r=t.currentPosition,i=void 0===r?-1:r,a=t.state,s=void 0===a?"unknown":a;let o=S(i,e);const c=x[s.toLowerCase()]||"unknown";return{name:n,alertLevel:j(c,o),state:c,progress:o}},C=(t,e)=>t?t>=new Date(Date.now()-3e5)?"success":"active"===e&&t<new Date(Date.now()-36e4)?"warning":"active"===e&&t<new Date(Date.now()-36e5)?"error":"unkown":"error",R=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const e=t.currentImport?"active":"stopped",n="active"===e?new Date(t.currentPosition.from):null,r="active"===e?new Date(t.currentPosition.until):null,i=t.lastCompletedImport?new Date(t.lastCompletedImport.until):null;return{name:t.name,state:e,lastCompleted:i,from:n,to:r,alertLevel:C(i,e)}},E=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t.reduce((t,e)=>{let n=e.alertLevel,r=void 0===n?"unknown":n;return[t,r].includes("error")?"error":[t,r].includes("warning")?"warning":[t,r].includes("success")?"success":"unknown"},"unknown")},k=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";const e=t.split("."),n=e.pop();e.pop();const r=e.pop();return`${r} - ${n}`.replace(/Projections/gi,"").replace(/^ - /,"")},P=(t,e)=>{const n=k(t.name),r=k(e.name),i=n.split("-").length>1,a=r.split("-").length>1;return i==a?n.localeCompare(r):i?1:-1};var A={name:"RegistryStatus",components:{StatusItem:_,StatusCategory:g},props:{status:{type:Object,required:!1,default:null},isLoading:{type:Boolean,required:!1,default:!1}},computed:{noData:function(){return!this.status||0==this.status.length},alertLevel:function(){return this.noData?"none":E(this.projections)},projections:function(){return this.status?this.status.projections.map(t=>L(t,this.status.streamPosition)).sort(P):[]}},methods:{formatName:k,formatProgress:function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t.percentage>95?`${t.position}/${t.streamPosition}`:Number.parseFloat(t.percentage).toFixed(2)+"%"}}},D=A,$=(n("4734"),Object(p["a"])(D,o,c,!1,null,null,null)),O=$.exports,I=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:" vl-registry-status-item__type todo-status-dashboard"},[n("h3",{attrs:{itemprop:"name"}},[t._v("Cache - placeholder")]),t._t("default")],2)},B=[],M={name:"CacheStatus",components:{},props:{}},N=M,F=Object(p["a"])(N,I,B,!1,null,null,null),q=F.exports,T=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("status-category",{staticClass:"vl-registry-status-item__type",attrs:{title:"CRAB import","alert-level":t.alertLevel}},[t.noData?n("vl-column",{attrs:{width:"12"}},[t.isLoading?n("div",{directives:[{name:"vl-align",rawName:"v-vl-align:center",arg:"center"}]},[n("vl-loader",{attrs:{message:"De status van de import wordt opgevraagd"}})],1):n("vl-alert",{attrs:{title:"Status van de CRAB import is ophalen mislukt",content:"Er is iets fout gelopen tijdens het ophalen van de status van de CRAB import. Probeer later opnieuw.","mod-error":""}})],1):t._e(),t._l(t.imports,(function(e){return n("status-item",{key:e.name,attrs:{"alert-level":e.alertLevel}},[n("div",{class:"import-name import-state "+e.state},[t._v(t._s(t.formatName(e.name)))]),"active"==e.state?n("div",{staticClass:"import-period --right"},[t._v("import actief van "+t._s(t.formatDate(e.from))+" tot "+t._s(t.formatDate(e.to)))]):n("div",{staticClass:"import-period --right"},[t._v("geïmporteerd tot "+t._s(t.formatDate(e.lastCompleted)))])])}))],2)},G=[],V={name:"ImportStatus",components:{StatusCategory:g,StatusItem:_},props:{status:{type:Array,required:!1,default:null},isLoading:{type:Boolean,required:!1,default:!1}},computed:{noData:function(){return!this.status||0==this.status.length},alertLevel:function(){return this.noData?"none":E(this.imports)},imports:function(){return(this.status||[]).map(R)}},methods:{formatName:function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return t.replace(/^.+\.importer\.?/i,"")},formatDate:t=>{const e={year:"2-digit",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"};return t?t.toLocaleString("nl-BE",e):"__/ __/ __ --:--:--"}}},U=V,z=(n("c687"),Object(p["a"])(U,T,G,!1,null,null,null)),J=z.exports,W={name:"RegistryStatus",components:{ProjectionStatus:O,CacheStatus:q,ImportStatus:J},props:{title:{type:String,required:!0},status:{type:Object,required:!0}}},H=W,K=(n("e31b"),Object(p["a"])(H,a,s,!1,null,null,null)),Q=K.exports,X=n("bc3a"),Y=n.n(X),Z={name:"StatusOverview",components:{RegistryStatus:Q},data(){return{addressRegistry:{hide:["cache"],isLoading:[]},buildingRegistry:{hide:["cache"],isLoading:[]},municipalityRegistry:{hide:["cache"],isLoading:[]},parcelRegistry:{hide:["cache"],isLoading:[]},postalRegistry:{hide:["cache","import"],isLoading:[]},streetNameRegistry:{hide:["cache"],isLoading:[]}}},mounted(){window.baseRegistriesApi||(window.baseRegistriesApi="https://api.basisregisters.dev-vlaanderen.be",console.log("setting baseRegistriesApi",window.baseRegistriesApi)),this.fetchAll()},methods:{setStatusFor:function(t,e){for(const n in e){const r=e[n]||[];this[n][t]?this[n][t]=r:this.$set(this[n],t,r)}},beginLoading:function(t){for(const e in this){const n=this[e]||{};"object"===typeof n&&"isLoading"in n&&(n.isLoading.push(t),n[t]&&(n[t]=null))}},loadingStopped:function(t){for(const e in this){const n=this[e]||{};"object"===typeof n&&"isLoading"in n&&(n.isLoading=n.isLoading.filter(e=>e!==t))}},fetchStatus:function(t,e){this.beginLoading(t),Y.a.get(window.baseRegistriesApi+e).then(e=>{let n=e.data;this.setStatusFor(t,n),this.loadingStopped(t)}).catch(n=>{console.log(`Could not fetch status data from ${window.baseRegistriesApi+e}.`,n),this.loadingStopped(t)})},fetchAll:function(){this.fetchStatus("projections","/v1/status/projection"),this.fetchStatus("import","/v1/status/import"),this.fetchStatus("cache","/v1/status/cache")}}},tt=Z,et=Object(p["a"])(tt,r,i,!1,null,null,null);e["default"]=et.exports},"9b43":function(t,e,n){var r=n("d8e8");t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}},"9def":function(t,e,n){var r=n("4588"),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},"9e1e":function(t,e,n){t.exports=!n("79e5")((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},a383:function(t,e,n){},a481:function(t,e,n){"use strict";var r=n("cb7c"),i=n("4bf8"),a=n("9def"),s=n("4588"),o=n("0390"),c=n("5f1b"),u=Math.max,l=Math.min,d=Math.floor,f=/\$([$&`']|\d\d?|<[^>]*>)/g,p=/\$([$&`']|\d\d?)/g,v=function(t){return void 0===t?t:String(t)};n("214f")("replace",2,(function(t,e,n,g){return[function(r,i){var a=t(this),s=void 0==r?void 0:r[e];return void 0!==s?s.call(r,a,i):n.call(String(a),r,i)},function(t,e){var i=g(n,t,this,e);if(i.done)return i.value;var d=r(t),f=String(this),p="function"===typeof e;p||(e=String(e));var m=d.global;if(m){var b=d.unicode;d.lastIndex=0}var y=[];while(1){var w=c(d,f);if(null===w)break;if(y.push(w),!m)break;var _=String(w[0]);""===_&&(d.lastIndex=o(f,a(d.lastIndex),b))}for(var x="",S=0,j=0;j<y.length;j++){w=y[j];for(var L=String(w[0]),C=u(l(s(w.index),f.length),0),R=[],E=1;E<w.length;E++)R.push(v(w[E]));var k=w.groups;if(p){var P=[L].concat(R,C,f);void 0!==k&&P.push(k);var A=String(e.apply(void 0,P))}else A=h(L,f,C,R,k,e);C>=S&&(x+=f.slice(S,C)+A,S=C+L.length)}return x+f.slice(S)}];function h(t,e,r,a,s,o){var c=r+t.length,u=a.length,l=p;return void 0!==s&&(s=i(s),l=f),n.call(o,l,(function(n,i){var o;switch(i.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,r);case"'":return e.slice(c);case"<":o=s[i.slice(1,-1)];break;default:var l=+i;if(0===l)return n;if(l>u){var f=d(l/10);return 0===f?n:f<=u?void 0===a[f-1]?i.charAt(1):a[f-1]+i.charAt(1):n}o=a[l-1]}return void 0===o?"":o}))}}))},aae3:function(t,e,n){var r=n("d3f4"),i=n("2d95"),a=n("2b4c")("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[a])?!!e:"RegExp"==i(t))}},b0c5:function(t,e,n){"use strict";var r=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},be13:function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},c687:function(t,e,n){"use strict";var r=n("66bb"),i=n.n(r);i.a},c69a:function(t,e,n){t.exports=!n("9e1e")&&!n("79e5")((function(){return 7!=Object.defineProperty(n("230e")("div"),"a",{get:function(){return 7}}).a}))},ca5a:function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},cb7c:function(t,e,n){var r=n("d3f4");t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},d3f4:function(t,e){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},d8e8:function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},e31b:function(t,e,n){"use strict";var r=n("60f6"),i=n.n(r);i.a},ebd6:function(t,e,n){var r=n("cb7c"),i=n("d8e8"),a=n("2b4c")("species");t.exports=function(t,e){var n,s=r(t).constructor;return void 0===s||void 0==(n=r(s)[a])?e:i(n)}},f151:function(t,e,n){"use strict";var r=n("3eea"),i=n.n(r);i.a},fa5b:function(t,e,n){t.exports=n("5537")("native-function-to-string",Function.toString)}}]);
//# sourceMappingURL=status.960203dc.js.map